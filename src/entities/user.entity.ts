import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { City } from "./city.entity";
import { Country } from "./country.entity";
import { Role } from "./role.entity";

@Entity("User")
export class User {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "firstName", length: 50 })
  firstName: string;

  @Column("varchar", { name: "lastName", length: 50 })
  lastName: string;

  @Column("varchar", { name: "email", length: 50 })
  email: string;

  @Column("varchar", { name: "password", length: 50 })
  password: string;

  @Column("int", { name: "cityId" })
  cityId: number;

  @ManyToOne(() => City, (city) => city.users)
  @JoinColumn()
  city: City;

  @Column("int", { name: "countryId" })
  countryId: number;

  @ManyToOne(() => Country, (country) => country.users)
  @JoinColumn()
  country: Country;

  @Column("int", { name: "roleId" })
  roleId: number;

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn()
  role: Role;
}
