import { HttpException, Catch, ExceptionFilter, ArgumentsHost,  } from "@nestjs/common";
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    const status = exception.getStatus();
    const exceptionObj = exception.getResponse();

    response.status(status).json({
      error: {
        code: exceptionObj['code'],
        message: exceptionObj['message'],
      },
    });
  }
}