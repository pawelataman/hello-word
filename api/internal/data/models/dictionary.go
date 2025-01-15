package models

type DictionaryWord struct {
	ID          int32              `json:"id"`
	Pl          string             `json:"pl"`
	En          string             `json:"en"`
	Category    DictionaryCategory `json:"category"`
	UserDefined bool               `json:"userDefined"`
}

type DictionaryCategory struct {
	ID           int32  `json:"id"`
	CategoryName string `json:"categoryName"`
}
