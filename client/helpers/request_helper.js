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
