//Welcome popup
var welcomePopup = L.popup()
  .setLatLng([-24.39213, -8.201273])
  .setContent(
    "Welcome to my first final project! <br> This marker is in the Atlantic Ocean. <br><br> Please respond to the location permission! <br> <br> This app will not perform as intended without <br> allowing or blocking location! "
  )
  .openOn(map);

$(document).ready(generateMap());
