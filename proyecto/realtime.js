module.exports = function(server, sessionMiddleware) {
  var io = require('socket.io')(server)
  var redis = require('redis');
  var client = redis.createClient();

  client.subscribe("images");

  io.use(function(socket, next) {
    console.log(socket.request)
    sessionMiddleware(socket.request, socket.request.res, next)
  })
  client.on("message", function (channel, message) {
    console.log("recibimos un mensaje del canal"+channel)
    console.log(message)

  })
  io.sockets.on("connection", function(socket){
    console.log(socket.request.session.user_id)
  })
}