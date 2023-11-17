import { Test, TestingModule } from '@nestjs/testing';
import { SurveyService } from './survey.service';

describe('SurveyService', () => {
  let service: SurveyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SurveyService],
    }).compile();

    service = module.get<SurveyService>(SurveyService);
  });

  describe('findOneById', () => {
    it.todo('파라미터로 설문지 id를 요청해야 합니다.');
  })
});
