$(function () {
    //接收数据
    var type = sessionStorage.getItem('type');

    switch (type) {
        case "0":
            $("#borrow-info").text("信用贷");
            break;
        case "1":
            $("#borrow-info").text("车易贷");
            break;
        case "2":
            $("#borrow-info").text("房易贷");
            break;
        default:
            alert('请稍后!');
            break;
    }

    //表单验证
    var flag_1 = false;
    var flag_2 = false;
    var flag_3 = false;
    var flag_4 = false;
    $('#borrowmoney').blur(function () {
        var reg = /^[0-9]*[1-9][0-9]*$/;
        var borrowmoney = $('#borrowmoney').val();
        if (reg.test(borrowmoney)) {
            flag_1 = true;
            $('#borrowmoney').css('border', '1px solid green').next().html('');
        } else {
            flag_1 = false;
            $('#borrowmoney').css('border', '1px solid red').siblings('span').html('请输入一个大于0的正整数').css('color', 'red');
        }
    })
    $('#interest').blur(function () {
        var reg = /^[0-9]+([.]{0,1}[0-9]+){0,1}$/;
        var interest = $('#interest').val();
        if (reg.test(interest)) {
            flag_2 = true;
            $('#interest').css('border', '1px solid green').next().html('');
        } else {
            flag_2 = false;
            $('#interest').css('border', '1px solid red').siblings('span').html('请输入一个大于0的数').css('color', 'red');
        }
    })
    $('#minbid').blur(function () {
        var minbid = $('#minbid').val();
        var borrowmoney = $('#borrowmoney').val();
        if (minbid > 0 && minbid <= borrowmoney) {
            flag_3 = true;
            $('#minbid').css('border', '1px solid green').next().html('');
        } else {
            flag_3 = false;
            $('#minbid').css('border', '1px solid red').siblings('span').html('请输入一个大于0小于等于借款金额的正整数').css('color', 'red');
        }
    })
    $('#bouns').blur(function () {
        var reg = /^[0-9]+([.]{0,1}[0-9]+){0,1}$/;
        var bouns = $('#bouns').val();
        if (reg.test(bouns)) {
            flag_4 = true;
            $('#bouns').css('border', '1px solid green').next().html('');
        } else {
            flag_4 = false;
            $('#bouns').css('border', '1px solid red').siblings('span').html('请输入一个大于0的数').css('color', 'red');
        }
    })
    //添加点击事件
    $('#refer_approve').click(function () {
        if (!(flag_1 && flag_2 && flag_3 && flag_4)) {
            $('#borrowmoney').blur();
            $('#minbid').blur();
            $('#interest').blur();
            $('#bouns').blur();
            return false;
        }
        // alert(1)
        $.ajax({
            url: "http://127.0.0.1:8848/borrow.php",
            type: "POST",
            data: {
                acc: localStorage.getItem("username"),
                borrowmoney: $("#borrowmoney").val(),
                interest: $("#interest").val(),
                borrowtime: $("#borrowtime").val(),
                repaytype: $("[name='repaytype']:checked").val(),
                minbid: $("#minbid").val(),
                bouns: $("#bouns").val(),
                days: $("#days").val(),
                title: $("#title").val(),
                info: $("#info").val()
            },
            success: function (data) {
                if (data === "ok") {
                    alert("申请提交成功,等待审核...");
                    location.href = "/";
                } else {
                    alert("申请提交失败,请稍后再试~~~");
                }
            }
        })
    })
















})