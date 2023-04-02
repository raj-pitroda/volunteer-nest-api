import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { City } from "./city.entity";
import { User } from "./user.entity";

@Entity("Country")
export class Country {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Column("varchar", { length: 50 })
  country_name: string;

  @OneToMany(() => City, (city) => city.country)
  cities: City[];

  @OneToMany(() => User, (user) => user.country)
  users: User[];
}
