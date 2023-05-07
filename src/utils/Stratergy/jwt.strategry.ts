import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    // return {
    //   userId: payload.id,
    //   username: payload.firstName + " " + payload.lastName,
    // };
    //you can directly return anything based on payload and  then we can get this payload any where from request payload i.e. context.switchToHttp().getRequest()?.user or  request.user
    return { ...payload };
  }
}
