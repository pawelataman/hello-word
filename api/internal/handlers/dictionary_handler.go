package handlers

import (
	"fmt"
	"log/slog"
	"strconv"

	"github.com/gofiber/fiber/v2"
	"github.com/pawelataman/hello-word/internal/api_errors"
	"github.com/pawelataman/hello-word/internal/data/models"
	"github.com/pawelataman/hello-word/internal/services"
	"github.com/pawelataman/hello-word/internal/validation"
)

func RegisterDictionaryHandler(router fiber.Router) {
	app := router.Group("/dictionary")

	app.Get("/words", handleGetDictionaryWords)
	app.Post("/words", handleCreateDictionaryWords)

	app.Get("/categories", handleGetDictionaryCategories)
	app.Get("/categories/:id", handleGetDictionaryCategoryById)
	app.Post("/categories", handleCreateDictionaryCategory)

	//app.Post("/words", handleAddWord)
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

	words, err := services.DictionaryService.GetAllWords(ctx.Context(), paginationParams)

	if err != nil {
		slog.Error(err.Error())
		return err
	}

	return ctx.JSON(words)
}

func handleGetDictionaryCategories(ctx *fiber.Ctx) error {
	categories, err := services.DictionaryService.GetAllCategories(ctx.Context())

	if err != nil {
		return err
	}

	return ctx.JSON(categories)
}

func handleCreateDictionaryCategory(ctx *fiber.Ctx) error {
	var body models.CreateCategoryRequestBody

	err := ctx.BodyParser(&body)

	if err != nil {
		slog.Error(err.Error())
		return api_errors.NewApiErr(fiber.StatusBadRequest, err)
	}

	if validationErrors, ok := validation.ValidateStruct(body); !ok {
		return api_errors.InvalidReqDataErr(validationErrors)
	}

	createdCategory, err := services.DictionaryService.AddCategory(ctx.Context(), body.CategoryName)

	if err != nil {
		return err
	}

	return ctx.JSON(createdCategory)
}

func handleCreateDictionaryWords(ctx *fiber.Ctx) error {

	return nil
}
func handleGetDictionaryCategoryById(ctx *fiber.Ctx) error {
	idStr := ctx.Params("id")

	id, err := strconv.Atoi(idStr)

	if err != nil {
		return api_errors.NewApiErr(fiber.StatusBadRequest, fmt.Errorf("invalid id parameter"))
	}

	category, err := services.DictionaryService.GetCategoryById(ctx.Context(), id)

	if err != nil {
		slog.Error(err.Error())
		return err
	}

	return ctx.JSON(category)
}
