class Car{
    constructor(){
        this.cont = $("#car");
        this.url = "../libs/data1.json";
        this.load();
        this.addEvent();
    }
    load(){
        var that = this;
        $.ajax({
            url:this.url,
            success:function(res){
                that.res = res;
                that.getCookie();
            }
        })
    }
    getCookie(){
        this.goods = JSON.parse($.cookie("goods"));
        this.display();
    }
    display(){
        var str = "";
        for(var i=0;i<this.res.length;i++){
            for(var j=0;j<this.goods.length;j++){
                if(this.goods[j].id === this.res[i].goodsId){
                    str +=`<dd data-id="${this.res[i].goodsId}">
                                <span>
                                    <input type="checkbox" style="width:13px;height:13px;">
                                </span>
								<span>
                                    <img src="${this.res[i].src}" />
                                    <i>${this.res[i].name}</i>
								</span>
								<span class="danjia">${this.res[i].price}</span>
                                <p><input type="button" value="-" id ="num1"/><input type="text" value="${this.goods[j].num}" min=1 id ="num2"/><input type="button" value="+" id ="num"/></p>
                                <span class="xiaoji">正在开发</span>
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
                that.goods.splice(index,1);
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
                cb(i);
            }
        }
        setCookie("goods",JSON.stringify(this.goods));
    }
}

new Car();