import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { WeatherModule } from './weather/weather.module';

@Module({
  imports: [AuthModule, UsersModule, WeatherModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
