$(function () {

    $('#register').click(function () {
        location.href = "register.html";
    })


    $('#user').change(function () {
        var reg = /\S/;
        var val = $(this).val();
        if (!reg.test(val)) {
            $('#user').css('border', '1px solid #a94442').next().html('必填项').siblings('label').css('color', '#a94442');
        } else {
            $('#user').css('border', '1px solid #ccc').next().html('').siblings('label').css('color', '');
        }
    })

    $('#pwd').change(function () {
        var reg = /\S/;
        var val = $(this).val();
        if (!reg.test(val)) {
            $('#pwd').css('border', '1px solid #a94442').next().html('必填项').siblings('label').css('color', '#a94442');
        } else {
            $('#pwd').css('border', '1px solid #ccc').next().html('').siblings('label').css('color', '');
        }
    })

    $('#Btn').click(function () {
        var username = $('#user').val();
        var pwd = $('#pwd').val();
        if (!(username && pwd)) {
            $('#pwd').change();
            $('#user').change();
            return false;
        }
        $.ajax({
            url:"http://127.0.0.1:8848/login.php",
            data:{
                username:username,
                pwd:pwd
            },
            type:"post",
            success:function(res){
                //失败是返回fail  成功是返回id
                if(res==="fail"){
                    alert('用户名或密码错误!')
                }else{
                    
                    //获取username 和id 值放到本地储存中
                    localStorage.setItem('ID',res);
                    localStorage.setItem('username',username)
                    //成功时跳转首页
                    location.href='./index.html';
                }
            }
        })
    })













})