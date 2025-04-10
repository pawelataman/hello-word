// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.28.0
// source: quiz.sql

package generated

import (
	"context"
)

const getQuizFalseAnswers = `-- name: GetQuizFalseAnswers :many
SELECT words.id, words.en, words.pl
FROM words
WHERE words.id != $1
ORDER BY RANDOM()
LIMIT $2
`

type GetQuizFalseAnswersParams struct {
	AnswerID        int32
	FalseAnswersQty int32
}

type GetQuizFalseAnswersRow struct {
	ID int32
	En string
	Pl string
}

func (q *Queries) GetQuizFalseAnswers(ctx context.Context, arg GetQuizFalseAnswersParams) ([]GetQuizFalseAnswersRow, error) {
	rows, err := q.db.Query(ctx, getQuizFalseAnswers, arg.AnswerID, arg.FalseAnswersQty)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []GetQuizFalseAnswersRow
	for rows.Next() {
		var i GetQuizFalseAnswersRow
		if err := rows.Scan(&i.ID, &i.En, &i.Pl); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const getQuizQuestions = `-- name: GetQuizQuestions :many
SELECT words.id, words.en, words.pl
FROM words
ORDER BY RANDOM()
LIMIT $1
`

type GetQuizQuestionsRow struct {
	ID int32
	En string
	Pl string
}

func (q *Queries) GetQuizQuestions(ctx context.Context, limit int32) ([]GetQuizQuestionsRow, error) {
	rows, err := q.db.Query(ctx, getQuizQuestions, limit)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []GetQuizQuestionsRow
	for rows.Next() {
		var i GetQuizQuestionsRow
		if err := rows.Scan(&i.ID, &i.En, &i.Pl); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}
