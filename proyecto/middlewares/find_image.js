var Imagen = require('../models/imagenes')

module.exports = function (req, res, next){
  Imagen.findById(req.params.id)
    .populate("creator")
    .exec(function (err, imagen){
    if (imagen != null){
      console.log("\n---------------\n Encontré la imagen \n "+imagen)
      res.locals.imagen = imagen;
      next();
    }
    else {
      res.redirect("/app")
    }
  })
}