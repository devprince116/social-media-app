import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../service/database.service";
import { User } from "../entity/user";
import asyncHandler from "express-async-handler";

// Extend Request type to include user property
export interface AuthRequest extends Request {
  user?: User;
}

//  Authenticate JWT Access Token
export const authenticate = asyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.header("Authorization")?.split(" ")[1];
    const userRepo = await AppDataSource.getRepository(User);

    if (!token) {
      res.status(401).json({ message: "Token not found", success: false });
      return
    }

    // Verify token
    const decoded = await jwt.verify(token, process.env.JWT_SECRET!) as { id: number };
    // console.log(typeof (decoded.id), decoded.id)

    // Check if decoded data contains 'id'
    if (!decoded || !decoded.id) {
      res.status(401).json({ message: "Invalid Token Data", success: false });
      return
    }

    const userId = Number(decoded.id);
    if (isNaN(userId)) {
      res.status(401).json({ message: "Invalid Token Data", success: false });
      return
    }

    // Fetch user by ID
    // console.log(decoded.id)
    const user = await userRepo.findOne({ where: { id: userId } })

    if (!user) {
      res.status(401).json({ message: "Invalid token - User not found", success: false });
      return
    }

    req.user = user; // Attach user to request
    return next();

  }
);
