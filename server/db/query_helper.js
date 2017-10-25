var MongoClient = require("mongodb").MongoClient;

var queryHelper = {

  url: "mongodb://localhost:27017/countries",

  all: function(onQueryFinished) {
    MongoClient.connect(this.url, function (err, db) {
      var countriesCollection = db.collection("countries");
      countriesCollection.find().toArray(function(err, docs) {
        onQueryFinished(docs);
      });
    });
  },

  save: function(data, onQueryFinished) {
    MongoClient.connect(this.url, function(err, db) {
      var countriesCollection = db.collection("countries");
      countriesCollection.insert(data);
      countriesCollection.find().toArray(function(err, docs) {
        onQueryFinished(docs);
      });
    });
  }

}

module.exports = queryHelper;
