//先获取所有用户的对象//变成数组    
if(window.localStorage.userArr){
    //判断是否存在        
    var array = JSON.parse(window.localStorage.userArr);    
}else{        
    array = [];//创建一个新数组    
}

$("#btn").bind("click",function(){
    var username = $("#txt").val();        
    var password = $("#pass").val();
    var flag = false;
    var index = 0;
    //遍历数组进行匹配        
    for(var i =0;i<array.length;i++){            
        //判断是否有相同账号            
        if(username==array[i].username){//有这个账号                
            flag = true;                
            index = i;        
        }
    }
    if(flag){//如果存在            
        if(password==array[index].password){                
            alert("登录成功");
            var yonghu = $("txt");
            localStorage.name = yonghu.val();
            console.log(localStorage.name);
            window.location.href="../src/index.html";
        }else{                
            alert("密码错误");            
        }        
    }else{//账号不存在或输入错误            
        alert("用户不存在，请先注册");
        
    }

})