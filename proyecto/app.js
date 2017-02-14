var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use('/public',express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'pug')

app.get("/", function (req, res) {
  res.render("index")
})

app.get("/login", function (req, res) {
  res.render("login")
})

app.post("/users", function (req, res) {
  console.log(req.body.email);
  console.log(req.body.password);
  res.send("Recibimos los datos")
  
})


app.listen(3000);