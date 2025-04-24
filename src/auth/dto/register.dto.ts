import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

/**
 * @class RegisterDto
 * @description Data transfer object for user registration
 * @pattern Data Transfer Object - Validates and structures registration data
 * @structure { name: string, email: string, password: string }
 * @author Nestor Quiñones
 */
export class RegisterDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string;
}
