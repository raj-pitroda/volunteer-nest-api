import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Rating } from "./Rating";
import { Mission } from "./Mission";
import { City } from "./City";
import { Country } from "./Country";

@Index("PK_User", ["id"], { unique: true })
@Entity("User", { schema: "dbo" })
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

  @OneToMany(() => Rating, (rating) => rating.rateBy)
  ratings: Rating[];

  @ManyToOne(() => Mission, (mission) => mission.users)
  @JoinColumn([{ name: "missionId", referencedColumnName: "id" }])
  mission: Mission;

  @ManyToOne(() => City, (city) => city.users)
  @JoinColumn([{ name: "cityId", referencedColumnName: "id" }])
  city: City;

  @ManyToOne(() => Country, (country) => country.users)
  @JoinColumn([{ name: "countryId", referencedColumnName: "id" }])
  country: Country;
}
