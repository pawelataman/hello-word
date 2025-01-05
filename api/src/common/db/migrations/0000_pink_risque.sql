CREATE TABLE IF NOT EXISTS "words"
(
    "id"         serial PRIMARY KEY NOT NULL,
    "categoryId" integer            NOT NULL references public.words_categories (id),
    "en"         varchar(255)       NOT NULL,
    "pl"         varchar(255)       NOT NULL
);
CREATE TABLE IF NOT EXISTS "words_categories"
(
    "id"           serial PRIMARY KEY NOT NULL,
    "categoryName" varchar(255)       NOT NULL
);