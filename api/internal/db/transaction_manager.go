package db

import (
	"context"
	"fmt"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
	"log/slog"
)

type ITransactionManager interface {
	CreateTransaction(ctx context.Context) ITransaction
}

type transactionManager struct {
	pool *pgxpool.Pool
}

func NewTransactionManager(pool *pgxpool.Pool) ITransactionManager {
	return &transactionManager{
		pool: pool,
	}
}

func (t *transactionManager) CreateTransaction(ctx context.Context) ITransaction {
	return &transaction{ctx: ctx, pool: t.pool}
}

type ITransaction interface {
	begin(ctx context.Context) error
	Execute(ctx context.Context, fn func(tx pgx.Tx) error) error
	commit(ctx context.Context) error
	rollback(ctx context.Context) error
}

type transaction struct {
	pool *pgxpool.Pool
	ctx  context.Context
	tx   pgx.Tx
}

func (t *transaction) begin(ctx context.Context) error {
	tx, err := t.pool.Begin(ctx)
	if err != nil {
		return err
	}
	t.tx = tx
	return nil
}

func (t *transaction) commit(ctx context.Context) error {
	if t.tx == nil {
		return fmt.Errorf("transaction does not exist")
	}
	return t.tx.Commit(ctx)
}

func (t *transaction) rollback(ctx context.Context) error {
	if t.tx == nil {
		return fmt.Errorf("transaction does not exist")
	}
	return t.tx.Rollback(ctx)
}

func (t *transaction) Execute(ctx context.Context, fn func(tx pgx.Tx) error) error {
	if err := t.begin(ctx); err != nil {
		slog.Error("could not start transaction", err.Error())
		return err
	}
	if err := fn(t.tx); err != nil {
		slog.Error("transaction failed", err.Error())
		if rollErr := t.rollback(ctx); rollErr != nil {
			slog.Error("rolling back error", rollErr)
		}
		return err
	}
	return t.commit(ctx)
}
