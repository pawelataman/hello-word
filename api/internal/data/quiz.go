package data

type QuizWord struct {
	Id         int    `json:"id"`
	CategoryId int    `json:"categoryId"`
	En         string `json:"en"`
	Pl         string `json:"pl"`
}

type QuizQuestion struct {
	Id       int        `json:"id"`
	Question QuizWord   `json:"question"`
	Answers  []QuizWord `json:"answers"`
}

type Quiz struct {
	Id        string         `json:"id"`
	Questions []QuizQuestion `json:"questions"`
}

type GetQuizParam struct {
	QuestionsQty int `json:"questionsQty"`
}
