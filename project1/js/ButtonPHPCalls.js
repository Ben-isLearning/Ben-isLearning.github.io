//API One Button
$("#btnUserLocation").click(function () {
  $.ajax({
    url: "php/openCage.php",
    type: "POST",
    dataType: "json",
    data: {
      lat: userData.latitude,
      lng: userData.longitude,
    },
    success: function (result) {
      //console.log(result);
      //console.log(result.results[0].formatted);

      $("#userLocation").html(result.results[0].formatted);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      //  if (jqXHR.responseText.includes("ocean")) {
      //    $("#oceanName").html("Land Ho!!!");
      //    $("#oceanError").html("You've found land!");
      //  } else {
      console.log(jqXHR, textStatus, errorThrown);
      //  }
    },
  });
});

//API Two Button
$("#btnClickedLocation").click(function () {
  $.ajax({
    url: "php/openCage.php",
    type: "POST",
    dataType: "json",
    data: {
      lat: clickedData.latitude,
      lng: clickedData.longitude,
    },
    success: function (result) {
      //console.log(result);
      //console.log(result.results[0].formatted);
      $("#clickedLocation").html(result.results[0].formatted);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(textStatus);
      if (textStatus == "parsererror") {
        alert("Error - You need to click on the map first!");
      }
      //  }
    },
  });
});
