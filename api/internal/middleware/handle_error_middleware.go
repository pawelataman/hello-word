package middleware

import (
	"github.com/gofiber/fiber/v2"
	"github.com/pawelataman/hello-word/internal/api_errors"
	"log/slog"
)

func HandleErrorMiddleware(c *fiber.Ctx) error {

	defer func() {
		if err := recover(); err != nil {
			if er, ok := err.(error); ok {
				slog.Error(er.Error())
			}
			_ = c.SendStatus(fiber.StatusInternalServerError)
		}

	}()

	if err := c.Next(); err != nil {
		if e, ok := err.(api_errors.ApiError); ok {
			return c.Status(e.Code).JSON(e)
		}
		slog.Error(err.Error(), err)
		return fiber.ErrInternalServerError
	}
	return nil
}
