import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Likes } from "./like";
import { Post } from "./post";
import { Follow } from "./follow";
import { Comment } from "./comment";


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => Follow, (follow) => follow.follower)
  following: Follow[];

  @OneToMany(() => Follow, (follow) => follow.following)
  followers: Follow[];

  @OneToMany(() => Likes, (like) => like.user)
  like: Likes[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];
}
