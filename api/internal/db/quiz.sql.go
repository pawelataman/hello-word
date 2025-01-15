// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.27.0
// source: quiz.sql

package db

import (
	"context"
)

const getQuizQuestions = `-- name: GetQuizQuestions :many
SELECT id, "categoryId", en, pl, user_defined
FROM words
ORDER BY RANDOM()
LIMIT $1
`

func (q *Queries) GetQuizQuestions(ctx context.Context, limit int32) ([]Word, error) {
	rows, err := q.db.Query(ctx, getQuizQuestions, limit)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []Word
	for rows.Next() {
		var i Word
		if err := rows.Scan(
			&i.ID,
			&i.CategoryId,
			&i.En,
			&i.Pl,
			&i.UserDefined,
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

const putWord = `-- name: PutWord :exec
INSERT INTO words ("categoryId", "en", "pl")
VALUES ($1, $2, $3)
`

type PutWordParams struct {
	CategoryId int32
	En         string
	Pl         string
}

func (q *Queries) PutWord(ctx context.Context, arg PutWordParams) error {
	_, err := q.db.Exec(ctx, putWord, arg.CategoryId, arg.En, arg.Pl)
	return err
}

const putWordCategory = `-- name: PutWordCategory :exec
INSERT INTO words_categories ("id", "categoryName")
VALUES ($1, $2)
`

type PutWordCategoryParams struct {
	ID           int32
	CategoryName string
}

func (q *Queries) PutWordCategory(ctx context.Context, arg PutWordCategoryParams) error {
	_, err := q.db.Exec(ctx, putWordCategory, arg.ID, arg.CategoryName)
	return err
}
