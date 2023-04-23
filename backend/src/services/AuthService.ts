import { User } from "../entity/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Authentication service methods
export class AuthService {
  // Method for generating new jwt token for authentication
  async generateToken(user: User): Promise<string> {
    const payload = { email: user.email, username: user.username, id: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    return token;
  }

  // Method for hashing password from a plain string
  async hashPassword(password: string) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }

  // Method for comparing provided password with user password
  async comparePassword(password: string, user: User) {
    return await bcrypt.compare(password, user.password);
  }
}
