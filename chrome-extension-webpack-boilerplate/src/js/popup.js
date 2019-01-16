import "../css/popup.css";
import "../css/bulma.min.css";
import io from "socket.io-client";
import qrcode from "qrcode-generator";
import * as moment from "moment";

const socket = io.connect("http://localhost:3000");

socket.on("priorMessages", messages => {
  if (messages)
    messages.reverse().forEach(function(message) {
      appendToList(message);
    });
});

socket.on("userCreated", response => {
  chrome.storage.sync.set({
    userObject: response.user,
    roomObject: response.room
  });        
});

socket.on("incomingMessage", message => {
  appendToList(message);
});

function cleanStorage() {
  chrome.storage.sync.clear(function() {
    var error = chrome.runtime.lastError;
    if (error) {
      console.error(error);
    } else {
      main()
    }
  });
}

function main() {
  chrome.storage.sync.get(["stringQr", "roomStringQr"], function(res) {
    let stringQr;
    let roomStringQr;
    if (!res.stringQr && !res.rommStringQr) {
      roomStringQr = Math.random()
        .toString(36)
        .substring(2, 19);
      stringQr = Math.random()
        .toString(36)
        .substring(2, 19);
      chrome.storage.sync.set({
        stringQr: stringQr,
        roomStringQr: roomStringQr
      }, function(){
        expandQrCode()
      });
    } else {
      stringQr = res.stringQr;
      roomStringQr = res.roomStringQr;
    }
    socket.emit("newStringQr", { stringQr, roomStringQr });
    document.getElementById("placeHolder").innerHTML = createQrCode(
      roomStringQr
    );
  });
}

function createQrCode(stringQr) {
  var typeNumber = 4;

  var errorCorrectionLevel = "L";
  var qr = qrcode(typeNumber, errorCorrectionLevel);
  qr.addData(stringQr);
  qr.make();
  return qr.createImgTag(10, 0);
}

function cleanMessagesBackEnd() {
  chrome.storage.sync.get(["userObject", "roomObject"], function(user) {
    let sender = user.userObject;
    let room = user.roomObject;
    socket.emit("clean", sender, room);
  });
}

function sendMessage() {
  let text = document.getElementById("text").value;
  if (text.length > 0)
    chrome.storage.sync.get(["userObject", "roomObject"], function(user) {
      let sender = user.userObject;
      let room = user.roomObject;
      socket.emit("message", { text, sender, room });
      document.getElementById("text").value = "";
    });
}

function appendToList(message) {
  chrome.storage.sync.get(["userObject"], function(res) {
    var ul = document.getElementById("ulMessages");
    var li = document.createElement("li");

    var text = document.createElement("div");

    text.classList.add("class", "message");

    text.appendChild(document.createTextNode(message.text));

    var time = document.createElement("div");
    time.appendChild(
      document.createTextNode(moment(message.createdAt).fromNow())
    );

    if (message.user._id == res.userObject.id) {
      text.classList.add("class", "message-op");
      time.classList.add("class", "time-right");
    } else {
      time.classList.add("class", "time-left");
    }
    li.appendChild(text);
    li.appendChild(time);
    ul.appendChild(li);

    var objDiv = document.getElementById("listMessages");
    objDiv.scrollTop = objDiv.scrollHeight;
  });
}

function expandQrCode() {
  document.getElementById("modal").classList.add("class", "is-active");
  chrome.storage.sync.get(["roomStringQr"], function(res) {
    document.getElementById("full-qr-code").innerHTML = createQrCode(
      res.roomStringQr
    );
  });
}

function closeModal() {
  document.getElementById("modal").classList.remove("is-active");
}

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("sendMessage").addEventListener("click", sendMessage);
  document.getElementById("close-modal").addEventListener("click", closeModal);
  document
    .getElementById("cleanStorage")
    .addEventListener("click", cleanStorage);
  document
    .getElementById("placeHolder")
    .addEventListener("click", expandQrCode);
  document
    .getElementById("cleanMessagesBackEnd")
    .addEventListener("click", cleanMessagesBackEnd);
  main();
});
