package models

import (
	"github.com/pawelataman/hello-word/internal/data/consts"
)

type GetAllWordsParams struct {
	Page      int         `json:"page" validate:"min=1,number"`
	PageSize  int         `json:"pageSize" validate:"min=1,number"`
	Ascending bool        `json:"ascending" validate:"boolean"`
	Language  consts.Lang `json:"language" validate:"required"`
}

type GetAllWordsResponse struct {
	Page         int              `json:"page"`
	PageSize     int              `json:"pageSize"`
	TotalPages   int              `json:"totalPages"`
	TotalRecords int              `json:"totalRecords"`
	Records      []DictionaryWord `json:"records"`
}
