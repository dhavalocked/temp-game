var express = require('express');
var utils = require("./app/utils/utils")
const bodyParser = require('body-parser');
var db = require('./db');
var config = require('./config')


const tableController = require('./app/controllers/TableController');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});


db.connect(config.url, function (err) {
  if (err) {
    console.log('Unable to connect to Mongo.', err)
    process.exit(1)
  } else {
    app.listen(PORT, function () {
      console.log('Listening on port : ' + PORT)
    })
  }
})


app.post('/createTable', function (req, res) {
  tableController.createTable(req, res);
});

app.post('/createGame', function (req, res) {
  tableController.createGame(req, res);
});

app.post('/getTables', function (req, res) {
  tableController.getTables(req, res);
});

app.post('/updateGame', function (req, res) {
  tableController.updateGame(req, res);
});

app.post('/updateUser', function (req, res) {
  tableController.updateUser(req, res);
});
