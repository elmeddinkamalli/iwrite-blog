import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./User";

// Blog model entity
@Entity()
export class Blog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @Column({ nullable: true })
  userId: number;

  @ManyToOne(() => User, (user) => user.blogs)
  user: User;

  @Column({ default: 0 })
  views: number;

  @Column({ default: true })
  isPublished: boolean;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updatedAt: Date;

  get imageUrl(): string {
    return `${process.env.BASE_URL}/uploads/blogs/${this.image}`;
  }

  toJSON() {
    const { ...result } = this;
    return { ...result, image: this.imageUrl };
  }
}
