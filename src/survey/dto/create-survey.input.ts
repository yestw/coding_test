import { Field, ArgsType } from '@nestjs/graphql';
import { IsNotEmpty, Length  } from 'class-validator';

@ArgsType()
export class CreateSurveysDto {
    
    @Field(() => String, {nullable: false})
    @IsNotEmpty()
    @Length(5, 20)
    title: string;
}