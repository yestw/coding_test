import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Questions } from '../../question/entities/question.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Options {
  
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field({nullable:true})
  option_content: string;

  @Column()
  @Field({nullable:true})
  score: number;

  @ManyToOne(() => Questions, {nullable:true})
  @JoinColumn({name: 'question_id'})
  @Field(() => Questions)
  question_id: Questions;

  @Field(() => [Options], { nullable:true })
  options?: Options[];
}
