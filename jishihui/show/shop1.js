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


class Car{
    constructor(){
        this.cont = $("#car");
        this.url = "../libs/data1.json";
        this.load()
        this.addEvent()
    }
    load(){
    	let d = getCookie("denglu");
	    if(d != "sucess"){
    	location.href = "../src/index.html";
   		 }
        var that = this;
        $.ajax({
            url:this.url,
            success:function(res){
                that.res = res;
                that.getCookie()
            }
        })
    }
    getCookie(){
        this.goods = JSON.parse($.cookie("goods"));
        this.display()
    }
    display(){
        var str = "";
        for(var i=0;i<this.res.length;i++){
            for(var j=0;j<this.goods.length;j++){
                if(this.goods[j].id === this.res[i].goodsId){
                	str +=`<dd data-id="${this.res[i].goodsId}">
								<span>
									<img src="${this.res[i].src}" />
								</span>
								<span>${this.res[i].price}</span>
								<p><input type="button" value="-" id ="num1"/><input type="text" value="${this.goods[j].num}" min=1 id ="num2"/><input type="button" value="+" id ="num"/></p>
								<span><em>删除</em></span>
							</dd>`
                }
            }
        }
        this.cont.html(str);
    }
    addEvent(){
        var that = this;
        this.cont.on("click","em",function(){
            that.id = $(this).parent().parent().attr("data-id");
            $(this).parent().parent().remove();
            that.setCookie(function(index){
                that.goods.splice(index,1)
            })
        })
        this.cont.on("click","#num",function(){
            that.id = $(this).parent().parent().attr("data-id");
            that.num = parseInt($(this).prev().val()) + 1 ;
            that.setCookie(function(index){
                that.goods[index].num = that.num;
                $("#num2").val(that.goods[index].num);
            })
        })
        this.cont.on("click","#num1",function(){
            that.id = $(this).parent().parent().attr("data-id");
            that.num = parseInt($(this).next().val()) - 1; 
            that.setCookie(function(index){
                that.goods[index].num = $("#num2").val();
                if(that.num>=1){
                	$("#num2").val(that.num);                	
                }else{
                	$("#num2").val(1);
                }
            })
        })
    }
    setCookie(cb){
        for(var i=0;i<this.goods.length;i++){
            if(this.goods[i].id == this.id){
                cb(i)
            }
        }
        setCookie("goods",JSON.stringify(this.goods))
    }
}

export default {Car};