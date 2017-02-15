var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/fotos");

var user_schema = new Schema({
  name:String,
  username: String,
  password:String,
  email:String,
  birth:Date,
  age:Number
});

var User = mongoose.model("User", user_schema);

module.exports.User = User;