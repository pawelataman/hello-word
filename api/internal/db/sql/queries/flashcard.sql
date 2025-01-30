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
WHERE word_id = @word_id
  AND flashcard_id = @flashcard_id;