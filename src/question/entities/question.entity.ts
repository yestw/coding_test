import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Surveys } from '../../survey/entities/survey.entities';
import { Options } from '../../option/entities/option.entity';
import { Answers } from '../../answer/entities/answer.entity';

@ObjectType()
@Entity()
export class Questions {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ nullable: true} )
  @Field( {nullable: true} )
  question_title?: String;

  @ManyToOne(()=> Surveys, {nullable:false})
  @JoinColumn({ name: 'survey_id' })
  @Field(() => Surveys)
  survey_id: Surveys;

  @Field(() => [Options], { nullable:true })
  options?: Options[];

  @Field(() => [Answers], { nullable:true })
  answers?: Answers[];

}
