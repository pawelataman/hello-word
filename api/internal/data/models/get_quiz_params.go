package models

type GetQuizQueryParams struct {
	NumOfQuestions int `json:"numOfQuestions" validate:"number,gte=5,lte=20"`
}
