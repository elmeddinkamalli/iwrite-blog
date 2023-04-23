import { Repository } from "typeorm";
import { User } from "../entity/User";
import { AuthService } from "./AuthService";
import { RegisterDto } from "../dto/RegisterDto";

// User service some bussiness logic methods
export class UserService {
  private readonly userRepository: Repository<User>;
  private readonly authService: AuthService;

  constructor(userRepository: Repository<User>) {
    this.userRepository = userRepository;
    this.authService = new AuthService();
  }

  // Get user data by id
  async getUserById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (user) {
      delete user.password;
      return user;
    }
    throw new Error("User not found");
  }

  // Register new user
  async register(userData: RegisterDto): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      where: [{ email: userData.email }, { username: userData.username }],
    });
    if (existingUser) {
      throw new Error("User with this email or username already exists");
    }

    const hashedPassword = await this.authService.hashPassword(
      userData.password
    );

    const user = new User();
    user.username = userData.username;
    user.email = userData.email;
    user.firstName = userData.firstName;
    user.lastName = userData.lastName;
    user.password = hashedPassword;
    return this.userRepository.save(user);
  }

  // Login
  async login(emailOrUsername: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: [{ email: emailOrUsername }, { username: emailOrUsername }],
    });

    if (!user) {
      throw new Error("User not found");
    }

    const match = await this.authService.comparePassword(password, user);
    if (!match) {
      throw new Error("Invalid password");
    }

    delete user.password;

    return user;
  }

  // Update user data
  async updateUser(id: number, updates: Partial<User>): Promise<User> {
    const user = await this.userRepository.findOneOrFail({
      where: { id },
    });

    delete user.password;

    Object.assign(user, updates);
    return await this.userRepository.save(user);
  }
}
