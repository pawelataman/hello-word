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

-- name: AddWord :one
INSERT INTO words("en", "pl", "author")
VALUES (@en, @pl, @author::text)
RETURNING *;

-- name: GetWordById :one
SELECT words.id, words.pl, words.en, words.author, words.created_at, words.updated_at
FROM words
where words.id = @word_id;

-- name: DeleteWord :exec
DELETE
FROM words
WHERE words.id = @word_id;


