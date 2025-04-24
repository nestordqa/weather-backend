import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

/**
 * @class JwtAuthGuard
 * @description JWT authentication guard for route protection
 * @structure { canActivate(), extractTokenFromHeader() }
 * @author Nestor Quiñones
 */

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    /** Validates jwt */
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        
        if (!token) throw new UnauthorizedException('Token no proporcionado');

        try {
            request.user = this.jwtService.verify(token);
            return true;
        } catch {
            throw new UnauthorizedException('Token inválido o expirado');
        }
    }

    /** Gets token from header */
    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
