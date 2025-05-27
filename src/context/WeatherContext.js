import React, {
    createContext,
    useState,
    useContext,
    useEffect,
    useCallback,
    useRef,
  } from 'react';
  
  const WeatherContext = createContext();
  
  export const useWeather = () => {
    const context = useContext(WeatherContext);
    if (context === undefined) {
      throw new Error('useWeather must be used within a WeatherProvider');
    }
    return context;
  };
  
  export const WeatherProvider = ({ children }) => {
    const [currentWeatherData, setCurrentWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [lastSearchedCity, setLastSearchedCity] = useState('');
    const [unit, setUnit] = useState(() => localStorage.getItem('weatherUnit') || 'metric');
  
    const isInitialMount = useRef(true);
    const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;
  
    const fetchWeatherData = useCallback(
      async (city, options = { manual: false, silent: false }) => {
        if (!city) return;
  
        const { manual = false, silent = false } = options;
  
        if (manual && !silent) setIsLoading(true);
        setError(null);
  
        try {
          if (!API_KEY) throw new Error("Missing OpenWeatherMap API key");
  
          const encodedCity = encodeURIComponent(city.trim());
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${encodedCity}&appid=${API_KEY}&units=${unit}`
          );
  
          if (!response.ok) {
            let message = 'Something went wrong';
            if (response.status === 404) message = 'City not found';
            else if (response.status === 401) message = 'Invalid API key';
            else {
              const err = await response.json();
              message = err?.message || message;
            }
            throw new Error(message);
          }
  
          const data = await response.json();
          setCurrentWeatherData(data);
  
          // Only update city if it was searched manually
          if (manual || isInitialMount.current) {
            setLastSearchedCity(city);
          }
        } catch (err) {
          console.error("Weather fetch error:", err);
          setError(err.message || 'Error fetching data');
          setCurrentWeatherData(null);
          setForecastData(null);
        } finally {
          if (manual && !silent) setIsLoading(false);
        }
      },
      [API_KEY, unit]
    );
  
    const fetchForecastData = useCallback(
      async (city) => {
        if (!city) return;
  
        try {
          const encodedCity = encodeURIComponent(city.trim());
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${encodedCity}&appid=${API_KEY}&units=${unit}`
          );
  
          if (!response.ok) {
            const err = await response.json();
            throw new Error(err?.message || 'Forecast fetch failed');
          }
  
          const data = await response.json();
          setForecastData(data);
        } catch (err) {
          console.error("Forecast fetch error:", err);
          setForecastData(null);
        }
      },
      [API_KEY, unit]
    );
  
    useEffect(() => {
      const city = localStorage.getItem('lastSearchedCity');
      if (city) {
        setLastSearchedCity(city);
        fetchWeatherData(city, { manual: false, silent: true });
      }
      isInitialMount.current = false;
    }, [fetchWeatherData]);
  
    useEffect(() => {
      if (
        currentWeatherData &&
        lastSearchedCity &&
        currentWeatherData.name.toLowerCase() === lastSearchedCity.toLowerCase()
      ) {
        fetchForecastData(lastSearchedCity);
      }
    }, [currentWeatherData, lastSearchedCity, fetchForecastData]);
  
    useEffect(() => {
      localStorage.setItem('weatherUnit', unit);
    }, [unit]);
  
    useEffect(() => {
      if (lastSearchedCity) {
        localStorage.setItem('lastSearchedCity', lastSearchedCity);
      }
    }, [lastSearchedCity]);
  
    useEffect(() => {
      if (!isInitialMount.current && lastSearchedCity) {
        fetchWeatherData(lastSearchedCity, { manual: false, silent: true });
      }
    }, [unit, lastSearchedCity, fetchWeatherData]);
  
    useEffect(() => {
      if (!lastSearchedCity || isLoading || error) return;
  
      const interval = setInterval(() => {
        fetchWeatherData(lastSearchedCity, { manual: false, silent: true });
      }, 30000);
  
      return () => clearInterval(interval);
    }, [lastSearchedCity, fetchWeatherData, isLoading, error]);
  
    const contextValue = {
      currentWeatherData,
      forecastData,
      isLoading,
      error,
      lastSearchedCity,
      unit,
      setUnit,
      fetchWeatherData: (city) => fetchWeatherData(city, { manual: true }),
    };
  
    return (
      <WeatherContext.Provider value={contextValue}>
        {children}
      </WeatherContext.Provider>
    );
  };
  