package middleware

import (
	"github.com/gofiber/fiber/v2"
	"github.com/pawelataman/hello-word/internal/api_errors"
	"log/slog"
)

func HandleErrorMiddleware(c *fiber.Ctx) error {
	if err := c.Next(); err != nil {
		if e, ok := err.(api_errors.ApiError); ok {
			return c.Status(e.Code).JSON(e)
		}
		slog.Error(err.Error(), err)
		return fiber.ErrInternalServerError
	}
	return nil
}
