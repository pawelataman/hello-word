-- name: GetQuizQuestions :many
SELECT *
FROM words
ORDER BY RANDOM()
LIMIT $1;

-- name: PutWordCategory :exec
INSERT INTO words_categories ("id", "categoryName")
VALUES ($1, $2);

-- name: PutWord :exec
INSERT INTO words ("categoryId", "en", "pl")
VALUES ($1, $2, $3);