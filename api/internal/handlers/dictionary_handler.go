package handlers

import (
	"fmt"
	"github.com/gofiber/fiber/v2"
	"github.com/pawelataman/hello-word/internal/api_errors"
	"github.com/pawelataman/hello-word/internal/data/models"
	"github.com/pawelataman/hello-word/internal/services"
	"github.com/pawelataman/hello-word/internal/validation"
	"log/slog"
)

func RegisterDictionaryHandler(router fiber.Router) {
	app := router.Group("/dictionary")
	app.Get("/words", handleGetDictionaryWords)
}

func handleGetDictionaryWords(ctx *fiber.Ctx) error {
	var paginationParams models.GetAllWordsParams

	err := ctx.QueryParser(&paginationParams)

	if err != nil {
		slog.Error(err.Error())
		return api_errors.NewApiErr(fiber.StatusBadRequest, err)
	}

	if validationErrors, ok := validation.ValidateStruct(paginationParams); !ok {
		return api_errors.InvalidReqDataErr(validationErrors)
	}

	fmt.Println(paginationParams)

	words, err := services.DictionaryService.GetAllWords(ctx.Context(), paginationParams)

	if err != nil {
		slog.Error(err.Error())
		return fiber.ErrInternalServerError
	}

	return ctx.JSON(words)
}
