import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { User } from "../entity/User";
import { AppDataSource } from "../config/data-source";
const userRepository = AppDataSource.getRepository(User);

interface AuthenticatedRequest extends Request {
  user?: {
    username: String;
    email: String;
    id: Number;
  };
}

// Middleware for authorization needed endpoints
export const authMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "You need to login." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as {
      id: number;
      username: string;
      email: string;
    };

    const user = await userRepository.findOne({
      where: {
        id: decoded.id,
      },
    });

    if (!user) {
      return res
        .status(401)
        .json({ message: "Authentication failed. User not found." });
    }
    req.user = decoded;

    return next();
  } catch (error) {
    return res.status(401).json({ message: "Authentication failed." });
  }
};

// Middleware for unauthorization needed endpoints
export const notAuthMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return next();
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET) as {
      id: number;
      username: string;
      email: string;
    };
  } catch (error) {
    return next();
  }

  const user = await userRepository.findOne({
    where: {
      id: decoded.id,
    },
  });

  if (!user) {
    return next();
  }

  return res.status(401).json({ message: "Log out first" });
};
