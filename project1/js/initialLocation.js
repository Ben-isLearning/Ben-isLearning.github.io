//Gather userData
//Must be First
function getPosition() {
  // Simple wrapper
  return new Promise((res, rej) => {
    navigator.geolocation.getCurrentPosition(res, rej);
  });
}

const generateData = async () => {
  try {
    data = await getPosition();
    window.sessionStorage.setItem("userLat", data.coords.latitude);
    window.sessionStorage.setItem("userLng", data.coords.longitude);
  } catch (err) {
    return err;
  }

  //console.log(userData);
};

$("preloader").ready(generateData());

let userData = {
  latitude: window.sessionStorage.getItem("userLat"),
  longitude: window.sessionStorage.getItem("userLng"),
  latlng: `${window.sessionStorage.getItem(
    "userLat"
  )}%${window.sessionStorage.getItem("userLng")}`,
};

//console.log(userData);

//Initialize Map
var map = L.map("map").setView([userData.latitude, userData.longitude], 13);

//User Marker
var userMarker = L.marker([userData.latitude, userData.longitude]).addTo(map);
userMarker
  .bindPopup(
    "You are here!<br>" + userData.latitude + ", " + userData.longitude
  )
  .openPopup();
