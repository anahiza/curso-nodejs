var http = require('http'),
  fs = require('fs');

 var html = fs.readFile("./index.html", function (err, html) {
   http.createServer(function (req, res) {
     var html_string = html.toString();
     var variables = html_string.match(/[^\{\}]+(?=\})/g);
     var nombre = "anahi";
     for (var i = variables.length - 1; i >= 0; i--){
       var value = eval(variables[i]);
       html_string = html_string.replace("{"+variables[i]+"}",value);
     }
     res.writeHead(200, {"Content-Type":"text/html"});
     res.write(html_string);
   }).listen(3000);

 });
