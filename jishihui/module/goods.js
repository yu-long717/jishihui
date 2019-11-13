export class Goods{
    constructor(options){
        this.cont = options.cont;
        this.url = options.url;
        this.ajaxGet = options.method.ajaxGet;
        this.getCookie = options.method.getCookie;
        this.setCookie = options.method.setCookie;
        this.load()
        this.addEvent()
    }
    load(){
        var that = this;
        this.ajaxGet(this.url).then(function(res){
            that.res = JSON.parse(res);
            that.display()
        })
    }
    display(){
        var str = "";
        this.res.forEach(function(value){
        	str += `<li index ="${value.goodsId}">
					<img src="${value.src}" />
					<p>加入购物车</p>
				    </li>`

//          str += `<div class="box" index="${value.goodsId}">
//                      <img src="${value.src}">
//                      <span>${value.price}</span>
//                      <p>${value.name}</p>
//                      <em>加入购物车</em>
//                  </div>`;
        })
        this.cont.innerHTML = str;
    }
    addEvent(){
        var that = this;
        this.cont.addEventListener("click",function(eve){
            var e = eve || window.event;
            var target = e.target || e.srcElement;
            if(target.nodeName == "P"){
                that.id = target.parentNode.getAttribute("index");
                that.setGoods()
            }
        })
    }
    setGoods(){
        this.goods = this.getCookie("goods")==="" ? [] : JSON.parse(this.getCookie("goods"));
        if(this.goods.length < 1){
            this.goods.push({
                id:this.id,
                num:1
            })
        }else{
            var onoff = true;
            for(var i=0;i<this.goods.length;i++){
                if(this.goods[i].id === this.id){
                    this.goods[i].num++;
                    onoff = false;
                    break;
                }
            }
            if(onoff){
                this.goods.push({
                    id:this.id,
                    num:1
                })
            }
        }
        this.setCookie("goods",JSON.stringify(this.goods));
    }
}

