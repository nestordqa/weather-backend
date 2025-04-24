import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

/**
 * @class JwtStrategy
 * @description JWT authentication strategy for Passport.js
 * @pattern Strategy Pattern - Implements authentication logic
 * @structure { validate(payload: any): { userId: string, email: string } }
 * @author Nestor Quiñones
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false, //
            secretOrKey: configService.get('jwt.secret'),
        });
    }

    /** Transforms JWT payload into request.user object */
    async validate(payload: JwtPayload) {
        return { userId: payload.sub, email: payload.email }; // Standardized user object
    }
}
