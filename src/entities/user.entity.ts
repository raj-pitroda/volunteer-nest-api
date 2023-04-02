import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { City } from "./city.entity";
import { Country } from "./country.entity";

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

  @ManyToOne(() => City, (city) => city.users)
  city: City;

  @ManyToOne(() => Country, (country) => country.users)
  country: Country;
}
