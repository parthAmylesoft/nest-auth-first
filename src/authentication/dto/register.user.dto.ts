import { IsEmail, IsNotEmpty } from "class-validator";

export class RegisterUserDto {
    @IsNotEmpty()
    firstname: string;
  
    @IsNotEmpty()
    lastname: string;
  
    @IsNotEmpty()
    @IsEmail()
    email: string;
  
    @IsNotEmpty()
    password: string;
  
    @IsNotEmpty()
    hobby: string;
  
    @IsNotEmpty()
    role: string;
}