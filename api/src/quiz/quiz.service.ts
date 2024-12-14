import {HttpException, Injectable} from '@nestjs/common';
import {QuizRepository} from './quiz.repository';
import {QuizConfig, QuizQuestion, QuizResponse, Word} from './models/quiz';
import * as crypto from 'node:crypto';

@Injectable()
export class QuizService {
  constructor(private readonly quizRepository: QuizRepository) {}
  //
  // getWords(categoryId?: number) {
  //   if (categoryId) {
  //     return this.quizRepository.getWordsByCategoryId(categoryId);
  //   }
  //   return this.quizRepository.getWords();
  // }
  //
  // getCategories() {
  //   return this.quizRepository.getCategories();
  // }

  async getQuiz(numOfQuestions: number): Promise<QuizResponse> {
    const numOfWords = numOfQuestions * 4;

    let words: Word[]

    try {
     words = (await this.quizRepository.getRandomWords(numOfWords)).map(
      (result) => result as unknown as Word,
    );
    } catch(e) {
      throw new HttpException("Words not found", 404)
    }

    const questions: QuizQuestion[] = [];

    for (let i = 0; i < numOfQuestions; i++) {
      const answers: Word[] = [];
      for (let j = 0; j < 4; j++) {
        answers.push(words[i * 4 + j]);
      }

      questions.push({
        question: answers[0],
        answers: answers,
      });
    }

    const quizConfig: QuizConfig = {
      timePerQuestion: null,
      totalQuestions: numOfQuestions,
    };

    return {
      quizConfig,
      id: crypto.randomUUID(),
      questions: questions,
    };
  }
}
