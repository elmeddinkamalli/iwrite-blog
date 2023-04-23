import { IsNotEmpty, Equals, IsEmail } from "class-validator";
import { Type } from "class-transformer";
interface FileObject {
  path: string;
}

// DTO for creating new blog post
export class CreateBlogDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @Type(() => Object)
  image: FileObject;

  userId?: number;
}
