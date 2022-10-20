// This block of functions...
// 1) generates a variable from the geo json
// 2) searched through JSONdata to match with data held by "moreinfo"
// 3) rectifies the data held, switches Lat and Lng.
// 4) uses rectified coordinates to generate and apply a polygon.
let details;
$.getJSON("js/countryBorders.geo.json", function (data) {
  details = data.features;
});

let currentFeature;
let countryCode;
let countryMatch;
let countryCoords;
let countryPolygon;
let borderApplied;

async function processDetails() {
  if (moreInfo.components) {
    for (let i = 0; i < details.length; i++) {
      //console.log(details[i]);
      currentFeature = details[i];
      //console.log(currentFeature.properties.iso_a2);
      countryCode = currentFeature.properties.iso_a2;
      if (countryCode == moreInfo.components["ISO_3166-1_alpha-2"]) {
        //console.log("its a match!");
        countryMatch = true;
        countryCoords = currentFeature.geometry.coordinates;
        //console.log(countryCoords);
        await countryCoords;
      }
    }
    return countryCoords;
  }
}

async function rectifyDetails() {
  let data = await processDetails();
  //console.log(data);
  if (data.length > 1) {
    //console.log("Multi Polygon Country");
    for (let i = 0; i < countryCoords.length; i++) {
      //console.log(countryCoords[i]);
      //console.log(`Polygon Number ${i} above`);
      countryCoords[i][0].forEach((element) => element.reverse());
    }
    return countryCoords;
  } else {
    //console.log("Single Polygon");
    data[0].forEach((element) => element.reverse());
    //console.log(countryCoords);
    return countryCoords;
  }
}

async function applyDetails() {
  let data = await rectifyDetails();

  countryPolygon = L.polygon(data);
  countryPolygon.addTo(map);
  borderApplied = true;
  return borderApplied;
}
