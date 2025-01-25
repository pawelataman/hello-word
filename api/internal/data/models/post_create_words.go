package models

type CreateWordsRequestBody struct {
	CategoryId int32            `json:"categoryId"`
	Words      []DictionaryWord `json:"words"`
}
