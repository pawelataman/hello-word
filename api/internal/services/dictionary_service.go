package services

import (
	"context"
	"github.com/pawelataman/hello-word/internal/api_errors"
	"github.com/pawelataman/hello-word/internal/data/models"
	"github.com/pawelataman/hello-word/internal/db"
	"log"
	"math"
)

var (
	DictionaryService *DictionaryServiceImpl
)

type DictionaryServiceImpl struct {
	queries *db.Queries
}

func NewDictionaryServiceImpl() *DictionaryServiceImpl {
	return &DictionaryServiceImpl{
		queries: db.New(db.Pool),
	}
}

func (ds *DictionaryServiceImpl) GetAllWords(ctx context.Context, params models.GetAllWordsParams) (models.GetAllWordsResponse, error) {

	pagination := db.GetAllWordsParams{
		PageSize:       int32(params.PageSize),
		PageOffset:     int32((params.Page - 1) * params.PageSize),
		SortColumn:     string(params.Language),
		SortDescending: !params.Ascending,
		Search:         params.Search,
	}

	rows, err := ds.queries.GetAllWords(ctx, pagination)

	if err != nil {
		log.Println("could not retrieve all words", err)
		return models.GetAllWordsResponse{}, err
	}
	dictionaryWords := make([]models.DictionaryWord, len(rows))

	totalRows := 0
	for index, row := range rows {

		if index == 0 {
			totalRows = int(row.TotalRows)
		}

		dictionaryWords[index] = models.DictionaryWord{
			ID:          row.ID,
			En:          row.En,
			Pl:          row.Pl,
			UserDefined: row.UserDefined,
			Category: models.DictionaryCategory{
				ID:           row.WordsCategory.ID,
				CategoryName: row.WordsCategory.CategoryName,
			},
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

func (ds *DictionaryServiceImpl) GetAllCategories(ctx context.Context) (models.GetDictionaryCategoriesResponse, error) {

	rows, err := ds.queries.GetAllCategories(ctx)

	if err != nil {
		return models.GetDictionaryCategoriesResponse{}, err
	}

	dictionaryCategories := make([]models.DictionaryCategory, len(rows))

	for index, row := range rows {
		dictionaryCategories[index] = models.DictionaryCategory{ID: row.ID, CategoryName: row.CategoryName}
	}

	return models.GetDictionaryCategoriesResponse{
		Categories: dictionaryCategories,
	}, nil
}

func (ds *DictionaryServiceImpl) AddCategory(ctx context.Context, categoryName string) (models.DictionaryCategory, error) {
	_, err := ds.queries.GetCategoryByName(ctx, categoryName)

	if err == nil {
		return models.DictionaryCategory{}, api_errors.EntityExistsErr("Category already exists")
	}

	newCategory, err := ds.queries.AddCategory(ctx, categoryName)

	if err != nil {
		return models.DictionaryCategory{}, err
	}

	return models.DictionaryCategory{
		ID:           newCategory.ID,
		CategoryName: newCategory.CategoryName,
	}, nil

}
