var socket = io();
socket.on("new image", function (data) {
  data = JSON.pasr(data)
  console.log(data)
})