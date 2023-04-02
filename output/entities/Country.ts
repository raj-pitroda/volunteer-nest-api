import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { City } from "./City";
import { User } from "./User";

@Index("PK_Country", ["id"], { unique: true })
@Entity("Country", { schema: "dbo" })
export class Country {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "country_name", length: 50 })
  countryName: string;

  @OneToMany(() => City, (city) => city.country)
  cities: City[];

  @OneToMany(() => User, (user) => user.country)
  users: User[];
}
