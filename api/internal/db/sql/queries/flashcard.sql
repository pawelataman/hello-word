-- name: GetFlashcards :many
SELECT *
FROM flashcards;

-- name: GetFlashcardById :one
SELECT *
FROM flashcards
WHERE flashcards.id = @id::integer;

-- name: GetFlashcardsByAuthor :many
SELECT *
FROM flashcards
where flashcards.author = @author;

-- name: GetFlashcardByName :one
SELECT *
FROM flashcards
WHERE flashcards.name = @name;

-- name: CreateFlashcard :one
INSERT INTO flashcards("name", "author")
VALUES (@name, @author)
RETURNING *;

-- name: UpdateFlashcardName :one
UPDATE flashcards
SET "name" = @name
WHERE flashcards.id = @id
RETURNING *;

-- name: DeleteFlashcardById :exec
DELETE
FROM flashcards
WHERE flashcards.id = @id::integer;

-- name: AssignFlashcardsWords :exec
INSERT INTO words_flashcards (word_id, flashcard_id)
VALUES ($1, $2);

-- name: CheckWordExistsInFlashcard :one
SELECT *
FROM words_flashcards
WHERE word_id = ANY (@words_ids::int[])
  AND flashcard_id = @flashcard_id;

-- name: DeleteWordsFlashcardByFlashcardId :exec
DELETE
FROM words_flashcards
WHERE words_flashcards.flashcard_id = @flashcard_id;

-- name: DeleteWordsFlashcardByWordId :exec
DELETE
FROM words_flashcards
WHERE words_flashcards.word_id = @word_id;

-- name: GetWordsByFlashcardId :many
SELECT words.id, words.pl, words.en, words.author, words.created_at, words.updated_at
FROM words
         INNER JOIN words_flashcards ON words.id = words_flashcards.word_id
WHERE words_flashcards.flashcard_id = @flashcard_id::integer;