var express = require('express');
var bodyParser = require('body-parser');
var User = require('./models/users').User;


var app = express();
app.use('/public',express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'pug')

app.get("/", function (req, res) {
  res.render("index")
})

app.get("/login", function (req, res) {
  User.find(function(err, doc){
    console.log(doc)
    res.render("login")
  })
})

app.post("/users", function (req, res) {
  var user = new User({email:req.body.email, password: req.body.password});
  user.save(function (){
    console.log(req.body.email+" - "+req.body.password)
    res.send("Guardamos tus datos")

  })
  
  
})


app.listen(3000);