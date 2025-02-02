package services

import (
	"fmt"
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"github.com/pawelataman/hello-word/internal/api_errors"
	"github.com/pawelataman/hello-word/internal/data/models"
	"github.com/pawelataman/hello-word/internal/repository"
)

var (
	QuizService *QuizServiceImpl
)

type QuizServiceImpl struct {
	repository repository.IQuizRepository
}

func NewQuizServiceImpl(quizRepository repository.IQuizRepository) *QuizServiceImpl {
	return &QuizServiceImpl{
		repository: quizRepository,
	}
}

func (qs *QuizServiceImpl) CreateQuiz(ctx *fiber.Ctx, questionsQty int) (models.Quiz, error) {

	const answersPerQuestion = 4
	words, err := qs.repository.GetQuizQuestions(ctx.Context(), int32(questionsQty))
	if err != nil {
		fmt.Println(err)
		return models.Quiz{}, err
	}

	if len(words) < questionsQty {
		return models.Quiz{}, api_errors.NewApiErr(fiber.StatusBadRequest, fmt.Errorf(api_errors.InsufficientWordQty))
	}

	questions := make([]models.QuizQuestion, questionsQty)
	for i := 0; i < questionsQty; i++ {
		answers := make([]models.QuizWord, 4)
		for j := 0; j < answersPerQuestion; j++ {
			index := i*answersPerQuestion + j
			quizWord := models.QuizWord{
				Id: int(words[index].ID),
				Pl: words[index].Pl,
				En: words[index].En,
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
