package handlers

import (
	"fmt"
	"log/slog"

	"github.com/go-playground/mold/v4/modifiers"
	"github.com/gofiber/fiber/v2"
	"github.com/pawelataman/hello-word/internal/api_errors"
	"github.com/pawelataman/hello-word/internal/data/consts"
	"github.com/pawelataman/hello-word/internal/data/models"
	"github.com/pawelataman/hello-word/internal/services"
	"github.com/pawelataman/hello-word/internal/validation"
)

var (
	conform = modifiers.New()
)

func RegisterDictionaryHandler(router fiber.Router) {
	app := router.Group("/dictionary")
	app.Get("/words", handleGetDictionaryWords)
	app.Post("/words", handleCreateDictionaryWords)
	app.Delete("/words/:id", handleDeleteDictionaryWord)
}

func handleDeleteDictionaryWord(ctx *fiber.Ctx) error {
	wordId, err := ctx.ParamsInt("id")

	if err != nil {
		slog.Error(err.Error())
		return api_errors.NewApiErr(fiber.StatusBadRequest, fmt.Errorf(api_errors.InvalidId))
	}
	userSubject := ctx.Locals(consts.UserSubjectKey).(*models.UserSubject)
	return services.WordsService.DeleteWord(ctx.Context(), wordId, userSubject.EmailAddress)
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

	userSubject := ctx.Locals(consts.UserSubjectKey).(*models.UserSubject)
	if paginationParams.UsersOnly {
		words, err := services.WordsService.GetAllWordsByAuthor(ctx.Context(), paginationParams, userSubject.EmailAddress)
		if err != nil {
			slog.Error(err.Error())
			return err
		}
		return ctx.JSON(words)
	}
	words, err := services.WordsService.GetAllWords(ctx.Context(), paginationParams)

	if err != nil {
		slog.Error(err.Error())
		return err
	}
	return ctx.JSON(words)
}

func handleCreateDictionaryWords(ctx *fiber.Ctx) error {
	var createWordsReqBody models.CreateWordsRequest
	err := ctx.BodyParser(&createWordsReqBody)
	if err != nil {
		slog.Error(err.Error())
		return api_errors.NewApiErr(fiber.StatusBadRequest, err)
	}
	err = conform.Struct(ctx.Context(), &createWordsReqBody)
	if err != nil {
		slog.Error(err.Error())
	}
	if validationErrors, ok := validation.ValidateStruct(createWordsReqBody); !ok {
		return api_errors.InvalidReqDataErr(validationErrors)
	}
	userSubject := ctx.Locals(consts.UserSubjectKey).(*models.UserSubject)
	createdWords, err := services.WordsService.AddWords(ctx.Context(), createWordsReqBody.Words, userSubject.EmailAddress)
	if err != nil {
		slog.Error(err.Error())
		return err
	}
	return ctx.Status(fiber.StatusCreated).JSON(createdWords)
}
