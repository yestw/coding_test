import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Options } from "../entities/option.entity";


@Injectable()
export class OptionRepository extends Repository<Options>{
    constructor(datasource: DataSource) {
        super(Options, datasource.createEntityManager());
    }
}