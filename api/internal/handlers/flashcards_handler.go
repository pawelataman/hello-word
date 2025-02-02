package handlers

import (
	"fmt"
	"github.com/gofiber/fiber/v2"
	"github.com/pawelataman/hello-word/internal/api_errors"
	"github.com/pawelataman/hello-word/internal/data/consts"
	"github.com/pawelataman/hello-word/internal/data/models"
	"github.com/pawelataman/hello-word/internal/services"
	"github.com/pawelataman/hello-word/internal/validation"
	"log/slog"
	"strconv"
)

func RegisterFlashcardsHandler(router fiber.Router) {
	app := router.Group("/flashcards")
	app.Get("/", handleGetFlashcards)
	app.Post("/", handleCreateFlashcard)
	app.Get("/:id", handleGetFlashcardById)
	app.Delete("/:id", handleDeleteFlashcard)
	app.Put("/:id/words", handleAssignFlashcardWords)
}

func handleAssignFlashcardWords(ctx *fiber.Ctx) error {
	flashcardId, err := ctx.ParamsInt("id")
	if err != nil {
		return api_errors.NewApiErr(fiber.StatusBadRequest, fmt.Errorf(api_errors.InvalidId))
	}

	var body models.AssignFlashcardWordsRequest
	if err = ctx.BodyParser(&body); err != nil {
		return api_errors.NewApiErr(fiber.StatusBadRequest, fmt.Errorf(api_errors.InvalidBody))
	}
	if err = services.FlashcardService.AssignFlashcardWords(ctx.Context(), body.WordsIds, flashcardId); err != nil {
		return err
	}
	return nil
}

func handleGetFlashcards(ctx *fiber.Ctx) error {
	flashcards, err := services.FlashcardService.GetFlashcards(ctx.Context())
	if err != nil {
		return err
	}
	return ctx.JSON(flashcards)
}
func handleCreateFlashcard(ctx *fiber.Ctx) error {
	var body models.CreateFlashcardRequest
	err := ctx.BodyParser(&body)
	if err != nil {
		slog.Error(err.Error())
		return api_errors.NewApiErr(fiber.StatusBadRequest, err)
	}
	if err = conform.Struct(ctx.Context(), &body); err != nil {
		slog.Error(err.Error())
		return err
	}
	if validationErrors, ok := validation.ValidateStruct(body); !ok {
		return api_errors.InvalidReqDataErr(validationErrors)
	}
	userSubject := ctx.Locals(consts.UserSubjectKey).(*models.UserSubject)
	createdFlashcard, err := services.FlashcardService.AddFlashcard(ctx.Context(), body.FlashcardName, userSubject.EmailAddress)
	if err != nil {
		return err
	}
	return ctx.JSON(createdFlashcard)
}

func handleGetFlashcardById(ctx *fiber.Ctx) error {
	idStr := ctx.Params("id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		return api_errors.NewApiErr(fiber.StatusBadRequest, fmt.Errorf(api_errors.InvalidId))
	}
	flashcard, err := services.FlashcardService.GetFlashcardById(ctx.Context(), id)
	if err != nil {
		slog.Error(err.Error())
		return err
	}
	return ctx.JSON(flashcard)
}

func handleDeleteFlashcard(ctx *fiber.Ctx) error {
	idStr := ctx.Params("id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		return api_errors.NewApiErr(fiber.StatusBadRequest, fmt.Errorf(api_errors.InvalidId))
	}
	userSubject := ctx.Locals(consts.UserSubjectKey).(*models.UserSubject)
	err = services.FlashcardService.DeleteFlashcard(ctx.Context(), id, userSubject.EmailAddress)
	if err != nil {
		slog.Error(err.Error())
		return err
	}
	return ctx.SendStatus(fiber.StatusNoContent)
}
