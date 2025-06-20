const API_BASE_URL = "https://bhkpriceestimator.onrender.com";

function getBathValue() {
  var uiBathrooms = document.getElementsByName("uiBathrooms");
  for (var i in uiBathrooms) {
    if (uiBathrooms[i].checked) {
      return parseInt(uiBathrooms[i].value);
    }
  }
  return -1;
}

function getBHKValue() {
  var uiBHK = document.getElementsByName("uiBHK");
  for (var i in uiBHK) {
    if (uiBHK[i].checked) {
      return parseInt(uiBHK[i].value);
    }
  }
  return -1;
}

function onClickedEstimatePrice() {
  console.log("Estimate price button clicked");
  var sqft = document.getElementById("uiSqft");
  var bhk = getBHKValue();
  var bathrooms = getBathValue();
  var location = document.getElementById("uiLocations");
  var estPrice = document.getElementById("uiEstimatedPrice");

  var url = `${API_BASE_URL}/predict_home_price`;

  $.post(url, {
    total_sqft: parseFloat(sqft.value),
    bhk: bhk,
    bath: bathrooms,
    location: location.value
  }, function(data, status) {
    console.log(data.estimated_price);
    estPrice.innerHTML = `<h2>${data.estimated_price} Lakh</h2>`;
    console.log(status);
  });
}

function onPageLoad() {
  console.log("document loaded");

  var url = `${API_BASE_URL}/get_location_names`;

  $.get(url, function(data, status) {
    console.log("got response for get_location_names request");
    if (data) {
      var locations = data.locations;
      var uiLocations = document.getElementById("uiLocations");

      // Clear and enable the dropdown
      $('#uiLocations').empty();
      uiLocations.disabled = false;

      // Add default placeholder again
      $('#uiLocations').append(new Option("Choose a Location", "", true, true)).prop("disabled", true);

      // Add actual options
      for (var i in locations) {
        var opt = new Option(locations[i]);
        $('#uiLocations').append(opt);
      }

      // Re-enable user selection
      $('#uiLocations').prop("disabled", false);
    }
  });
}

window.onload = onPageLoad;
