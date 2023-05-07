import {
  ExecutionContext,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { apkError } from "src/common/globalException";
import { IS_PUBLIC_KEY } from "../constant";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  constructor(private reflector: Reflector) {
    super();
  }
  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Add your custom authentication logic here
    // for example, call super.logIn(request) to establish a session.
    return isPublic ? true : super.canActivate(context);
  }

  handleRequest(err, user, info) {
    // You can throw an exception based on either "info" or "err" arguments
    // if (err || !user) {
    //   throw err || new UnauthorizedException();
    // }
    //above commented code is default code you can compare with https://docs.nestjs.com/recipes/passport#implementing-passport-strategies

    if (!user && info) {
      apkError(HttpStatus.UNAUTHORIZED, ["Unauthorized", info.toString()]);
    } else if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
