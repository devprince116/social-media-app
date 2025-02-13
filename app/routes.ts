import express from "express";
import authRoutes from "./auth/auth.route";
import userRoutes from "./user/user.route";
import postRoutes from "./post/post.route";

// routes
const router = express.Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/post", postRoutes);

export default router;
