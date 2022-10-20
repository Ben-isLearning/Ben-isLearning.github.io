let details;
$.getJSON("js/countryBorders.geo.json", function (data) {
  details = data.features;
});

let navOptions = "";
//Uses details - gained from parsing JSON elsewhere
//Populate Nav bar
function formatDetails() {
  navOptions = "";
  navOptions += `<select id="countrySelector" name="countrySelector" class="form-select" aria-label="Default select example">`;
  for (const [key, value] of Object.entries(details)) {
    navOptions += `<option  value="${value.properties.iso_a2}"> ${value.properties.name} </option>`;
    //console.log(value.properties.iso_a2);
    //console.log(value.properties.name);
  }
  navOptions += `</select>`;
}

$(function () {
  formatDetails();
  $("#navbar").html(navOptions);

  const selectCountry = document.querySelector("#countrySelector");
  //console.log(selectCountry);
  selectCountry.addEventListener("change", (event) => {
    console.log(event.target.value);
  });
});
