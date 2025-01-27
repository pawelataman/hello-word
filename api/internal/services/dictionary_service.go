package services

import (
	"context"
	"fmt"
	"github.com/gofiber/fiber/v2"
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
			ID:         row.ID,
			En:         row.En,
			Pl:         row.Pl,
			CategoryId: row.CategoryId,
			UserId:     row.UserID.String,
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
		dictionaryCategories[index] = models.DictionaryCategory{ID: row.ID, CategoryName: row.CategoryName, UserID: row.UserID.String}
	}

	return models.GetDictionaryCategoriesResponse{
		Categories: dictionaryCategories,
	}, nil
}

func (ds *DictionaryServiceImpl) AddCategory(ctx context.Context, categoryName string, userId string) (models.DictionaryCategory, error) {
	_, err := ds.queries.GetCategoryByName(ctx, categoryName)

	if err == nil {
		return models.DictionaryCategory{}, api_errors.EntityExistsErr("category already exists")
	}

	addCategoryParams := db.AddCategoryParams{
		CategoryName: categoryName,
		UserID:       userId,
	}
	newCategory, err := ds.queries.AddCategory(ctx, addCategoryParams)

	if err != nil {
		return models.DictionaryCategory{}, err
	}

	return models.DictionaryCategory{
		ID:           newCategory.ID,
		CategoryName: newCategory.CategoryName,
		UserID:       newCategory.UserID.String,
	}, nil
}

func (ds *DictionaryServiceImpl) AddWords(ctx context.Context, words []models.CreateWord, categoryId int, userId string) error {
	_, err := ds.queries.GetCategoryById(ctx, int32(categoryId))

	if err != nil {
		return api_errors.NewApiErr(fiber.StatusNotFound, fmt.Errorf("category not found"))
	}

	for _, word := range words {
		addWordParams := db.AddWordParams{
			Pl:         word.Pl,
			En:         word.En,
			CategoryID: int32(categoryId),
			UserID:     userId,
		}
		err = ds.queries.AddWord(ctx, addWordParams)

		if err != nil {
			return err
		}
	}

	return nil
}

func (ds *DictionaryServiceImpl) GetCategoryById(ctx context.Context, id int) (models.GetCategoryByIdResponse, error) {
	category, err := ds.queries.GetCategoryById(ctx, int32(id))

	if err != nil {
		return models.GetCategoryByIdResponse{}, api_errors.NewApiErr(fiber.StatusNotFound, fmt.Errorf("category not found"))
	}

	words, err := ds.queries.GetWordsByCategory(ctx, category.ID)

	var wordsResult []models.DictionaryWord

	if err != nil {
		wordsResult = make([]models.DictionaryWord, 0)
	} else {
		wordsResult = make([]models.DictionaryWord, len(words))
		for index, word := range words {
			wordsResult[index] = models.DictionaryWord{
				ID:         word.ID,
				Pl:         word.Pl,
				En:         word.En,
				CategoryId: word.CategoryId,
				UserId:     word.UserID.String,
			}
		}
	}

	response := models.GetCategoryByIdResponse{
		Words: wordsResult,
		DictionaryCategory: models.DictionaryCategory{
			ID:           category.ID,
			CategoryName: category.CategoryName,
		},
	}

	return response, nil

}

func (ds *DictionaryServiceImpl) DeleteCategory(ctx context.Context, id int, userId string) error {
	category, err := ds.queries.GetCategoryById(ctx, int32(id))

	if err != nil {
		return api_errors.NewApiErr(fiber.StatusNotFound, fmt.Errorf("category not found"))
	}

	if len(category.UserID.String) == 0 || category.UserID.String != userId {
		return api_errors.NewApiErr(fiber.StatusForbidden, fmt.Errorf("you are not allowed to delete this category"))
	}

	err = ds.queries.DeleteCategory(ctx, int32(id))

	if err != nil {
		return err
	}

	return nil
}
