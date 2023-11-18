import { Injectable, Logger } from '@nestjs/common';
import { Surveys } from './entities/survey.entities';
import { SurveyRepository } from './repository/survey.repository';
import { CreateSurveysDto } from './dto/create-survey.input';
import { UpdateSurveyDto } from './dto/update-survey.input';
import { QuestionRepository } from '../question/repository/question.repository';
import { Questions } from '../question/entities/question.entity';
import { Options } from '../option/entities/option.entity';
import { Answers } from '../answer/entities/answer.entity';
import { CustomException } from 'src/common/middleware/http-exceptions';
import { SurveysException } from './exception/exception.message';

@Injectable()
export class SurveyService {
  constructor(
    private readonly surveyRepository: SurveyRepository,
    private readonly questionRepository: QuestionRepository,
  ) { }

  private readonly logger = new Logger(SurveyService.name);

  //설문지 등록
  async create(createDto: CreateSurveysDto): Promise<Surveys> {
    const newSurvey = this.surveyRepository.create(createDto);
    return await this.surveyRepository.save(newSurvey);
  }

  //설문지 전체 조회
  async findAll(): Promise<Surveys[]> {
    return await this.surveyRepository.find();
  }

  //설문지id로 특정 설문지 조회
  async findOneById(id: number): Promise<Surveys> {
    try {
      await this.surveyValidation(id);

      const surveys = await this.surveyRepository.createQueryBuilder('survey')
      .leftJoinAndMapMany(
        'survey.questions',
        Questions,
        'questions',
        'survey.id = questions.survey_id',
      )
      .leftJoinAndMapMany(
        'questions.options',
        Options,
        'options',
        'questions.id = options.question_id'
      )
      .leftJoinAndMapMany(
        'questions.answers',
        Answers,
        'answers',
        'questions.id = answers.question_id'
      )
      .where('survey.id = :id', { id })
      .getOne();

      const { questions } = surveys;

      let sum = 0;
      questions.forEach((question) => {
        const { answers } = question;
        answers.forEach((answer) => {
          sum+=answer.score;
        })
      })
      surveys.totalScore = sum;

      return surveys;
    } catch (err) {
      return err;
    } 
  }


  //설문지 수정
  async updateSurvey(updateDto: UpdateSurveyDto) {
    try {
      const survey = await this.surveyValidation(updateDto.id);
      await this.surveyRepository.update(survey.id, updateDto);

    } catch (err) {
      return err;
    }
  }


  //설문지 삭제
  async deleteSurvey(id: number) {
    try {
      const survey = await this.surveyValidation(id);

      const survey_id = survey.id;
      await this.questionRepository.delete({ survey_id: { id: survey_id } });
      await this.surveyRepository.delete(survey.id);

    } catch(err) {
      return err;
    }
  }

  //설문지 조회시 없으면 발생하는 예외
  async surveyValidation(id: number): Promise<Surveys> {
    let survey = new Surveys();

    survey = await this.surveyRepository.findOne({ where: { id: id } });
    if (!survey) {
      this.logger.error('존재하지 않는 설문지 입니다.');
      throw new CustomException(SurveysException.SURVEY_NOT_EXISTS);
    }
    return survey;
  }
}
