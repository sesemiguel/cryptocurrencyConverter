//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){

  var data;
  var lastPrice;
  var crypto;
  var fiat;
  var amount;

  crypto = req.body.crypto;
  fiat = req.body.fiat;

  amount = req.body.amount;

  var options = {
    url: "https://apiv2.bitcoinaverage.com/convert/global",
    method: "GET",
    qs: {
      from: crypto,
      to: fiat,
      amount: amount
    }
  };

  request(options, function(error, response, body){

    // console.log(options);
    // console.log(JSON.parse(body));
    data = JSON.parse(body);
    lastPrice = data.price;

    res.write("<h1>" + amount + " " + crypto + " is equal to " + lastPrice + " " + fiat + "</h1>");

    res.send();
  });

});

app.listen(3000, () => console.log("Server is running on port 3000"));
