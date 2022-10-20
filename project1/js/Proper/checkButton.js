// Button Section

function checkBtn() {
  if (moreInfo.formatted) {
    testButton.enable();
  } else {
    testButton.disable();
  }
}

// A single test button with checking functionality.
var testButton = L.easyButton({
  states: [
    {
      stateName: "testButton",
      icon: '<span class="star">&starf;</span>',
      title: "testButton",
      onClick: function (control) {
        clickedPopup.setContent("Something");
        $("#moreInfo").html("Something");
      },
    },
  ],
}).addTo(map);
checkBtn();
