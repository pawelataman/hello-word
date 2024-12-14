import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import {QuizService} from './quiz.service';
import {QuizController} from './quiz.controller';
import {QuizRepository} from './quiz.repository';
import {CoreModule} from "../core/core.module";
import {AuthMiddleware} from "../core/auth/auth.middleware";

@Module({
  providers: [QuizService, QuizRepository],
  controllers: [QuizController],
  imports: [CoreModule],
})
export class QuizModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthMiddleware).forRoutes(QuizController);
    }
}
