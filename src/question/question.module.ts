import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionResolver } from './question.resolver';
import { QuestionRepository } from './repository/question.repository';
import { SurveyRepository } from '../survey/repository/survey.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Questions } from './entities/question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Questions])],
  providers: [QuestionResolver, QuestionService, QuestionRepository, SurveyRepository],
})
export class QuestionModule {}
