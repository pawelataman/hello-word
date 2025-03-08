package services

import (
	"fmt"
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"github.com/pawelataman/hello-word/internal/api_errors"
	"github.com/pawelataman/hello-word/internal/data/consts"
	"github.com/pawelataman/hello-word/internal/data/models"
	"github.com/pawelataman/hello-word/internal/db"
	"github.com/pawelataman/hello-word/internal/db/generated"
	"github.com/pawelataman/hello-word/internal/repository"
	"log/slog"
	"maps"
	"math/rand/v2"
	"slices"
)

var (
	QuizService *QuizServiceImpl
)

type QuizServiceParams struct {
	QuizRepository      repository.IQuizRepository
	FlashcardRepository repository.IFlashcardsRepository
	Transactioner       db.ITransactionManager
}

type QuizServiceImpl struct {
	repository          repository.IQuizRepository
	flashcardRepository repository.IFlashcardsRepository
	transactioner       db.ITransactionManager
}

func NewQuizServiceImpl(params *QuizServiceParams) *QuizServiceImpl {
	return &QuizServiceImpl{
		repository:          params.QuizRepository,
		transactioner:       params.Transactioner,
		flashcardRepository: params.FlashcardRepository,
	}
}

func (qs *QuizServiceImpl) CreateQuizFromFlashcards(ctx *fiber.Ctx, data models.CreateQuizRequest) (models.Quiz, error) {

	// accumulate words from all flashcards in a map so we can avoid duplicates
	accumulatedWords := make(map[int32]generated.GetWordsByFlashcardIdRow)
	for _, id := range data.FlashcardsIds {
		flashcardWords, err := qs.flashcardRepository.GetWordsByFlashcardId(ctx.Context(), int32(id))
		if err != nil {
			slog.Error(fmt.Errorf("cannot extract flashcard words to create quiz: %w", err).Error())
			return models.Quiz{}, err
		}

		for _, flashcardWord := range flashcardWords {
			if _, ok := accumulatedWords[flashcardWord.ID]; !ok {
				accumulatedWords[flashcardWord.ID] = flashcardWord
			}
		}
	}

	// if there are less than 10 words, return error
	if len(accumulatedWords) < consts.QuizNumOfQuestions {
		err := api_errors.NewApiErr(fiber.StatusInternalServerError, fmt.Errorf(api_errors.InsufficientWordQty))
		slog.Error(fmt.Errorf("error in create quiz %w", err).Error())
		return models.Quiz{}, err
	}
	// shuffle words and take first 10(number of questions per quiz)
	shuffleQuestionWords := shuffleArray(slices.Collect(maps.Values(accumulatedWords)))[:consts.QuizNumOfQuestions]
	questions := make([]models.QuizQuestion, len(shuffleQuestionWords))

	for index, question := range shuffleQuestionWords {

		// first item in arr is answer, always
		answers := make([]models.QuizWord, 4)
		answers[0] = models.QuizWord{
			Id: int(question.ID),
			En: question.En,
			Pl: question.Pl,
		}

		// for each answer retrieve 3 false answer words from db, that are not answer
		falseAnswers, err := qs.repository.GetQuizFalseAnswers(ctx.Context(), generated.GetQuizFalseAnswersParams{AnswerID: int32(answers[0].Id), FalseAnswersQty: 3})

		if err != nil {
			err = fmt.Errorf("could not extract false answers from db: %w", err)
			slog.Error(err.Error())

			return models.Quiz{}, err
		}
		for falseAnswerIndex, falseAnswer := range falseAnswers {
			answers[falseAnswerIndex+1] = models.QuizWord{
				Id: int(falseAnswer.ID),
				En: falseAnswer.En,
				Pl: falseAnswer.Pl,
			}
		}

		quizQuestion := models.QuizQuestion{
			Id:       index + 1,
			Question: answers[0],
			Answers:  answers,
		}

		questions[index] = quizQuestion
	}
	quiz := models.Quiz{
		Id:        uuid.New().String(),
		Questions: questions,
	}
	return quiz, nil
}

func (qs *QuizServiceImpl) CreateQuiz(ctx *fiber.Ctx) (models.Quiz, error) {

	const questionsQty = consts.QuizNumOfQuestions
	const answersPerQuestion = 4
	words, err := qs.repository.GetQuizQuestions(ctx.Context(), int32(questionsQty*answersPerQuestion))
	if err != nil {
		fmt.Println(err)
		return models.Quiz{}, err
	}

	if len(words) < questionsQty*answersPerQuestion {
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

// TODO: move to utils or something, idk
func shuffleArray[T any](arr []T) []T {
	resultArr := make([]T, len(arr))
	shuffledSample := rand.Perm(len(arr))

	for index, shuffled := range shuffledSample {
		resultArr[index] = arr[shuffled]
	}

	return resultArr
}
