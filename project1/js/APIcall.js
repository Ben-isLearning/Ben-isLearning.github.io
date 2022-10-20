//API One Button
$("#myButton").click(function () {
  $.ajax({
    url: "php/openCage.php",
    type: "POST",
    dataType: "json",
    data: {
      lat: userData.latitude,
      lng: userData.longitude,
    },
    success: function (result) {
      console.log(JSON.stringify(result));

      //if (result.status.name == "ok") {
      //  $("#oceanName").html(result["data"]["name"]);
      //  $("#oceanError").html("You've found Sea!");
      //}
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
