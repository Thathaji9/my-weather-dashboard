import React, { memo } from 'react';
import { useWeather } from '../context/WeatherContext';
import {
    Card,
    CardContent,
    Typography,
    Box,
} from '@mui/material';
import styled from 'styled-components';
import {
    capitalizeWords,
    formatLocalTime,
    formatCurrentDate,
    formatForecastDay,
    processForecastData
} from '../utils/weatherUtils';

const WeatherCardStyled = styled(Card)(({ theme }) => ({
    borderTop: `5px solid ${theme.palette.primary.main}`,
    margin: '20px auto',
    maxWidth: '800px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    borderRadius: '12px',
    overflow: 'hidden',
    position: 'relative',
}));

export const WeatherDisplay = memo(() => {
    const { currentWeatherData, error, lastSearchedCity, unit, forecastData } = useWeather();
  
    if (!currentWeatherData && !forecastData && !error && !lastSearchedCity) {
      return (
        <Typography variant="body1" align="center" sx={{ mt: 3, fontStyle: 'italic', color: '#666' }}>
          Start by searching for a city above!
        </Typography>
      );
    }
  
    if (error) {
        return null;
    }

    if (!currentWeatherData && !forecastData) {
        return null;
    }
  
    const iconCode = currentWeatherData?.weather[0]?.icon;
    const iconUrl = iconCode ? `https://openweathermap.org/img/wn/${iconCode}@4x.png` : '';
  
    const localTime = currentWeatherData?.dt && currentWeatherData?.timezone
        ? formatLocalTime(currentWeatherData.dt, currentWeatherData.timezone)
        : '';
    const currentDateFormatted = currentWeatherData?.dt
        ? formatCurrentDate(currentWeatherData.dt)
        : '';

    const processedForecasts = processForecastData(forecastData?.list);

    return (
        <WeatherCardStyled>
            <CardContent sx={{ position: 'relative', pt: '80px', pb: '20px', overflow: 'hidden' }}>
                <Typography variant="h5" component="h2" sx={{
                    position: 'absolute', top: 20, left: 20,
                    color: '#333', fontWeight: 'bold', textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
                }}>
                    {currentWeatherData?.name}
                </Typography>
                <Box sx={{ position: 'absolute', top: 20, right: 20, textAlign: 'right' }}>
                    <Typography variant="subtitle1" component="div" sx={{ color: '#555', fontWeight: 'bold' }}>
                        {currentWeatherData?.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#666' }}>
                        {localTime}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                    {iconUrl && (
                        <Box component="img" src={iconUrl} alt={currentWeatherData?.weather[0]?.description}
                            sx={{ width: 120, height: 120 }}
                        />
                    )}
                    <Typography variant="h6" sx={{ fontSize: '1.4em', fontWeight: 'bold', color: '#555', textTransform: 'capitalize' }}>
                        {capitalizeWords(currentWeatherData?.weather[0]?.description || '')}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                        <Typography variant="h2" component="span" sx={{ fontWeight: 'bold', mr: 0.5, color: '#333' }}>
                            {Math.round(currentWeatherData?.main?.temp || 0)}°
                        </Typography>
                        <Typography variant="h5" component="span" sx={{ color: '#666', mb: 0.5 }}>
                            {unit === 'metric' ? 'C' : 'F'}
                        </Typography>
                    </Box>
                    <Typography variant="body1" sx={{ color: '#666' }}>
                        {currentDateFormatted}
                    </Typography>
                </Box>
            </CardContent>

            <CardContent sx={{ borderTop: '1px solid #eee', pt: 3, pb: 2, overflowX: 'auto', display: 'flex', justifyContent: 'space-between' }}>
                {processedForecasts.map((day, index) => (
                    <Box key={day.dt} sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        flexShrink: 0,
                        width: '18%',
                        minWidth: '90px',
                        py: 1,
                        px: 0.5,
                        '&:hover': {
                            backgroundColor: 'rgba(0,0,0,0.03)',
                            borderRadius: '8px',
                            transition: 'background-color 0.2s ease-in-out'
                        }
                    }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#555' }}>
                            {index === 0 ? 'Today' : formatForecastDay(day.dt)}
                        </Typography>
                        {day.icon && (
                            <Box component="img" src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`} alt={day.description}
                                sx={{ width: 40, height: 40, my: 0.5 }}
                            />
                        )}
                        <Typography variant="body2" sx={{ textTransform: 'capitalize', fontSize: '0.8em', color: '#777', textAlign: 'center' }}>
                            {day.description}
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 0.5 }}>
                            {day.temp}°{unit === 'metric' ? 'C' : 'F'}
                        </Typography>
                    </Box>
                ))}
            </CardContent>
            <Typography variant="caption" display="block" sx={{
                    fontSize: '0.85em', color: '#888', borderTop: '1px dashed #eee', padding: '20px'
                }}>
                    Data accurate as of: {new Date((currentWeatherData?.dt || 0) * 1000).toLocaleTimeString()}
                </Typography>
        </WeatherCardStyled>
    );
});