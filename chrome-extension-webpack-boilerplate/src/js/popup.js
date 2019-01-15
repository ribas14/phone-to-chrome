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
    userObject: response.user
  }); 
});    

socket.on("newStringQr", user => {
  // store.dispatch(gotNewUser(user));
});

socket.on("incomingMessage", message => {
  appendToList(message);
  // store.dispatch(gotNewMessage(message));
});

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
      stringQr = res.stringQr;
    }       
    socket.emit("newStringQr", stringQr);
    document.getElementById("placeHolder").innerHTML = createQrCode(stringQr);

    
  });
}

function createQrCode(stringQr) {
  var typeNumber = 4;
  
  var errorCorrectionLevel = "L";
  var qr = qrcode(typeNumber, errorCorrectionLevel);
  qr.addData(stringQr);
  qr.make();
  return qr.createImgTag(10, 0)
}
    
function cleanMessagesBackEnd() {
  chrome.storage.sync.get(["userObject"], function(user) {
    let sender = user.userObject;
    socket.emit("clean", sender);   
  });
} 

function sendMessage() {
  let text = document.getElementById("text").value;
  if (text.length > 0)
    chrome.storage.sync.get(["userObject"], function(user) {
      let sender = user.userObject;
      socket.emit("message", { text, sender });
      document.getElementById("text").value = "";
    });   
}

function appendToList(message) {        
  var ul = document.getElementById("ulMessages");
  var li = document.createElement("li");    
  
  var text = document.createElement("div");
  text.setAttribute("class", "message"); 
  text.appendChild(document.createTextNode(message.text));

  var time = document.createElement("div");
  time.setAttribute("class", "time");
  time.appendChild(
    document.createTextNode(moment(message.createdAt).fromNow()) 
  ); 

  li.appendChild(text);
  li.appendChild(time);
  ul.appendChild(li);   
   
  var objDiv = document.getElementById("listMessages");
  objDiv.scrollTop = objDiv.scrollHeight;
}

function expandQrCode() {   
  document.getElementById("modal").classList.add("class", "is-active")
  chrome.storage.sync.get(["stringQr"], function(res) {
    document.getElementById("full-qr-code").innerHTML = createQrCode(res.stringQr)
  })
} 

function closeModal() {   
  document.getElementById("modal").classList.remove('is-active')
  // document.getElementById("modal").removeAttribute("class", "is-active")
} 

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("sendMessage").addEventListener("click", sendMessage);
  document
  .getElementById("close-modal")
  .addEventListener("click", closeModal);
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
