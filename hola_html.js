var http = require('http'),
  fs = require('fs');

 var html = fs.readFile("./index.html", function (err, html) {
   http.createServer(function (req, res) {
     res.writeHead(200, {"Content-Type":"application/json"});
     res.write(JSON.stringify({nombre: "Anahi", username: "anahiza"}));
    res.end();
   }).listen(3000);

 });
