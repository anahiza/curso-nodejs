var express = require('express');
var router = express.Router();
var Imagen = require('./models/imagenes')
var image_finder_middleware= require('./middlewares/find_image')

router.get("/", function (req, res) {
  res.render("app/home");
})

//* RESt *//

router.get("/imagenes/new", function(req, res) {
  res.render("app/imagenes/new")
});

router.all('/imagenes/:id*', image_finder_middleware)

router.get("/imagenes/:id/edit", function(req, res) {
  res.render("app/imagenes/edit")  
});

router.route("/imagenes/:id")
  .get(function(req, res){
    res.render("app/imagenes/show")     
  })

  .put(function(req,res){
      res.locals.imagen.titulo = req.body.titulo
      res.locals.imagen.save(function (err){
        if (!err){
          res.render("app/imagenes/show")          
        }
        else {
          res.render("app/imagenes/"+res.locals.imagen._id+"/edit")
        }
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
    Imagen.find({creator: res.locals.user._id}, function (err, imagenes){
      console.log(new Date().toString()+"\n"+imagenes)
      if (err) {
        res.redirect("/app"); 
        return;
      }
      res.render("app/imagenes/index", {imagenes: imagenes})
    }) 

  })
  .post( function(req,res){
    console.log(req.body.archivo)
    var data = {
      titulo: req.body.titulo,
      creator: res.locals.user._id
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