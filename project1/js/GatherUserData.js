//Gather userData
function getPosition() {
  // Simple wrapper
  return new Promise((res, rej) => {
    navigator.geolocation.getCurrentPosition(res, rej);
  });
}

const generateData = async () => {
  data = await getPosition();
  window.sessionStorage.setItem("userLat", data.coords.latitude);
  window.sessionStorage.setItem("userLng", data.coords.longitude);

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

console.log(userData);
