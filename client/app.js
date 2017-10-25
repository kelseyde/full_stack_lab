var requestHelper = require("./helpers/request_helper.js");

getSelectedCountry = function() {
  var select = document.getElementById("dropdown");
  select.addEventListener("change", function(event) {
    event.preventDefault();
    var selectedCountry = select.value;
    requestHelper.post(
      "http://localhost:3000/",
      function(result) {
        console.log("posted!")
      },
      selectedCountry
    );
    requestHelper.get("/countries", initialiseList);
  });
}

var populateDropDown = function(countries) {
  var select = document.getElementById("dropdown");
  while (select.firstChild) { select.removeChild(select.firstChild) }
  countries.forEach(function(country) {
    var option = document.createElement("option");
    option.innerText = country.name;
    select.appendChild(option);
  });
}

var initialiseList = function(bucketList) {
  var ul = document.getElementById("bucket-list");
  while (ul.firstChild) { ul.removeChild(ul.firstChild) }
  bucketList.forEach(function(country) {
    var li = document.createElement("li");
    li.innerText = country.country;
    ul.appendChild(li);
  });

}

var makeDropdownWork = function() {
  var url = "https://restcountries.eu/rest/v2/all";
  console.log(requestHelper);
  requestHelper.get(url, populateDropDown);
  getSelectedCountry();
}

window.addEventListener("DOMContentLoaded", function() {

  makeDropdownWork();

  requestHelper.get("/countries", initialiseList);
})
