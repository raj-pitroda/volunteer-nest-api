import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { User } from "./User";

@Index("PK_Rating", ["id"], { unique: true })
@Entity("Rating", { schema: "dbo" })
export class Rating {
  @Column("int", { primary: true, name: "id" })
  id: number;

  @Column("smallint", { name: "rating" })
  rating: number;

  @ManyToOne(() => User, (user) => user.ratings)
  @JoinColumn([{ name: "rateBy", referencedColumnName: "id" }])
  rateBy: User;
}
