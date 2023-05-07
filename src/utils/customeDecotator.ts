import { SetMetadata } from "@nestjs/common";
import { IS_PUBLIC_KEY, ROLES_KEY } from "./constant";

export const PublicDecorator = () => SetMetadata(IS_PUBLIC_KEY, true);

export const RoleDecorator = (roles: string) => SetMetadata(ROLES_KEY, roles);
