import { Module } from '@nestjs/common';
import { OptionService } from './option.service';
import { OptionResolver } from './option.resolver';
import { Options } from './entities/option.entity';
import { OptionRepository } from './repository/option.repository';
import { QuestionRepository } from '../question/repository/question.repository';
import { QuestionService } from '../question/question.service';
import { SurveyRepository } from '../survey/repository/survey.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerRepository } from 'src/answer/repository/answer.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Options])],
  providers: [
    OptionResolver, OptionService, OptionRepository,
    QuestionRepository, QuestionService, SurveyRepository, AnswerRepository
  ]
})
export class OptionModule {}
