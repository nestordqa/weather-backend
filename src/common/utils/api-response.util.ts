import { HttpStatus } from '@nestjs/common';

/**
 * @class ApiResponse<T>
 * @description Standardizes API responses using a factory pattern implementation
 * @template T - Type parameter for response data structure
 * @pattern Factory Pattern - Uses static methods for type-safe object creation
 * @structure { data: T, error: string|null, status: HttpStatus }
 * @author Nestor Quiñones
 */
export class ApiResponse<T> {
    // Core response properties
    data: T;
    error: string | null;
    status: HttpStatus;

    constructor(
        data: T,
        error: string | null = null,
        status: HttpStatus = HttpStatus.OK
    ) {
        this.data = data;
        this.error = error;
        this.status = status;
    }

    /** Factory method for successful responses */
    static success<T>(data: T, status: HttpStatus = HttpStatus.OK): ApiResponse<T> {
        return new ApiResponse(data, null, status);
    }

    /** Factory method for error responses */
    static error<T>(error: string, status: HttpStatus = HttpStatus.BAD_REQUEST): ApiResponse<T> {
        return new ApiResponse(null, error, status);
    }
}
