var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var queryHelper = require("./db/query_helper.js");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use(express.static(__dirname + "/../client/build"));

var countriesRouter = require("./controllers/countries_controller.js");

// app.use("/countries", countriesRouter);

app.get("/countries", function(req, res) {
  queryHelper.all(function(bucketList) {
    res.json(bucketList)
  });
});

app.post("/", function(req, res) {
  console.log("hello");
  var country = req.body;
  queryHelper.save(country, function(docs) {
    console.log(docs);
  });
});

app.listen(3000, function() {
  console.log(Date.now(), " server started on port" + this.address().port);
})
