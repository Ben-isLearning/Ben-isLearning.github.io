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
  } catch (error) {
    //console.log(error);
    if ((error.message = "User denied Geolocation")) {
      console.log("User deined Geolocation - Setting default location");
      userLocation = defaultLocation;
    }
  }
}

callGetLocation();
