import React from 'react';
import { useWeather } from '../context/WeatherContext';
import { Alert, AlertTitle } from '@mui/material';
import styled from 'styled-components';
const ErrorContainer = styled.div`
  margin: auto;
  max-width: 450px;
`;

export const ErrorDisplay = () => {
  const { error } = useWeather();

  if (!error) {
    return null;
  }

  return (
    <ErrorContainer>
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {error}
      </Alert>
    </ErrorContainer>
  );
}