webpackHotUpdate("popup",{

/***/ "./src/js/popup.js":
/*!*************************!*\
  !*** ./src/js/popup.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _css_popup_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../css/popup.css */ \"./src/css/popup.css\");\n/* harmony import */ var _css_popup_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_popup_css__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _css_bulma_min_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../css/bulma.min.css */ \"./src/css/bulma.min.css\");\n/* harmony import */ var _css_bulma_min_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_css_bulma_min_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! socket.io-client */ \"./node_modules/socket.io-client/lib/index.js\");\n/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(socket_io_client__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var qrcode_generator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! qrcode-generator */ \"./node_modules/qrcode-generator/qrcode.js\");\n/* harmony import */ var qrcode_generator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(qrcode_generator__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! moment */ \"./node_modules/moment/moment.js\");\n/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_4__);\n\r\n\r\n\r\n\r\n    \r\n\r\nconst socket = socket_io_client__WEBPACK_IMPORTED_MODULE_2___default.a.connect(\"http://localhost:3000\");\r\n\r\nsocket.on(\"priorMessages\", messages => {\r\n  if (messages)\r\n    messages.reverse().forEach(function(message) {\r\n      appendToList(message);\r\n    });\r\n});\r\n\r\nsocket.on(\"userCreated\", response => {\r\n  chrome.storage.sync.set({\r\n    userObject: response.user\r\n  }); \r\n});    \r\n\r\nsocket.on(\"newStringQr\", user => {\r\n  // store.dispatch(gotNewUser(user));\r\n});\r\n\r\nsocket.on(\"incomingMessage\", message => {\r\n  appendToList(message);\r\n  // store.dispatch(gotNewMessage(message));\r\n});\r\n\r\nfunction cleanStorage() {\r\n  chrome.storage.sync.clear(function() {\r\n    var error = chrome.runtime.lastError;\r\n    if (error) {\r\n      console.error(error);\r\n    }\r\n  });\r\n}\r\n\r\nfunction main() {\r\n  chrome.storage.sync.get([\"stringQr\"], function(res) {\r\n    let stringQr;\r\n    if (!res.stringQr) {\r\n      stringQr = Math.random()\r\n        .toString(36)\r\n        .substring(2, 19);\r\n      chrome.storage.sync.set({\r\n        stringQr: stringQr\r\n      });\r\n    } else {\r\n      stringQr = res.stringQr;\r\n    }       \r\n    socket.emit(\"newStringQr\", stringQr);\r\n    document.getElementById(\"placeHolder\").innerHTML = createQrCode(stringQr);\r\n\r\n    \r\n  });\r\n}\r\n\r\nfunction createQrCode(stringQr) {\r\n  var typeNumber = 4;\r\n  \r\n  var errorCorrectionLevel = \"L\";\r\n  var qr = qrcode_generator__WEBPACK_IMPORTED_MODULE_3___default()(typeNumber, errorCorrectionLevel);\r\n  qr.addData(stringQr);\r\n  qr.make();\r\n  return qr.createImgTag(10, 0)\r\n}\r\n    \r\nfunction cleanMessagesBackEnd() {\r\n  chrome.storage.sync.get([\"userObject\"], function(user) {\r\n    let sender = user.userObject;\r\n    socket.emit(\"clean\", sender);   \r\n  });\r\n} \r\n\r\nfunction sendMessage() {\r\n  let text = document.getElementById(\"text\").value;\r\n  if (text.length > 0)\r\n    chrome.storage.sync.get([\"userObject\"], function(user) {\r\n      let sender = user.userObject;\r\n      socket.emit(\"message\", { text, sender });\r\n      document.getElementById(\"text\").value = \"\";\r\n    });   \r\n}\r\n\r\nfunction appendToList(message) {        \r\n  var ul = document.getElementById(\"ulMessages\");\r\n  var li = document.createElement(\"li\");    \r\n  \r\n  var text = document.createElement(\"div\");\r\n  text.setAttribute(\"class\", \"message\"); \r\n  text.appendChild(document.createTextNode(message.text));\r\n\r\n  var time = document.createElement(\"div\");\r\n  time.setAttribute(\"class\", \"time\");\r\n  time.appendChild(\r\n    document.createTextNode(moment__WEBPACK_IMPORTED_MODULE_4__(message.createdAt).fromNow()) \r\n  ); \r\n\r\n  li.appendChild(text);\r\n  li.appendChild(time);\r\n  ul.appendChild(li);   \r\n   \r\n  var objDiv = document.getElementById(\"listMessages\");\r\n  objDiv.scrollTop = objDiv.scrollHeight;\r\n}\r\n\r\nfunction expandQrCode() {   \r\n  document.getElementById(\"modal\").classList.add(\"class\", \"is-active\")\r\n  chrome.storage.sync.get([\"stringQr\"], function(res) {\r\n    document.getElementById(\"full-qr-code\").innerHTML = createQrCode(res.stringQr)\r\n  })\r\n} \r\n\r\nfunction closeModal() {   \r\n  document.getElementById(\"modal\").classList.remove('is-active')\r\n  // document.getElementById(\"modal\").removeAttribute(\"class\", \"is-active\")\r\n} \r\n\r\ndocument.addEventListener(\"DOMContentLoaded\", function() {\r\n  document.getElementById(\"sendMessage\").addEventListener(\"click\", sendMessage);\r\n  document\r\n  .getElementById(\"close-modal\")\r\n  .addEventListener(\"click\", closeModal);\r\n  document\r\n    .getElementById(\"cleanStorage\")\r\n    .addEventListener(\"click\", cleanStorage); \r\n  document\r\n    .getElementById(\"placeHolder\")\r\n    .addEventListener(\"click\", expandQrCode);\r\n  document\r\n    .getElementById(\"cleanMessagesBackEnd\")\r\n    .addEventListener(\"click\", cleanMessagesBackEnd);\r\n  main();\r\n});\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvanMvcG9wdXAuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvcG9wdXAuanM/ZGZmZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXCIuLi9jc3MvcG9wdXAuY3NzXCI7XHJcbmltcG9ydCBcIi4uL2Nzcy9idWxtYS5taW4uY3NzXCI7XHJcbmltcG9ydCBpbyBmcm9tIFwic29ja2V0LmlvLWNsaWVudFwiO1xyXG5pbXBvcnQgcXJjb2RlIGZyb20gXCJxcmNvZGUtZ2VuZXJhdG9yXCI7XHJcbmltcG9ydCAqIGFzIG1vbWVudCBmcm9tIFwibW9tZW50XCI7ICAgIFxyXG5cclxuY29uc3Qgc29ja2V0ID0gaW8uY29ubmVjdChcImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMFwiKTtcclxuXHJcbnNvY2tldC5vbihcInByaW9yTWVzc2FnZXNcIiwgbWVzc2FnZXMgPT4ge1xyXG4gIGlmIChtZXNzYWdlcylcclxuICAgIG1lc3NhZ2VzLnJldmVyc2UoKS5mb3JFYWNoKGZ1bmN0aW9uKG1lc3NhZ2UpIHtcclxuICAgICAgYXBwZW5kVG9MaXN0KG1lc3NhZ2UpO1xyXG4gICAgfSk7XHJcbn0pO1xyXG5cclxuc29ja2V0Lm9uKFwidXNlckNyZWF0ZWRcIiwgcmVzcG9uc2UgPT4ge1xyXG4gIGNocm9tZS5zdG9yYWdlLnN5bmMuc2V0KHtcclxuICAgIHVzZXJPYmplY3Q6IHJlc3BvbnNlLnVzZXJcclxuICB9KTsgXHJcbn0pOyAgICBcclxuXHJcbnNvY2tldC5vbihcIm5ld1N0cmluZ1FyXCIsIHVzZXIgPT4ge1xyXG4gIC8vIHN0b3JlLmRpc3BhdGNoKGdvdE5ld1VzZXIodXNlcikpO1xyXG59KTtcclxuXHJcbnNvY2tldC5vbihcImluY29taW5nTWVzc2FnZVwiLCBtZXNzYWdlID0+IHtcclxuICBhcHBlbmRUb0xpc3QobWVzc2FnZSk7XHJcbiAgLy8gc3RvcmUuZGlzcGF0Y2goZ290TmV3TWVzc2FnZShtZXNzYWdlKSk7XHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gY2xlYW5TdG9yYWdlKCkge1xyXG4gIGNocm9tZS5zdG9yYWdlLnN5bmMuY2xlYXIoZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgZXJyb3IgPSBjaHJvbWUucnVudGltZS5sYXN0RXJyb3I7XHJcbiAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1haW4oKSB7XHJcbiAgY2hyb21lLnN0b3JhZ2Uuc3luYy5nZXQoW1wic3RyaW5nUXJcIl0sIGZ1bmN0aW9uKHJlcykge1xyXG4gICAgbGV0IHN0cmluZ1FyO1xyXG4gICAgaWYgKCFyZXMuc3RyaW5nUXIpIHtcclxuICAgICAgc3RyaW5nUXIgPSBNYXRoLnJhbmRvbSgpXHJcbiAgICAgICAgLnRvU3RyaW5nKDM2KVxyXG4gICAgICAgIC5zdWJzdHJpbmcoMiwgMTkpO1xyXG4gICAgICBjaHJvbWUuc3RvcmFnZS5zeW5jLnNldCh7XHJcbiAgICAgICAgc3RyaW5nUXI6IHN0cmluZ1FyXHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc3RyaW5nUXIgPSByZXMuc3RyaW5nUXI7XHJcbiAgICB9ICAgICAgIFxyXG4gICAgc29ja2V0LmVtaXQoXCJuZXdTdHJpbmdRclwiLCBzdHJpbmdRcik7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYWNlSG9sZGVyXCIpLmlubmVySFRNTCA9IGNyZWF0ZVFyQ29kZShzdHJpbmdRcik7XHJcblxyXG4gICAgXHJcbiAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVFyQ29kZShzdHJpbmdRcikge1xyXG4gIHZhciB0eXBlTnVtYmVyID0gNDtcclxuICBcclxuICB2YXIgZXJyb3JDb3JyZWN0aW9uTGV2ZWwgPSBcIkxcIjtcclxuICB2YXIgcXIgPSBxcmNvZGUodHlwZU51bWJlciwgZXJyb3JDb3JyZWN0aW9uTGV2ZWwpO1xyXG4gIHFyLmFkZERhdGEoc3RyaW5nUXIpO1xyXG4gIHFyLm1ha2UoKTtcclxuICByZXR1cm4gcXIuY3JlYXRlSW1nVGFnKDEwLCAwKVxyXG59XHJcbiAgICBcclxuZnVuY3Rpb24gY2xlYW5NZXNzYWdlc0JhY2tFbmQoKSB7XHJcbiAgY2hyb21lLnN0b3JhZ2Uuc3luYy5nZXQoW1widXNlck9iamVjdFwiXSwgZnVuY3Rpb24odXNlcikge1xyXG4gICAgbGV0IHNlbmRlciA9IHVzZXIudXNlck9iamVjdDtcclxuICAgIHNvY2tldC5lbWl0KFwiY2xlYW5cIiwgc2VuZGVyKTsgICBcclxuICB9KTtcclxufSBcclxuXHJcbmZ1bmN0aW9uIHNlbmRNZXNzYWdlKCkge1xyXG4gIGxldCB0ZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0ZXh0XCIpLnZhbHVlO1xyXG4gIGlmICh0ZXh0Lmxlbmd0aCA+IDApXHJcbiAgICBjaHJvbWUuc3RvcmFnZS5zeW5jLmdldChbXCJ1c2VyT2JqZWN0XCJdLCBmdW5jdGlvbih1c2VyKSB7XHJcbiAgICAgIGxldCBzZW5kZXIgPSB1c2VyLnVzZXJPYmplY3Q7XHJcbiAgICAgIHNvY2tldC5lbWl0KFwibWVzc2FnZVwiLCB7IHRleHQsIHNlbmRlciB9KTtcclxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0ZXh0XCIpLnZhbHVlID0gXCJcIjtcclxuICAgIH0pOyAgIFxyXG59XHJcblxyXG5mdW5jdGlvbiBhcHBlbmRUb0xpc3QobWVzc2FnZSkgeyAgICAgICAgXHJcbiAgdmFyIHVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ1bE1lc3NhZ2VzXCIpO1xyXG4gIHZhciBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTsgICAgXHJcbiAgXHJcbiAgdmFyIHRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gIHRleHQuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJtZXNzYWdlXCIpOyBcclxuICB0ZXh0LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKG1lc3NhZ2UudGV4dCkpO1xyXG5cclxuICB2YXIgdGltZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgdGltZS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInRpbWVcIik7XHJcbiAgdGltZS5hcHBlbmRDaGlsZChcclxuICAgIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKG1vbWVudChtZXNzYWdlLmNyZWF0ZWRBdCkuZnJvbU5vdygpKSBcclxuICApOyBcclxuXHJcbiAgbGkuYXBwZW5kQ2hpbGQodGV4dCk7XHJcbiAgbGkuYXBwZW5kQ2hpbGQodGltZSk7XHJcbiAgdWwuYXBwZW5kQ2hpbGQobGkpOyAgIFxyXG4gICBcclxuICB2YXIgb2JqRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsaXN0TWVzc2FnZXNcIik7XHJcbiAgb2JqRGl2LnNjcm9sbFRvcCA9IG9iakRpdi5zY3JvbGxIZWlnaHQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGV4cGFuZFFyQ29kZSgpIHsgICBcclxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1vZGFsXCIpLmNsYXNzTGlzdC5hZGQoXCJjbGFzc1wiLCBcImlzLWFjdGl2ZVwiKVxyXG4gIGNocm9tZS5zdG9yYWdlLnN5bmMuZ2V0KFtcInN0cmluZ1FyXCJdLCBmdW5jdGlvbihyZXMpIHtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZnVsbC1xci1jb2RlXCIpLmlubmVySFRNTCA9IGNyZWF0ZVFyQ29kZShyZXMuc3RyaW5nUXIpXHJcbiAgfSlcclxufSBcclxuXHJcbmZ1bmN0aW9uIGNsb3NlTW9kYWwoKSB7ICAgXHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtb2RhbFwiKS5jbGFzc0xpc3QucmVtb3ZlKCdpcy1hY3RpdmUnKVxyXG4gIC8vIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibW9kYWxcIikucmVtb3ZlQXR0cmlidXRlKFwiY2xhc3NcIiwgXCJpcy1hY3RpdmVcIilcclxufSBcclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uKCkge1xyXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VuZE1lc3NhZ2VcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHNlbmRNZXNzYWdlKTtcclxuICBkb2N1bWVudFxyXG4gIC5nZXRFbGVtZW50QnlJZChcImNsb3NlLW1vZGFsXCIpXHJcbiAgLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjbG9zZU1vZGFsKTtcclxuICBkb2N1bWVudFxyXG4gICAgLmdldEVsZW1lbnRCeUlkKFwiY2xlYW5TdG9yYWdlXCIpXHJcbiAgICAuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNsZWFuU3RvcmFnZSk7IFxyXG4gIGRvY3VtZW50XHJcbiAgICAuZ2V0RWxlbWVudEJ5SWQoXCJwbGFjZUhvbGRlclwiKVxyXG4gICAgLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBleHBhbmRRckNvZGUpO1xyXG4gIGRvY3VtZW50XHJcbiAgICAuZ2V0RWxlbWVudEJ5SWQoXCJjbGVhbk1lc3NhZ2VzQmFja0VuZFwiKVxyXG4gICAgLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjbGVhbk1lc3NhZ2VzQmFja0VuZCk7XHJcbiAgbWFpbigpO1xyXG59KTtcclxuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/js/popup.js\n");

/***/ })

})