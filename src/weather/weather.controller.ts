import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { ApiResponse } from 'src/common/utils/api-response.util';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

/**
 * @class WeatherController
 * @description Endpoints for weather data and location services
 * @structure { getWeather(), autocomplete() }
 * @author Nestor Quiñones
 */

@ApiTags('weather')
@Controller('weather')
export class WeatherController {
    constructor(private weatherService: WeatherService) {}

    @Get()
    @UseGuards(JwtAuthGuard)  
    @ApiBearerAuth()          
    @ApiOperation({ summary: 'Get weather by city' })
    @ApiQuery({ name: 'city', required: true, type: String })
    async getWeather(@Query('city') city: string): Promise<ApiResponse<any>> {
        return this.weatherService.getWeather(city);
    }

    @Get('autocomplete')
    @UseGuards(JwtAuthGuard)  
    @ApiBearerAuth()          
    @ApiOperation({ summary: 'Autocomplete city names' })
    @ApiQuery({ name: 'query', required: true, type: String })
    async autocomplete(@Query('query') query: string): Promise<ApiResponse<any>> {
        return this.weatherService.autocomplete(query);
    }
}
