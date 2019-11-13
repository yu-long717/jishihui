"use strict";

require("../libs/jquery.js");

require("../libs/jquery.cookie.js");

var _car = require("../module/car.js");

var _car2 = _interopRequireDefault(_car);

var _ajax = require("../libs/ajax.3.0.js");

var _goods = require("../module/goods.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

new _car2.default.Car({
    cont: $("#car"),
    url: "../libs/data2.json"
});
//import {setCookie,getCookie} from "../libs/cookie.js";


new _goods.Goods({
    cont: document.getElementById("m-good"),
    url: "../libs/data2.json",
    method: {
        ajaxGet: _ajax.ajaxGet,
        setCookie: setCookie,
        getCookie: getCookie
    }
});