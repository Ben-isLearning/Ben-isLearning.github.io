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
