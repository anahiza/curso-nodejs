var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user_schema = new Schema({
  name:String,
  username: String,
  password:String,
  email:String,
  birth:Date,
  age:Number
});