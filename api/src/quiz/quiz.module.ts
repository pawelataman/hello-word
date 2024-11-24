import { Module } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { QuizRepository } from './quiz.repository';

@Module({
  providers: [QuizService, QuizRepository],
  controllers: [QuizController],
  imports: [],
})
export class QuizModule {}
