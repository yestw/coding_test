import { CreateAnswerDto } from './create-answer.input';
import { Field, PartialType, ArgsType } from '@nestjs/graphql';
import { IsNotEmpty, Length } from 'class-validator';

@ArgsType()
export class UpdateAnswerDto extends PartialType(CreateAnswerDto) {

  @Field(() => [String])
  @Length(0, 20, { each: true })
  answer_content: string[];

  @Field({nullable: false})
  @IsNotEmpty()
  question_id: number;
}
