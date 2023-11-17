import { Surveys } from '../entities/survey.entities'
import { DataSource, Repository } from "typeorm";
import { Injectable } from '@nestjs/common';

@Injectable()
export class SurveyRepository extends Repository<Surveys> {
    constructor(datasource: DataSource) {
        super(Surveys, datasource.createEntityManager());
    }
}