import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AnswerResolver } from './answer.resolver';
import { Answers } from './entities/answer.entity';
import { AnswerRepository } from './repository/answer.repository';
import { QuestionRepository } from '../question/repository/question.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionService } from '../question/question.service';
import { SurveyRepository } from '../survey/repository/survey.repository';
import { OptionRepository } from 'src/option/repository/option.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Answers]),],
  providers: [
    AnswerResolver, AnswerService, AnswerRepository,
    QuestionRepository, QuestionService, SurveyRepository, OptionRepository], 
})
export class AnswerModule {}
