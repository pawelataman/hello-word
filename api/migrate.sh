
GOOSE_DRIVER=postgres GOOSE_DBSTRING=$DB_URL goose up -dir ./internal/db/sql/migrations