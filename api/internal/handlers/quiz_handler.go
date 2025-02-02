package handlers

import (
	"log/slog"

	"github.com/gofiber/fiber/v2"
	"github.com/pawelataman/hello-word/internal/api_errors"
	"github.com/pawelataman/hello-word/internal/data/models"
	"github.com/pawelataman/hello-word/internal/services"
	"github.com/pawelataman/hello-word/internal/validation"
)

func RegisterQuizHandlers(router fiber.Router) {
	app := router.Group("/quiz")
	app.Get("/", handleCreateQuiz)
}

func handleCreateQuiz(c *fiber.Ctx) error {
	var getQuizQueryParams models.GetQuizQueryParams

	err := c.QueryParser(&getQuizQueryParams)

	if err != nil {
		slog.Error(err.Error())
		return api_errors.NewApiErr(fiber.StatusBadRequest, err)
	}
	if validationErrors, ok := validation.ValidateStruct(getQuizQueryParams); !ok {
		return api_errors.InvalidReqDataErr(validationErrors)
	}
	quiz, err := services.QuizService.CreateQuiz(c, getQuizQueryParams.NumOfQuestions)
	if err != nil {
		return err
	}
	return c.JSON(quiz)
}
