import { Resolver, Query, Mutation, Args, Int, } from '@nestjs/graphql';
import { Surveys } from './entities/survey.entities';
import { SurveyService } from './survey.service';
import { CreateSurveysDto } from 'src/survey/dto/create-survey.input';
import { UpdateSurveyDto } from './dto/update-survey.input';

@Resolver(() => Surveys)
export class SurveyResolver {
  constructor(private readonly surveyService: SurveyService) {}

  @Mutation(() => Surveys, {description: '설문지 등록'})
  async createSurvey(@Args() dto: CreateSurveysDto): Promise<Surveys> {
    const newSurvey = await this.surveyService.create(dto);
    return newSurvey;
  }

  @Query(() => [Surveys], {description: '전체 설문지 조회'})
  async findAll(): Promise<Surveys[]> {
    return await this.surveyService.findAll();
  }

  @Query(() => Surveys, {description: '설문지id로 특정 설문지 조회'})
  async findOne(@Args('id', { type: () => Int }) id: number) {
    try {
      return await this.surveyService.findOneById(id);
    } catch (err) {
      return err;
    }
  }
  
  @Mutation(() => Surveys, {description: '설문지 수정', nullable: true})
  async updateSurvey(@Args() updateDto: UpdateSurveyDto) {
    try {
      await this.surveyService.updateSurvey(updateDto);
    } catch (err) {
      return err;
    }
  }

  @Mutation(() => Surveys, {description: '설문지 삭제', nullable : true})
  async deleteSurvey(@Args('id')id: number) {
    return await this.surveyService.deleteSurvey(id);
  }
}
