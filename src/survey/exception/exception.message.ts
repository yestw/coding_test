import { ExceptionObj } from "../../common/middleware/exception.obj";

export class SurveysException {
    static SURVEY_NOT_EXISTS: ExceptionObj = {
        code: 'S001',
        message: '존재하지 않는 설문지 입니다.',
    };
}