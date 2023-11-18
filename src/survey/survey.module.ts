import { Module } from '@nestjs/common';
import { SurveyService } from './survey.service';
import { SurveyResolver } from './survey.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Surveys } from './entities/survey.entities';
import { SurveyRepository } from './repository/survey.repository';
import { QuestionRepository } from '../question/repository/question.repository';
import { OptionRepository } from '../option/repository/option.repository';
import { AnswerRepository } from 'src/answer/repository/answer.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Surveys])],
  providers: [
    SurveyService, SurveyResolver, SurveyRepository,
    QuestionRepository, OptionRepository, AnswerRepository,
  ]
})
export class SurveyModule {}
