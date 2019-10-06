var express = require("express");
var bodyParser = require("body-parser");
var request = require("request");
var app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get('/', (req, res) => {
    res.render("index", {gender: false, error: null});
})

app.post('/', (req, res) => {
    var name = req.body.name;
    var url = `https://api.genderize.io?name=${name}`;
    request(url, function (err, response, body) {
        if(err) {
            res.render("index", {gender: false, error: "Please try again."});
        }
        else {
            var info = JSON.parse(body);
            var message = `The gender of ${info.name} is ${info.gender}.`;
            res.render("index", {gender: message, error: null});
        }
    })
})
app.listen(5656, () => {
    console.log("http://localhost:5656");
})