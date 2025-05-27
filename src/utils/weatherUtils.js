export const capitalizeWords = (str) => {
    if (!str) return '';
    return str
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

export const formatLocalTime = (timestamp, timezoneOffsetSeconds) => {
    const date = new Date((timestamp + timezoneOffsetSeconds) * 1000);
    return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
        timeZone: 'UTC',
    });
};

export const formatCurrentDate = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp * 1000);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
    const dayOfMonth = date.getDate();
    const getDaySuffix = (day) => {
        if (day > 3 && day < 21) return 'th';
        switch (day % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    };
    return `${dayName} ${dayOfMonth}${getDaySuffix(dayOfMonth)}`;
};

export const formatForecastDay = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
};

export const processForecastData = (forecastList) => {
    if (!forecastList || forecastList.length === 0) return [];

    const dailyForecasts = {};

    forecastList.forEach(item => {
        const date = new Date(item.dt * 1000);
        const dayKey = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

        if (!dailyForecasts[dayKey]) {
            dailyForecasts[dayKey] = {
                temps: [],
                descriptions: [],
                icons: [],
                dt: item.dt,
            };
        }
        dailyForecasts[dayKey].temps.push(item.main?.temp || 0);
        dailyForecasts[dayKey].descriptions.push(item.weather?.[0]?.description || '');
        dailyForecasts[dayKey].icons.push(item.weather?.[0]?.icon || '');
    });

    return Object.keys(dailyForecasts).map(dayKey => {
        const dayData = dailyForecasts[dayKey];
        const maxTemp = Math.max(...dayData.temps);

        const midDayItem = forecastList.find(item => {
            const itemDate = new Date(item.dt * 1000);
            const itemDayKey = itemDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
            return itemDayKey === dayKey && itemDate.getHours() >= 12 && itemDate.getHours() < 18;
        }) || forecastList.find(item => {
            const itemDate = new Date(item.dt * 1000);
            return itemDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) === dayKey;
        });

        const primaryWeather = midDayItem?.weather?.[0]?.description || dayData.descriptions[0] || '';
        const primaryIcon = midDayItem?.weather?.[0]?.icon || dayData.icons[0] || '';

        return {
            day: dayKey,
            temp: Math.round(maxTemp),
            description: capitalizeWords(primaryWeather),
            icon: primaryIcon,
            dt: dayData.dt,
        };
    }).slice(0, 5);
};