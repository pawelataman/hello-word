-- name: GetAllWords :many
SELECT words.id, words.pl, words.en, sqlc.embed(words_categories), COUNT(*) over () as total_rows
FROM words
         JOIN words_categories ON words."categoryId" = words_categories.id
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

