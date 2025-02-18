package main

import (
	"context"
	"fmt"
	"github.com/joho/godotenv"
	"github.com/pawelataman/hello-word/internal/config"
	"github.com/pawelataman/hello-word/internal/db"
	"github.com/pawelataman/hello-word/internal/db/generated"
	"github.com/pawelataman/hello-word/internal/scripts/seed"
	"log"
	"os"
)

func main() {
	ctx := context.Background()
	err := godotenv.Load()
	if err != nil {
		log.Fatal("error loading .env file")
	}

	appConfig := config.NewAppConfig(config.WithDSN(os.Getenv("DB_URL")), config.WithMaxConnections(1))
	pool, err := db.CreateDbConnection(ctx, appConfig)

	if err != nil {
		log.Fatal(fmt.Fprintf(os.Stderr, "Unable to connect to database: %v\n", err))
	}

	defer pool.Close()

	queries := generated.New(pool)
	seeder := seed.New(queries)

	seeder.Seed(ctx)
}
