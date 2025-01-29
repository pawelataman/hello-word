package models

import "time"

type Flashcard struct {
	ID        int32     `json:"id"`
	Name      string    `json:"name"`
	Author    string    `json:"author"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
}

type CreateFlashcardRequest struct {
	FlashcardName string `json:"flashcardName" validate:"required,min=1,max=64"`
}

type GetFlashcardByIdResponse struct {
	Flashcard
	Words []Word `json:"words"`
}
