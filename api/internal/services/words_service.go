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
	"github.com/valyala/fasthttp"
	"log"
	"math"
)

var (
	WordsService *WordsServiceImpl
)

type WordsServiceImpl struct {
	repository    repository.IWordsRepository
	flashcardRepo repository.IFlashcardsRepository
	transactioner db.ITransactionManager
}

type WordServiceParams struct {
	Repository    repository.IWordsRepository
	FlashcardRepo repository.IFlashcardsRepository
	Transactioner db.ITransactionManager
}

func NewWordsService(params *WordServiceParams) *WordsServiceImpl {
	return &WordsServiceImpl{
		repository:    params.Repository,
		flashcardRepo: params.FlashcardRepo,
		transactioner: params.Transactioner,
	}
}

func (ds *WordsServiceImpl) GetAllWords(ctx context.Context, params models.GetAllWordsParams) (models.GetAllWordsResponse, error) {

	pagination := generated.GetAllWordsParams{
		PageSize:       int32(params.PageSize),
		PageOffset:     int32((params.Page - 1) * params.PageSize),
		SortColumn:     params.Language,
		SortDescending: !params.Ascending,
		Search:         params.Search,
	}

	rows, err := ds.repository.GetAllWords(ctx, pagination)

	if err != nil {
		log.Println("could not retrieve all words", err)
		return models.GetAllWordsResponse{}, err
	}
	dictionaryWords := make([]models.Word, len(rows))

	totalRows := 0
	for index, row := range rows {

		if index == 0 {
			totalRows = int(row.TotalRows)
		}

		dictionaryWords[index] = models.Word{
			ID:        row.ID,
			En:        row.En,
			Pl:        row.Pl,
			Author:    row.Author,
			CreatedAt: row.CreatedAt.Time,
			UpdatedAt: row.UpdatedAt.Time,
		}
	}

	totalPages := math.Ceil(float64(totalRows) / float64(params.PageSize))

	response := models.GetAllWordsResponse{
		Records:      dictionaryWords,
		Page:         params.Page,
		PageSize:     len(dictionaryWords),
		TotalRecords: totalRows,
		TotalPages:   int(totalPages),
	}

	return response, nil

}

func (ds *WordsServiceImpl) AddWords(ctx context.Context, words []models.CreateWord, author string) ([]models.Word, error) {

	createdWords := make([]models.Word, len(words))

	if err := ds.transactioner.CreateTransaction(ctx).Execute(ctx, func(tx pgx.Tx) error {
		for index, word := range words {
			addWordParams := generated.AddWordParams{
				Pl:     word.Pl,
				En:     word.En,
				Author: author,
			}
			createdWord, err := ds.repository.AddWord(ctx, addWordParams)
			if err != nil {
				return err
			}
			createdWords[index] = models.Word{
				ID:        createdWord.ID,
				En:        createdWord.En,
				Pl:        createdWord.Pl,
				Author:    createdWord.Author,
				CreatedAt: createdWord.CreatedAt.Time,
				UpdatedAt: createdWord.UpdatedAt.Time,
			}
		}
		return nil
	}); err != nil {
		return nil, err
	}
	return createdWords, nil
}

func (ds *WordsServiceImpl) DeleteWord(ctx *fasthttp.RequestCtx, id int, user string) error {
	word, err := ds.repository.GetWordById(ctx, int32(id))
	if err != nil {
		return api_errors.NewApiErr(fiber.StatusNotFound, fmt.Errorf(api_errors.WordNotFound))
	}
	if word.Author != user {
		return api_errors.NewApiErr(fiber.StatusForbidden, fmt.Errorf(api_errors.DeleteNotAllowed))
	}

	if err = ds.flashcardRepo.DeleteWordsFlashcardByWordId(ctx, int32(id)); err != nil {
		return err
	}
	return ds.repository.DeleteWord(ctx, int32(id))
}
