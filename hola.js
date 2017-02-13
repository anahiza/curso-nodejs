var http = require('http');
var manejador = function (req, res) {
  console.log("Recibimos una nueva peticion");
  res.end("Hola mundo");
};

var servidor = http.createServer(manejador);
servidor.listen(3000);
