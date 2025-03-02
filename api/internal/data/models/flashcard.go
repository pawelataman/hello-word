package models

import "time"

type Flashcard struct {
	ID        int32     `json:"id"`
	Name      string    `json:"name"`
	Author    string    `json:"author"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
	Color     string    `json:"color"`
	WordQty   int       `json:"wordQty"`
}

type CreateFlashcardRequest struct {
	FlashcardName  string `json:"flashcardName" validate:"required,min=1,max=64" mod:"trim"`
	FlashcardColor string `json:"flashcardColor" validate:"required,min=7,max=9"`
	WordsIds       []int  `json:"wordsIds"`
}

type GetFlashcardByIdResponse struct {
	Flashcard
	Words []Word `json:"words"`
}

type AssignFlashcardWordsRequest struct {
	WordsIds []int `json:"wordsIds"`
}
