import { IsNotEmpty, Equals, IsEmail } from "class-validator";
import { Type } from "class-transformer";
interface FileObject {
  path: string;
}

// DTO for updating blog data
export class UpdateBlogDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @Type(() => Object)
  image: FileObject;
}
