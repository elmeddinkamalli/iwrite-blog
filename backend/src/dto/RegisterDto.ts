import { IsNotEmpty, Equals, IsEmail } from "class-validator";

// DTO for registering to the application
export class RegisterDto {
  firstName: string;

  lastName: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  passwordConfirmation: string;
}
