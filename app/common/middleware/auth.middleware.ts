import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../service/database.service";
import { User } from "../entity/user";
import asyncHandler from "express-async-handler";

// Extend Request type to include user property
export interface AuthRequest extends Request {
  user?: any;
}

const userRepo = AppDataSource.getRepository(User);

//  Authenticate JWT Access Token
export const authenticate = asyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {

      res
        .status(401)
        .json({ message: "Token not found", success: false });
      return
    }

    try {
      const decoded = await jwt.verify(token, process.env.JWT_SECRET!);
      const user = await userRepo.findOne({ where: { id: (decoded as any).id } });

      if (!user) {
        res
          .status(401)
          .json({ message: "invalid token", success: false });
        return
      }

      req.user = user;
      next();
    } catch (err) {
      res.status(401).json({ message: "Invalid Token", success: false });
    }
  }
);
