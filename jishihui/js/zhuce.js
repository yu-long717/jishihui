//先获取所有用户的对象//变成数组    
if(window.localStorage.userArr){
    //判断是否存在        
    var array = JSON.parse(window.localStorage.userArr);    
}else{        
    array = [];//创建一个新数组    
}

$("#btn").bind("click",function(){
    var username = $("#user").val();        
    var password = $("#pass").val();    
    //遍历数组进行匹配        
    for(var i =0;i<array.length;i++){            
        //判断是否有相同账号            
        if(username==array[i].username){                
            alert("该账号已存在");
            window.location.href="../src/zhuce.html";
            return;            
        }        
    }
    //创建对象        
    var obj = {
        username:username,password:password
    }
    array.push(obj);        
    window.localStorage.userArr=JSON.stringify(array);    
    alert("用户创建成功");    
    window.location.href="../src/denglu.html"; 
})