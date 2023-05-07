import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity("Role")
export class Role {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "roleName", length: 50 })
  roleName: string;

  @OneToMany(() => User, (user) => user.role)
  users: User;
}
