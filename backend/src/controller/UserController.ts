import { AppDataSource } from "../config/data-source";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
import { UserService } from "../services/UserService";
import { AuthService } from "../services/AuthService";
import { LoginDto } from "../dto/LoginDto";
import { validateRequest } from "../helper/validator";
import { RegisterDto } from "../dto/RegisterDto";
interface Updateable {
  firstName?: string;
  lastName?: string;
  age?: number;
  email?: string;
  username?: string;
}

// Controller for user
export class UserController {
  private userRepository = AppDataSource.getRepository(User);
  private readonly userService: UserService;
  private readonly authService: AuthService;

  constructor() {
    this.userService = new UserService(this.userRepository);
    this.authService = new AuthService();
  }

  // Get all user data
  async all(request: Request, response: Response, next: NextFunction) {
    try {
      const users = await this.userRepository.find({
        select: ["firstName", "lastName", "age", "username"],
      });

      return response.json(users);
    } catch (error) {
      return response.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  }

  // Get one spesific user datat via id number
  async one(request: Request, response: Response, next: NextFunction) {
    try {
      const id = parseInt(request.params.id);
      const user = await this.userService.getUserById(id);
      return response.status(200).json(user);
    } catch (error) {
      return response.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  }

  // Get auth user data
  async me(request: Request, response: Response, next: NextFunction) {
    try {
      const authUser: User = request["user"] as User;

      const user = await this.userService.getUserById(authUser.id);
      return response.status(200).json(user);
    } catch (error) {
      return response.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  }

  // Update user data via id number
  async update(request: Request, response: Response, next: NextFunction) {
    try {
      const authUser: User = request["user"] as User;
      const id = Number(request.params.id);

      if (id != authUser?.id) {
        return response.status(401).json({ message: "Can not update" });
      }

      const updateable: Updateable = {
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        age: request.body.age,
        email: request.body.email,
        username: request.body.username,
      };

      const user: User = await this.userService.updateUser(id, updateable);

      return response.status(200).json(user);
    } catch (error) {
      return response.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  }

  // Remove user data
  async remove(request: Request, response: Response, next: NextFunction) {
    try {
      const authUser: User = request["user"] as User;
      const id = parseInt(request.params.id);
      if (id != authUser?.id) {
        return response.status(401).json({ message: "Not authorized" });
      }

      let userToRemove = await this.userRepository.findOneBy({ id });

      if (!userToRemove) {
        return response.status(401).json({ message: "User not found" });
      }

      await this.userRepository.remove(userToRemove);
      return response.status(204).send();
    } catch (error) {
      return response.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  }

  // Register new user
  async register(req: Request, res: Response) {
    const errors = await validateRequest(RegisterDto, req.body);

    if (errors.length > 0) {
      return res.status(400).json({ message: "Validation failed", errors });
    }

    const userDetails: RegisterDto = req.body;

    try {
      const user = await this.userService.register(userDetails);
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  }

  // Login
  async login(req: Request, res: Response) {
    try {
      const errors = await validateRequest(LoginDto, req.body);

      if (errors.length > 0) {
        return res.status(400).json({ message: "Validation failed", errors });
      }

      const { usernameOrEmail, password } = req.body;
      const user = await this.userService.login(usernameOrEmail, password);

      const token = await this.authService.generateToken(user);

      return res.status(200).json({
        access_token: token,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  }
}
