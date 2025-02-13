
import { Router } from "express";
import * as userController from "./user.controller";
import { authenticate } from "../common/middleware/auth.middleware";

const router = Router();

router.post("/follow-user", authenticate, userController.followUser)
    .post("/unfollow-user", authenticate, userController.unfollowUser)

export default router;

