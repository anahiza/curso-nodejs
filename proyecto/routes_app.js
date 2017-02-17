var express = require('express');
var router = express.Router();
var Imagen = require('./models/imagenes')

router.get("/", function (req, res) {
  res.render("app/home");
})

//* RESt *//

router.get("/imagenes/new", function(req, res) {
  res.render("app/imagenes/new")
});

router.get("/imagenes/:id/edit", function(req, res) {

});

router.route("/imagenes/:id")
  .get(function(req, res){
     Imagen.findById(req.params.id, function(err, imagen){
      res.render("app/imagenes/show", {imagen: imagen})
    })

  })
  .put(function(req,res){

  })
  .delete(function(req, res) {
    
  })

router.route("/imagenes")
  .get(function(req, res){
    Imagen.find({}, function (err, imagenes){
      if (err) {res.redirect("/app"); return;}
      res.render("app/imagenes/index", {imagenes: imagenes})
    }) 

  })
  .post( function(req,res){
    var data = {
      titulo: req.body.titulo
    }

    var imagen = new Imagen(data)    
    imagen.save( function(err){
      if (!err) {
        res.redirect("/app/imagenes/"+imagen._id)
      }
      else{
        res.render(err)
      }
    })
  })



module.exports = router;