import { IsNotEmpty, Length, IsNumber } from 'class-validator';
import { CreateQuestionDto } from './create-question.input';
import { ArgsType, Field, Int, PartialType } from '@nestjs/graphql';

@ArgsType()
export class UpdateQuestionDto extends PartialType(CreateQuestionDto) {
  @Field(()=>Int, {nullable : false})
  @IsNumber()
  @IsNotEmpty() 
  id: number;
  
  @Field(() => String, {nullable: false})
  @IsNotEmpty()
  @Length(5, 20)
  question_title: string;
}
