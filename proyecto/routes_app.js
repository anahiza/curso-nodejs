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
   Imagen.findById(req.params.id, function(err, imagen){
      res.render("app/imagenes/edit", {imagen: imagen})
    })
});

router.route("/imagenes/:id")
  .get(function(req, res){
     Imagen.findById(req.params.id, function(err, imagen){
      res.render("app/imagenes/show", {imagen: imagen})
    })
  })

  .put(function(req,res){
    Imagen.findById(req.params.id, function(err, imagen){
      imagen.titulo = req.body.titulo
      imagen.save(function (err){
        if (!err){
          res.render("app/imagenes/show", {imagen: imagen})          
        }
        else {
          res.render("app/imagenes/"+imagen._id+"/edit", {imagen: imagen})
        }
      })
    })
  })

  .delete(function(req, res) {
    Imagen.findOneAndRemove({_id: req.params.id}, function(err){
      if (!err){        
        res.redirect("/app/imagenes")
      } else {
        res.redirect("app/imagenes/"+req.params.id)
      }

    })    
  })

router.route("/imagenes")
  .get(function(req, res){
    Imagen.find({}, function (err, imagenes){
      console.log(new Date().toString()+"\n"+imagenes)
      if (err) {
        res.redirect("/app"); 
        return;
      }
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