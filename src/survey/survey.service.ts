import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Surveys } from './entities/survey.entities';
import { SurveyRepository } from './repository/survey.repository';
import { CreateSurveysDto } from './dto/create-survey.input';
import { UpdateSurveyDto } from './dto/update-survey.input';
import { QuestionRepository } from '../question/repository/question.repository';
import { Questions } from '../question/entities/question.entity';
import { Options } from '../option/entities/option.entity';
import { Answers } from '../answer/entities/answer.entity';
import HttpError from 'src/exception/http.error';

@Injectable()
export class SurveyService {
  constructor(
    private readonly surveyRepository: SurveyRepository,
    private readonly questionRepository: QuestionRepository,
  ) { }

  private readonly logger = new Logger(SurveyService.name);

  //설문지 등록
  async create(createDto: CreateSurveysDto): Promise<Surveys> {
    try {
      const newSurvey = this.surveyRepository.create(createDto);
      return await this.surveyRepository.save(newSurvey);
    } catch (err) {
      this.logger.error(err);
      throw new HttpError(500, '설문지 등록에 실패하였습니다.');
    }
  }

  //설문지 전체 조회
  async findAll(): Promise<Surveys[]> {
    try {
      return await this.surveyRepository.find();
    } catch (err) {
      this.logger.error(err);
      throw new HttpException('설문지 조회에 실패하였습니다.', HttpStatus.BAD_REQUEST);
    }
  }

  //설문지id로 특정 설문지 조회
  async findOneById(id: number): Promise<Surveys> {
    try {
      await this.surveyValidation(id);

      try {
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
        this.logger.error(err);
        throw new HttpError(500, '선택하신 설문지 조회에 실패하였습니다.');
      } 

    } catch (err) {
      throw err;
    } 
  }


  //설문지 수정
  async updateSurvey(updateDto: UpdateSurveyDto) {
    try {
      const survey = await this.surveyValidation(updateDto.id);
      
      try {
        await this.surveyRepository.update(survey.id, updateDto);
      } catch (err) {
        this.logger.error(err);
        throw new HttpException('설문지 수정에 실패하였습니다.', HttpStatus.BAD_REQUEST);
      }
    } catch (err) {
      throw err;
    }
  }


  //설문지 삭제
  async deleteSurvey(id: number) {
    try {
      const survey = await this.surveyValidation(id);
      
      try {
        await this.questionRepository.delete({survey_id: survey.options});
        await this.surveyRepository.delete(survey.id);
      } catch (err) {
        this.logger.error(err);
        throw new HttpException('설문지 삭제에 실패하였습니다.', HttpStatus.BAD_REQUEST);
      }
    } catch(err) {
      throw err;
    }
  }

  //설문지 조회시 없으면 발생하는 예외
  async surveyValidation(id: number): Promise<Surveys> {
    let survey = new Surveys();

    survey = await this.surveyRepository.findOne({ where: { id: id } });
    if (!survey) {
      this.logger.error('존재하지 않는 설문지 입니다.');
      throw new HttpError(500, '존재하지 않는 설문지 입니다.');
    }
    return survey;
  }
}
