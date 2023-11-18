import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { QuestionService } from './question.service';
import { Questions } from './entities/question.entity';
import { CreateQuestionDto } from './dto/create-question.input';
import { UpdateQuestionDto } from './dto/update-question.input';

@Resolver(() => Questions)
export class QuestionResolver {
  constructor(private readonly questionService: QuestionService) {}

  @Mutation(() => Questions, {description: '문항 등록'})
  async createQuestion(@Args() createDto: CreateQuestionDto):Promise<Questions> {
    const newQuestion = await this.questionService.create(createDto);
    return newQuestion;
  }

  @Query(() => [Questions], {name: 'findAllQuestions', description: '전체 문항 조회'})
  async findAll(): Promise<Questions[]> {
    return await this.questionService.findAll();
  }

  @Query(() => Questions, {name: 'findQuestionById', description: '문항id로 특정 문항 조회'})
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return await this.questionService.findOne(id);
  }

  @Mutation(() => Questions, {description: '문항 수정', nullable: true})
  async updateQuestion(@Args() updateDto: UpdateQuestionDto) {
    return await this.questionService.update(updateDto);
  }

  @Mutation(() => Questions, {description: '문항 삭제', nullable: true})
  async deleteQuestion(@Args('id', { type: () => Int }) id: number) {
    return await this.questionService.remove(id);
  }
}
