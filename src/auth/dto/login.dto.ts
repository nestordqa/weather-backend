import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

/**
 * @class LoginDto
 * @description Data transfer object for user authentication
 * @pattern Data Transfer Object - Validates and structures login credentials
 * @structure { email: string, password: string }
 * @author Nestor Quiñones
 */
export class LoginDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}
