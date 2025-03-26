FROM golang:1.23 AS builder

WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
RUN go install github.com/pressly/goose/v3/cmd/goose@latest
COPY . .
RUN chmod +x ./migrate.sh ./seed.sh ./start.sh
RUN CGO_ENABLED=0 GOOS=linux go build -o ./build/hello-word-api ./cmd/main.go
EXPOSE 8080
CMD ["./start.sh"]