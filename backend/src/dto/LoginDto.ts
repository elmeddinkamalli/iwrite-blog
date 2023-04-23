import { IsNotEmpty } from "class-validator";

// DTO for login
export class LoginDto {
  @IsNotEmpty()
  usernameOrEmail: string;

  @IsNotEmpty()
  password: string;
}
