import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiResponse as ApiSwaggerResponse } from '@nestjs/swagger';
import { ApiResponse } from 'src/common/utils/api-response.util';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

/**
 * @class AuthController
 * @description Authentication endpoints for user login and registration
 * @pattern REST API Controller - Handles HTTP requests/responses
 * @structure { login(), register() }
 * @author Nestor Quiñones
 */

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    @ApiOperation({ summary: 'User login' })
    @ApiSwaggerResponse({ status: 200, description: 'Login successful' })
    @ApiSwaggerResponse({ status: 401, description: 'Invalid credentials' })
    async login(@Body() loginDto: LoginDto): Promise<ApiResponse<{ access_token: string }>> {
        return this.authService.login(loginDto);
    }

    @Post('register')
    @ApiOperation({ summary: 'User registration' })
    @ApiSwaggerResponse({ status: 201, description: 'User registered successfully' })
    @ApiSwaggerResponse({ status: 400, description: 'Email already in use' })
    async register(@Body() registerDto: RegisterDto): Promise<ApiResponse<{ access_token: string }>> {
        return this.authService.register(registerDto);
    }
}
