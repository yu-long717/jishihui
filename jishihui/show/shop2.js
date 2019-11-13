import "../libs/jquery.js";
import "../libs/jquery.cookie.js";


import obj from "../module/car.js";

new obj.Car({
    cont:$("#car"),
    url:"../libs/data2.json"
})

import {ajaxGet} from "../libs/ajax.3.0.js";
//import {setCookie,getCookie} from "../libs/cookie.js";
import {Goods} from "../module/goods.js";


new Goods({
    cont:document.getElementById("m-good"),
    url:"../libs/data2.json",
    method:{
        ajaxGet:ajaxGet,
        setCookie:setCookie,
        getCookie:getCookie
    }
})