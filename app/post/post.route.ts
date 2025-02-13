
import { Router } from "express";
import * as postController from "./post.controller";
import { authenticate } from "../common/middleware/auth.middleware";
import upload from "../common/helper/config.multer";


const router = Router();

router.post("/create-post", authenticate, upload.single("mediaUrl"), postController.createPost).post("/like-post", authenticate, postController.likePost).post("/comment", authenticate, postController.commentOnPost)

export default router;

