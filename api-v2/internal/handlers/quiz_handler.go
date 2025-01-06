package handlers

import (
	"fmt"
	"github.com/gofiber/fiber/v2"
	"github.com/pawelataman/hello-word/internal/services"
)

func RegisterQuizHandlers(router fiber.Router) {
	app := router.Group("/quiz")
	app.Get("/", handleCreateQuiz)
}

func handleCreateQuiz(c *fiber.Ctx) error {

	questionsQty := c.QueryInt("numOfQuestions", 10)

	quiz, err := services.QuizService.CreateQuiz(c, questionsQty)

	if err != nil {
		fmt.Println(err)
		return c.SendStatus(fiber.StatusInternalServerError)
	}

	return c.JSON(quiz)
}
