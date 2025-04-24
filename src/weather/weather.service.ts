import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { catchError, map } from 'rxjs/operators';
import { AxiosError } from 'axios';
import { throwError } from 'rxjs';
import { WeatherResponse } from './interfaces/weather.interface';
import { ApiResponse } from 'src/common/utils/api-response.util';
import { HttpService } from '@nestjs/axios';

/**
 * @class WeatherService
 * @description Service for weather data fetching and location autocomplete
 * @pattern Facade Pattern - Abstracts external API interactions
 * @structure { getWeather(), autocomplete() }
 * @author Nestor Quiñones
 */

@Injectable()
export class WeatherService {
    constructor(
        private readonly httpService: HttpService,
        private configService: ConfigService,
    ) {}

    /** Obtiene clima actual para ciudad específica */
    async getWeather(city: string): Promise<ApiResponse<WeatherResponse>> {
        const apiKey = this.configService.get('weatherApi.key');
        const baseUrl = this.configService.get('weatherApi.baseUrl');

        try {
            const response = await this.httpService
                .get(`${baseUrl}/current.json?key=${apiKey}&q=${city}`)
                .pipe(
                    map((res) => res.data),
                    catchError((error: AxiosError) => 
                        throwError(error.response?.status === 400 
                            ? new Error('City not found') 
                            : new Error('Error fetching weather data')
                        )
                    ),
                )
                .toPromise();

            return ApiResponse.success(response);
        } catch (error) {
            return ApiResponse.error(error.message, 400);
        }
    }

    /** Autocompleta nombres de ciudades */
    async autocomplete(query: string): Promise<ApiResponse<any>> {
        const apiKey = this.configService.get('weatherApi.key');
        const baseUrl = this.configService.get('weatherApi.baseUrl');

        try {
            const response = await this.httpService
                .get(`${baseUrl}/search.json?key=${apiKey}&q=${query}`)
                .pipe(
                    map((res) => res.data),
                    catchError(() => throwError(new Error('Error fetching autocomplete data'))),
                )
                .toPromise();

            return ApiResponse.success(response);
        } catch (error) {
            return ApiResponse.error(error.message, 400);
        }
    }
}
