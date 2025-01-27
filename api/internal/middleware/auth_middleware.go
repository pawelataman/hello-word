package middleware

import (
	"github.com/clerk/clerk-sdk-go/v2"
	"github.com/clerk/clerk-sdk-go/v2/user"
	"github.com/gofiber/fiber/v2"
	"github.com/pawelataman/hello-word/internal/data/models"
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

	userSubject := &models.UserSubject{
		ID:           usr.ID,
		EmailAddress: usr.EmailAddresses[0].EmailAddress,
	}
	ctx.Locals("userSubject", userSubject)
	return ctx.Next()
}
