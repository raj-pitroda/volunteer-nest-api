import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Country } from "./Country";
import { Mission } from "./Mission";
import { User } from "./User";

@Index("PK_City", ["id"], { unique: true })
@Entity("City", { schema: "dbo" })
export class City {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "city_name", length: 50 })
  cityName: string;

  @Column("int")
  countryId: string;

  @ManyToOne(() => Country, (country) => country.cities)
  @JoinColumn([{ name: "countryId", referencedColumnName: "id" }])
  country: Country;

  @OneToMany(() => Mission, (mission) => mission.city)
  missions: Mission[];

  @OneToMany(() => User, (user) => user.city)
  users: User[];
}
