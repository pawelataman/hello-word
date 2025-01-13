-- name: GetAllWords :many
SELECT words.id, words.pl, words.en, sqlc.embed(words_categories)
FROM words
         JOIN words_categories ON words."categoryId" = words_categories.id
ORDER BY CASE
             WHEN @sort_column = 'pl' AND @sort_descending::bool = true THEN pl
             WHEN @sort_column = 'en' AND @sort_descending::bool = true THEN en
             END DESC,
         CASE
             WHEN @sort_column = 'pl' AND @sort_descending::bool = false THEN pl
             WHEN @sort_column = 'en' AND @sort_descending::bool = false THEN en
             END
LIMIT sqlc.arg(page_size) OFFSET sqlc.arg(page_offset);

-- name: GetTotalRows :one
SELECT COUNT(*) as total_rows
from words;

