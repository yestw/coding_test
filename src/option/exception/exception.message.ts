import { ExceptionObj } from "src/common/middleware/exception.obj";


export class OptionException {
    static OPTION_NOT_EXISTS: ExceptionObj = {
        code: 'O001',
        message: '존재하지 않는 선택지 입니다.',
    }

    static OPTION_UPDATE_FAIL: ExceptionObj = {
        code: 'O002',
        message: '업데이트 하려는 선택지 내용의 개수와 선택지의 개수가 다릅니다',
    }

    static OPTION_CREATE_FAIL: ExceptionObj = {
        code: 'O003',
        message: '등록 하려는 선택지 개수와 점수의 개수가 동일하지 않습니다.',
    }
}