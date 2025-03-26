-- +goose Up
-- +goose StatementBegin
CREATE DATABASE "hello-word-api-db";

CREATE TABLE IF NOT EXISTS "flashcards"
(
    "id"         serial PRIMARY KEY NOT NULL,
    "name"       varchar(255)       NOT NULL,
    "author"     varchar(255)       NOT NULL DEFAULT 'default',
    "created_at" timestamp          NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp          NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "words"
(
    "id"         serial PRIMARY KEY NOT NULL,
    "en"         varchar(255)       NOT NULL,
    "pl"         varchar(255)       NOT NULL,
    "author"     varchar(255)       NOT NULL DEFAULT 'default',
    "created_at" timestamp          NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp          NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "words_flashcards"
(
    "word_id"      integer     NOT NULL references words (id),
    "flashcard_id" integer     NOT NULL references flashcards (id),
    "created_at"   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY ("word_id", "flashcard_id")
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE IF EXISTS "words";
DROP TABLE IF EXISTS "flashcards";
DROP TABLE IF EXISTS "words_flashcards";
DROP DATABASE IF EXISTS "hello-word-api-db";
-- +goose StatementEnd
