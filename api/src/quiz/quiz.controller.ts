import { Controller, Get, Query } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizQuery } from './models/quiz';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}
  //
  // @Get('words')
  // async getWords(
  //   @Query('categoryId', new ParseIntPipe({ optional: true }))
  //   categoryId?: number,
  // ) {
  //   return this.quizService.getWords(categoryId);
  // }
  //
  // @Get('categories')
  // getCategories() {
  //   return this.quizService.getCategories();
  // }

  @Get()
  getQuiz(@Query() quizQuery: QuizQuery) {
    return this.quizService.getQuiz(quizQuery.numOfQuestions);
  }
}
