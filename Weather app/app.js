
    //define UI variables
    const appWrap = document.querySelector('.app-wrap')
    const search = document.querySelector('.search');
    const btn = document.querySelector('.btn');
    const city = document.querySelector('.city');
    const date = document.querySelector('.date');
    const description = document.querySelector('.description');
    const temperature = document.querySelector('.temperature');
    const icon = document.querySelector('.icon');
    const humidity = document.querySelector('.humidity');
    const feels = document.querySelector('.feels-like');
    const pressure = document.querySelector('.pressure');
    const wind = document.querySelector('.wind');
    const visibility = document.querySelector('.visibility');
    const sunset = document.querySelector('.sunrise');
    const sunrise = document.querySelector('.sunset');
    const name = document.querySelector('.name');
    const country = document.querySelector('.country');
    const input = document.querySelector('.input');
    const spinner = document.querySelector('.spinner');
    const spinnerContainer = document.querySelector('.spin');
     

    appWrap.style.display = "none";

    //Load default city onload

    document.addEventListener("DOMContentLoaded", function(){
        getWeather('Ibadan')
        //appWrap.style.display = 'block';
    })
     
    //search city from input box
    btn.addEventListener("click", function(e){
    e.preventDefault()
     appWrap.style.display = 'none';
     spinnerContainer.style.display = 'block';
    getWeather(input.value);
    console.log(input.value);
    })

    //pull weather data from external api
    async function getWeather(city){
    try {
    const url = fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}
    &units=metric&appid=de2e6c358c1e08bd16b483cda54985f1`)
    console.log(url);
    const response = await(url);
    const data = await response.json();
    console.log(data);
    spinnerContainer.style.display = 'none';
    appWrap.style.display = 'block';
    return displayWeather(data);
    }
    catch(err) {
        console.log('An error occured')
        showError();
        //spinnerContainer.style.display = 'none'
        //appWrap.style.display = 'none';
     };
    }
    //UI data
    const displayWeather = data => {
    //display temperature data
     temperature.textContent = `${Math.round(data.main.temp)}ºC`;

     //display humidity data
     humidity.textContent = `${data.main.humidity}%`;

     //display pressure data
     pressure.textContent = `${data.main.pressure}hPa`;

     //display visibility data 
     visibility.textContent = `${data.visibility/1000}km`;
     
     //display wind speed data
     wind.textContent = `${data.wind.speed}m/s`;
     
     //display feels-like data
     feels.textContent = `${Math.round(data.main.feels_like)}ºC`;
    
     //display name of city data
     name.textContent = `${data.name},`;

     //display initials of city's country
     country.textContent = `${data.sys.country}`;

     //display icon of current weather status
     icon.setAttribute('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);

     //clear input field after completed search
     input.value = '';

     //initiate new date
     let now = new Date();

     //display date
     date.textContent = dateBuilder(now);
     
     //display sunrise and sunset data
     sunData(data);

     //display description data
     descriptionData(data);

     console.log(data)
    }

    //Sunrise and Sunset data
    const sunData = data => {
    let sunRise = data.sys.sunrise;
    let sunSet = data.sys.sunset;
    let sunriseDate = new Date(sunRise * 1000);
    let sunsetDate = new Date(sunSet * 1000);
    let formattedSunrise = ('0' + sunriseDate.getHours()).slice(-2) + ':' + ('0' + sunriseDate.getMinutes()).slice(-2);
    let formattedSunset = ('0' + sunsetDate.getHours()).slice(-2) + ':' + ('0' + sunsetDate.getMinutes()).slice(-2);
    sunrise.textContent = `${formattedSunrise}`;
    sunset.textContent = `${formattedSunset}`;
    }

    //Datebuilder data
    const dateBuilder = d => {
    const months = [
       'January', 
       'February',
       'March', 
       'April', 
       'May',
       'June',
       'July',
       'August', 
       'September',
       'October',
       'November',
       'December'
        ];
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const day = days[d.getDay()];
    const date = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear();

    return `${day},   ${month}  ${date},  ${year}.`
    }

    //Description data
    const descriptionData = data => {
    const desc = data.weather[0].description;
    const formattedDescription = desc[0].toUpperCase() + desc.slice(1);
    description.textContent = formattedDescription;
    }

    //showError
    function showError(){
        const html = `<div class="error"><h3>City not found<h3></div>`;
        search.insertAdjacentHTML('afterend', html);
        setTimeout(function(){
            document.querySelector('.error').remove()
        },3000)
        input.value = '';
    }
    