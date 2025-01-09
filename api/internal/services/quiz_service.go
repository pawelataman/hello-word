package services

import (
	"fmt"
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"github.com/pawelataman/hello-word/internal/data/models"
	"github.com/pawelataman/hello-word/internal/db"
)

var (
	QuizService *QuizServiceImpl
)

type QuizServiceImpl struct {
	queries *db.Queries
}

func NewQuizServiceImpl() *QuizServiceImpl {

	return &QuizServiceImpl{
		queries: db.New(db.Connection),
	}
}

func (qs *QuizServiceImpl) CreateQuiz(ctx *fiber.Ctx, questionsQty int) (models.Quiz, error) {
	const answersPerQuestion = 4

	words, err := qs.queries.GetQuizQuestions(ctx.Context(), int32(questionsQty*answersPerQuestion))

	if err != nil {
		fmt.Println(err)
		return models.Quiz{}, err
	}

	questions := make([]models.QuizQuestion, questionsQty)

	for i := 0; i < questionsQty; i++ {
		answers := make([]models.QuizWord, 4)
		for j := 0; j < answersPerQuestion; j++ {
			index := i*answersPerQuestion + j

			quizWord := models.QuizWord{
				Id:         int(words[index].ID),
				Pl:         words[index].Pl,
				En:         words[index].En,
				CategoryId: int(words[index].CategoryId),
			}

			answers[j] = quizWord
		}

		quizQuestion := models.QuizQuestion{
			Id:       i + 1,
			Question: answers[0],
			Answers:  answers,
		}

		questions[i] = quizQuestion
	}

	quiz := models.Quiz{
		Id:        uuid.New().String(),
		Questions: questions,
	}

	return quiz, nil
}
