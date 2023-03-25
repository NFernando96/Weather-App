const cityForm = document.querySelector("form");
const details = document.querySelector(".details");
const card = document.querySelector(".card");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");

//update UI
const updateUI = (data) => {
  //Destructuring
  const { cityDets, weather } = data;

  details.innerHTML = `
    <h5 class="my3">${cityDets.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
      <span>${weather.Temperature.Metric.Value}</span>
      <span>&deg;C</span>
    `;

  //update the day, night images & icons
  const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute("src", iconSrc);

  //Using ternary operator
  let timeSrc = weather.IsDayTime ? "img/day.svg" : "img/night.svg";

  time.setAttribute("src", timeSrc);

  //remove the d-none class if present
  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
};

//update city
const updateCity = async (city) => {
  const cityDets = await getCity(city);
  const weather = await getWeather(cityDets.Key);

  return { cityDets, weather };
};

//form control
cityForm.addEventListener("submit", (e) => {
  //prevent default
  e.preventDefault();

  //get city value
  const city = cityForm.city.value.trim();
  cityForm.reset();

  //update the ui with the city
  updateCity(city)
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));

  localStorage.setItem("city", city);
});

if (localStorage.getItem("city")) {
  updateCity(localStorage.getItem("city"))
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));
}

//******* Before use destructuring *******/
//   const cityDets = data.cityDets;
//   const weather = data.weather;
//********************************************

//****** Before use the ternary operator ******/
//   let timeSrc = null;
//   if (weather.IsDayTime) {
//     timeSrc = "img/day.svg";
//   } else {
//     timeSrc = "img/night.svg";
//   }
//********************************************
