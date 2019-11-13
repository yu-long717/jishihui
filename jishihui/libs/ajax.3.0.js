// get请求和发送的功能
// 使用方式
// ajaxGet(url,{}).then(function(res){
//     console.log(res)
// },function(errCode){
//     console.log(errCode)
// })
export function ajaxGet(url,data){
    var str = "";
    for(var i in data){
        str =  str + i + "=" + data[i] + "&";
    }
    var d = new Date();
    url = url + "?" + str + "t=" + d.getTime()

    var p = new Promise(function(success,error){
        var ajax = new XMLHttpRequest()
        ajax.open("GET",url);
        ajax.onreadystatechange = function(){
            if(ajax.readyState == 4 && ajax.status == 200){
                success(ajax.responseText)
            }else if(ajax.readyState == 4 && ajax.status != 200){
                error(ajax.status)
            }
        }
        ajax.send(null)
    })
    return p;
}
