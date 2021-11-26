import { IsNotEmpty } from "class-validator";

export class loginAdminDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
