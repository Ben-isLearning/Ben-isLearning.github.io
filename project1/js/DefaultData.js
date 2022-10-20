// Opening Position
var map = L.map("map").setView(
  [defaultData.latitude, defaultData.longitude],
  13
);

var defaultMarker = L.marker([
  defaultData.latitude,
  defaultData.longitude,
]).addTo(map);
defaultMarker
  .bindPopup("<b>Default Location</b><br>Take a look around!")
  .openPopup();
