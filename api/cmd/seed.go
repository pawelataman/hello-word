package main

import (
	"context"
	"fmt"
	"github.com/jackc/pgx/v5"
	"github.com/joho/godotenv"
	"github.com/pawelataman/hello-word/internal/db"
	"github.com/pawelataman/hello-word/internal/scripts/seed"
	"log"
	"os"
)

func main() {
	ctx := context.Background()
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	conn, err := pgx.Connect(context.Background(), os.Getenv("DB_URL"))

	if err != nil {
		log.Fatal(fmt.Fprintf(os.Stderr, "Unable to connect to database: %v\n", err))
	}

	defer func() {
		if err = conn.Close(ctx); err != nil {
			log.Fatal("could not close database connection")
		}
	}()

	queries := db.New(conn)
	seeder := seed.New(queries)

	seeder.Seed(ctx)

}
