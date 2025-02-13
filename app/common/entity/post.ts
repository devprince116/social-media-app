import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { User } from "./user";
import { Comment } from "./comment";
import { Likes } from "./like";

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column({ nullable: true })
  mediaUrl: string;

  @ManyToOne(() => User, (user) => user.posts, { cascade: true, eager: true })
  user: User;

  @OneToMany(() => Likes, (like) => like.post, { cascade: true, eager: true })
  likes: Likes[];

  @OneToMany(() => Comment, (comment) => comment.post, { cascade: true, eager: true })
  comments: Comment[];
}
