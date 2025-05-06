package models

import "time"

type Word struct {
	ID        int32     `json:"id"`
	Pl        string    `json:"pl"`
	En        string    `json:"en"`
	Author    string    `json:"author"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
}

type CreateWord struct {
	Pl string `json:"pl" validate:"required,min=1,max=255" mod:"trim"`
	En string `json:"en" validate:"required,min=1,max=255" mod:"trim"`
}

type CreateWordsRequest struct {
	Words []CreateWord `json:"words" validate:"required,dive" mod:"dive"`
}

type GetAllWordsParams struct {
	Page      int    `json:"page" validate:"min=1,number"`
	PageSize  int    `json:"pageSize" validate:"min=1,number"`
	Ascending bool   `json:"ascending" validate:"boolean"`
	Language  string `json:"language" validate:"required"`
	Search    string `json:"search"`
	UsersOnly bool   `json:"usersOnly" validate:"boolean"`
}

type GetAllWordsResponse struct {
	Page         int    `json:"page"`
	PageSize     int    `json:"pageSize"`
	TotalPages   int    `json:"totalPages"`
	TotalRecords int    `json:"totalRecords"`
	Records      []Word `json:"records"`
}
