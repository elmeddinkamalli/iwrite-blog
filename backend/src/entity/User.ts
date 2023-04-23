import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Blog } from "./Blog";

// User model entity
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  firstName?: string;

  @Column({ nullable: true })
  lastName?: string;

  @Column({ nullable: true })
  age?: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updatedAt: Date;

  @OneToMany(() => Blog, (blog) => blog.user)
  blogs: Blog[];

  get fullName(): string {
    return this.firstName || this.lastName
      ? `${this.firstName ?? ""} ${this.lastName ?? ""}`
      : "No name";
  }

  toJSON() {
    const { password, ...result } = this;
    return { ...result, fullName: this.fullName };
  }
}
