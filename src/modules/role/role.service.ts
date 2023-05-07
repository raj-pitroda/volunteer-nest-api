import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Role } from "src/entities/role.entity";
import { Repository } from "typeorm";

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}
  findAll = async (): Promise<[Role[], number]> => {
    return await this.roleRepository.findAndCount();
  };

  getRole = async (roleName: string): Promise<number> => {
    const role = await this.roleRepository
      .createQueryBuilder("r")
      .where(`LOWER(r.roleName) = '${roleName}'`)
      .getOne();

    return role ? role?.id : 0;
  };

  getRoleById = async (id: number): Promise<Role> => {
    return await this.roleRepository.findOneBy({ id });
  };
}
