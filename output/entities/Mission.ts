import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { City } from "./City";
import { Category } from "./Category";
import { User } from "./User";

@Index("PK_Mission", ["id"], { unique: true })
@Entity("Mission", { schema: "dbo" })
export class Mission {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "title", length: 200 })
  title: string;

  @Column("varchar", { name: "description" })
  description: string;

  @Column("date", { name: "startDate" })
  startDate: Date;

  @Column("date", { name: "endDate" })
  endDate: Date;

  @ManyToOne(() => City, (city) => city.missions)
  @JoinColumn([{ name: "cityId", referencedColumnName: "id" }])
  city: City;

  @ManyToOne(() => Category, (category) => category.missions)
  @JoinColumn([{ name: "categoryId", referencedColumnName: "id" }])
  category: Category;

  @OneToMany(() => User, (user) => user.mission)
  users: User[];
}
