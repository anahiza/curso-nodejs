var express = require('express');
//var bodyParser = require('body-parser');
var User = require('./models/users').User;
var session = require('express-session');
var router_app = require("./routes_app");
var session_middleware = require("./middlewares/session")
var methodOverride = require("method-override");
var formidable = require('express-formidable');
var RedisStore = require('connect-redis')(session)
var http = require('http')
var realtime = require("./realtime")

var app = express();
var server = http.Server(app)
app.use('/public',express.static('public'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'pug')

var sessionMiddleware = session ( {
  store: new RedisStore({}),
  secret: "superultra secretword"
})

app.use(sessionMiddleware)

realtime(server, sessionMiddleware)

app.get("/", function (req, res) {
  console.log(req.session.user_id);
  res.render("index")
})

app.get("/signup", function (req, res) {
  User.find(function(err, doc){
    res.render("signup")
  })
})

app.get("/login", function(req, res){
  res.render("login")
})

app.post("/users", function (req, res) {
  var user = new User({email:req.fields.email,
                      password: req.fields.password,
                      password_confirmation:   req.fields.password_confirmation,
                      username: req.fields.username
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
  User.findOne({email: req.fields.email, password: req.fields.password}, function(err, docs){
    if (err) res.send(String(err));
    if (user) {
      req.session.user_id = docs._id;
      res.redirect("/app");      
    }
    else {
      res.send("Usuario o contraseña Incorrectos")
    }
  })
})
app.use(methodOverride("_method"))
app.use("/app", session_middleware)
app.use("/app", router_app);
app.use(formidable({ keepExtensions: true}))
server.listen(3000, function () {
  console.log("Aplicacion iniciada")
});

