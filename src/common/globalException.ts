export const apkError = (
  code: HttpStatus,
  customMessage?: string | string[],
) => {
  throw {
    code,
    messages: customMessage
      ? typeof customMessage === "string"
        ? [customMessage]
        : customMessage
      : "Something went wrong...",
  };
};

import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { Request, Response } from "express";
import { QueryFailedError } from "typeorm";

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    console.log("custom-global exception", exception);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const request = ctx.getRequest<Request>();
    let errorResult = {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      messages: [
        "There is some error while processing this request. Please try again.",
      ],
    };

    //1st if for our custom apkError
    if (exception.messages) {
      errorResult = {
        statusCode: exception.code,
        messages: exception.messages,
      };
    } //2st else if for class validator using dto, it's instance of HttpException but message is lies inside exception.response.message
    // so we need to add this before last ele if
    else if (exception && exception.response && exception.response.statusCode) {
      errorResult.messages = [exception.response.message];
      errorResult.statusCode = exception.response.statusCode;
    } // directly throws new HTTPException or some exception create by nest js will handle here
    else if (exception instanceof HttpException) {
      errorResult = {
        statusCode: (exception as HttpException).getStatus(),
        messages: [exception.message],
      };
    } else if (exception instanceof QueryFailedError) {
      errorResult = {
        statusCode: 500,
        messages: ["Query builder error", exception.message],
      };
    } else if (exception.message) {
      errorResult = {
        statusCode: 500,
        messages: [exception.message],
      };
    }

    const status = typeof exception.code === "number" ? exception.code : 500;
    response.status(status).json({
      ...errorResult,
      path: request.url,
    });
  }
}
