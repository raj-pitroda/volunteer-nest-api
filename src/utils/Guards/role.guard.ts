import {
  CanActivate,
  ExecutionContext,
  Injectable,
  HttpStatus,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "../constant";
import { RoleService } from "src/modules/role/role.service";
import { User } from "src/entities/user.entity";
import { apkError } from "src/common/globalException";

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly roleService: RoleService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const role = this.reflector.get<string>(ROLES_KEY, context.getHandler());

    if (!role) {
      return true;
    } else {
      const tokenUser: User = context.switchToHttp().getRequest()?.user;
      const dbUser = await this.roleService.getRoleById(tokenUser.roleId);
      return dbUser.roleName?.toLowerCase() === role?.toLowerCase()
        ? true
        : apkError(
            HttpStatus.FORBIDDEN,
            `Only ${role} Role can access this Method.`,
          );
    }
  }
}
