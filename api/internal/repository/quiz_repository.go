package repository

import (
	"context"
	"github.com/jackc/pgx/v5"
	"github.com/pawelataman/hello-word/internal/db/generated"
)

type IQuizRepository interface {
	GetQuizQuestions(ctx context.Context, limit int32) ([]generated.GetQuizQuestionsRow, error)

	Transactional(tx pgx.Tx) IQuizRepository
}

type quizRepository struct {
	*generated.Queries
}

func NewQuizRepository(queries *generated.Queries) IQuizRepository {
	return &quizRepository{Queries: queries}
}

func (qr *quizRepository) Transactional(tx pgx.Tx) IQuizRepository {
	transactional := qr.WithTx(tx)

	return &quizRepository{Queries: transactional}
}
