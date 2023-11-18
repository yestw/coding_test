import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty, Length } from 'class-validator';

@ArgsType()
export class CreateQuestionDto {

  @Field(() => String, { nullable: false })
  @IsNotEmpty()
  @Length(5, 20)
  question_title: String;

  @Field({nullable: false})
  @IsNotEmpty()
  survey_id: number;
}
