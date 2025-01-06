package seed

type Word struct {
	ID         int32  `json:"id"`
	CategoryId int32  `json:"categoryId"`
	En         string `json:"en"`
	Pl         string `json:"pl"`
}

type WordsCategory struct {
	ID           int32  `json:"id"`
	CategoryName string `json:"categoryName"`
}
