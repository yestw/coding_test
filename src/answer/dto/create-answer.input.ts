import { Field, ArgsType } from '@nestjs/graphql';
import { IsNotEmpty, Length } from 'class-validator';

@ArgsType()
export class CreateAnswerDto {

  @Field(() => [String], { nullable: false })
  @IsNotEmpty({ each: true })
  @Length(0, 20, { each: true })
  answer_content: string[];

  @Field({nullable: false})
  @IsNotEmpty()
  question_id: number;
}
