import { Injectable, Logger } from '@nestjs/common';
import { CreateOptionDto } from './dto/create-option.input';
import { UpdateOptionDto } from './dto/update-option.input';
import { OptionRepository } from './repository/option.repository';
import { QuestionRepository } from '../question/repository/question.repository';
import { Options } from './entities/option.entity';
import { CustomException } from 'src/common/middleware/http-exceptions';
import { QuestionException } from 'src/question/exception/exception.message';
import { OptionException } from './exception/exception.message';

@Injectable()
export class OptionService {
  constructor(
    private readonly optionsRepository: OptionRepository,
    private readonly questionRepository: QuestionRepository,
  ) { }

  private readonly logger = new Logger(OptionService.name);

  //선택지 등록 - 다중 가능
  async create(createDto: CreateOptionDto): Promise<Options[]> {
    try {
      const findQuestion = await this.questionRepository.findOne({ where: { id: createDto.question_id } });

      if (!findQuestion) {
        this.logger.error('존재하지 않는 문항입니다.');
        throw new CustomException(QuestionException.QUESTION_NOT_EXISTS);
      };

      const savedOptions: Options[] = await Promise.all(
        createDto.option_content.map(async (option, index) => {
          const newOption = new Options();
          newOption.option_content = option;
          newOption.question_id = findQuestion;
          newOption.score = createDto.score[index];

          return this.optionsRepository.save(newOption);
        })
      );

      return savedOptions;
    } catch (err) {
      return err;
    }
  }

  //선택지 전체 조회
  async findAll(): Promise<Options[]> {
    const options = await this.optionsRepository.find({relations: ['question_id']})
    return await this.optionsRepository.find({relations: ['question_id']});
  }

  //선택지 id로 특정 선택지 조회
  async findOne(id: number): Promise<Options> {
    try {
      const findOption = await this.optionsValidation(id);
      
      return findOption;
    } catch (err) {
      return err;
    }
  }

  //선택지 수정
  async update(updateDto: UpdateOptionDto) {
    try {
      if(!(updateDto.option_content.length === updateDto.id.length)) {
        throw new CustomException(OptionException.OPTION_UPDATE_FAIL);
      }

      await Promise.all(updateDto.option_content.map(async (option, index) => {
        const findOption = await this.optionsValidation(updateDto.id[index]);
        if(!(option === findOption.option_content)) {
          return this.optionsRepository.update(findOption.id, {
            option_content: option, 
          });
        }
      }));

    } catch (err) {
      return err;
    }
  }

  //선택지 삭제
  async remove(id: number) {
    try {
      const option = await this.optionsValidation(id);

      return this.optionsRepository.delete(option.id);
    } catch (err) {
      return err;
    }
  }

  async optionsValidation(id: number): Promise<Options> {
    let option = new Options();
    try {
      option = await this.optionsRepository.findOne({ where: { id: id } });
      if (!option) {
        this.logger.error('존재하지 않는 선택지입니다.')
        throw new CustomException(OptionException.OPTION_NOT_EXISTS);
      };
    } catch (err) {
      throw err;
    }
    return option;
  }
}
