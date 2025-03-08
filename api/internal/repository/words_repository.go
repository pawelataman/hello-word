package repository

import (
	"context"
	"github.com/jackc/pgx/v5"
	"github.com/pawelataman/hello-word/internal/db/generated"
)

type IWordsRepository interface {
	GetAllWords(ctx context.Context, arg generated.GetAllWordsParams) ([]generated.GetAllWordsRow, error)
	AddWord(ctx context.Context, arg generated.AddWordParams) (generated.Word, error)
	GetWordById(ctx context.Context, wordID int32) (generated.GetWordByIdRow, error)
	DeleteWord(ctx context.Context, wordID int32) error

	Transactional(tx pgx.Tx) IWordsRepository
}

type wordsRepository struct {
	*generated.Queries
}

func NewWordsRepository(queries *generated.Queries) IWordsRepository {
	return &wordsRepository{
		Queries: queries,
	}
}

func (wr *wordsRepository) Transactional(tx pgx.Tx) IWordsRepository {
	transactional := wr.WithTx(tx)
	return &wordsRepository{Queries: transactional}
}
