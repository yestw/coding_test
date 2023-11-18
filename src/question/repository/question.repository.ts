import { Questions } from '../entities/question.entity';
import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class QuestionRepository extends Repository<Questions> {
    constructor(datasource: DataSource) {
        super(Questions, datasource.createEntityManager());
    }
}