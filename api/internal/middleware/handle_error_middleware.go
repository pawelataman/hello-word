package middleware

import (
	"github.com/gofiber/fiber/v2"
	"github.com/pawelataman/hello-word/internal/api_errors"
)

func HandleErrorMiddleware(c *fiber.Ctx) error {
	if err := c.Next(); err != nil {
		if e, ok := err.(api_errors.ApiError); ok {
			return c.JSON(e)
		}
		return fiber.ErrInternalServerError
	}
	return nil
}
