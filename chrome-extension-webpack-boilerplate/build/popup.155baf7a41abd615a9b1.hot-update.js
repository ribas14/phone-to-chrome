webpackHotUpdate("popup",{

/***/ "./src/js/popup.js":
/*!*************************!*\
  !*** ./src/js/popup.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _css_popup_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../css/popup.css */ \"./src/css/popup.css\");\n/* harmony import */ var _css_popup_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_popup_css__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! socket.io-client */ \"./node_modules/socket.io-client/lib/index.js\");\n/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(socket_io_client__WEBPACK_IMPORTED_MODULE_1__);\n\r\n\r\n\r\nconst socket = socket_io_client__WEBPACK_IMPORTED_MODULE_1___default.a.connect(\"http://localhost:3000\");\r\n\r\nfunction main() {\r\n  socket.emit(\"newUser\", {\r\n    name: \"tal\",\r\n    password: \"tal\"\r\n  });\r\n}\r\n\r\nfunction sendHi() {\r\n  console.log(\"teste\");\r\n  socket.emit(\"sendhi\");\r\n}\r\n\r\ndocument.addEventListener(\"DOMContentLoaded\", function() {\r\n  document.getElementById(\"teste\").addEventListener(\"click\", sendHi);\r\n  main();\r\n});\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvanMvcG9wdXAuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvcG9wdXAuanM/ZGZmZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXCIuLi9jc3MvcG9wdXAuY3NzXCI7XHJcbmltcG9ydCBpbyBmcm9tIFwic29ja2V0LmlvLWNsaWVudFwiO1xyXG5cclxuY29uc3Qgc29ja2V0ID0gaW8uY29ubmVjdChcImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMFwiKTtcclxuXHJcbmZ1bmN0aW9uIG1haW4oKSB7XHJcbiAgc29ja2V0LmVtaXQoXCJuZXdVc2VyXCIsIHtcclxuICAgIG5hbWU6IFwidGFsXCIsXHJcbiAgICBwYXNzd29yZDogXCJ0YWxcIlxyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzZW5kSGkoKSB7XHJcbiAgY29uc29sZS5sb2coXCJ0ZXN0ZVwiKTtcclxuICBzb2NrZXQuZW1pdChcInNlbmRoaVwiKTtcclxufVxyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24oKSB7XHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0ZXN0ZVwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc2VuZEhpKTtcclxuICBtYWluKCk7XHJcbn0pO1xyXG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/js/popup.js\n");

/***/ })

})