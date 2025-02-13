import expressAsyncHandler from "express-async-handler";
import { NextFunction, Request, Response } from "express";
import { User } from "../common/entity/user";
import { Follow } from "../common/entity/follow";
import { AppDataSource } from "../common/service/database.service";

// Follow user
export const followUser = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {

    const { followerId, followingId } = req.body;

    if (followerId === followingId) {
        res.status(400).json({ message: "You cannot follow yourself" });
        return
    }

    const follower = await AppDataSource.getRepository(User).findOne({ where: { id: followerId } });
    const following = await AppDataSource.getRepository(User).findOne({ where: { id: followingId } });
    if (!follower || !following) {
        res.status(404).json({ message: "User not found" });
        return
    }

    const existingFollow = await AppDataSource.getRepository(Follow).findOne({ where: { follower, following } });
    if (existingFollow) {
        res.status(400).json({ message: "Already following this user" });
        return
    }

    const follow = AppDataSource.getRepository(Follow).create({ follower, following });
    await AppDataSource.getRepository(Follow).save(follow);

    res.status(201).json({
        success: true,
        message: "following user",
        data: follow
    });
    return next();

})

// Unfollow user
export const unfollowUser = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { followerId, followingId } = req.body;

    const follow = await AppDataSource.getRepository(Follow).findOne({ where: { follower: followerId, following: followingId } });
    if (!follow) {
        res.status(404).json({ message: "Follow relationship not found" });
        return
    }

    const updatedFollowers = await AppDataSource.getRepository(Follow).find({
        where: { following: { id: followingId } },
        relations: ["follower"]
    });

    res.status(201).json({ success: true, message: "Successfully unfollowed user", data: updatedFollowers });
    return next();

})

