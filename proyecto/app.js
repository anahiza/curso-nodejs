var express = require('express');
var bodyParser = require('body-parser');
var User = require('./models/users').User;
var session = require('express-session');

var app = express();
app.use('/public',express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'pug')
app.use(session({
  secret: "949jforijfoeinvkjer",
  resave: false,
  saveUninitialized: false
}));

app.get("/", function (req, res) {
  console.log(req.session.user_id);
  res.render("index")
})

app.get("/signup", function (req, res) {
  User.find(function(err, doc){
    console.log(doc)
    res.render("signup")
  })
})

app.get("/login", function(req, res){
  res.render("login")
})

app.post("/users", function (req, res) {
  var user = new User({email:req.body.email,
                      password: req.body.password, 
                      password_confirmation:   req.body.password_confirmation,
                      username: req.body.username
                    });
  user.save().then(function(user_new){
    res.send(user_new);
  }, function(err){
    if (err){
      console.log(String(err));
      res.send("No pudimos guardar tus datos");
    }
  });
  
  
})

app.post("/sessions", function (req, res) {  
  User.findOne({email: req.body.email, password: req.body.password}, function(err, docs){
    req.session.user_id = docs._id;
    res.send("OK")
  })
})


app.listen(3000);