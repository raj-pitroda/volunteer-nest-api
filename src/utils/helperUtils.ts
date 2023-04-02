import { applyDecorators, Controller, HttpStatus } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { apkError } from "src/common/globalException";

export function ApiController(tagName: string) {
  return applyDecorators(
    ApiTags(tagName),
    ApiBearerAuth(),
    Controller(tagName),
  );
}

export const apiResponse = (
  statusCode: number,
  data: any,
  messages?: string | string[],
) => {
  return {
    statusCode,
    data,
    messages: messages ? (Array.isArray(messages) ? messages : [messages]) : [],
  };
};

export const notFoundException = () => {
  throw apkError(HttpStatus.NOT_FOUND, "Record does not found.");
};
