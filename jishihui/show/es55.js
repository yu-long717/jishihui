"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Register = function () {
    function Register() {
        _classCallCheck(this, Register);

        this.url = "http://www.liyangyf.com/ctrl/register.php";
        this.init();
    }

    _createClass(Register, [{
        key: "init",
        value: function init() {
            var that = this;
            $("#btn").click(function () {
                that.load();
            });
        }
    }, {
        key: "load",
        value: function load() {
            $.ajax({
                url: this.url,
                data: {
                    tel: $("#user").val(),
                    pass: $("#pass").val()
                },
                success: function success(res) {
                    switch (res) {
                        case "0":
                            $("#msg").html("重名");
                            break;
                        case "1":
                            $("#msg").html("成功，3秒周跳转到登录");
                            setTimeout(function () {
                                location.href = "denglu.html";
                            }, 3000);
                            break;
                        case "2":
                            $("#msg").html("不允许为空");
                            break;
                    }
                }
            });
        }
    }]);

    return Register;
}();

new Register();