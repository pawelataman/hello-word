package models

import "time"

type CreateCategoryRequestBody struct {
	CategoryName string `json:"categoryName" validate:"required,min=1,max=64"`
	UserID       int    `json:"-"`
	IsCustom     bool   `json:"-"`
}

type CategoryResponse struct {
	ID        int       `json:"id"`
	Name      string    `json:"name"`
	IsCustom  bool      `json:"isCustom"`
	CreatedAt time.Time `json:"createdAt"`
}
