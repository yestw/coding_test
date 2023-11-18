import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

import { SurveyModule } from './survey/survey.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './config/typeorm.config';
import { LoggerModule } from './logger/logger.module';
import { QuestionModule } from './question/question.module';
import { OptionModule } from './option/option.module';
import { AnswerModule } from './answer/answer.module';
import { ConfigModule, ConfigService  } from "@nestjs/config";
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './common/middleware/http-exception.filter';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: typeORMConfig,
      inject: [ConfigService],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      formatError: (err) => {
        console.log(err);

        const  { message, extensions } = err;
        const { code } = extensions;
        return { message, code };
      },
    }),
    SurveyModule, LoggerModule, QuestionModule, OptionModule, AnswerModule
  ],
  controllers: [AppController],
  providers: [
    AppService, Logger,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    }
  ],
})
export class AppModule{}
