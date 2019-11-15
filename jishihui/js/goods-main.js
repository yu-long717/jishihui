import {Goods} from "../module/goods.js";


new Goods({
    cont:document.getElementById("m-good"),
    url:"../libs/data2.json",
    // method:{
    //     ajaxGet:ajaxGet,
    //     setCookie:setCookie,
    //     getCookie:getCookie
    // }
})