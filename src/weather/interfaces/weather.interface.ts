/**
 * @interface WeatherResponse
 * @description Structure for weather API response data
 * @structure { location: LocationData, current: CurrentWeather }
 * @author Nestor Quiñones
 */
export interface WeatherResponse {
    // Geographic location data
    location: {
        name: string;        
        region: string;      
        country: string;     
        lat: number;         
        lon: number;         
        tz_id: string;       
        localtime_epoch: number; 
        localtime: string;   
    };

    // Current weather metrics
    current: {
        temp_c: number;      
        temp_f: number;      
        condition: {         
            text: string;    
            icon: string;    
            code: number;    
        };
        wind_kph: number;    
        wind_degree: number; 
        wind_dir: string;    
        humidity: number;    
        cloud: number;       
        feelslike_c: number; 
        feelslike_f: number; 
    };
}
