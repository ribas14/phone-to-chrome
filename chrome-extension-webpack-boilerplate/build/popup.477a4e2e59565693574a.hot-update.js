webpackHotUpdate("popup",{

/***/ "./src/js/popup.js":
/*!*************************!*\
  !*** ./src/js/popup.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _css_popup_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../css/popup.css */ \"./src/css/popup.css\");\n/* harmony import */ var _css_popup_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_popup_css__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _css_bulma_min_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../css/bulma.min.css */ \"./src/css/bulma.min.css\");\n/* harmony import */ var _css_bulma_min_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_css_bulma_min_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! socket.io-client */ \"./node_modules/socket.io-client/lib/index.js\");\n/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(socket_io_client__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var qrcode_generator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! qrcode-generator */ \"./node_modules/qrcode-generator/qrcode.js\");\n/* harmony import */ var qrcode_generator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(qrcode_generator__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! moment */ \"./node_modules/moment/moment.js\");\n/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_4__);\n\r\n\r\n\r\n\r\n\r\n\r\nconst socket = socket_io_client__WEBPACK_IMPORTED_MODULE_2___default.a.connect(\"http://localhost:3000\");\r\n\r\nsocket.on(\"priorMessages\", messages => {\r\n  if (messages)\r\n    messages.reverse().forEach(function(message) {\r\n      appendToList(message);\r\n    });\r\n});\r\n\r\nsocket.on(\"userCreated\", response => {\r\n  chrome.storage.sync.set({\r\n    userObject: response.user\r\n  });\r\n});\r\n\r\nsocket.on(\"newStringQr\", user => {\r\n  // store.dispatch(gotNewUser(user));\r\n});\r\n\r\nsocket.on(\"incomingMessage\", message => {\r\n  appendToList(message);\r\n  // store.dispatch(gotNewMessage(message));\r\n});\r\n\r\nfunction cleanStorage() {\r\n  chrome.storage.sync.clear(function() {\r\n    var error = chrome.runtime.lastError;\r\n    if (error) {\r\n      console.error(error);\r\n    }\r\n  });\r\n}\r\n\r\nfunction main() {\r\n  chrome.storage.sync.get([\"stringQr\"], function(res) {\r\n    let stringQr;\r\n    if (!res.stringQr) {\r\n      stringQr = Math.random()\r\n        .toString(36)\r\n        .substring(2, 19);\r\n      chrome.storage.sync.set({\r\n        stringQr: stringQr\r\n      });\r\n    } else {\r\n      stringQr = res.stringQr;\r\n    }\r\n    socket.emit(\"newStringQr\", stringQr);\r\n    createQrCode(stringQr);\r\n  });\r\n}\r\n\r\nfunction createQrCode(stringQr) {\r\n  var typeNumber = 4;\r\n  var errorCorrectionLevel = \"L\";\r\n  var qr = qrcode_generator__WEBPACK_IMPORTED_MODULE_3___default()(typeNumber, errorCorrectionLevel);\r\n  qr.addData(stringQr);\r\n  qr.make();\r\n  document.getElementById(\"placeHolder\").innerHTML = qr.createImgTag();\r\n}\r\n\r\nfunction cleanMessagesBackEnd() {\r\n  chrome.storage.sync.get([\"userObject\"], function(user) {\r\n    let sender = user.userObject;\r\n    socket.emit(\"clean\", sender);\r\n  });\r\n}\r\n\r\nfunction sendMessage() {\r\n  let text = document.getElementById(\"text\").value;\r\n  if (text.length > 0)\r\n    chrome.storage.sync.get([\"userObject\"], function(user) {\r\n      let sender = user.userObject;\r\n      socket.emit(\"message\", { text, sender });\r\n      document.getElementById(\"text\").value = \"\";\r\n    });\r\n}\r\n\r\nfunction appendToList(message) {\r\n  var ul = document.getElementById(\"ulMessages\");\r\n  var li = document.createElement(\"li\");\r\n\r\n  var text = document.createElement(\"div\");\r\n  text.setAttribute(\"class\", \"message\");\r\n  text.appendChild(document.createTextNode(message.text));\r\n\r\n  var time = document.createElement(\"div\");\r\n  time.setAttribute(\"class\", \"time\");\r\n  time.appendChild(\r\n    document.createTextNode(moment__WEBPACK_IMPORTED_MODULE_4__(message.createdAt).fromNow()) \r\n  ); \r\n\r\n  li.appendChild(text);\r\n  li.appendChild(time);\r\n  ul.appendChild(li);\r\n\r\n  var objDiv = document.getElementById(\"listMessages\");\r\n  objDiv.scrollTop = objDiv.scrollHeight;\r\n}\r\n\r\nfunction expandQrCode() {   \r\n\r\n} \r\n\r\ndocument.addEventListener(\"DOMContentLoaded\", function() {\r\n  document.getElementById(\"sendMessage\").addEventListener(\"click\", sendMessage);\r\n  document\r\n    .getElementById(\"cleanStorage\")\r\n    .addEventListener(\"click\", cleanStorage);\r\n  document\r\n    .getElementById(\"placeHolder\")\r\n    .addEventListener(\"click\", expandQrCode);\r\n  document\r\n    .getElementById(\"cleanMessagesBackEnd\")\r\n    .addEventListener(\"click\", cleanMessagesBackEnd);\r\n  main();\r\n});\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvanMvcG9wdXAuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvcG9wdXAuanM/ZGZmZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXCIuLi9jc3MvcG9wdXAuY3NzXCI7XHJcbmltcG9ydCBcIi4uL2Nzcy9idWxtYS5taW4uY3NzXCI7XHJcbmltcG9ydCBpbyBmcm9tIFwic29ja2V0LmlvLWNsaWVudFwiO1xyXG5pbXBvcnQgcXJjb2RlIGZyb20gXCJxcmNvZGUtZ2VuZXJhdG9yXCI7XHJcbmltcG9ydCAqIGFzIG1vbWVudCBmcm9tIFwibW9tZW50XCI7XHJcblxyXG5jb25zdCBzb2NrZXQgPSBpby5jb25uZWN0KFwiaHR0cDovL2xvY2FsaG9zdDozMDAwXCIpO1xyXG5cclxuc29ja2V0Lm9uKFwicHJpb3JNZXNzYWdlc1wiLCBtZXNzYWdlcyA9PiB7XHJcbiAgaWYgKG1lc3NhZ2VzKVxyXG4gICAgbWVzc2FnZXMucmV2ZXJzZSgpLmZvckVhY2goZnVuY3Rpb24obWVzc2FnZSkge1xyXG4gICAgICBhcHBlbmRUb0xpc3QobWVzc2FnZSk7XHJcbiAgICB9KTtcclxufSk7XHJcblxyXG5zb2NrZXQub24oXCJ1c2VyQ3JlYXRlZFwiLCByZXNwb25zZSA9PiB7XHJcbiAgY2hyb21lLnN0b3JhZ2Uuc3luYy5zZXQoe1xyXG4gICAgdXNlck9iamVjdDogcmVzcG9uc2UudXNlclxyXG4gIH0pO1xyXG59KTtcclxuXHJcbnNvY2tldC5vbihcIm5ld1N0cmluZ1FyXCIsIHVzZXIgPT4ge1xyXG4gIC8vIHN0b3JlLmRpc3BhdGNoKGdvdE5ld1VzZXIodXNlcikpO1xyXG59KTtcclxuXHJcbnNvY2tldC5vbihcImluY29taW5nTWVzc2FnZVwiLCBtZXNzYWdlID0+IHtcclxuICBhcHBlbmRUb0xpc3QobWVzc2FnZSk7XHJcbiAgLy8gc3RvcmUuZGlzcGF0Y2goZ290TmV3TWVzc2FnZShtZXNzYWdlKSk7XHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gY2xlYW5TdG9yYWdlKCkge1xyXG4gIGNocm9tZS5zdG9yYWdlLnN5bmMuY2xlYXIoZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgZXJyb3IgPSBjaHJvbWUucnVudGltZS5sYXN0RXJyb3I7XHJcbiAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1haW4oKSB7XHJcbiAgY2hyb21lLnN0b3JhZ2Uuc3luYy5nZXQoW1wic3RyaW5nUXJcIl0sIGZ1bmN0aW9uKHJlcykge1xyXG4gICAgbGV0IHN0cmluZ1FyO1xyXG4gICAgaWYgKCFyZXMuc3RyaW5nUXIpIHtcclxuICAgICAgc3RyaW5nUXIgPSBNYXRoLnJhbmRvbSgpXHJcbiAgICAgICAgLnRvU3RyaW5nKDM2KVxyXG4gICAgICAgIC5zdWJzdHJpbmcoMiwgMTkpO1xyXG4gICAgICBjaHJvbWUuc3RvcmFnZS5zeW5jLnNldCh7XHJcbiAgICAgICAgc3RyaW5nUXI6IHN0cmluZ1FyXHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc3RyaW5nUXIgPSByZXMuc3RyaW5nUXI7XHJcbiAgICB9XHJcbiAgICBzb2NrZXQuZW1pdChcIm5ld1N0cmluZ1FyXCIsIHN0cmluZ1FyKTtcclxuICAgIGNyZWF0ZVFyQ29kZShzdHJpbmdRcik7XHJcbiAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVFyQ29kZShzdHJpbmdRcikge1xyXG4gIHZhciB0eXBlTnVtYmVyID0gNDtcclxuICB2YXIgZXJyb3JDb3JyZWN0aW9uTGV2ZWwgPSBcIkxcIjtcclxuICB2YXIgcXIgPSBxcmNvZGUodHlwZU51bWJlciwgZXJyb3JDb3JyZWN0aW9uTGV2ZWwpO1xyXG4gIHFyLmFkZERhdGEoc3RyaW5nUXIpO1xyXG4gIHFyLm1ha2UoKTtcclxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYWNlSG9sZGVyXCIpLmlubmVySFRNTCA9IHFyLmNyZWF0ZUltZ1RhZygpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjbGVhbk1lc3NhZ2VzQmFja0VuZCgpIHtcclxuICBjaHJvbWUuc3RvcmFnZS5zeW5jLmdldChbXCJ1c2VyT2JqZWN0XCJdLCBmdW5jdGlvbih1c2VyKSB7XHJcbiAgICBsZXQgc2VuZGVyID0gdXNlci51c2VyT2JqZWN0O1xyXG4gICAgc29ja2V0LmVtaXQoXCJjbGVhblwiLCBzZW5kZXIpO1xyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzZW5kTWVzc2FnZSgpIHtcclxuICBsZXQgdGV4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGV4dFwiKS52YWx1ZTtcclxuICBpZiAodGV4dC5sZW5ndGggPiAwKVxyXG4gICAgY2hyb21lLnN0b3JhZ2Uuc3luYy5nZXQoW1widXNlck9iamVjdFwiXSwgZnVuY3Rpb24odXNlcikge1xyXG4gICAgICBsZXQgc2VuZGVyID0gdXNlci51c2VyT2JqZWN0O1xyXG4gICAgICBzb2NrZXQuZW1pdChcIm1lc3NhZ2VcIiwgeyB0ZXh0LCBzZW5kZXIgfSk7XHJcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGV4dFwiKS52YWx1ZSA9IFwiXCI7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gYXBwZW5kVG9MaXN0KG1lc3NhZ2UpIHtcclxuICB2YXIgdWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInVsTWVzc2FnZXNcIik7XHJcbiAgdmFyIGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xyXG5cclxuICB2YXIgdGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgdGV4dC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcIm1lc3NhZ2VcIik7XHJcbiAgdGV4dC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShtZXNzYWdlLnRleHQpKTtcclxuXHJcbiAgdmFyIHRpbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gIHRpbWUuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJ0aW1lXCIpO1xyXG4gIHRpbWUuYXBwZW5kQ2hpbGQoXHJcbiAgICBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShtb21lbnQobWVzc2FnZS5jcmVhdGVkQXQpLmZyb21Ob3coKSkgXHJcbiAgKTsgXHJcblxyXG4gIGxpLmFwcGVuZENoaWxkKHRleHQpO1xyXG4gIGxpLmFwcGVuZENoaWxkKHRpbWUpO1xyXG4gIHVsLmFwcGVuZENoaWxkKGxpKTtcclxuXHJcbiAgdmFyIG9iakRpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibGlzdE1lc3NhZ2VzXCIpO1xyXG4gIG9iakRpdi5zY3JvbGxUb3AgPSBvYmpEaXYuc2Nyb2xsSGVpZ2h0O1xyXG59XHJcblxyXG5mdW5jdGlvbiBleHBhbmRRckNvZGUoKSB7ICAgXHJcblxyXG59IFxyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24oKSB7XHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZW5kTWVzc2FnZVwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc2VuZE1lc3NhZ2UpO1xyXG4gIGRvY3VtZW50XHJcbiAgICAuZ2V0RWxlbWVudEJ5SWQoXCJjbGVhblN0b3JhZ2VcIilcclxuICAgIC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY2xlYW5TdG9yYWdlKTtcclxuICBkb2N1bWVudFxyXG4gICAgLmdldEVsZW1lbnRCeUlkKFwicGxhY2VIb2xkZXJcIilcclxuICAgIC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZXhwYW5kUXJDb2RlKTtcclxuICBkb2N1bWVudFxyXG4gICAgLmdldEVsZW1lbnRCeUlkKFwiY2xlYW5NZXNzYWdlc0JhY2tFbmRcIilcclxuICAgIC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY2xlYW5NZXNzYWdlc0JhY2tFbmQpO1xyXG4gIG1haW4oKTtcclxufSk7XHJcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/js/popup.js\n");

/***/ })

})