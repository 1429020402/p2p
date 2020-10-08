$(function () {

    //验证
    var flag=false;
    $('#chargemoney').blur(function () {
        var reg = /^[0-9]*[1-9][0-9]*$/;
        var chargemoney = $('#chargemoney').val();
        if (reg.test(chargemoney)) {
            flag = true;
            $('#chargemoney').css('border', '1px solid green').next().html('');
        } else {
            flag = false;
            $('#chargemoney').css('border', '1px solid red').siblings('span').html('请输入一个大于0的正整数').css('color', 'red');
        }
    })

    $('#Btn').click(function () {
        if(!flag){
            $('#chargemoney').blur();
            return false;
        }

        var chargemoney = $('#chargemoney').val();
        if (!chargemoney) return false;

        $.ajax({
            url: "http://127.0.0.1:8848/charge.php",
            type: "POST",
            data: {
                id: localStorage.getItem("ID"),
                bankcode: $("#bankcode").val(),
                chargemoney: chargemoney
            },
            success: function (res) {
                if (res === "ok") {
                    alert("充值成功!");
                    location.href = "/#personal";
                } else {
                    alert("请稍后再试");
                }
            }
        })

    })



    $('.recharge .online li').click(function () {
        $(this).addClass('active').siblings('li').removeClass('active');
        $('.recharge .content>div').removeClass('on');
        $('.recharge .content>div').eq($(this).index()).addClass('on');
    });



    //判断用户是否登录
    isenter();

    function isenter() {
        var username = localStorage.getItem('username');
        var ID = localStorage.getItem('ID');

        if (username && ID) { //登录
            $('#is_enter').html('<a>' + username + '</a>');
            $('#is_register').html('<a id="logout">注销</a>');
        } else {
            $('#is_enter').html('<a href="./enter.html">登录</a>');
            $('#is_register').html('<a href="./register.html">注册</a>');
        }
    }

    //事件委派注册事件
    $('#is_register').on('click', '#logout', function () {
        if (confirm('你确定退出登录!')) {
            localStorage.removeItem('username');
            localStorage.removeItem('ID');
            $('#is_enter').html('<a href="./enter.html">登录</a>');
            $('#is_register').html('<a href="./register.html">注册</a>');
        }
        return false; //阻止a默认事件
    })
})