import "../css/popup.css";
import io from "socket.io-client";
import qrcode from "qrcode-generator";
import * as storage from "./storage.js"; 

const socket = io.connect("http://localhost:3000");

function cleanStorage() {
  chrome.storage.sync.clear(function() {
    var error = chrome.runtime.lastError;
    if (error) {
      console.error(error);   
    }
  });
}

function main() {
  chrome.storage.sync.get(["stringQr"], function(res) {
    let stringQr;
    if (!res.stringQr) {
      stringQr = Math.random()
        .toString(36)
        .substring(2, 19);
      chrome.storage.sync.set({
        stringQr: stringQr
      });
    } else {
      stringQr = res.stringQr        
    }
    socket.emit("newStringQr", stringQr);
  });
}

function createQrCode() {
  var typeNumber = 4;
  var errorCorrectionLevel = "L";
  var qr = qrcode(typeNumber, errorCorrectionLevel);
  qr.addData("random string");
  qr.make();
  document.getElementById("placeHolder").innerHTML = qr.createImgTag();
}

function sendMessage() {
  let text = document.getElementById("text").value;
  chrome.storage.sync.get(["userObject"], function(user) {
    let sender = user.userObject
    socket.emit("message", {text, sender});
    document.getElementById("text").value = '';

  })
}

function appendToList(message) {
  var ul = document.getElementById("ulMessages");
  var li = document.createElement("li");
  li.appendChild(document.createTextNode(message.text));
  // li.setAttribute("id", "element4"); // added line
  ul.appendChild(li);
}

socket.on("priorMessages", messages => {
  if (messages)
    messages.reverse().forEach(function(message) {
      appendToList(message);
    });
});

socket.on("userCreated", response => {
    chrome.storage.sync.set({
      'userObject': response.user
    });
});

socket.on("newStringQr", user => {
  // store.dispatch(gotNewUser(user));
});

socket.on("incomingMessage", message => {
  appendToList(message);
  // store.dispatch(gotNewMessage(message));
});

document.addEventListener("DOMContentLoaded", function() {


  document.getElementById("sendMessage").addEventListener("click", sendMessage);
  document.getElementById("cleanStorage").addEventListener("click", cleanStorage);
  main();
});
