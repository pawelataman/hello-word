-- +goose Up
-- +goose StatementBegin
ALTER TABLE words
    ADD COLUMN IF NOT EXISTS user_id text;

ALTER TABLE words_categories
    ADD COLUMN IF NOT EXISTS user_id text;

-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
ALTER TABLE words
    DROP COLUMN IF EXISTS user_id;

ALTER TABLE words
    DROP COLUMN IF EXISTS user_id;
-- +goose StatementEnd
