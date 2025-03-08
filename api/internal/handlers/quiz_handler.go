package handlers

import (
	"log/slog"

	"github.com/gofiber/fiber/v2"
	"github.com/pawelataman/hello-word/internal/api_errors"
	"github.com/pawelataman/hello-word/internal/data/models"
	"github.com/pawelataman/hello-word/internal/services"
)

func RegisterQuizHandlers(router fiber.Router) {
	app := router.Group("/quiz")
	app.Get("/", handleCreateQuiz)
	app.Post("/flashcards", handleCreateQuizFromFlashcards)
}

func handleCreateQuiz(c *fiber.Ctx) error {
	quiz, err := services.QuizService.CreateQuiz(c)
	if err != nil {
		return err
	}
	return c.JSON(quiz)
}

func handleCreateQuizFromFlashcards(c *fiber.Ctx) error {
	var body models.CreateQuizRequest

	if err := c.BodyParser(&body); err != nil {
		slog.Error(err.Error())
		return api_errors.NewApiErr(fiber.StatusBadRequest, err)
	}

	quiz, err := services.QuizService.CreateQuizFromFlashcards(c, body)
	if err != nil {
		return err
	}
	return c.JSON(quiz)
}
