package services

import (
	"context"
	"github.com/pawelataman/hello-word/internal/data/models"
	"github.com/pawelataman/hello-word/internal/db"
	"log"
	"math"
)

var (
	WordsService *WordsServiceImpl
)

type WordsServiceImpl struct {
	queries *db.Queries
}

func NewWordsService() *WordsServiceImpl {
	return &WordsServiceImpl{
		queries: db.New(db.Pool),
	}
}

func (ds *WordsServiceImpl) GetAllWords(ctx context.Context, params models.GetAllWordsParams) (models.GetAllWordsResponse, error) {

	pagination := db.GetAllWordsParams{
		PageSize:       int32(params.PageSize),
		PageOffset:     int32((params.Page - 1) * params.PageSize),
		SortColumn:     params.Language,
		SortDescending: !params.Ascending,
		Search:         params.Search,
	}

	rows, err := ds.queries.GetAllWords(ctx, pagination)

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

func (ds *WordsServiceImpl) AddWords(ctx context.Context, words []models.CreateWord, author string) error {

	for _, word := range words {
		addWordParams := db.AddWordParams{
			Pl:     word.Pl,
			En:     word.En,
			Author: author,
		}
		err := ds.queries.AddWord(ctx, addWordParams)

		if err != nil {
			return err
		}
	}

	return nil
}
