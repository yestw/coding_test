import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Questions } from 'src/question/entities/question.entity';
import { Options } from 'src/option/entities/option.entity';
import { Answers } from 'src/answer/entities/answer.entity';

@ObjectType()
@Entity()
export class Surveys {
    @PrimaryGeneratedColumn()
    @Field(() => Int)
    id: number;

    @Column({ nullable: true })
    @Field( {nullable: true} )
    title?: string;

    @Field(() => [Questions], { nullable: true })
    questions?: Questions[];

    @Field(() => [Options], { nullable:true })
    options?: Options[];

    @Field(() => [Answers], { nullable:true })
    answers?: Answers[];

    @Field({nullable:true})
    totalScore?: number;
}