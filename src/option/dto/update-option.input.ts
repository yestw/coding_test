import { CreateOptionDto } from './create-option.input';
import { Field, Int, PartialType, ArgsType } from '@nestjs/graphql';
import { IsArray, IsNotEmpty, Length, IsNumber } from 'class-validator';

@ArgsType()
export class UpdateOptionDto extends PartialType(CreateOptionDto) {
  @Field(() => [Int], {nullable: false})
  @IsNotEmpty({ each: true }) 
  id: number[];

  @Field(() => [String], {nullable: false})
  @IsNotEmpty({ each: true })
  @Length(0, 20, { each: true })
  option_content: string[];
}
