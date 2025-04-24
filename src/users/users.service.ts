import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { ApiResponse } from 'src/common/utils/api-response.util';

/**
 * @class UsersService
 * @description User data access layer for MongoDB operations
 * @pattern Repository Pattern - Abstracts database interactions
 * @structure { create(), findOneByEmail(), findById() }
 * @author Nestor Quiñones
 */

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    /** Creates new user document */
    async create(user: Partial<User>): Promise<User> {
        const createdUser = new this.userModel(user);
        return createdUser.save();
    }

    /** Finds user by email (unique) */
    async findOneByEmail(email: string): Promise<User | null> {
        return this.userModel.findOne({ email }).exec();
    }

    /** Finds user by ID with standardized response */
    async findById(id: string): Promise<ApiResponse<User>> {
        const user = await this.userModel.findById(id).exec();
        if (!user) {
            return ApiResponse.error('User not found', 404);
        }
        return ApiResponse.success(user);
    }
}
