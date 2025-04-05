class WeatherApp
{
    constructor(city)
    {
        this.apiKey = "53e9b3d51825ee0a2aa204f19c062e3b";
        this.city = city;
        this.url = this.createUrl(city);
        this.weatherContainer = document.getElementById("weather");
        this.errorContainer = document.createElement("div");
        this.errorContainer.classList.add("error-message");
        document.body.appendChild(this.errorContainer);
    }

    createUrl(city)
    {
        return `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${this.apiKey}&units=metric&lang=ua`;
    }

    async fetchWeather()
    {
        try
        {
            const response = await fetch(this.url);
            if (!response.ok)
            {
                throw new Error(`Error loading data: ${response.statusText}`);
            }
            const data = await response.json();
            this.renderWeather(data);
        }
        catch (error)
        {
            this.errorContainer.textContent = error.message;
        }
    }

    renderWeather(data)
    {
        this.weatherContainer.innerHTML = "";

        // Фільтруємо прогноз лише на 12:00 кожного дня
        const forecastList = data.list.filter(item => item.dt_txt.includes("12:00:00"));

        forecastList.forEach(day => {
            const date = new Date(day.dt_txt).toLocaleDateString("uk-UA");
            const temp = Math.round(day.main.temp);
            const icon = `https://openweathermap.org/img/wn/${day.weather[0].icon}.png`;

            const weatherBlock = document.createElement("div");
            weatherBlock.classList.add("weather-block");

            const dateElement = document.createElement("h3");
            dateElement.textContent = date;

            const imgElement = document.createElement("img");
            imgElement.src = icon;

            const tempElement = document.createElement("p");
            tempElement.textContent = `${temp}°C`;

            weatherBlock.appendChild(dateElement);
            weatherBlock.appendChild(imgElement);
            weatherBlock.appendChild(tempElement);

            this.weatherContainer.appendChild(weatherBlock);
        });
    }

    updateCity(newCity)
    {
        this.city = newCity;
        this.url = this.createUrl(newCity);
        this.fetchWeather();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const app = new WeatherApp("Kyiv");

    document.getElementById("show_weather").addEventListener("click", () => {
        const city = document.getElementById("city").value.trim();
        if (city)
        {
            app.updateCity(city);
            app.errorContainer.textContent = '';
        }
        else
        {
            app.errorContainer.textContent = "Please enter a city!";
        }
    });

    app.fetchWeather();
});

