import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Questions } from '../../question/entities/question.entity';

@ObjectType()
@Entity()
export class Answers {

  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field({nullable:true})
  answer_content: string;

  @ManyToOne(() => Questions, {nullable:true})
  @JoinColumn({name: 'question_id'})
  question_id: Questions;

  @Column()
  @Field({nullable : true})
  score?: number;

  @Field(() => [Answers], {nullable: true})
  answers?: Answers[];

}
