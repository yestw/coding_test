import { Injectable, Logger } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.input';
import { UpdateAnswerDto } from './dto/update-answer.input';
import { AnswerRepository } from './repository/answer.repository';
import { QuestionRepository } from '../question/repository/question.repository';
import { QuestionService } from '../question/question.service';
import { Answers } from './entities/answer.entity';
import { CustomException } from 'src/common/middleware/http-exceptions';
import { QuestionException } from 'src/question/exception/exception.message';
import { AnswerException } from './exception/exception.message';

@Injectable()
export class AnswerService {
  constructor(
    private readonly answerRepository: AnswerRepository,
    private readonly questionRepository: QuestionRepository,
    private readonly questionService: QuestionService,
    ) {}

  private readonly logger = new Logger(AnswerService.name);

  //답변 등록 - 다중 가능
  async create(createDto: CreateAnswerDto): Promise<Answers[]> {
    try {

      //답변을 등록하기 위해 답변을 등록할 문항이 있는지 체크
      const findQuestion = await this.questionRepository.findOne({where: {id: createDto.question_id}});

      if(!findQuestion) {
        throw new CustomException(QuestionException.QUESTION_NOT_EXISTS);
      }

      const findQuestions = await this.questionService.findOne(createDto.question_id);

      const { options } = findQuestions;
      let score = [];

      //문항이 존재하는데 등록한 답변이 선택지에 없다면 에러 반환
      for(let i=0; i<createDto.answer_content.length; i++) {
        const find = options.find((option) => {
          if(option.option_content === createDto.answer_content[i]) {
            return true;
          }
          return false;
        })
        if(find===undefined) {
          this.logger.error('선택지에 없는 답변입니다.')
          throw new CustomException(AnswerException.ANSWER_NOT_MATCH_OPTION);
        }
        score.push(find.score);
      }

      //최종 답변 등록
      const saveAnswers: Answers[] = await Promise.all(
        createDto.answer_content.map(async (answer) => {
          const question_id = createDto.question_id;
          const find = await this.answerRepository.createQueryBuilder('answer')
            .where('answer.answer_content = :answer', {answer : answer})
            .andWhere('answer.question_id = :question_id', {question_id : question_id})
            .getMany();
          if(find.length < 1) {
            const newAnswer = new Answers();
            newAnswer.answer_content = answer;
            newAnswer.question_id = findQuestion;
            newAnswer.score = score.shift();

            return this.answerRepository.save(newAnswer);
          } else {
            throw new CustomException(AnswerException.ANSWER_DUPLICATE);
          }
        })
      )
      return saveAnswers;
    } catch(err) {
      return err;
    }
  }

  //답변 전체 조회
  async findAll(): Promise<Answers[]> {
    const answers = await this.answerRepository.find();
    return answers;
  }

  //답변 id로 특정 답변 조회
  async findOne(id: number): Promise<Answers> {
    try {
      const findAnswer = await this.answerValidation(id);

      return findAnswer;
    } catch (err) {
      return err;
    }
  }

  //답변 수정
  async update(updateDto: UpdateAnswerDto): Promise<Answers[]> {
    try {
      await this.answerRepository.delete({question_id: {id: updateDto.question_id}});

      const createDto = new CreateAnswerDto();
      createDto.answer_content = updateDto.answer_content;
      createDto.question_id = updateDto.question_id;

      const updateAnswer = await this.create(createDto);
      return updateAnswer
      
    } catch (err) {
      return err;
    }
  }

  //답변 삭제
  async remove(id: number) {
    try {
      const findAnswer = await this.answerValidation(id);
      await this.answerRepository.delete({answer_content: findAnswer.answer_content});
    } catch(err) {
      return err;
    }
  }

  async answerValidation(id: number): Promise<Answers> {
    let answer = new Answers();
    try {
      answer = await this.answerRepository.findOne({where : {id : id}});
      if(!answer) {
        this.logger.error('존재하지 않는 답변입니다.');
        throw new CustomException(AnswerException.ANSWER_NOT_EXISTS);
      };
    } catch (err) {
      throw err;
    }
    return answer;
  }
}
