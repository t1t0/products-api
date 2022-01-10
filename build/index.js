"use strict";

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
var PORT = 5000;
app.listen(PORT, function () {
  console.log("Server listen on http://localhost:".concat(PORT));
});