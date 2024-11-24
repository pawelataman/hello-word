import { Module } from '@nestjs/common';
import { QuizModule } from './quiz/quiz.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [QuizModule, CommonModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
