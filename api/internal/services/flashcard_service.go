package services

import (
	"context"
	"fmt"
	"github.com/gofiber/fiber/v2"
	"github.com/pawelataman/hello-word/internal/api_errors"
	"github.com/pawelataman/hello-word/internal/data/models"
	"github.com/pawelataman/hello-word/internal/db"
	"log/slog"
)

var (
	FlashcardService *FlashcardServiceImpl
)

func NewFlashcardService() *FlashcardServiceImpl {
	return &FlashcardServiceImpl{
		queries: db.New(db.Pool),
	}
}

type FlashcardServiceImpl struct {
	queries *db.Queries
}

func (ds *FlashcardServiceImpl) GetFlashcards(ctx context.Context) ([]models.Flashcard, error) {
	rows, err := ds.queries.GetFlashcards(ctx)
	if err != nil {
		return nil, err
	}
	flashcards := make([]models.Flashcard, len(rows))
	for index, row := range rows {
		flashcards[index] = models.Flashcard{ID: row.ID, Name: row.Name, Author: row.Author, CreatedAt: row.CreatedAt.Time, UpdatedAt: row.UpdatedAt.Time}
	}
	return flashcards, nil
}

func (ds *FlashcardServiceImpl) AddFlashcard(ctx context.Context, name string, author string) (models.Flashcard, error) {
	_, err := ds.queries.GetFlashcardByName(ctx, name)
	if err == nil {
		return models.Flashcard{}, api_errors.EntityExistsErr(api_errors.CategoryAlreadyExists)
	}
	createFlashcardParams := db.CreateFlashcardParams{
		Name:   name,
		Author: author,
	}
	createdFlashcard, err := ds.queries.CreateFlashcard(ctx, createFlashcardParams)
	if err != nil {
		return models.Flashcard{}, err
	}
	return models.Flashcard{
		ID:        createdFlashcard.ID,
		Name:      createdFlashcard.Name,
		Author:    createdFlashcard.Author,
		CreatedAt: createdFlashcard.CreatedAt.Time,
		UpdatedAt: createdFlashcard.UpdatedAt.Time,
	}, nil
}

func (ds *FlashcardServiceImpl) GetFlashcardById(ctx context.Context, id int) (models.GetFlashcardByIdResponse, error) {
	flashcard, err := ds.queries.GetFlashcardById(ctx, int32(id))
	if err != nil {
		return models.GetFlashcardByIdResponse{}, api_errors.NewApiErr(fiber.StatusNotFound, fmt.Errorf(api_errors.CategoryNotFound))
	}
	words, err := ds.queries.GetWordsByFlashcardId(ctx, flashcard.ID)
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
			CreatedAt: flashcard.CreatedAt.Time,
			UpdatedAt: flashcard.UpdatedAt.Time,
		},
	}
	return response, nil
}

func (ds *FlashcardServiceImpl) DeleteFlashcard(ctx context.Context, id int, author string) error {
	flashcard, err := ds.queries.GetFlashcardById(ctx, int32(id))
	if err != nil {
		return api_errors.NewApiErr(fiber.StatusNotFound, fmt.Errorf(api_errors.CategoryNotFound))
	}
	if len(flashcard.Author) == 0 || flashcard.Author != author {
		return api_errors.NewApiErr(fiber.StatusForbidden, fmt.Errorf(api_errors.DeleteNotAllowed))
	}
	err = ds.queries.DeleteFlashcardById(ctx, int32(id))
	if err != nil {
		return err
	}
	return nil
}

func (ds *FlashcardServiceImpl) AssignFlashcardWords(ctx context.Context, wordsIds []int, flashcardId int) error {

	tx, err := db.Pool.Begin(ctx)
	if err != nil {
		slog.Error(err.Error())
		return err
	}

	defer func() {
		_ = tx.Rollback(ctx)
	}()
	for _, wordId := range wordsIds {

		_, err := ds.queries.WithTx(tx).CheckWordExistsInFlashcard(ctx,
			db.CheckWordExistsInFlashcardParams{WordID: int32(wordId), FlashcardID: int32(flashcardId)})

		if err == nil {
			return api_errors.NewApiErr(fiber.StatusConflict, fmt.Errorf(api_errors.WordAlreadyAssignedToFlashcard))
		}

		params := db.AssignFlashcardsWordsParams{FlashcardID: int32(flashcardId), WordID: int32(wordId)}
		err = ds.queries.WithTx(tx).AssignFlashcardsWords(ctx, params)
		if err != nil {
			slog.Error(err.Error())
			return err
		}
	}
	return tx.Commit(ctx)
}
