let moreInfo = {};

function learnMore() {
  console.log("Learn");
  $.ajax({
    url: "php/openCage.php",
    type: "POST",
    dataType: "json",
    data: {
      lat: userLocation.latitude,
      lng: userLocation.longitude,
    },
    success: function (result) {
      console.log(result);
      moreInfo = result.results[0];
      $("#moreInfo").html("Information Loaded - Please use other buttons!");
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR, textStatus, errorThrown);
      //  }
    },
  });
}

console.log(moreInfo);
