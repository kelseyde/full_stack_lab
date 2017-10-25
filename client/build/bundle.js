/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var requestHelper = __webpack_require__(1);

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


/***/ }),
/* 1 */
/***/ (function(module, exports) {

var requestHelper = {

  get: function(url, callback) {
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.addEventListener("load", function() {
      var jsonString = this.responseText;
      var countries = JSON.parse(jsonString);
      callback(countries);
    });
    request.send();
  },
  post: function(url, callback, payload) {
    var request = new XMLHttpRequest();
    console.log(url);
    request.open("POST", url);
    request.setRequestHeader("Content-Type", "application/json");
    // request.addEventListener("load", function() {
    //   if (request.status !== 200) return;
    //   var jsonString = request.responseText;
    //   var data = JSON.parse(jsonString);
    //   callback(data);
    // });
    var dbData = JSON.stringify({ country: payload });
    console.log(dbData);
    request.send(dbData);
  }

}

module.exports = requestHelper;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map