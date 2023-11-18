import { ExceptionObj } from "src/common/middleware/exception.obj";

export class AnswerException {
    static ANSWER_NOT_EXISTS: ExceptionObj = {
        code: 'A001',
        message: '존재하지 않는 답변 입니다.',
    }

    static ANSWER_NOT_MATCH_OPTION: ExceptionObj = {
        code: 'A002',
        message: '선택지에 없는 답변입니다.',
    }
}