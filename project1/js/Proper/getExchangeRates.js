//Exchange Rate

let detailedCurrencyInfo;

async function genCurrency() {
  try {
    if (moreInfo.annotations.currency) {
      detailedCurrencyInfo = moreInfo.annotations.currency.iso_code;
      await detailedCurrencyInfo;
      return detailedCurrencyInfo;
    }
  } catch (err) {
    console.log(err);
  }
}

var baseCurrency;
var exchangeRates;
const getExchangeRates = async () => {
  genCurrency();
  $.ajax({
    url: "php/exchangeRate.php",
    type: "POST",
    dataType: "json",
    data: {
      currency: detailedCurrencyInfo,
    },
    success: function (data) {
      genCurrency();
      baseCurrency = detailedCurrencyInfo;
      processExchangeRates(data);
      //await showExchangeRates(rates);
      formatExchangeRates();
      applyExchangeRates();
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR, textStatus, errorThrown);
    },
  });
};

async function processExchangeRates(data) {
  console.log(data.base);
  baseCurrency = data.base;
  console.log(data.results);
  exchangeRates = data.results;
  await exchangeRates;
  return exchangeRates;
}

// Add function to take data from getExchangeRates()
// to formulate a table of exchange rates.
// Add table in its own popup
// Max 10 currencies.

let rateData = "";
function formatExchangeRates() {
  rateData = "";
  rateData += `<table style="border-spacing: 5px;">`;
  const keys = Object.keys(exchangeRates);
  keys.forEach((key, index) => {
    if (
      key == "GBP" ||
      key == "USD" ||
      key == "EUR" ||
      key == "JPY" ||
      key == "AUD" ||
      key == "CHF" ||
      key == "HKD" ||
      key == "NZD"
    )
      rateData += `<tr><td> 1 ${baseCurrency} is currently worth ${key}  ${exchangeRates[
        key
      ].toFixed(2)}  </td></tr>`;
  });
  rateData += `</table>`;
}

var exchangePopup = L.popup((autoClose = true));
function applyExchangeRates() {
  exchangePopup.setLatLng(moreInfo.geometry);
  exchangePopup.setContent(rateData);
  exchangePopup.addTo(map);
}

//An Exchange Rate Button.
var exchangeButton = L.easyButton({
  class: "checkBtn",
  states: [
    {
      stateName: "exchangeButton",
      icon: '<span class="star">&starf;</span>',
      title: "Show Exchange Rates",
      onClick: async function () {
        let something = await getExchangeRates();
        clickedPopup.setContent(something);
        $("#moreInfo").html(something);
      },
    },
  ],
}).addTo(map);
checkBtn();
