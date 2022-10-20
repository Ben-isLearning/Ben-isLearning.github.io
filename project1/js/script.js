//Preloader
$(window).on("load", function () {
  if ($("#map").length) {
    $("#preloader")
      .delay(1000)
      .fadeOut("slow", function () {
        $(this).remove();
      });
  }
});

let defaultLocation = {
  latitude: 51.508056,
  longitude: -0.087778,
};

let userLocation = {};

// getLocation and callGetLocation work together ~
// getLocation generates a promise
// callGetLocation consumes the promise to set
// the users location on resolve and reject.
function getLocation() {
  return new Promise((res, rej) => {
    navigator.geolocation.getCurrentPosition(res, rej);
  });
}

async function callGetLocation() {
  try {
    userLocation = await getLocation();
    console.log("User accepted Geolocation - Setting user location");
    console.log(userLocation);
  } catch (error) {
    //console.log(error);
    if ((error.message = "User denied Geolocation")) {
      //console.log("User deined Geolocation - Setting default location");
      userLocation = defaultLocation;
    }
  }
}

//Create Map
var map = L.map("map");
var defaultMarker;
var userMarker;
map.setView([-24.39213, -8.201273], 13);

//Generate map gathers userData from callGetLocation()
//if the user has accepted geolocation, the userLocation will
//include the coords property.
//
var tempData;
async function generateMap() {
  tempData = await callGetLocation();

  if (userLocation.coords) {
    //console.log("user has enabled");
    map.setView(
      [userLocation.coords.latitude, userLocation.coords.longitude],
      13
    );
    userMarker = L.marker([
      userLocation.coords.latitude,
      userLocation.coords.longitude,
    ])
      .addTo(map)
      .bindPopup(
        '<p style="text-align: center;"><b>You are Here</b> <br/> <button id="learnMore" onClick="learnMore()">Learn More</button></p> <p id="moreInfo"></p>'
      )
      .openPopup();
  } else {
    //console.log("user doesn't");
    map.setView([userLocation.latitude, userLocation.longitude], 13);
    defaultMarker = L.marker([userLocation.latitude, userLocation.longitude])
      .addTo(map)
      .bindPopup(
        '<p style="text-align: center;"><b>Here is London Bridge</b> <br/> <button id="learnMore" onClick="learnMore()">Learn More</button></p> <p id="moreInfo"></p>'
      )
      .openPopup();
  }
}

//Welcome popup
var welcomePopup = L.popup()
  .setLatLng([-24.39213, -8.201273])
  .setContent(
    "Welcome to my first final project! <br> This marker is in the Atlantic Ocean. <br> <br> This app will not perform as intended without <br> allowing or blocking location! <br/><br/> To enable the icon buttons, <br/> click Learn More after setting your permission"
  )
  .openOn(map);

$(document).ready(generateMap());

//Map Layers

//Mobile Layer
var mobileLayer = L.tileLayer(
  "https://tile.thunderforest.com/mobile-atlas/{z}/{x}/{y}.png?apikey={apikey}",
  {
    apikey: "6b28a04e55ee43bd985f0e2fcaa079e2",
    maxZoom: 19,
    attribution:
      '&copy; <a href="https://www.thunderforest.com">Thunderforest</a>',
  }
);

//Spinal Layer
var spinalLayer = L.tileLayer(
  "https://tile.thunderforest.com/spinal-map/{z}/{x}/{y}.png?apikey={apikey}",
  {
    apikey: "6b28a04e55ee43bd985f0e2fcaa079e2",
    maxZoom: 19,
    attribution:
      '&copy; <a href="https://www.thunderforest.com">Thunderforest</a>',
  }
);

//atlas Layer
var atlasLayer = L.tileLayer(
  "https://tile.thunderforest.com/atlas/{z}/{x}/{y}.png?apikey={apikey}",
  {
    apikey: "6b28a04e55ee43bd985f0e2fcaa079e2",
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }
).addTo(map);

//Layer Group

var baseMaps = {
  "Mobile Atlast": mobileLayer,
  Atlas: atlasLayer,
};

var overlayMaps = {};

var layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map);

var options = {
  key: "8ef5df3148ff46709c0b94b607f53f71",
  limit: 10,
  proximity: "51.52255, -0.10249", // favour results near here
};

var control = L.Control.openCageGeocoding(options).addTo(map);

//Media Query checking if the screen is smaller or larger than 500px.
//If smaller, use high-contrast map.
let screenQuery = window.matchMedia("(max-width:500px)");
if (window.innerWidth < 500) {
  atlasLayer.removeFrom(map);
  mobileLayer.addTo(map);
}

screenQuery.addEventListener("change", (event) => {
  if (event.matches) {
    atlasLayer.removeFrom(map);
    mobileLayer.addTo(map);
  } else {
    mobileLayer.removeFrom(map);
    atlasLayer.addTo(map);
  }
});

//Button testing

// listeners for disabling buttons

let moreInfo = {};

//Learn more button functionality.
//API One Button

function learnMore() {
  //console.log("Learn");
  $.ajax({
    url: "php/openCage.php",
    type: "POST",
    dataType: "json",
    data: {
      lat: userLocation.latitude || userLocation.coords.latitude,
      lng: userLocation.longitude || userLocation.coords.longitude,
    },
    success: function (result) {
      //console.log(result);
      moreInfo = result.results[0];
      $("#learnMore").hide();
      $("#moreInfo").html(
        moreInfo.formatted + "<br/><br/> Use other buttons for more!"
      );
      //console.log(moreInfo);
      checkBtn();
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR, textStatus, errorThrown);
      //  }
    },
  });
}

function learnMoreClicked() {
  //console.log("Learn");
  $.ajax({
    url: "php/openCage.php",
    type: "POST",
    dataType: "json",
    data: {
      lat: clickedLocation.latitude,
      lng: clickedLocation.longitude,
    },
    success: function (result) {
      //console.log(result);
      moreInfo = result.results[0];
      $("#learnMoreClicked").hide();
      $("#moreInfo").html(
        moreInfo.formatted + "<br/><br/> Use other buttons for more!"
      );
      //console.log(moreInfo);
      checkBtn();
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR, textStatus, errorThrown);
      //  }
    },
  });
}

//On click functionality
let clickedLocation = {};
var clickedPopup = L.popup();
var clickedMarker = L.marker();

function onMapClick(e) {
  // console.log(e);
  clickedLocation.latitude = e.latlng.lat;
  clickedLocation.longitude = e.latlng.lng;
  clickedPopup
    .setLatLng(e.latlng)
    .setContent(
      "You clicked the map at <br/> " +
        e.latlng.toString() +
        '<p style="text-align: center;"> <button id="learnMoreClicked" onClick="learnMoreClicked()">Learn More</button></p> <p id="moreInfo"> <p/>'
    )
    .openOn(map);
  clickedMarker.setLatLng(e.latlng).addTo(map);
}

map.on("click", onMapClick);

// Button Section

function checkBtn() {
  if (moreInfo.formatted) {
    currencyButton.enable();
    borderButton.enable();
    exchangeButton.enable();
    weatherButton.enable();
    publicHolidayButton.enable();
    populationButton.enable();
  } else {
    currencyButton.disable();
    borderButton.disable();
    exchangeButton.disable();
    weatherButton.disable();
    publicHolidayButton.disable();
    populationButton.disable();
  }
}

//
let currencyInfo;
//Generate Currency Report
//Navigates data generated by "more info"
//returns a string of currency data.
function getCurrency() {
  if (moreInfo.annotations.currency) {
    let countryName = moreInfo.components.country;
    try {
      currencyInfo = moreInfo.annotations.currency;

      let fullInformation =
        `The <b>${countryName}</b> uses <b>${currencyInfo.name}</b> as their currency.` +
        "<br/>" +
        `The  <b>${currencyInfo.symbol}</b> is the symbol of the <b>${currencyInfo.iso_code}</b>`;
      return fullInformation;
    } catch (error) {
      if (
        error ==
        "TypeError: Cannot read properties of undefined (reading 'country')"
      ) {
        alert("Learn More must be clicked before these buttons");
      }
    }
  } else {
    let fullInformation = `According to our data, <b>${moreInfo.formatted}</b> does not have a currency`;
    return fullInformation;
  }

  //console.log(fullInformation);
}

// A Currency Button.
var currencyButton = L.easyButton({
  states: [
    {
      stateName: "currencyButton",
      icon: '<span class="star">&starf;</span>',
      title: "Show currency information",
      onClick: function (control) {
        clickedPopup.setContent(getCurrency());
        $("#moreInfo").html(getCurrency());
      },
    },
  ],
});

currencyButton.addTo(map);

// This block of functions...
// 1) generates a variable from the geo json
// 2) searched through JSONdata to match with data held by "moreinfo"
// 3) rectifies the data held, switches Lat and Lng.
// 4) uses rectified coordinates to generate and apply a polygon.
let details;
$.getJSON("js/countryBorders.geo.json", function (data) {
  details = data.features;
});

let currentFeature;
let countryCode;
let countryMatch;
let countryCoords;
let countryPolygon;
let borderApplied;

async function processDetails() {
  if (moreInfo.components) {
    for (let i = 0; i < details.length; i++) {
      //console.log(details[i]);
      currentFeature = details[i];
      //console.log(currentFeature.properties.iso_a2);
      countryCode = currentFeature.properties.iso_a2;
      if (countryCode == moreInfo.components["ISO_3166-1_alpha-2"]) {
        //console.log("its a match!");
        countryMatch = true;
        countryCoords = currentFeature.geometry.coordinates;
        //console.log(countryCoords);
        await countryCoords;
      }
    }
    return countryCoords;
  }
}

async function rectifyDetails() {
  let data = await processDetails();
  //console.log(data);
  if (data.length > 1) {
    //console.log("Multi Polygon Country");
    for (let i = 0; i < countryCoords.length; i++) {
      //console.log(countryCoords[i]);
      //console.log(`Polygon Number ${i} above`);
      countryCoords[i][0].forEach((element) => element.reverse());
    }
    return countryCoords;
  } else {
    //console.log("Single Polygon");
    data[0].forEach((element) => element.reverse());
    //console.log(countryCoords);
    return countryCoords;
  }
}

async function applyDetails() {
  let data = await rectifyDetails();
  if (countryPolygon) {
    countryPolygon.removeFrom(map);
  }
  countryPolygon = L.polygon(data);
  countryPolygon.addTo(map);
  borderApplied = true;
  return borderApplied;
}

//A Border Button.
var borderButton = L.easyButton({
  class: "checkBtn",
  states: [
    {
      stateName: "borderButton",
      icon: '<span class="star">&starf;</span>',
      title: "Show Border",
      onClick: function () {
        applyDetails();
      },
    },
  ],
});

borderButton.addTo(map);

//Exchange Rate

let detailedCurrencyInfo;

async function genCurrency() {
  try {
    if (moreInfo.annotations.currency) {
      detailedCurrencyInfo = moreInfo.annotations.currency.iso_code;
      await detailedCurrencyInfo;
      return detailedCurrencyInfo;
    }
  } catch (err) {
    console.log(err);
  }
}

var baseCurrency;
var exchangeRates;
const getExchangeRates = async () => {
  genCurrency();
  $.ajax({
    url: "php/exchangeRate.php",
    type: "POST",
    dataType: "json",
    data: {
      currency: detailedCurrencyInfo,
    },
    success: function (data) {
      genCurrency();
      baseCurrency = detailedCurrencyInfo;
      processExchangeRates(data);
      //await showExchangeRates(rates);
      formatExchangeRates();
      applyExchangeRates();
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR, textStatus, errorThrown);
    },
  });
};

async function processExchangeRates(data) {
  //console.log(data.base);
  baseCurrency = data.base;
  //console.log(data.results);
  exchangeRates = data.results;
  await exchangeRates;
  return exchangeRates;
}

// Add function to take data from getExchangeRates()
// to formulate a table of exchange rates.
// Add table in its own popup
// Max 10 currencies.

let rateData = "";
function formatExchangeRates() {
  rateData = "";
  rateData += `<table style="border-spacing: 5px;">`;
  const keys = Object.keys(exchangeRates);
  keys.forEach((key, index) => {
    if (
      key == "GBP" ||
      key == "USD" ||
      key == "EUR" ||
      key == "JPY" ||
      key == "AUD" ||
      key == "CHF" ||
      key == "HKD" ||
      key == "NZD"
    )
      rateData += `<tr><td> 1 ${baseCurrency} is currently worth ${key}  ${exchangeRates[
        key
      ].toFixed(2)}  </td></tr>`;
  });
  rateData += `</table>`;
}

var exchangePopup = L.popup((autoClose = true));
function applyExchangeRates() {
  exchangePopup.setLatLng(moreInfo.geometry);
  exchangePopup.setContent(rateData);
  exchangePopup.addTo(map);
}

//An Exchange Rate Button.
var exchangeButton = L.easyButton({
  class: "checkBtn",
  states: [
    {
      stateName: "exchangeButton",
      icon: '<span class="star">&starf;</span>',
      title: "Show Exchange Rates",
      onClick: async function () {
        let exchangeRateData = await getExchangeRates();
        clickedPopup.setContent(exchangeRateData);
        $("#moreInfo").html(exchangeRateData);
      },
    },
  ],
});

exchangeButton.addTo(map);

const getWeather = () => {
  $.ajax({
    url: "php/openWeather.php",
    type: "GET",
    dataType: "json",
    data: {
      lat: clickedLocation.latitude || userLocation.latitude,
      lng: clickedLocation.longitude || userLocation.longitude,
    },
    success: async function (data) {
      let result = generateWeatherReport(data);
      //let something = applyWeatherReport(result);
      await result;
      //$("#moreInfo").html(result);
      return result;
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR, textStatus, errorThrown);
    },
  });
};

let weatherReport = "";
async function generateWeatherReport(data) {
  let currentWeather = data.results[0].main;
  let location = moreInfo.components.country;
  let temp = Math.round(data.weather.temp);
  let tempReal = Math.round(data.weather.feels_like);
  if (weatherReport) {
    weatherReport = "";
  }
  weatherReport += `<p>The sky over ${location} is mainly ${currentWeather} at the moment. <br/> The temperature is current ${temp}C, with a real-feel of ${tempReal}C</p>`;
  //console.log(weatherReport);

  let weatherPopup = L.popup((autoClose = true));
  weatherPopup.setContent(weatherReport);
  weatherPopup.setLatLng(moreInfo.geometry);
  weatherPopup.addTo(map);
  return weatherReport;
}

//A Weather Button.
var weatherButton = L.easyButton({
  class: "checkBtn",
  states: [
    {
      stateName: "weatherButton",
      icon: '<span class="star">&starf;</span>',
      title: "Show Current Weather",
      onClick: function () {
        getWeather();
      },
    },
  ],
});

weatherButton.addTo(map);

let publicHolidayData;

const getPublicHoliday = async () => {
  $.ajax({
    url: "php/publicHoliday.php",
    type: "POST",
    dataType: "json",
    data: {
      country: moreInfo.components["ISO_3166-1_alpha-2"],
    },
    success: function (data) {
      let result = processPublicHoliday(data);
      let rectified = rectifyPublicHoliday(result);
      //console.log(rectified);
      //Consume
      var myPopup = L.popup();
      myPopup.setLatLng(moreInfo.geometry).setContent(rectified).openOn(map);
      return rectified;
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR, textStatus, errorThrown);
    },
  });
};

function processPublicHoliday(data) {
  publicHolidayData = Object.entries(data);
  uniquePublicHolidays = [];

  publicHolidayData.forEach((element) => {
    if (!uniquePublicHolidays.includes(element[1].name)) {
      uniquePublicHolidays.push(element[1].name);
      uniquePublicHolidays.push(element[1].date);
      //console.log(`Pushing ${element[1]}`);
    }
  });
  //console.log(uniquePublicHolidays);
  return uniquePublicHolidays;
}
let publicHolidayDataHTML = "";

function rectifyPublicHoliday(result) {
  if (publicHolidayDataHTML) {
    publicHolidayDataHTML = "";
  }
  publicHolidayDataHTML += `<table><tr><th>Holiday</th><th>Date (YYYY/MM/DD)</th> </tr>`;
  for (let i = 0; i < result.length; i++) {
    if (i % 2 === 0) {
      //Dates
      //console.log(result[i]);
      //console.log(`<tr><td> ${result[i]}</td>`);
      publicHolidayDataHTML += `<tr><td> ${result[i]}</td>`;
    } else {
      //Days
      //console.log(result[i]);
      //console.log(`<td> ${result[i]} </td></tr>`);
      publicHolidayDataHTML += `<td> ${result[i]} </td></tr>`;
    }
  }
  publicHolidayDataHTML += `</table>`;
  return publicHolidayDataHTML;
}

//A Public Holiday Button.
var publicHolidayButton = L.easyButton({
  class: "checkBtn",
  states: [
    {
      stateName: "publicHolidayButton",
      icon: '<span class="star">&starf;</span>',
      title: "Show Public Holidays for 2022",
      onClick: function () {
        getPublicHoliday();
      },
    },
  ],
});

publicHolidayButton.addTo(map);

const getPopulation = () => {
  let isoData = moreInfo.components["ISO_3166-1_alpha-2"];
  //console.log(isoData);
  $.ajax({
    url: "php/restCountries.php",
    type: "POST",
    dataType: "json",
    data: {
      iso: isoData,
    },
    success: function (data) {
      let result = processPopulation(data);
      //console.log(result);
      //Consume
      var myPopup = L.popup();
      myPopup.setLatLng(moreInfo.geometry).setContent(result).openOn(map);
      return result;
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR, textStatus, errorThrown);
    },
  });
};

function processPopulation(data) {
  //console.log(data);
  //console.log(data.result);
  //console.log(data.result.name);
  //console.log(data.result.name.official);
  //console.log(data.result.population);

  let name = data.result.name.official;
  let population = data.result.population;

  let newPop = population.toString().split("").reverse();

  //console.log(newPop);
  let something = [];
  for (let i = 0; i < newPop.length; i++) {
    something.push(newPop[i]);
    if (i === 2 || i == 5 || i == 8) {
      something.push(",");
    }
  }
  // console.log(something.reverse().join(""));
  let rectifiedPop = something.reverse().join("");
  //console.log(rectifiedPop);
  // let rectifiedValue = something.join();
  // console.log(rectifiedValue);
  //console.log(`The ${name} has a population of ${population}`);
  let result = ` <p>The ${name} has a population of ${rectifiedPop} </p>`;
  return result;
}

//A Public Holiday Button.
var populationButton = L.easyButton({
  class: "checkBtn",
  states: [
    {
      stateName: "publicHolidayButton",
      icon: '<span class="star">&starf;</span>',
      title: "Show current population",
      onClick: function () {
        getPopulation();
      },
    },
  ],
});
populationButton.addTo(map);
checkBtn();
