"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var shop = function () {
    function shop() {
        _classCallCheck(this, shop);

        this.init();
    }

    _createClass(shop, [{
        key: "init",
        value: function init() {
            $(".show-l").on("mouseover", function () {
                $(".box").css({ display: "block" });
                $(".show-c").css({ display: "block" });
            });
            this.move();
        }
    }, {
        key: "move",
        value: function move() {
            $(".show-l").on("mousemove", function (eve) {
                var e = eve || window.event;
                var l = e.offsetX - $(".box").innerWidth() / 2;
                var t = e.offsetY - $(".box").innerHeight() / 2;
                if (l < 0) l = 0;
                if (t < 0) t = 0;
                if (l > $(".show-l").innerWidth() - $(".box").innerWidth()) {
                    l = $(".show-l").innerWidth() - $(".box").innerWidth();
                }
                if (t > $(".show-l").innerHeight() - $(".box").innerHeight()) {
                    t = $(".show-l").innerHeight() - $(".box").innerHeight();
                }
                $(".box").css({ left: l + "px", top: t + "px" });
                var x = l / ($(".show-l").innerWidth() - $(".box").innerWidth());
                var y = t / ($(".show-l").innerHeight() - $(".box").innerHeight());
                $("#big").css({
                    left: ($(".show-c").innerWidth() - $("#big").innerWidth()) * x + "px",
                    top: ($(".show-c").innerHeight() - $("#big").innerHeight()) * y + "px"
                });
            });
            this.out();
        }
    }, {
        key: "out",
        value: function out() {
            $(".show-l").on("mouseout", function () {
                $(".box").css({ display: "none" });
                $(".show-c").css({ display: "none" });
            });
        }
    }]);

    return shop;
}();

new shop();

//商品添加部分

var Goods = function () {
    function Goods() {
        _classCallCheck(this, Goods);

        this.cont = document.getElementById("shop");
        this.init();
    }

    _createClass(Goods, [{
        key: "init",
        value: function init() {
            var that = this;
            this.cont.addEventListener("click", function (eve) {
                var e = eve || window.event;
                var target = e.target || e.srcElement;
                if (target.nodeName == "INPUT") {
                    that.id = target.getAttribute("index");
                    that.setGoods();
                }
            });
        }
    }, {
        key: "setGoods",
        value: function setGoods() {
            this.goods = getCookie("goods") === "" ? [] : JSON.parse(getCookie("goods"));
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
            setCookie("goods", JSON.stringify(this.goods));
        }
    }]);

    return Goods;
}();

new Goods();