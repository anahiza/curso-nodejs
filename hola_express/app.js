var express = require('express');

var app = express();
app.set('view engine', 'pug')

app.get("/", function (req, res) {
  res.render("index", {hoy: new Date().toString()})
})



app.listen(3000);
