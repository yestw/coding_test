import { HttpException, HttpStatus } from "@nestjs/common";
import { ExceptionObj } from "./exception.obj";

export class CustomException extends HttpException {
    constructor(exceptionObj: ExceptionObj) {
        super(exceptionObj, HttpStatus.BAD_REQUEST);
    }
}