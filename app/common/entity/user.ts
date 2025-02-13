import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Likes } from "./like";
import { Post } from "./post";
import { Follow } from "./follow";
import { Comment } from "./comment";


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => Follow, (follow) => follow.follower, { cascade: true, eager: true })
  following: Follow[];

  @OneToMany(() => Follow, (follow) => follow.following, { cascade: true, eager: true })
  followers: Follow[];

  @OneToMany(() => Likes, (like) => like.user, { cascade: true, eager: true })
  like: Likes[];

  @OneToMany(() => Comment, (comment) => comment.user, { cascade: true, eager: true })
  comments: Comment[];
}
