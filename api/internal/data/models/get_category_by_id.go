package models

type GetCategoryByIdResponse struct {
	DictionaryCategory
	Words []DictionaryWord `json:"words"`
}
