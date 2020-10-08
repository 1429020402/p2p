$(function () {

    //调用函数
    renderer();

    function renderer() {
        $.ajax({
            url: "http://127.0.0.1:8848/getborrowinfo.php",
            type: "get",
            data: {
                borrowid: sessionStorage.getItem('borrowid')
            },
            dataType: 'json',
            success: function (res) {
                console.log(res);

                for (var key in res) {
                    $('.userid').text(res.userid);
                    $('#userid').text(res.userid);
                    $('#borrowmoney').text(Number(res.borrowmoney).toFixed(2));
                    $('#interest').text(Number(res.interest).toFixed(2) + '%');
                    $('#borrowtime').text(res.borrowtime + '月');
                    $('#bouns').text(Number(res.bouns).toFixed(2));
                    $('#repaytype').text((res.repaytype == 0 ? '按月分期' : '按月到期'));
                    $('#minbid').text(Number(res.minbid).toFixed(2));
                    $('#days').text(res.days + '天');
                    $('#need_money').html(Number(res.borrowmoney - res.ownmoney).toFixed(2) + '元');
                    $('#progress_bar').html('<div class="progress-bar progress-bar-info progress-bar-striped"style="width:' + ((res.ownmoney / res.borrowmoney) * 100).toFixed(2) + '%"></div>');
                }
            }
        })
    }

    judge();
    function judge(){
        var userid=sessionStorage.getItem('userid');
        var username=localStorage.getItem('username');
        if(userid==username){
            $('#invest_btn').prop('disabled',true);
            alert('不能给自己投资');
        }
    }

    //验证
    var falg=false;
    $('#chargemoney').blur(function () {
        var reg = /^[0-9]*[1-9][0-9]*$/;
        var chargemoney = $('#chargemoney').val();
        if (reg.test(chargemoney)) {
            $.ajax({
                url: "http://127.0.0.1:8848/getborrowinfo.php",
                type: "get",
                data: {
                    borrowid: sessionStorage.getItem('borrowid')
                },
                dataType: 'json',
                success: function (res) {
                    if(chargemoney<res.minbid){
                        falg=false;
                        alert('不能小于最小投标!');
                    }else if(chargemoney>(res.borrowmoney - res.ownmoney)){
                        falg=false;
                        alert('不能大于还需金额!');
                    }else{
                        falg=true;
                        $(this).css('border', '1px solid green');
                    }
                }
            })

        } else {
            falg=false;
            alert('格式错误!');
        }
    })
    //投资
    $('#invest_btn').click(function () {
        if(!falg){
            $('#chargemoney').blur();
            return false;
        }
        var borrowid = sessionStorage.getItem('borrowid');
        var ID = localStorage.getItem('ID');
        var chargemoney = $('#chargemoney').val();
        $.ajax({
            url: 'http://127.0.0.1:8848/invest.php',
            type: 'post',
            data: {
                id: ID,
                borrowid: borrowid,
                chargemoney: chargemoney
            },
            success: function (res) {
                if (res === 'ok') {
                    alert('投资成功');
                    renderer();
                    history.go(-1);
                } else if (res === '10001') {
                    alert('钱不够');
                } else if (res === '10002') {
                    alert('投资失败');
                } else {
                    alert('扣钱失败');
                }

            }
        })
    })

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