import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionResolver } from './question.resolver';
import { QuestionRepository } from './repository/question.repository';
import { SurveyRepository } from '../survey/repository/survey.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Questions } from './entities/question.entity';
import { OptionRepository } from 'src/option/repository/option.repository';
import { AnswerRepository } from 'src/answer/repository/answer.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Questions])],
  providers: [
    QuestionResolver, QuestionService, QuestionRepository,
    SurveyRepository, OptionRepository, AnswerRepository,
  ],
})
export class QuestionModule { }
