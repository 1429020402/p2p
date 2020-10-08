$(function(){
    $.ajax({
        url:'http://127.0.0.1:8848/getuserinfo.php',
        type:'get',
        data:'id='+localStorage.getItem('ID'),
        dataType:'json',
        success:function(res){
            // console.log(res);
            // 遍历对象
            for (var key in res) {
                //放入
                $('#'+key).text(res[key]);
            }
        }
    })








})