"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Goods = exports.Goods = function () {
    function Goods(options) {
        _classCallCheck(this, Goods);

        this.cont = options.cont;
        this.url = options.url;
        this.ajaxGet = options.method.ajaxGet;
        this.getCookie = options.method.getCookie;
        this.setCookie = options.method.setCookie;
        this.load();
        this.addEvent();
    }

    _createClass(Goods, [{
        key: "load",
        value: function load() {
            var that = this;
            this.ajaxGet(this.url).then(function (res) {
                that.res = JSON.parse(res);
                that.display();
            });
        }
    }, {
        key: "display",
        value: function display() {
            var str = "";
            this.res.forEach(function (value) {
                str += "<li index =\"" + value.goodsId + "\">\n\t\t\t\t\t<img src=\"" + value.src + "\" />\n\t\t\t\t\t<p>\u52A0\u5165\u8D2D\u7269\u8F66</p>\n\t\t\t\t    </li>";

                //          str += `<div class="box" index="${value.goodsId}">
                //                      <img src="${value.src}">
                //                      <span>${value.price}</span>
                //                      <p>${value.name}</p>
                //                      <em>加入购物车</em>
                //                  </div>`;
            });
            this.cont.innerHTML = str;
        }
    }, {
        key: "addEvent",
        value: function addEvent() {
            var that = this;
            this.cont.addEventListener("click", function (eve) {
                var e = eve || window.event;
                var target = e.target || e.srcElement;
                if (target.nodeName == "P") {
                    that.id = target.parentNode.getAttribute("index");
                    that.setGoods();
                }
            });
        }
    }, {
        key: "setGoods",
        value: function setGoods() {
            this.goods = this.getCookie("goods") === "" ? [] : JSON.parse(this.getCookie("goods"));
            if (this.goods.length < 1) {
                this.goods.push({
                    id: this.id,
                    num: 1
                });
            } else {
                var onoff = true;
                for (var i = 0; i < this.goods.length; i++) {
                    if (this.goods[i].id === this.id) {
                        this.goods[i].num++;
                        onoff = false;
                        break;
                    }
                }
                if (onoff) {
                    this.goods.push({
                        id: this.id,
                        num: 1
                    });
                }
            }
            this.setCookie("goods", JSON.stringify(this.goods));
        }
    }]);

    return Goods;
}();

var Car = function () {
    function Car() {
        _classCallCheck(this, Car);

        this.cont = $("#car");
        this.url = "../libs/data1.json";
        this.load();
        this.addEvent();
    }

    _createClass(Car, [{
        key: "load",
        value: function load() {
            var d = getCookie("denglu");
            if (d != "sucess") {
                location.href = "../src/index.html";
            }
            var that = this;
            $.ajax({
                url: this.url,
                success: function success(res) {
                    that.res = res;
                    that.getCookie();
                }
            });
        }
    }, {
        key: "getCookie",
        value: function getCookie() {
            this.goods = JSON.parse($.cookie("goods"));
            this.display();
        }
    }, {
        key: "display",
        value: function display() {
            var str = "";
            for (var i = 0; i < this.res.length; i++) {
                for (var j = 0; j < this.goods.length; j++) {
                    if (this.goods[j].id === this.res[i].goodsId) {
                        str += "<dd data-id=\"" + this.res[i].goodsId + "\">\n\t\t\t\t\t\t\t\t<span>\n\t\t\t\t\t\t\t\t\t<img src=\"" + this.res[i].src + "\" />\n\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t<span>" + this.res[i].price + "</span>\n\t\t\t\t\t\t\t\t<p><input type=\"button\" value=\"-\" id =\"num1\"/><input type=\"text\" value=\"" + this.goods[j].num + "\" min=1 id =\"num2\"/><input type=\"button\" value=\"+\" id =\"num\"/></p>\n\t\t\t\t\t\t\t\t<span><em>\u5220\u9664</em></span>\n\t\t\t\t\t\t\t</dd>";
                    }
                }
            }
            this.cont.html(str);
        }
    }, {
        key: "addEvent",
        value: function addEvent() {
            var that = this;
            this.cont.on("click", "em", function () {
                that.id = $(this).parent().parent().attr("data-id");
                $(this).parent().parent().remove();
                that.setCookie(function (index) {
                    that.goods.splice(index, 1);
                });
            });
            this.cont.on("click", "#num", function () {
                that.id = $(this).parent().parent().attr("data-id");
                that.num = parseInt($(this).prev().val()) + 1;
                that.setCookie(function (index) {
                    that.goods[index].num = that.num;
                    $("#num2").val(that.goods[index].num);
                });
            });
            this.cont.on("click", "#num1", function () {
                that.id = $(this).parent().parent().attr("data-id");
                that.num = parseInt($(this).next().val()) - 1;
                that.setCookie(function (index) {
                    that.goods[index].num = $("#num2").val();
                    if (that.num >= 1) {
                        $("#num2").val(that.num);
                    } else {
                        $("#num2").val(1);
                    }
                });
            });
        }
    }, {
        key: "setCookie",
        value: function (_setCookie) {
            function setCookie(_x) {
                return _setCookie.apply(this, arguments);
            }

            setCookie.toString = function () {
                return _setCookie.toString();
            };

            return setCookie;
        }(function (cb) {
            for (var i = 0; i < this.goods.length; i++) {
                if (this.goods[i].id == this.id) {
                    cb(i);
                }
            }
            setCookie("goods", JSON.stringify(this.goods));
        })
    }]);

    return Car;
}();

exports.default = { Car: Car };