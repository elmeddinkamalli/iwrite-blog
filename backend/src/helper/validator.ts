import { validate } from "class-validator";
import { plainToClass } from "class-transformer";

// Validate requests dynamiclally by DTO class
export const validateRequest = async (DTO, BODY) => {
  const loginDto = plainToClass(DTO, BODY);
  const validated = await validate(loginDto);
  return validated.map((error) => Object.values(error.constraints)).flat();
};
