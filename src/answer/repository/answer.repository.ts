import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Answers } from "../entities/answer.entity";


@Injectable()
export class AnswerRepository extends Repository<Answers> {
    constructor(datasource: DataSource) {
        super(Answers, datasource.createEntityManager());
    }
}