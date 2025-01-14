package db

import (
	"context"
	"fmt"
	"github.com/jackc/pgx/v5/pgxpool"
	"log"
	"os"
)

var (
	Pool *pgxpool.Pool
)

func InitDbConnection(ctx context.Context) error {

	connectionConfig, err := pgxpool.ParseConfig(os.Getenv("DB_URL"))

	connectionConfig.MaxConns = 4
	connectionConfig.MinConns = 4

	pool, err := pgxpool.NewWithConfig(ctx, connectionConfig)

	if err != nil {
		log.Fatal(fmt.Fprintf(os.Stderr, "unable to connect to database: %v\n", err))
		return err
	}

	Pool = pool
	return nil
}

func DisposeConnection() {
	Pool.Close()
}
