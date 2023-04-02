import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Mission } from "./Mission";

@Index("PK_Category", ["id"], { unique: true })
@Entity("Category", { schema: "dbo" })
export class Category {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 50 })
  name: string;

  @OneToMany(() => Mission, (mission) => mission.category)
  missions: Mission[];
}
