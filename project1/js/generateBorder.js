$.getJSON("js/countryBorders.geo.json", function (data) {
  for (let i = 0; i < data.features.length; i++) {
    if (
      data.features[i].properties.iso_a2 == "GB" ||
      data.features[i].properties.iso_a3 == "GB"
    ) {
      console.log("Its a match!");
      //console.log(data.features[i]);
      let dataToChange = data.features[i].geometry.coordinates;

      //console.log(dataToChange);
      for (let j = 0; j < dataToChange.length; j++) {
        //console.log(dataToChange[j]);

        for (let k = 0; k < dataToChange[j].length; k++) {
          //console.log(dataToChange[j][k]);
          dataToChange[j][k].forEach((element) => element.reverse());
        }
      }
      //console.log(dataToChange);
      var borderPolygon = L.polygon(dataToChange);
      //console.log(borderPolygon);
      borderPolygon.addTo(map);
    }
  }
});
