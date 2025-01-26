-- name: GetAllWords :many
SELECT words.id,
       words.pl,
       words.en,
       words.user_defined::bool as user_defined,
       sqlc.embed(words_categories),
       COUNT(*) over ()         as total_rows
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

-- name: GetWordsByCategory :many
SELECT *
FROM words
WHERE words."categoryId" = @category_id;

-- name: GetAllCategories :many
SELECT words_categories.id, words_categories."categoryName"
FROM words_categories;

-- name: AddCategory :one
INSERT INTO words_categories ("categoryName")
VALUES (@category_name)
RETURNING *;

-- name: AddCategoryWithId :exec
INSERT INTO words_categories ("id", "categoryName")
VALUES (@id, @category_name);

-- name: AddWord :exec
INSERT INTO words ("categoryId", "en", "pl")
VALUES (@category_id, @en, @pl);

-- name: GetCategoryByName :one
SELECT words_categories.id, words_categories."categoryName"
FROM words_categories
WHERE words_categories."categoryName" = @category_name;

-- name: GetCategoryById :one
SELECT words_categories.id, words_categories."categoryName"
from words_categories
where words_categories.id = @id;

