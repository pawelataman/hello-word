// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.28.0
// source: flashcard.sql

package generated

import (
	"context"

	"github.com/jackc/pgx/v5/pgtype"
)

const assignFlashcardsWords = `-- name: AssignFlashcardsWords :exec
INSERT INTO words_flashcards (word_id, flashcard_id)
VALUES ($1, $2)
`

type AssignFlashcardsWordsParams struct {
	WordID      int32
	FlashcardID int32
}

func (q *Queries) AssignFlashcardsWords(ctx context.Context, arg AssignFlashcardsWordsParams) error {
	_, err := q.db.Exec(ctx, assignFlashcardsWords, arg.WordID, arg.FlashcardID)
	return err
}

const checkWordExistsInFlashcard = `-- name: CheckWordExistsInFlashcard :one
SELECT word_id, flashcard_id, created_at
FROM words_flashcards
WHERE word_id = ANY ($1::int[])
  AND flashcard_id = $2
`

type CheckWordExistsInFlashcardParams struct {
	WordsIds    []int32
	FlashcardID int32
}

func (q *Queries) CheckWordExistsInFlashcard(ctx context.Context, arg CheckWordExistsInFlashcardParams) (WordsFlashcard, error) {
	row := q.db.QueryRow(ctx, checkWordExistsInFlashcard, arg.WordsIds, arg.FlashcardID)
	var i WordsFlashcard
	err := row.Scan(&i.WordID, &i.FlashcardID, &i.CreatedAt)
	return i, err
}

const createFlashcard = `-- name: CreateFlashcard :one
INSERT INTO flashcards("name", "author","color")
VALUES ($1, $2, $3)
RETURNING id, name, author, created_at, updated_at, color
`

type CreateFlashcardParams struct {
	Name   string
	Author string
	Color  string
}

func (q *Queries) CreateFlashcard(ctx context.Context, arg CreateFlashcardParams) (Flashcard, error) {
	row := q.db.QueryRow(ctx, createFlashcard, arg.Name, arg.Author, arg.Color)
	var i Flashcard
	err := row.Scan(
		&i.ID,
		&i.Name,
		&i.Author,
		&i.CreatedAt,
		&i.UpdatedAt,
		&i.Color,
	)
	return i, err
}

const deleteFlashcardById = `-- name: DeleteFlashcardById :exec
DELETE
FROM flashcards
WHERE flashcards.id = $1::integer
`

func (q *Queries) DeleteFlashcardById(ctx context.Context, id int32) error {
	_, err := q.db.Exec(ctx, deleteFlashcardById, id)
	return err
}

const deleteWordsFlashcardByFlashcardId = `-- name: DeleteWordsFlashcardByFlashcardId :exec
DELETE
FROM words_flashcards
WHERE words_flashcards.flashcard_id = $1
`

func (q *Queries) DeleteWordsFlashcardByFlashcardId(ctx context.Context, flashcardID int32) error {
	_, err := q.db.Exec(ctx, deleteWordsFlashcardByFlashcardId, flashcardID)
	return err
}

const deleteWordsFlashcardByWordId = `-- name: DeleteWordsFlashcardByWordId :exec
DELETE
FROM words_flashcards
WHERE words_flashcards.word_id = $1
`

func (q *Queries) DeleteWordsFlashcardByWordId(ctx context.Context, wordID int32) error {
	_, err := q.db.Exec(ctx, deleteWordsFlashcardByWordId, wordID)
	return err
}

const getFlashcardById = `-- name: GetFlashcardById :one
SELECT id, name, author, created_at, updated_at, color
FROM flashcards
WHERE flashcards.id = $1::integer
`

func (q *Queries) GetFlashcardById(ctx context.Context, id int32) (Flashcard, error) {
	row := q.db.QueryRow(ctx, getFlashcardById, id)
	var i Flashcard
	err := row.Scan(
		&i.ID,
		&i.Name,
		&i.Author,
		&i.CreatedAt,
		&i.UpdatedAt,
		&i.Color,
	)
	return i, err
}

const getFlashcardByName = `-- name: GetFlashcardByName :one
SELECT id, name, author, created_at, updated_at, color
FROM flashcards
WHERE flashcards.name = $1
`

func (q *Queries) GetFlashcardByName(ctx context.Context, name string) (Flashcard, error) {
	row := q.db.QueryRow(ctx, getFlashcardByName, name)
	var i Flashcard
	err := row.Scan(
		&i.ID,
		&i.Name,
		&i.Author,
		&i.CreatedAt,
		&i.UpdatedAt,
		&i.Color,
	)
	return i, err
}

const getFlashcards = `-- name: GetFlashcards :many
SELECT id, name, author, created_at, updated_at, color
FROM flashcards ORDER BY flashcards."updated_at" DESC
`

func (q *Queries) GetFlashcards(ctx context.Context) ([]Flashcard, error) {
	rows, err := q.db.Query(ctx, getFlashcards)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []Flashcard
	for rows.Next() {
		var i Flashcard
		if err := rows.Scan(
			&i.ID,
			&i.Name,
			&i.Author,
			&i.CreatedAt,
			&i.UpdatedAt,
			&i.Color,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const getFlashcardsByAuthor = `-- name: GetFlashcardsByAuthor :many
SELECT id, name, author, created_at, updated_at, color
FROM flashcards
where flashcards.author = $1
`

func (q *Queries) GetFlashcardsByAuthor(ctx context.Context, author string) ([]Flashcard, error) {
	rows, err := q.db.Query(ctx, getFlashcardsByAuthor, author)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []Flashcard
	for rows.Next() {
		var i Flashcard
		if err := rows.Scan(
			&i.ID,
			&i.Name,
			&i.Author,
			&i.CreatedAt,
			&i.UpdatedAt,
			&i.Color,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const getWordsByFlashcardId = `-- name: GetWordsByFlashcardId :many
SELECT words.id, words.pl, words.en, words.author, words.created_at, words.updated_at
FROM words
         INNER JOIN words_flashcards ON words.id = words_flashcards.word_id
WHERE words_flashcards.flashcard_id = $1::integer
`

type GetWordsByFlashcardIdRow struct {
	ID        int32
	Pl        string
	En        string
	Author    string
	CreatedAt pgtype.Timestamp
	UpdatedAt pgtype.Timestamp
}

func (q *Queries) GetWordsByFlashcardId(ctx context.Context, flashcardID int32) ([]GetWordsByFlashcardIdRow, error) {
	rows, err := q.db.Query(ctx, getWordsByFlashcardId, flashcardID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []GetWordsByFlashcardIdRow
	for rows.Next() {
		var i GetWordsByFlashcardIdRow
		if err := rows.Scan(
			&i.ID,
			&i.Pl,
			&i.En,
			&i.Author,
			&i.CreatedAt,
			&i.UpdatedAt,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const updateFlashcard = `-- name: UpdateFlashcard :one
UPDATE flashcards
SET "name" = $1, "color" = $2, updated_at = CURRENT_TIMESTAMP
WHERE flashcards.id = $3
RETURNING id, name, author, created_at, updated_at, color
`

type UpdateFlashcardParams struct {
	Name  string
	Color string
	ID    int32
}

func (q *Queries) UpdateFlashcard(ctx context.Context, arg UpdateFlashcardParams) (Flashcard, error) {
	row := q.db.QueryRow(ctx, updateFlashcard, arg.Name, arg.Color, arg.ID)
	var i Flashcard
	err := row.Scan(
		&i.ID,
		&i.Name,
		&i.Author,
		&i.CreatedAt,
		&i.UpdatedAt,
		&i.Color,
	)
	return i, err
}
