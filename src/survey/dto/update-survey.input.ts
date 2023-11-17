import { CreateSurveysDto } from './create-survey.input';
import { Field, Int, PartialType, ArgsType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, Length  } from "class-validator";

@ArgsType()
export class UpdateSurveyDto extends PartialType(CreateSurveysDto) {
    @Field(()=>Int, {nullable : false})
    @IsNumber()
    @IsNotEmpty() 
    id:number;

    @Field(() => String, {nullable: false})
    @IsNotEmpty()
    @Length(5, 20)
    title: string;
}