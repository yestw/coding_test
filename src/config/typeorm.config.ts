import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Surveys } from '../survey/entities/survey.entities';
import { Questions } from '../question/entities/question.entity';
import { Options } from '../option/entities/option.entity';
import { Answers } from '../answer/entities/answer.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const typeORMConfig = async (configService: ConfigService): Promise<TypeOrmModuleOptions> => ({
    type: 'postgres',
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    username: configService.get<string>('DB_USERNAME'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_DATABASE'),
    entities: [Surveys, Questions, Options, Answers],
    synchronize: true,
    logging: true,
  });