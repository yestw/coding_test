import { Injectable, Logger } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.input';
import { UpdateQuestionDto } from './dto/update-question.input';
import { Questions } from './entities/question.entity';
import { QuestionRepository } from './repository/question.repository';
import { SurveyRepository } from '../survey/repository/survey.repository';
import { Options } from '../option/entities/option.entity';
import { QuestionException } from './exception/exception.message';
import { SurveysException } from 'src/survey/exception/exception.message';
import { CustomException } from 'src/common/middleware/http-exceptions';
import { OptionRepository } from 'src/option/repository/option.repository';
import { AnswerRepository } from 'src/answer/repository/answer.repository';

@Injectable()
export class QuestionService {
  constructor(
    private readonly questionRepository: QuestionRepository,
    private readonly surveyRepository: SurveyRepository,
    private readonly optionRepository: OptionRepository,
    private readonly answerRepository: AnswerRepository,
  ) { };

  private readonly logger = new Logger(QuestionService.name);

  //문항 등록
  async create(createDto: CreateQuestionDto): Promise<Questions> {
    try {
      const survey = await this.surveyRepository.findOne({ where: { id: createDto.survey_id } });
      if (!survey) {
        this.logger.error('존재하지 않는 설문지 입니다.');
        throw new CustomException(SurveysException.SURVEY_NOT_EXISTS);
      }
  
      const newQuestion = new Questions();
      newQuestion.question_title = createDto.question_title;
      newQuestion.survey_id = survey;
  
      return this.questionRepository.save(newQuestion);
    } catch (err) {
      return err;
    }
  }

  //문항 전체 조회
  async findAll() {
    return await this.questionRepository.find({ relations : ['survey_id']});
  }

  //문항 id로 특정 문항 조회
  async findOne(id: number): Promise<Questions> {
    try {
      const question = await this.questionValidation(id);

      const question_id = question.id;
      const findQuestion = await this.questionRepository.createQueryBuilder('question')
        .leftJoinAndMapMany(
          'question.options',
          Options,
          'options',
          'question.id = options.question_id'
        )
        .where('question.id = :question_id', { question_id })
        .getOne();

      return findQuestion;

    } catch (err) {
      return err;
    }
  }

  //문항 수정
  async update(updateDto: UpdateQuestionDto) {
    try {
      const question = await this.questionValidation(updateDto.id);

      const { survey_id, ...updateData } = updateDto;
      await this.questionRepository.update(question.id, updateData);

    } catch (err) {
      return err;
    }
  }

  //문항 삭제
  async remove(id: number) {
    try {
      const question = await this.questionValidation(id);

      await this.optionRepository.delete({question_id: {id : question.id}});
      await this.answerRepository.delete({question_id: {id : question.id}});

      await this.questionRepository.delete(question.id);
    } catch (err) {
      return err;
    }
  }

  //문항 조회시 없으면 발생하는 예외
  async questionValidation(id: number): Promise<Questions> {
    let question = new Questions();
    question = await this.questionRepository.findOne({ where: { id: id } });
    if (!question) {
      this.logger.error('존재하지 않는 문항 입니다.');
      throw new CustomException(QuestionException.QUESTION_NOT_EXISTS);
    }
    return question;
  }
}
