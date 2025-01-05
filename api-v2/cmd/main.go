package main

import (
	"github.com/pawelataman/hello-word/internal/server"
	"log"
)

func main() {
	srv := server.New()
	log.Fatal(srv.Listen(":8080"))
}
