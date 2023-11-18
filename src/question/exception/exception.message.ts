import { ExceptionObj } from "src/common/middleware/exception.obj";

export class QuestionException {
    static QUESTION_NOT_EXISTS: ExceptionObj = {
        code: 'Q001',
        message: '존재하지 않는 문항 입니다.',
    }
}