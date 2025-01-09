package services

import (
	"context"
	"github.com/pawelataman/hello-word/internal/data/models"
	"github.com/pawelataman/hello-word/internal/db"
	"log"
)

var (
	DictionaryService *DictionaryServiceImpl
)

type DictionaryServiceImpl struct {
	queries *db.Queries
}

func NewDictionaryServiceImpl() *DictionaryServiceImpl {
	return &DictionaryServiceImpl{
		queries: db.New(db.Connection),
	}
}

func (ds *DictionaryServiceImpl) GetAllWords(ctx context.Context, params models.GetAllWordsParams) ([]models.DictionaryWord, error) {

	pagination := db.GetAllWordsParams{
		PageSize:       int32(params.PageSize),
		PageOffset:     int32((params.Page - 1) * params.PageSize),
		SortColumn:     string(params.Language),
		SortDescending: !params.Ascending,
	}

	rows, err := ds.queries.GetAllWords(ctx, pagination)

	if err != nil {
		log.Println("could not retrieve all words", err)
		return nil, err
	}

	dictionaryWords := make([]models.DictionaryWord, len(rows))

	for index, row := range rows {
		dictionaryWords[index] = models.DictionaryWord{
			ID: row.ID,
			En: row.En,
			Pl: row.Pl,
			Category: models.DictionaryCategory{
				ID:           row.WordsCategory.ID,
				CategoryName: row.WordsCategory.CategoryName,
			},
		}
	}
	return dictionaryWords, nil

}
