let publicHolidayData;

const getPublicHoliday = async () => {
  $.ajax({
    url: "php/publicHoliday.php",
    type: "POST",
    dataType: "json",
    data: {
      country: moreInfo.components["ISO_3166-1_alpha-2"],
    },
    success: function (data) {
      let result = processPublicHoliday(data);
      let rectified = rectifyPublicHoliday(result);
      console.log(rectified);
      //Consume
      var myPopup = L.popup();
      myPopup.setLatLng(moreInfo.geometry).setContent(rectified).openOn(map);
      return rectified;
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR, textStatus, errorThrown);
    },
  });
};

function processPublicHoliday(data) {
  publicHolidayData = Object.entries(data);
  uniquePublicHolidays = [];

  publicHolidayData.forEach((element) => {
    if (!uniquePublicHolidays.includes(element[1].name)) {
      uniquePublicHolidays.push(element[1].name);
      uniquePublicHolidays.push(element[1].date);
      //console.log(`Pushing ${element[1]}`);
    }
  });
  //console.log(uniquePublicHolidays);
  return uniquePublicHolidays;
}
let publicHolidayDataHTML = "";

function rectifyPublicHoliday(result) {
  if (publicHolidayDataHTML) {
    publicHolidayDataHTML = "";
  }
  publicHolidayDataHTML += `<table><tr><th>Holiday</th><th>Date (YYYY/MM/DD)</th> </tr>`;
  for (let i = 0; i < result.length; i++) {
    if (i % 2 === 0) {
      //Dates
      //console.log(result[i]);
      //console.log(`<tr><td> ${result[i]}</td>`);
      publicHolidayDataHTML += `<tr><td> ${result[i]}</td>`;
    } else {
      //Days
      //console.log(result[i]);
      //console.log(`<td> ${result[i]} </td></tr>`);
      publicHolidayDataHTML += `<td> ${result[i]} </td></tr>`;
    }
  }
  publicHolidayDataHTML += `</table>`;
  return publicHolidayDataHTML;
}

//A Public Holiday Button.
var publicHolidayButton = L.easyButton({
  class: "checkBtn",
  states: [
    {
      stateName: "publicHolidayButton",
      icon: '<span class="star">&starf;</span>',
      title: "Show Public Holidays for 2022",
      onClick: function () {
        getPublicHoliday();
      },
    },
  ],
});

publicHolidayButton.addTo(map);
checkBtn();
