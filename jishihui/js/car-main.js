import "../libs/jquery.js";
import "../libs/jquery.cookie.js";


import obj from "../module/car.js";

new obj.Car({
    cont:$("#car"),
    url:"../libs/data2.json"
})