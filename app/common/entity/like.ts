import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./user";
import { Post } from "./post";

@Entity()
export class Likes {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.like)
  user: User;

  @ManyToOne(() => Post, (post) => post.likes)
  post: Post;
}
