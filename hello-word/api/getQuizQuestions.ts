import {
  GetQuizQuestionsRequest,
  GetQuizQuestionsResponse,
  QuizQuestion,
} from "@/api/models";

export function getQuizQuestions(
  req: GetQuizQuestionsRequest,
): Promise<GetQuizQuestionsResponse> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        questions: [
          {
            question: { id: "ryba", value: "Ryba" },
            answers: [
              { id: "slon", value: "Elephant" },
              { id: "ryba", value: "Fish" },
              { id: "kot", value: "Cat" },
              { id: "pies", value: "Dog" },
            ],
            correctAnswerId: "ryba",
          },
          {
            question: { id: "slon", value: "Słoń" },
            answers: [
              { id: "ryba", value: "Fish" },
              { id: "slon", value: "Elephant" },
              { id: "kot", value: "Cat" },
              { id: "pies", value: "Dog" },
            ],
            correctAnswerId: "slon",
          },
          {
            question: { id: "kot", value: "Kot" },
            answers: [
              { id: "pies", value: "Dog" },
              { id: "kot", value: "Cat" },
              { id: "slon", value: "Elephant" },
              { id: "ryba", value: "Fish" },
            ],
            correctAnswerId: "kot",
          },
          {
            question: { id: "pies", value: "Pies" },
            answers: [
              { id: "kot", value: "Cat" },
              { id: "pies", value: "Dog" },
              { id: "slon", value: "Elephant" },
              { id: "ryba", value: "Fish" },
            ],
            correctAnswerId: "pies",
          },
          {
            question: { id: "ptak", value: "Ptak" },
            answers: [
              { id: "ptak", value: "Bird" },
              { id: "ryba", value: "Fish" },
              { id: "pies", value: "Dog" },
              { id: "kot", value: "Cat" },
            ],
            correctAnswerId: "ptak",
          },
          {
            question: { id: "kon", value: "Koń" },
            answers: [
              { id: "kon", value: "Horse" },
              { id: "kot", value: "Cat" },
              { id: "ryba", value: "Fish" },
              { id: "slon", value: "Elephant" },
            ],
            correctAnswerId: "kon",
          },
          {
            question: { id: "mysz", value: "Mysz" },
            answers: [
              { id: "mysz", value: "Mouse" },
              { id: "pies", value: "Dog" },
              { id: "ptak", value: "Bird" },
              { id: "slon", value: "Elephant" },
            ],
            correctAnswerId: "mysz",
          },
          {
            question: { id: "krowa", value: "Krowa" },
            answers: [
              { id: "krowa", value: "Cow" },
              { id: "kon", value: "Horse" },
              { id: "slon", value: "Elephant" },
              { id: "kot", value: "Cat" },
            ],
            correctAnswerId: "krowa",
          },
          {
            question: { id: "owca", value: "Owca" },
            answers: [
              { id: "owca", value: "Sheep" },
              { id: "krowa", value: "Cow" },
              { id: "mysz", value: "Mouse" },
              { id: "pies", value: "Dog" },
            ],
            correctAnswerId: "owca",
          },
          {
            question: { id: "kura", value: "Kura" },
            answers: [
              { id: "kura", value: "Chicken" },
              { id: "owca", value: "Sheep" },
              { id: "kon", value: "Horse" },
              { id: "ptak", value: "Bird" },
            ],
            correctAnswerId: "kura",
          },
        ],
      });
    }, 2000);
  });
}
