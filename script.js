document.addEventListener("DOMContentLoaded", function () {
    const apiKey = 'dbc0d38ea9f9230fa32331306c1bed61';
    const cityInput = document.getElementById("cityInput");
    const searchBtn = document.getElementById("searchBtn");
    const cityName = document.getElementById("cityName");
    const temperature = document.getElementById("temperature");
    const condition = document.getElementById("condition");
    const humidity = document.getElementById("humidity");
    const windSpeed = document.getElementById("windSpeed");
    const weatherIcon = document.getElementById("weatherIcon");
    const errorMessage = document.getElementById("errorMessage");

    searchBtn.addEventListener("click", function () {
        const city = cityInput.value;
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`)
            .then(response => response.json())
            .then(data => {
                if (data.cod === "200") {
                    cityName.textContent = data.list[0].name;
                    temperature.textContent = `Temperature: ${data.list[0].main.temp} °C`;
                    condition.textContent = `Condition: ${data.list[0].weather[0].description}`;
                    humidity.textContent = `Humidity: ${data.list[0].main.humidity}%`;
                    windSpeed.textContent = `Wind Speed: ${data.list[0].wind.speed} m / s`;
                    weatherIcon.src = `https://openweathermap.org/img/w/${data.list[0].weather[0].icon}.png`;
                    errorMessage.textContent = "";
                } else {
                    clearWeatherData();
                    errorMessage.textContent = "City not found";
                }
            })
            .catch(error => {
                clearWeatherData();
                errorMessage.textContent = "Error fetching data";
            });
    });

    function clearWeatherData() {
        cityName.textContent = "";
        temperature.textContent = "";
        condition.textContent = "";
        humidity.textContent = "";
        windSpeed.textContent = "";
        weatherIcon.src = "";
    }
});
