-- name: GetQuizQuestions :many
SELECT words.id, words.en, words.pl
FROM words
ORDER BY RANDOM()
LIMIT $1;

