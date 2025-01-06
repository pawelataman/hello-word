# Simple Makefile for a Go project
DB_URL ?="postgresql://admin:password@localhost:5432/hello-word"

build:
	@echo "Building..."
	@go build -o ./build/main cmd/main.go

# Run the application
run:
	@go run cmd/api/main.go

migration:
	@goose create $(name) sql -dir ./internal/db/sql/migrations

upgrade:
	@GOOSE_DRIVER=postgres GOOSE_DBSTRING=$(DB_URL) goose up -dir ./internal/db/sql/migrations

downgrade:
	@GOOSE_DRIVER=postgres GOOSE_DBSTRING=$(DB_URL) goose down -dir ./internal/db/sql/migrations

status:
	@GOOSE_DRIVER=postgres GOOSE_DBSTRING=$(DB_URL) goose status -dir ./internal/db/sql/migrations

db-models:
	@sqlc generate

# Live Reload
watch:
	@if command -v air > /dev/null; then \
            air; \
            echo "Watching...";\
        else \
            read -p "Go's 'air' is not installed on your machine. Do you want to install it? [Y/n] " choice; \
            if [ "$$choice" != "n" ] && [ "$$choice" != "N" ]; then \
                go install github.com/air-verse/air@latest; \
                air; \
                echo "Watching...";\
            else \
                echo "You chose not to install air. Exiting..."; \
                exit 1; \
            fi; \
        fi

docker-dev:
	@docker compose -f ./compose-local.yaml --env-file .env up --build

.PHONY: all build run test clean watch
