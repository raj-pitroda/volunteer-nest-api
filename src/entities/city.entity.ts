import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Country } from "./country.entity";
import { User } from "./user.entity";

@Entity("City")
export class City {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Column("varchar", { length: 50 })
  city_name: string;

  @ManyToOne(() => Country, (country) => country.cities)
  @JoinColumn([{ name: "countryId", referencedColumnName: "id" }])
  country: Country;

  // @OneToMany(() => Mission, (mission) => mission.city)
  // missions: Mission[];

  @OneToMany(() => User, (user) => user.city)
  users: User[];
}
