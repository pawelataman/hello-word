package server

import "github.com/gofiber/fiber/v2"

type Server struct {
	*fiber.App
}

func New() *Server {
	return &Server{
		App: fiber.New(),
	}
}
