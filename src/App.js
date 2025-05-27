import React from 'react';
import { WeatherProvider } from './context/WeatherContext';
import { AppBar, Toolbar, Typography, Container, Box, createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material';
import { blue, lightBlue } from '@mui/material/colors';
import { ThemeProvider as ScThemeProvider } from 'styled-components';
import './App.css';
import { SearchBar } from './components/SearchBar';
import { ErrorDisplay } from './components/ErrorDisplay';
import { WeatherDisplay } from './components/WeatherDisplay';

const muiTheme = createTheme({
  palette: {
    primary: {
      main: blue[600],
    },
    secondary: {
      main: lightBlue[300],
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});

function App() {
  return (
    <MuiThemeProvider theme={muiTheme}>
      <ScThemeProvider theme={muiTheme}>
        <WeatherProvider>
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color="primary">
              <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'left' }}>
                  Weather Dashboard
                </Typography>
              </Toolbar>
            </AppBar>
            <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
              <SearchBar />
              <ErrorDisplay />
              <WeatherDisplay />
            </Container>
          </Box>
        </WeatherProvider>
      </ScThemeProvider>
    </MuiThemeProvider>
  );
}

export default App;