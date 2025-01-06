FROM golang:1.23 AS builder

WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o ./build/hello-word-api ./cmd/main.go

# Final image
FROM alpine:latest
RUN apk --no-cache add ca-certificates
COPY --from=builder /app/build/hello-word-api /hello-word-api
EXPOSE 3000
CMD ["/hello-word-api"]

