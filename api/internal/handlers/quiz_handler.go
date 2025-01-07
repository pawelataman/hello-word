package handlers

import (
	"fmt"
	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
	"github.com/pawelataman/hello-word/internal/services"
)

var validate = validator.New(validator.WithRequiredStructEnabled())

type GetQuizQueryParams struct {
	NumOfQuestions int `json:"numOfQuestions" validate:"number,gte=5,lte=20"`
}

func RegisterQuizHandlers(router fiber.Router) {
	app := router.Group("/quiz")
	app.Get("/", handleCreateQuiz)
}

func handleCreateQuiz(c *fiber.Ctx) error {

	var getQuizQueryParams GetQuizQueryParams

	err := c.QueryParser(&getQuizQueryParams)

	if err != nil {
		fmt.Println(err)
	}

	err = validate.Struct(getQuizQueryParams)

	if err != nil {
		return c.SendStatus(fiber.StatusBadRequest)
	}

	quiz, err := services.QuizService.CreateQuiz(c, getQuizQueryParams.NumOfQuestions)

	if err != nil {
		fmt.Println(err)
		return c.SendStatus(fiber.StatusInternalServerError)
	}

	return c.JSON(quiz)
}
