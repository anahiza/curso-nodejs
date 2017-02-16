var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var password_validation = {
      validator: function(p){
        return this.password_confirmation == p;
      } ,
      message: "Las contraseñas no son iguales"
    }

mongoose.connect("mongodb://localhost/fotos");
var posibles_valores = ["M","F"];
var email_match = [/^\w+([\.\+\-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/]
var user_schema = new Schema({
  name:String,
  username: {type: String, required: true, maxlength:[50,"Username muy grande"]},
  password:{
    type: String, 
    minlength: [4,"Password es muy corto"],
    validate: password_validation
  },
  email:{type: String, required: true, match: email_match},
  birth:Date,
  age:{type: Number, min:[5,"La edad no puede ser menor que 5"], max:[100, "La edad no puede ser mayor que 100"]},
  sex: {type: String, enum: {values: posibles_valores, message: "Opción no válida"}}
});

user_schema.virtual("password_confirmation").get(function(){
  return this.p_c;
}).set(function(password){
  this.p_c=password;
})

var User = mongoose.model("User", user_schema);

module.exports.User = User;