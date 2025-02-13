import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../common/service/database.service";

import multer from "multer";
import { User } from "../common/entity/user";
import { Post } from "../common/entity/post";
import { Likes } from "../common/entity/like";
import { Comment } from "../common/entity/comment";
import expressAsyncHandler from "express-async-handler";


// // Setup multer for media uploads
// const upload = multer({ dest: "uploads/" });

// Create Post Controller
export const createPost = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {

    // upload.single("media")
    const { content, userId } = req.body;
    const mediaUrl = req.file ? req.file.path : undefined;

    const user = await AppDataSource.getRepository(User).findOne({ where: { id: userId } });
    if (!user) {
        res.status(404).json({ succes: false, message: "User not found" });
        return
    }

    const post = AppDataSource.getRepository(Post).create({ content, mediaUrl, user });
    await AppDataSource.getRepository(Post).save(post);

    res.status(201).json(post);
    return next();

})

// lke post 
export const likePost = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {

        const { userId, postId } = req.body;

        const user = await AppDataSource.getRepository(User).findOne({
            where: { id: userId }
        });
        const post = await AppDataSource.getRepository(Post).findOne({ where: { id: postId } });
        if (!user || !post) {
            res.status(404).json({ message: "User or Post not found" });
            return
        }

        const existingLike = await AppDataSource.getRepository(Likes).findOne({ where: { user, post } });
        if (existingLike) {
            res.status(400).json({ message: "Post already liked" });
            return
        }

        const like = AppDataSource.getRepository(Likes).create({ user, post });
        await AppDataSource.getRepository(Likes).save(like);

        res.status(201).json({
            success: true,
            message: "Post liked successfully",
            like
        });
        return next();

    }
)

// comment on post
export const commentOnPost = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {

    const { userId, postId, content } = req.body;

    const user = await AppDataSource.getRepository(User).findOne({ where: { id: userId } });
    const post = await AppDataSource.getRepository(Post).findOne({ where: { id: postId } });
    if (!user || !post) {
        res.status(404).json({ message: "User or Post not found" });
        return
    }

    const comment = AppDataSource.getRepository(Comment).create({ content, user, post });
    await AppDataSource.getRepository(Comment).save(comment);

    res.status(201).json({
        success: true,
        message: "Commented on post successfully",
        comment
    });
    return next();

});