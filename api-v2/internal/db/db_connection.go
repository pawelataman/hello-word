package db

import (
	"context"
	"fmt"
	"github.com/jackc/pgx/v5"
	"log"
	"os"
)

var (
	Connection *pgx.Conn
)

func InitDbConnection(ctx context.Context) error {
	conn, err := pgx.Connect(ctx, os.Getenv("DB_URL"))

	if err != nil {
		log.Fatal(fmt.Fprintf(os.Stderr, "unable to connect to database: %v\n", err))
		return err
	}

	Connection = conn

	return nil
}

func DisposeConnection(ctx context.Context) error {
	if err := Connection.Close(ctx); err != nil {
		log.Fatal("could not close database connection")
		return err
	}
	return nil
}
