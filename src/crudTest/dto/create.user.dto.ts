import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDto {
    id: string

    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    city: string

    @IsNotEmpty()
    year: string

    @IsOptional()
    role: string

    @IsNotEmpty()
    @IsBoolean()
    active: string
    
}
export class updateUserDto {
    @IsOptional()
    name: string
    
    @IsOptional()
    city: string
    
    @IsOptional()
    year: string
    
    @IsOptional()
    active: string
    
}

