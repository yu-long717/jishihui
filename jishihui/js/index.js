//二级菜单
$(".list").children("li").mouseover(function () {
        $(this).children("a").css("color", "#e60012").parent().children("div").css("display", "block")
});
$(".list").children("li").mouseout(function () {
        $(this).children("a").css("color", "white").parent().children("div").css("display", "none")
});
//banner轮播图部分
$(".banner").banner({
        items: $(".banner").children("img"),
        left: $(".banner").children(".btns").children("#left"),
        right: $(".banner").children(".btns").children("#right"),
        list: $(".banner").children("ul").children("li"),
        moveTime: 300,
        autoPlay: true,
        delayTime:2000
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
        $(this).attr("class", "te").siblings().attr("class", "")
        let index = $(this).index();
        $(".jie").children("ul").eq(index).css("display", "block").siblings().css("display", "none")
})

$(".wrap").find("li").mouseover(function () {
        $(this).stop().animate({ width: 390 }, 200).siblings().stop().animate({ width: 183 }, 200)
})

//楼层的缓慢移动
$(function () {
        $("#floor").children("li").click(function () {
                $("html").stop().animate({
                        scrollTop: $(".lou").eq($(this).index()).offset().top
                })
        })
})

//跳转到商品详情页
$("#l-json").delegate("img", "click", function () {
        let ID = $(this).attr("index");
        switch ($(this).index()) {
                case 0: window.location.href = "shop.html"; break;
                case 1: window.location.href = "shop.html"; break;
                case 2: window.location.href = "shop.html"; break;
                case 3: window.location.href = "shop.html"; break;
                case 4: window.location.href = "shop.html"; break;
                case 5: window.location.href = "shop.html"; break;
        }
})

//限时抢购
class times {
        constructor() {
                this.op = document.getElementById("time");
                this.img = document.getElementsByClassName("qg2")[0];
                this.init()
        }
        init() {
                var that = this;
                this.timer = setInterval(function showTime() {
                        this.end = new Date('2019/11/15 17:55:00');
                        this.now = new Date();
                        this.offset = Math.floor((this.end - this.now) / 1000);

                        if (this.offset <= 0) {
                                that.img.style.display = "block";
                                clearInterval(that.timer);
                                that.op.innerHTML = "抢购时间" + "00" + ":" + "00" + ":" + "0" + ":" + "0";
                        }
                        let mia = this.offset % 60;
                        let min = Math.floor(this.offset / 60) % 60;
                        let hour = Math.floor(this.offset / 60 / 60) % 24;
                        let day = Math.floor(this.offset / 60 / 60 / 24);

                        that.op.innerHTML = "抢购时间" + that.createZero(day) + ":"
                                + that.createZero(hour) + ":" + that.createZero(min) + ":"
                                + that.createZero(mia);
                }, 1000);
        }
        createZero(n) {
                if (n < 10 || n.length < 2) {
                        return "0" + n;
                } else {
                        return "" + n;
                }
        }
}
new times();


$.ajax({
        type: "get",
        url: "../libs/data1.json",
        success: function (res) {
                json = eval(res)
                let odiv = document.getElementById("l-json")
                // console.log(odiv);
                var str = "";
                for (var i = 0; i < json.length; i++) {
                        str += `<img src ="${json[i].src}" index ="${json[i].goodsId}"/>`
                }
                odiv.innerHTML = str;
        }
});

//回到顶部的部分
$("#top").on("click", function () {
        $("html").stop().animate({ scrollTop: 0 }, 2000)
})

var storage = window.localStorage.userArr;
if (storage != undefined) {
        $(".denglu").text("欢迎");
        $(".shu").css("display","none");
        $(".zhuce").css("display","none");
}else{
        $(".denglu").text("登录");
        $(".shu").css("display","block");
        $(".zhuce").css("display","block");
}
$("#remove").on("click",function(){
        localStorage.clear();
})