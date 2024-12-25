import { Controller, Get, Query } from "@nestjs/common";
import { QuizService } from "./quiz.service";
import { QuizQuery, QuizResponse } from "./models/quiz";

@Controller("quiz")
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Get()
  async getQuiz(@Query() quizQuery: QuizQuery): Promise<QuizResponse> {
    return this.quizService.getQuiz(quizQuery.numOfQuestions);
  }
}
