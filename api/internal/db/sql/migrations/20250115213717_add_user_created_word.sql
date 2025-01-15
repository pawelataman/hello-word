-- +goose Up
-- +goose StatementBegin
ALTER TABLE words
    ADD COLUMN IF NOT EXISTS user_defined boolean default false;
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
ALTER TABLE words
    DROP COLUMN IF EXISTS user_defined;
-- +goose StatementEnd
