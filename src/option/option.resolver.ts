import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OptionService } from './option.service';
import { Options } from './entities/option.entity';
import { CreateOptionDto } from './dto/create-option.input';
import { UpdateOptionDto } from './dto/update-option.input';

@Resolver(() => Options)
export class OptionResolver {
  constructor(private readonly optionService: OptionService) {}

  @Mutation(() => [Options], {description: '선택지 등록'})
  async createOption(@Args() createDto: CreateOptionDto): Promise<Options[]> {
    const newOption = await this.optionService.create(createDto);
    return newOption;
  }

  @Query(() => [Options], { name: 'findAllOptions', description: '전체 선택지 조회'})
  async findAll() {
    return await this.optionService.findAll();
  }

  @Query(() => Options, { name: 'findOptionById', description: '선택지id로 특정 선택지 조회'})
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return await this.optionService.findOne(id);
  }

  @Mutation(() => Options, {description: '선택지 수정', nullable: true})
  async updateOption(@Args() updateDto: UpdateOptionDto) {
    return await this.optionService.update(updateDto);
  }

  @Mutation(() => Options, {description: '선택지 삭제', nullable: true})
  async deleteOption(@Args('id', { type: () => Int }) id: number) {
    return await this.optionService.remove(id);
  }
}
