import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiResponse } from 'src/common/utils/api-response.util';
import { UsersService } from 'src/users/users.service';

/**
 * @class AuthService
 * @description Core authentication service handling user validation, JWT generation and credential management
 * @pattern Facade Pattern - Abstracts complex authentication flows
 * @structure { login(), register(), validateUser() }
 * @author Nestor Quiñones
 */
@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    /** Validates user credentials against stored hash */
    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findOneByEmail(email);
        if (user && (await bcrypt.compare(pass, user.password))) {
            const { password, ...result } = user;  // Remove sensitive data
            return result;
        }
        return null;
    }

    /** Authenticates user and generates JWT */
    async login(loginDto: LoginDto): Promise<ApiResponse<{ access_token: string }>> {
        const user = await this.validateUser(loginDto.email, loginDto.password);
        if (!user) {
            return ApiResponse.error('Invalid credentials', 401);
        }

        const payload = { email: user.email, sub: user._id };
        return ApiResponse.success({
            access_token: this.jwtService.sign(payload),  // Token generation
        });
    }

    /** Registers new user with password hashing */
    async register(registerDto: RegisterDto): Promise<ApiResponse<{ access_token: string }>> {
        const existingUser = await this.usersService.findOneByEmail(registerDto.email);
        if (existingUser) {
            return ApiResponse.error('Email already in use', 400);  // Conflict handling
        }

        const hashedPassword = await bcrypt.hash(registerDto.password, 10);
        const newUser = await this.usersService.create({
            ...registerDto,
            password: hashedPassword,
        });

        const payload = { email: newUser.email, sub: newUser._id };
        return ApiResponse.success({
            access_token: this.jwtService.sign(payload),  // Auto-login after register
        });
    }
}
