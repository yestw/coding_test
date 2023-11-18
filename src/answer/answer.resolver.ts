import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AnswerService } from './answer.service';
import { Answers } from './entities/answer.entity';
import { CreateAnswerDto } from './dto/create-answer.input';
import { UpdateAnswerDto } from './dto/update-answer.input';

@Resolver(() => Answers)
export class AnswerResolver {
  constructor(private readonly answerService: AnswerService) {}

  @Mutation(() => [Answers], {description: '답변 등록'})
  async createAnswer(@Args() createDto: CreateAnswerDto): Promise<Answers[]> {
    const newAnswer = await this.answerService.create(createDto);
    return newAnswer;
  }

  @Query(() => [Answers], { name: 'findAllAnswers', description: '전체 답변 조회'})
  async findAll() {
    return await this.answerService.findAll();
  }

  @Query(() => Answers, { name: 'findAnswerById', description: '답변id로 특정 답변 조회'})
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return await this.answerService.findOne(id);
  }

  @Mutation(() => Answers, {description: '답변 수정', nullable: true})
  async updateAnswer(@Args() updateDto: UpdateAnswerDto) {
    return await this.answerService.update(updateDto);
  }

  @Mutation(() => Answers, {description: '답변 삭제', nullable: true})
  async deleteAnswer(@Args('id', { type: () => Int }) id: number) {
    return await this.answerService.remove(id);
  }
}
