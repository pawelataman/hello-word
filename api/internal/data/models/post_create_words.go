package models

type CreateWord struct {
	Pl string `json:"pl" validate:"required,min=1,max=255"`
	En string `json:"en" validate:"required,min=1,max=255"`
}

type CreateWordsRequestBody struct {
	CategoryId int          `json:"categoryId" validate:"required,number"`
	Words      []CreateWord `json:"words" validate:"required"`
}
