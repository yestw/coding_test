import { Field, ArgsType, Int } from '@nestjs/graphql';
import { IsArray, IsNotEmpty, Length, ArrayMinSize } from 'class-validator';

@ArgsType()
export class CreateOptionDto {
  
  @Field(() => [String], { nullable: false })
  @IsNotEmpty({ each: true })
  @Length(0, 20, { each: true })
  option_content: string[];

  @Field({nullable: false})
  @IsNotEmpty()
  question_id: number;

  @Field(() => [Int], {nullable: false})
  @IsNotEmpty()
  score: number[];
}
