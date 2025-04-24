import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    mongo: {
        uri: process.env.MONGO_URI,
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN,
    },
    weatherApi: {
        key: process.env.WEATHER_API_KEY,
        baseUrl: process.env.WEATHER_API_BASE_URL,
    },
}));