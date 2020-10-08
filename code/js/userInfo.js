$(function () {
    //验证
    var flag_name=false;
    var flag_email=false;
    var flag_phone=false;
    var flag_address=false;
    $('#nickname').blur(function(){
        var reg=/^[a-zA-Z0-9_-]{4,16}$/;
        var nickname=$('#nickname').val();
        if(reg.test(nickname)){
            flag_name=true;
            $(this).css('border','1px solid green').siblings('span').html('');
        }else{
            flag_name=false;
            $(this).css('border','1px solid red').siblings('span').html('4到16位（字母，数字，下划线，减号）').css('color', 'red');
        }
    })
    $('#email').blur(function(){
        var reg=/^\w{3,}(\.\w+)*@[A-z0-9]+(\.[A-z]{2,5}){1,2}$/;
        var email=$('#email').val();
        if(reg.test(email)){
            flag_email=true;
            $(this).css('border','1px solid green').siblings('span').html('');
        }else{
            flag_email=false;
            $(this).css('border','1px solid red').siblings('span').html('邮箱格式错误').css('color', 'red');
        }
    })
    $('#phone').blur(function(){
        var reg=/^1[3456789]\d{9}$/;
        var phone=$('#phone').val();
        if(reg.test(phone)){
            flag_phone=true;
            $(this).css('border','1px solid green').siblings('span').html('');
        }else{
            flag_phone=false;
            $(this).css('border','1px solid red').siblings('span').html('请输入正确的电话号码').css('color', 'red');
        }
    })
    $('#contact_address').blur(function(){
        var reg=/\S/;
        var contact_address=$('#contact_address').val();
        if(reg.test(contact_address)){
             flag_address=true;
            $(this).css('border','1px solid green').siblings('span').html('');
        }else{
            flag_address=false;
            $(this).css('border','1px solid red').siblings('span').html('地址不能为空').css('color', 'red');
        }
    })

    var ID = localStorage.getItem('ID');
    $.ajax({
        url: 'http://127.0.0.1:8848/getuserinfo.php',
        type: 'get',
        data: {
            id: ID
        },
        dataType: 'json',
        success: function (res) {
            for (var key in res) {
                $('#username').html(res.username);
            }
        }
    })

    $('#Btn').click(function () {

        var email = $('#email').val();
        var phone = $('#phone').val();
        var nickname = $('#nickname').val();
        if(!(flag_phone&&flag_email&&flag_name&&flag_address)){
            $('#email').blur();
            $('#phone').blur();
            $('#nickname').blur();
            $('#contact_address').blur();
            return false;
        }
        $.ajax({
            url: 'http://127.0.0.1:8848/updateuser.php',
            type: 'post',
            data: {
                id: ID,
                email: email,
                phone: phone,
                nickname: nickname
            },
            // dataType: 'json',
            success: function (data) {
                if (data === "ok") {
                    alert("用户资料更新成功");
                    location.href = "/";
                } else {
                    alert("更新失败,请稍后再试~~~");
                }
            }
        })
    })












})