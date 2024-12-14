import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import {QuizModule} from './quiz/quiz.module';
import {CommonModule} from './common/common.module';
import {AuthMiddleware} from "./core/auth/auth.middleware";
import {requireAuth} from "@clerk/express";

@Module({
  imports: [QuizModule, CommonModule],
  controllers: [],
  providers: [AuthMiddleware],
})
export class AppModule implements  NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
        .apply(requireAuth())
        .forRoutes("*")
  }
}
