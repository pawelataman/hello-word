-- +goose Up
-- +goose StatementBegin
ALTER TABLE flashcards
    ADD COLUMN color VARCHAR(255);

UPDATE flashcards
SET color = '#242424'
WHERE color IS NULL;

ALTER TABLE flashcards
    ALTER COLUMN color SET NOT NULL;

-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
ALTER TABLE flashcards
    DROP COLUMN color;
-- +goose StatementEnd
