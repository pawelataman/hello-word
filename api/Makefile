# Simple Makefile for a Go project
DB_URL ?="postgresql://admin:password@localhost:5432/hello-word-api-db"

.PHONY: build
build:
	@echo "Building..."
	@go build -o ./build/main cmd/main.go

.PHNONY: run
run:
	@go run cmd/api/main.go

.PHONY: migration
migration:
	@goose create $(name) sql -dir ./internal/db/sql/migrations

.PHONY: upgrade
upgrade:
	@GOOSE_DRIVER=postgres GOOSE_DBSTRING=$(DB_URL) goose up -dir ./internal/db/sql/migrations

.PHONY: downgrade
downgrade:
	@GOOSE_DRIVER=postgres GOOSE_DBSTRING=$(DB_URL) goose down -dir ./internal/db/sql/migrations

.PHONY: status
status:
	@GOOSE_DRIVER=postgres GOOSE_DBSTRING=$(DB_URL) goose status -dir ./internal/db/sql/migrations

.PHONY: db-models
db-models:
	@sqlc generate

.PHONY: watch
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

.PHONY: docker-dev
docker-dev:
	@docker compose -f ./compose-local.yaml --env-file .env up --build -d
