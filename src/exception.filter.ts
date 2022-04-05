import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ValidationError } from 'sequelize';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | Record<string, any>;
    if (exception instanceof HttpException) {
      message = exception.getResponse();
    }
    if (exception instanceof ValidationError) {
      message = exception.message;
    }
    console.log(message);
    response.status(status).json({
      status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    });
  }
}
