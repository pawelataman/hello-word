package services

import (
	"context"
	"fmt"
	"github.com/gofiber/fiber/v2"
	"github.com/jackc/pgx/v5"
	"github.com/pawelataman/hello-word/internal/api_errors"
	"github.com/pawelataman/hello-word/internal/data/models"
	"github.com/pawelataman/hello-word/internal/db"
	"github.com/pawelataman/hello-word/internal/db/generated"
	"github.com/pawelataman/hello-word/internal/repository"
	"log/slog"
)

var (
	FlashcardService *FlashcardServiceImpl
)

type FlashcardServiceParams struct {
	Repository    repository.IFlashcardsRepository
	Transactioner db.ITransactionManager
}

func NewFlashcardService(params *FlashcardServiceParams) *FlashcardServiceImpl {
	return &FlashcardServiceImpl{
		repository:    params.Repository,
		transactioner: params.Transactioner,
	}
}

type FlashcardServiceImpl struct {
	repository    repository.IFlashcardsRepository
	transactioner db.ITransactionManager
}

func (ds *FlashcardServiceImpl) GetFlashcards(ctx context.Context) ([]models.Flashcard, error) {
	rows, err := ds.repository.GetFlashcards(ctx)
	if err != nil {
		return nil, err
	}
	flashcards := make([]models.Flashcard, len(rows))
	for index, row := range rows {

		words, err := ds.repository.GetWordsByFlashcardId(ctx, row.ID)
		wordQty := 0

		if err == nil {
			wordQty = len(words)
		}

		flashcards[index] = models.Flashcard{ID: row.ID, WordQty: wordQty, Name: row.Name, Author: row.Author, CreatedAt: row.CreatedAt.Time, UpdatedAt: row.UpdatedAt.Time, Color: row.Color}
	}
	return flashcards, nil
}

func (ds *FlashcardServiceImpl) AddFlashcard(ctx context.Context, name string, color string, wordsIds []int, author string) (models.Flashcard, error) {
	_, err := ds.repository.GetFlashcardByName(ctx, name)
	if err == nil {
		return models.Flashcard{}, api_errors.EntityExistsErr(api_errors.FlashcardAlreadyExists)
	}
	createFlashcardParams := generated.CreateFlashcardParams{
		Name:   name,
		Author: author,
		Color:  color,
	}
	createdFlashcard, err := ds.repository.CreateFlashcard(ctx, createFlashcardParams)
	if err != nil {
		return models.Flashcard{}, err
	}

	for _, wordId := range wordsIds {
		params := generated.AssignFlashcardsWordsParams{FlashcardID: createdFlashcard.ID, WordID: int32(wordId)}
		_ = ds.repository.AssignFlashcardsWords(ctx, params)
	}

	words, err := ds.repository.GetWordsByFlashcardId(ctx, createdFlashcard.ID)
	wordQty := 0

	if err == nil {
		wordQty = len(words)
	}

	return models.Flashcard{
		ID:        createdFlashcard.ID,
		Name:      createdFlashcard.Name,
		Author:    createdFlashcard.Author,
		CreatedAt: createdFlashcard.CreatedAt.Time,
		UpdatedAt: createdFlashcard.UpdatedAt.Time,
		Color:     createdFlashcard.Color,
		WordQty:   wordQty,
	}, nil
}

func (ds *FlashcardServiceImpl) GetFlashcardById(ctx context.Context, id int) (models.GetFlashcardByIdResponse, error) {
	flashcard, err := ds.repository.GetFlashcardById(ctx, int32(id))
	if err != nil {
		return models.GetFlashcardByIdResponse{}, api_errors.NewApiErr(fiber.StatusNotFound, fmt.Errorf(api_errors.FlashcardNotFound))
	}
	words, err := ds.repository.GetWordsByFlashcardId(ctx, flashcard.ID)
	var wordsResult []models.Word
	if err != nil {
		wordsResult = make([]models.Word, 0)
	} else {
		wordsResult = make([]models.Word, len(words))
		for index, word := range words {
			wordsResult[index] = models.Word{
				ID:        word.ID,
				Pl:        word.Pl,
				En:        word.En,
				Author:    word.Author,
				CreatedAt: word.CreatedAt.Time,
				UpdatedAt: word.UpdatedAt.Time,
			}
		}
	}

	response := models.GetFlashcardByIdResponse{
		Words: wordsResult,
		Flashcard: models.Flashcard{
			ID:        flashcard.ID,
			Name:      flashcard.Name,
			Author:    flashcard.Author,
			Color:     flashcard.Color,
			WordQty:   len(wordsResult),
			CreatedAt: flashcard.CreatedAt.Time,
			UpdatedAt: flashcard.UpdatedAt.Time,
		},
	}
	return response, nil
}

func (ds *FlashcardServiceImpl) DeleteFlashcard(ctx context.Context, id int, author string) error {
	flashcard, err := ds.repository.GetFlashcardById(ctx, int32(id))
	if err != nil {
		return api_errors.NewApiErr(fiber.StatusNotFound, fmt.Errorf(api_errors.FlashcardNotFound))
	}
	if flashcard.Author != author {
		return api_errors.NewApiErr(fiber.StatusForbidden, fmt.Errorf(api_errors.DeleteNotAllowed))
	}
	if err = ds.repository.DeleteWordsFlashcardByFlashcardId(ctx, int32(id)); err != nil {
		return err
	}
	return ds.repository.DeleteFlashcardById(ctx, int32(id))

}

func (ds *FlashcardServiceImpl) AssignFlashcardWords(ctx context.Context, wordsIds []int, flashcardId int) error {
	ids := make([]int32, len(wordsIds))

	for index, id := range wordsIds {
		ids[index] = int32(id)
	}
	_, err := ds.repository.CheckWordExistsInFlashcard(ctx,
		generated.CheckWordExistsInFlashcardParams{WordsIds: ids, FlashcardID: int32(flashcardId)})
	if err == nil {
		return api_errors.NewApiErr(fiber.StatusConflict, fmt.Errorf(api_errors.WordAlreadyAssignedToFlashcard))
	}

	return ds.transactioner.CreateTransaction(ctx).Execute(ctx, func(tx pgx.Tx) error {
		for _, wordId := range ids {
			params := generated.AssignFlashcardsWordsParams{FlashcardID: int32(flashcardId), WordID: wordId}
			err = ds.repository.Transactional(tx).AssignFlashcardsWords(ctx, params)
			if err != nil {
				return fmt.Errorf("error in assignFlashcardsWords: %w", err)
			}
		}
		return nil
	})
}

func (ds *FlashcardServiceImpl) UpdateFlashcard(ctx context.Context, userSubject *models.UserSubject, payload models.UpdateFlashcardRequest, id int) (models.Flashcard, error) {
	existingFlashcard, err := ds.repository.GetFlashcardById(ctx, int32(id))

	if err != nil {
		return models.Flashcard{}, api_errors.NewApiErr(fiber.StatusNotFound, fmt.Errorf(api_errors.FlashcardNotFound))
	}

	if existingFlashcard.Author != userSubject.EmailAddress {
		slog.Error(fmt.Errorf("user %s is not author of the flashcard", userSubject.EmailAddress).Error())
		return models.Flashcard{}, fiber.ErrUnauthorized
	}

	updatedFlashcard, err := ds.repository.UpdateFlashcard(ctx, generated.UpdateFlashcardParams{ID: int32(id), Color: payload.FlashcardColor, Name: payload.FlashcardName})

	if err != nil {
		return models.Flashcard{}, err
	}

	if err = ds.repository.DeleteWordsFlashcardByFlashcardId(ctx, int32(id)); err != nil {
		return models.Flashcard{}, err
	}

	err = ds.AssignFlashcardWords(ctx, payload.WordsIds, id)

	if err != nil {
		return models.Flashcard{}, err
	}

	words, err := ds.repository.GetWordsByFlashcardId(ctx, updatedFlashcard.ID)
	wordQty := 0

	if err == nil {
		wordQty = len(words)
	}

	return models.Flashcard{
		ID:        updatedFlashcard.ID,
		Name:      updatedFlashcard.Name,
		Author:    updatedFlashcard.Author,
		CreatedAt: updatedFlashcard.CreatedAt.Time,
		UpdatedAt: updatedFlashcard.UpdatedAt.Time,
		Color:     updatedFlashcard.Color,
		WordQty:   wordQty,
	}, nil
}
