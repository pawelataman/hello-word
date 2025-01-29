-- name: GetAllWords :many
SELECT words.id,
       words.pl,
       words.en,
       words.author,
       words.created_at,
       words.updated_at,
       COUNT(*) over () as total_rows
FROM words
WHERE words.en LIKE '%' || @search::text || '%'
   OR words.pl LIKE '%' || @search::text || '%'
ORDER BY CASE
             WHEN @sort_column = 'pl' AND @sort_descending::bool = true THEN pl
             WHEN @sort_column = 'en' AND @sort_descending::bool = true THEN en
             END DESC,
         CASE
             WHEN @sort_column = 'pl' AND @sort_descending::bool = false THEN pl
             WHEN @sort_column = 'en' AND @sort_descending::bool = false THEN en
             END
LIMIT sqlc.arg(page_size) OFFSET sqlc.arg(page_offset);

-- name: AddWord :exec
INSERT INTO words("en", "pl", "author")
VALUES (@en, @pl, @author::text);

-- name: GetWordsByFlashcardId :many
SELECT words.id, words.pl, words.en, words.author, words.created_at, words.updated_at
FROM words
         INNER JOIN words_flashcards ON words.id = words_flashcards.word_id
WHERE words_flashcards.flashcard_id = @flashcard_id::integer;