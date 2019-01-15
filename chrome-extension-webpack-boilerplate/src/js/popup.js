import "../css/popup.css";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3000");

function main() {
  socket.emit("newUser", {
    name: "tal",
    password: "tal"
  });
}

function sendHi() {
  console.log("teste");
  socket.emit("teste");
}

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("teste").addEventListener("click", sendHi);
  main();
});
