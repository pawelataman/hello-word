package repository

import (
	"context"
	"github.com/jackc/pgx/v5"
	"github.com/pawelataman/hello-word/internal/db/generated"
)

type IFlashcardsRepository interface {
	DeleteWordsFlashcardByWordId(ctx context.Context, wordID int32) error
	DeleteWordsFlashcardByFlashcardId(ctx context.Context, flashcardID int32) error
	GetFlashcards(ctx context.Context) ([]generated.Flashcard, error)
	GetFlashcardByName(ctx context.Context, name string) (generated.Flashcard, error)
	CreateFlashcard(ctx context.Context, arg generated.CreateFlashcardParams) (generated.Flashcard, error)
	GetFlashcardById(ctx context.Context, id int32) (generated.Flashcard, error)
	DeleteFlashcardById(ctx context.Context, id int32) error
	CheckWordExistsInFlashcard(ctx context.Context, arg generated.CheckWordExistsInFlashcardParams) (generated.WordsFlashcard, error)
	AssignFlashcardsWords(ctx context.Context, arg generated.AssignFlashcardsWordsParams) error
	GetWordsByFlashcardId(ctx context.Context, flashcardID int32) ([]generated.GetWordsByFlashcardIdRow, error)

	Transactional(tx pgx.Tx) IFlashcardsRepository
}
type flashcardsRepository struct {
	*generated.Queries
}

func NewFlashcardsRepository(queries *generated.Queries) IFlashcardsRepository {
	return &flashcardsRepository{
		Queries: queries,
	}
}

func (fr *flashcardsRepository) Transactional(tx pgx.Tx) IFlashcardsRepository {
	transactional := fr.WithTx(tx)

	return &flashcardsRepository{
		Queries: transactional,
	}
}
