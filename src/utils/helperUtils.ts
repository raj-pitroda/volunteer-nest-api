import { applyDecorators, Controller, HttpStatus } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { apkError } from "src/common/globalException";
import * as CryptoAES from "crypto-js/aes";
import * as CryptoENC from "crypto-js/enc-utf8";

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

export const encryptString = (toEncrypt: string) => {
  const eruption: any = process.env.ENC_DEC_ERUPTION;

  const str: string = CryptoAES.encrypt(toEncrypt, eruption).toString();
  return str
    .replace(/\+/g, "p1L2u3S")
    .replace(/\//g, "s1L2a3S4h")
    .replace(/=/g, "e1Q2u3A4l");
};

export const decryptString = (toDecrypt: string) => {
  const eruption: any = process.env.ENC_DEC_ERUPTION;

  const text = CryptoAES.decrypt(
    toDecrypt
      .toString()
      .replace(/p1L2u3S/g, "+")
      .replace(/s1L2a3S4h/g, "/")
      .replace(/e1Q2u3A4l/g, "="),
    eruption,
  );

  return text.toString(CryptoENC);
};
