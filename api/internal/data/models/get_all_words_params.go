package models

import (
	"github.com/pawelataman/hello-word/internal/data/consts"
)

type GetAllWordsParams struct {
	Page      int         `json:"page" validate:"required,min=1,number"`
	PageSize  int         `json:"pageSize" validate:"required,min=1,number"`
	Ascending bool        `json:"ascending" validate:"boolean"`
	Language  consts.Lang `json:"language" validate:"required"`
}
