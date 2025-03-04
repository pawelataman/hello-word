-- name: GetQuizQuestions :many
SELECT words.id, words.en, words.pl
FROM words
ORDER BY RANDOM()
LIMIT $1;

-- name: GetQuizFalseAnswers :many
SELECT words.id, words.en, words.pl
FROM words
WHERE words.id != @answer_id
ORDER BY RANDOM()
LIMIT @false_answers_qty;
