import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ValidationError } from 'sequelize';

//Handling all the exceptions
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    //Here we can get all the data from host object
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();
    console.log(exception);
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
    //Sending the custom response for any exception
    response.status(status).json({
      status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    });
  }
}
