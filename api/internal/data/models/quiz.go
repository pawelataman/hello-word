package models

type QuizWord struct {
	Id int    `json:"id"`
	En string `json:"en"`
	Pl string `json:"pl"`
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
