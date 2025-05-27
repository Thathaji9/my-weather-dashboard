import React, { memo, useState } from 'react';
import { useWeather } from '../context/WeatherContext';
import { TextField, Button, CircularProgress, ToggleButton, ToggleButtonGroup, Box } from '@mui/material';
import styled from 'styled-components';

const SearchFormContainer = styled.form`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  align-items: center;

  @media (max-width: 600px) {
    flex-direction: column;
    width: 100%;
  }
`;

export const SearchBar = memo(() => {
  const { fetchWeatherData, isLoading, unit, setUnit } = useWeather();
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeatherData(city.trim());
    }
  };

  const handleUnitChange = (event, newUnit) => {
    if (newUnit !== null) {
      setUnit(newUnit);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
      <SearchFormContainer onSubmit={handleSubmit}>
        <TextField
          label="Enter city name..."
          variant="outlined"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          disabled={isLoading}
          sx={{ width: { xs: '100%', sm: '300px' } }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isLoading}
          size="large"
          endIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null}
        >
          {isLoading ? 'Searching...' : 'Search'}
        </Button>
      </SearchFormContainer>
      <Box sx={{ display: 'flex', alignItems: 'center',  marginBottom: '25px' }}>
        <ToggleButtonGroup
          value={unit}
          exclusive
          onChange={handleUnitChange}
          aria-label="weather unit"
          size="medium"
          color="standard"
        >
          <ToggleButton value="metric" aria-label="celsius">
            °C
          </ToggleButton>
          <ToggleButton value="imperial" aria-label="fahrenheit">
            °F
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
    </Box>
  );
});