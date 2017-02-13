var http = require('http'),
  fs = require('fs');
var parser = require('./params_parser.js');
var render = require('./render_view.js')

var p = parser.parse;

 var html = fs.readFile("./index.html", function (err, html) {
   http.createServer(function (req, res) {
    if (req.url.indexOf("favicon.ico")>0){
      return;
    }
    console.log("##############\n"); 
    console.log(req);    
    console.log("##############\n");
    var html_string = html.toString();
    var variables = html_string.match(/[^\{\}]+(?=\})/g);

    var parametros = p(req);
   
     res.writeHead(200, {"Content-Type":"text/html"});
     res.write(render(html_string,variables, parametros));
   }).listen(3000);

 });
