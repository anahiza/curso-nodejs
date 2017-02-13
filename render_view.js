function render_view (html_string, variables, parametros) {
  var nombre = "";
   for (var i = variables.length - 1; i >= 0; i--){
       var value = eval(variables[i]);
       html_string = html_string.replace("{"+variables[i]+"}",parametros[variables[i]]);
     }
    return html_string
}

module.exports = render_view