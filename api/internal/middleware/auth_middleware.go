package middleware

import (
	"github.com/clerk/clerk-sdk-go/v2"
	"github.com/clerk/clerk-sdk-go/v2/user"
	"github.com/gofiber/fiber/v2"
)

func AuthMiddleware(ctx *fiber.Ctx) error {

	claims, ok := clerk.SessionClaimsFromContext(ctx.Context())

	if !ok {
		return ctx.SendStatus(fiber.StatusUnauthorized)
	}

	usr, err := user.Get(ctx.Context(), claims.Subject)

	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, "could not extract user")
	}

	if usr.Banned {
		return fiber.NewError(fiber.StatusUnauthorized, "user banned")
	}

	return ctx.Next()
}
