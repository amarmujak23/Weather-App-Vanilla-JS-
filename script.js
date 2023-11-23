document.addEventListener('DOMContentLoaded', function() {
    const cityInput = document.getElementById('cityInput');
    const searchBtn = document.getElementById('searchBtn');
    const weatherInfo = document.getElementById('weatherInfo');

    searchBtn.addEventListener('click', function() {
        const city = cityInput.value.trim();
        if (city !== '') {
            getWeather(city);
        } else {
            showError('Please enter a city');
        }
    });

    async function getWeather(city) {
        const apiKey = 'a5db9e43223798f9b3e7ff1518cdf351'; 
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                showError('City not found');
                return;
            }
            const weatherData = await response.json();
            showWeather(weatherData);
        } catch (error) {
            showError('Something went wrong');
        }
    }

    function showWeather(weatherData) {
        const { name, main, weather } = weatherData;
        const temperature = Math.round(main.temp);
        const capitalizedDescription = weather[0].description.charAt(0).toUpperCase() + weather[0].description.slice(1);
        const weatherIcon = `http://openweathermap.org/img/wn/${weather[0].icon}.png`;
    
        const weatherDisplay = `
            <h2>${name}</h2>
            <p>${temperature}°F</p>
            <p>${capitalizedDescription}</p>
            <img src="${weatherIcon}" alt="Weather Icon">
        `;
        weatherInfo.innerHTML = weatherDisplay;
    }
    function showError(message) {
        weatherInfo.innerHTML = `<p class="error">${message}</p>`;
    }
});
