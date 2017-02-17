var express = require('express');
var bodyParser = require('body-parser');
var User = require('./models/users').User;
var cookieSession = require('cookie-session');
var router_app = require("./routes_app");
var session_middleware = require("./middlewares/session")
var methodOverride = require("method-override");

var app = express();
app.use('/public',express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'pug')

app.use(cookieSession({
  name: "session",
  keys: ["llave-1", "llave-2"]
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
    res.redirect("/app");
  })
})
app.use(methodOverride("_method"))
app.use("/app", session_middleware)
app.use("/app", router_app);
app.listen(3000);