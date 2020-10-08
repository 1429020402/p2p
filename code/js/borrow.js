$(function(){
    $(".button_btn").on("click",function(){
        var ID=localStorage.getItem('ID')
        if(!ID){
            alert('请登录');
            location.href='enter.html';
            return false;
        }
        var type=$(this).data("type");
        //原生js自定义属性 dataset['type']
        sessionStorage.setItem("type",type);
    });
})