//Create Map
var map = L.map("map");
var defaultMarker;
var userMarker;
var tempData;

async function generateMap() {
  tempData = await callGetLocation();

  if (userLocation.coords) {
    console.log("user has enabled");
    map.setView(
      [userLocation.coords.latitude, userLocation.coords.longitude],
      13
    );
    userMarker = L.marker([
      userLocation.coords.latitude,
      userLocation.coords.longitude,
    ])
      .addTo(map)
      .bindPopup("<b>User Location</b>")
      .openPopup();
  } else {
    console.log("user doesn't");
    map.setView([defaultLocation.latitude, defaultLocation.longitude], 13);
    defaultMarker = L.marker([
      defaultLocation.latitude,
      defaultLocation.longitude,
    ])
      .addTo(map)
      .bindPopup("<b>Default Location</b>")
      .openPopup();
  }
}
