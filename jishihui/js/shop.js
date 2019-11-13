//放大镜
class shop{
	constructor(){
		this.init();
	}
	init(){
		$(".show-l").on("mouseover",function(){
			$(".box").css({display:"block"})
			$(".show-c").css({display:"block"})
		}) 
		this.move();
	}
	move(){
		$(".show-l").on("mousemove",function(eve){
			let e = eve || window.event;
			let l = e.offsetX - $(".box").innerWidth()/2;
			let t = e.offsetY - $(".box").innerHeight()/2;
			if(l<0)l=0;
			if(t<0)t=0;
			if(l>$(".show-l").innerWidth()-$(".box").innerWidth()){
				l=$(".show-l").innerWidth()-$(".box").innerWidth()
			}
			if(t>$(".show-l").innerHeight()-$(".box").innerHeight()){
				t=$(".show-l").innerHeight()-$(".box").innerHeight()
			}
			$(".box").css({left:l +"px",top:t+"px"})
			let x = l/($(".show-l").innerWidth()-$(".box").innerWidth())
			let y = t/($(".show-l").innerHeight()-$(".box").innerHeight())
			$("#big").css({
				left:($(".show-c").innerWidth()-$("#big").innerWidth())*x+"px",
				top:($(".show-c").innerHeight()-$("#big").innerHeight())*y+"px"
			})
		})
		this.out();
	}
	out(){
		$(".show-l").on("mouseout",function(){
			$(".box").css({display:"none"})
			$(".show-c").css({display:"none"})
		})
	}
	
}
new shop();

//商品添加部分
class Goods{
    constructor(){
        this.cont = document.getElementById("shop");   
        this.init()
    }

    init(){
        var that = this;
        this.cont.addEventListener("click",function(eve){
            var e = eve || window.event;
            var target = e.target || e.srcElement;
            if(target.nodeName == "INPUT"){
                that.id = target.getAttribute("index");
                that.setGoods()
            }
        })
    }
    setGoods(){
        this.goods = getCookie("goods")==="" ? [] : JSON.parse(getCookie("goods"));
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
        setCookie("goods",JSON.stringify(this.goods));
    }
}

new Goods();

