package models

type DictionaryWord struct {
	ID         int32  `json:"id"`
	Pl         string `json:"pl"`
	En         string `json:"en"`
	CategoryId int32  `json:"categoryId"`
	UserId     string `json:"userId"`
}

type DictionaryCategory struct {
	ID           int32  `json:"id"`
	CategoryName string `json:"categoryName"`
	UserID       string `json:"userId"`
}
