package db

import (
	"context"
	"fmt"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/pawelataman/hello-word/internal/config"
	"log"
	"os"
)

func CreateDbConnection(ctx context.Context, config *config.AppConfig) (*pgxpool.Pool, error) {
	connectionConfig, err := pgxpool.ParseConfig(config.DSN)
	connectionConfig.MaxConns = int32(config.MaxConnections)
	pool, err := pgxpool.NewWithConfig(ctx, connectionConfig)
	if err != nil {
		log.Fatal(fmt.Fprintf(os.Stderr, "unable to connect to database: %v\n", err))
		return nil, err
	}
	return pool, nil
}

func DisposeConnection(pool *pgxpool.Pool) {
	pool.Close()
}
