-- name: GetQuizQuestions :many
SELECT *
FROM words
ORDER BY RANDOM()
LIMIT $1;

