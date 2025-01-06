package services

import (
	"fmt"
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"github.com/pawelataman/hello-word/internal/data"
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

func (qs *QuizServiceImpl) CreateQuiz(ctx *fiber.Ctx, questionsQty int) (data.Quiz, error) {
	const answersPerQuestion = 4

	words, err := qs.queries.GetQuizQuestions(ctx.Context(), int32(questionsQty*answersPerQuestion))

	if err != nil {
		fmt.Println(err)
		return data.Quiz{}, err
	}

	questions := make([]data.QuizQuestion, questionsQty)

	for i := 0; i < questionsQty; i++ {
		answers := make([]data.QuizWord, 4)
		for j := 0; j < answersPerQuestion; j++ {
			index := i*answersPerQuestion + j

			quizWord := data.QuizWord{
				Id:         int(words[index].ID),
				Pl:         words[index].Pl,
				En:         words[index].En,
				CategoryId: int(words[index].CategoryId),
			}

			answers[j] = quizWord
		}

		quizQuestion := data.QuizQuestion{
			Id:       i + 1,
			Question: answers[0],
			Answers:  answers,
		}

		questions[i] = quizQuestion
	}

	quiz := data.Quiz{
		Id:        uuid.New().String(),
		Questions: questions,
	}

	return quiz, nil
}
