"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

$(".list").children("li").mouseover(function () {
  $(this).children("a").css("color", "#e60012").parent().children("div").css("display", "block");
});
$(".list").children("li").mouseout(function () {
  $(this).children("a").css("color", "white").parent().children("div").css("display", "none");
});
//banner轮播图部分
$(".banner").banner({
  items: $(".banner").children("img"),
  left: $(".banner").children(".btns").children("#left"),
  right: $(".banner").children(".btns").children("#right"),
  list: $(".banner").children("ul").children("li"),
  moveTime: 300,
  autoPlay: false
});
//楼层的小轮播图部分
$(".banner").banner({
  items: $(".lou-tu").children("img"),
  list: $(".lou-dian").children("li"),
  moveTime: 300,
  autoPlay: true,
  delayTime: 1200
});
//楼层的小轮播图部分-2
$(".banner").banner({
  items: $(".lou-tu-2").children("img"),
  list: $(".lou-dian").children("li"),
  moveTime: 300,
  autoPlay: true,
  delayTime: 1500
});
//楼层的小轮播图部分-3
$(".banner").banner({
  items: $(".lou-tu-3").children("img"),
  list: $(".lou-dian").children("li"),
  moveTime: 300,
  autoPlay: true,
  delayTime: 2000
});

//楼层的小轮播图部分-4
$(".banner").banner({
  items: $(".lou-tu-4").children("img"),
  list: $(".lou-dian").children("li"),
  moveTime: 300,
  autoPlay: true,
  delayTime: 1000
});

//楼层的小轮播图部分-5
$(".banner").banner({
  items: $(".lou-tu-5").children("img"),
  list: $(".lou-dian").children("li"),
  moveTime: 300,
  autoPlay: true,
  delayTime: 2500
});

//tab切换部分
$(".xuan").children("li").mouseover(function () {
  $(this).attr("class", "te").siblings().attr("class", "");
  var index = $(this).index();
  $(".jie").children("ul").eq(index).css("display", "block").siblings().css("display", "none");
});

$(".wrap").find("li").mouseover(function () {
  $(this).stop().animate({ width: 390 }, 200).siblings().stop().animate({ width: 183 }, 200);
});

//楼层的缓慢移动
$(function () {
  $("#floor").children("li").click(function () {
    $("html").stop().animate({
      scrollTop: $(".lou").eq($(this).index()).offset().top
    });
  });
});

//跳转到商品详情页
$("#l-json").delegate("img", "click", function () {
  var ID = $(this).attr("index");
  console.log(ID);
  switch ($(this).index()) {
    case 0:
      window.location.href = "shop.html";break;
    case 1:
      window.location.href = "shop1.html";break;
    case 2:
      window.location.href = "shop2.html";break;
    case 3:
      window.location.href = "shop3.html";break;
    case 4:
      window.location.href = "shop4.html";break;
    case 5:
      window.location.href = "shop5.html";break;
  }
});

var times = function () {
  function times() {
    _classCallCheck(this, times);

    this.op = document.getElementById("time");
    this.img = document.getElementsByClassName("qg2")[0];
    this.init();
  }

  _createClass(times, [{
    key: "init",
    value: function init() {
      var that = this;
      this.timer = setInterval(function showTime() {
        this.end = new Date('2019/03/05 14:55:00');
        this.now = new Date();
        this.offset = Math.floor((this.end - this.now) / 1000);

        if (this.offset <= 0) {
          that.img.style.display = "block";
          clearInterval(that.timer);
          that.op.innerHTML = "抢购时间" + "00" + ":" + "00" + ":" + "0" + ":" + "0";
        }
        var mia = this.offset % 60;
        var min = Math.floor(this.offset / 60) % 60;
        var hour = Math.floor(this.offset / 60 / 60) % 24;
        var day = Math.floor(this.offset / 60 / 60 / 24);

        that.op.innerHTML = "抢购时间" + that.createZero(day) + ":" + that.createZero(hour) + ":" + that.createZero(min) + ":" + that.createZero(mia);
      }, 1000);
    }
  }, {
    key: "createZero",
    value: function createZero(n) {
      if (n < 10 || n.length < 2) {
        return "0" + n;
      } else {
        return "" + n;
      }
    }
  }]);

  return times;
}();

new times();

$.ajax({
  type: "get",
  url: "../libs/data1.json",
  success: function success(res) {
    json = eval(res);
    var odiv = document.getElementById("l-json");
    var str = "";
    for (var i = 0; i < json.length; i++) {
      str += "<img src =\"" + json[i].src + "\" index =\"" + json[i].goodsId + "\"/>";
      //              str += '<img src="'+ json[i].src +'"/>';
    }
    odiv.innerHTML = str;
  }
});

$("#remove").on("click", function () {
  var d = new Date();
  d.setDate(d.getDate() - 1);
  document.cookie = "login" + "=" + "asdf" + ";expires=" + d;
});