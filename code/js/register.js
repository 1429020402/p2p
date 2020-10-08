// $(function(){
//     //表单验证

//       $('#myform').validate({
//           //规则
//           rules:{
//              //用户名
//              username:{
//                  required:true,
//                  isUser:true,//自定义验证规则

//              },
//              pwd:{
//                  required:true,
//                  isPwd:true
//              },
//              surepwd:{
//                   equalTo:"#pwd"
//              }
//           },
//           //提示信息
//           messages:{
//               //用户名
//               username:{
//                  required:'必填项!'
//              },
//              pwd:{
//                  required:'必填项!'
//              },
//              surepwd:{
//                   equalTo:"两次输入密码不一样"
//              }
//           }
//       })






//       jQuery.validator.addMethod("isUser", function(value, element) { 
//               var tel = /^[a-zA-Z][a-zA-Z0-9_]{1,15}$/;//正则
//               return this.optional(element) || (tel.test(value));
//           }, "用户名 以字母开头，允许2-16字节，允许字母数字下划线");



//       jQuery.validator.addMethod("isPwd", function(value, element) { 
//               var tel = /^[a-zA-Z]\w{5,15}$/;//正则
//               return this.optional(element) || (tel.test(value));
//           }, "以字母开头，长度在6~16之间，只能包含字母、数字和下划线");
// })

$(function () {
    //定义标杆
    var u_flag = false;
    var p_flag = false;
    var s_flag = false;
    //user
    $('#user').blur(function () {
        var username = $('#user').val();
        var reg = /^[\u4e00-\u9fa5\w]{2,16}$/;
        if (reg.test(username)) {
            $.ajax({
                url: 'http://127.0.0.1:8848/accrepeat.php',
                type: 'get',
                data: {
                    username: username
                },
                success: function (res) {
                    // console.log(res);
                    if (res === 'ok') {
                        u_flag = true;
                        $('#user').css('border', '1px solid green').next().html('').siblings('p').css('color', '').closest('div').siblings('label').css('color', '');

                    } else {
                        u_flag = false;
                        $('#user').css('border', '1px solid #a94442').next().html('该用户名已经注册').siblings('p').css('color', '#a94442').closest('div').siblings('label').css('color', '#a94442');

                        //提示
                        var num = (Math.random().toFixed(2)) * 1000;
                        var str = $('#user').val();
                        var arr = str.split("");
                        arr.push(num);
                        var new_str = arr.join("");
                        $('#hint').html(new_str);
                    }
                }
            })

        } else {
            u_flag = false;
            $('#user').css('border', '1px solid #a94442').next().html('请输入一个长度介于 2 和 16 之间的字符串').siblings('p').css('color', '#a94442').closest('div').siblings('label').css('color', '#a94442');


        }
    })
    //点击提示放入用户名框
    $('#hint').click(function () {
        var Text = $(this).html();
        $('#user').val(Text);
        $("#user").blur();
        $(this).html('');
    })




    //pwd
    $('#pwd').blur(function () {
        var Val = $('#pwd').val();
        var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;

        if (reg.test(Val)) {
            p_flag = true;
            $('#pwd').css('border', '1px solid green').next().html('').siblings('p').css('color', '').closest('div').siblings('label').css('color', '');

        } else {
            p_flag = false;
            $('#pwd').css('border', '1px solid #a94442').next().html('请输入一个长度介于 6 和 16 之间由数字和字母组成的字符串').siblings('p').css('color', '#a94442').closest('div').siblings('label').css('color', '#a94442');

        }
    })

    //确认密码
    $('#surepwd').blur(function () {
        var Val = $('#surepwd').val();
        var Val_1 = $('#pwd').val();
        //密码满足条件时才判定
        if (p_flag) {
            if (Val == Val_1) {
                s_flag = true;
                $('#surepwd').css('border', '1px solid green').next().html('').siblings('p').css('color', '').closest('div').siblings('label').css('color', '');

            } else {
                s_flag = false;
                $('#surepwd').css('border', '1px solid #a94442').next().html('两次密码输入不一致，请重新输入').siblings('p').css('color', '#a94442').closest('div').siblings('label').css('color', '#a94442');

            }
        } else {
            $('#surepwd').css('border', '1px solid #a94442').next().html('两次密码输入不一致，请重新输入').siblings('p').css('color', '#a94442').closest('div').siblings('label').css('color', '#a94442');
        }

    })

    //注册点击验证事件

    $('#Button').click(function () {
        var username = $('#user').val();
        var pwd = $('#pwd').val();

        if (!(s_flag && p_flag && u_flag)) {
            $('#pwd').blur();
            $('#user').blur();
            $('#surepwd').blur();
            return false;
        }
        $.ajax({
            url: 'http://127.0.0.1:8848/reg.php',
            type: 'post',
            data: {
                username: username,
                pwd: pwd,
                email: username + '@qq.com',
                nickname: username
            },
            success: function (res) {
                if (res === 'ok') {
                    alert('注册成功');
                    location.href = './enter.html';
                } else {
                    alert('注册失败');
                }
            }
        })




    })


    //已有账户 直接登录
    $('#enter').click(function () {
        location.href = "enter.html"
    })



})

// $(function(){

// var $user=$('#user');
// var $pwd=$('#pwd');
// var $surepwd=$('#surepwd');

// //用户名
// $user.blur(function(obj,reg,mag){
//     checkInput($user,/^[\u4e00-\u9fa5\w]{2,16}$/,'请输入一个长度介于 2 和 16 之间的字符串');
// });

// //密码
// $pwd.blur(function(obj,reg,mag){
//     checkInput($pwd,/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/,'请输入一个长度介于 6 和 16 之间的字母和数字组成的字符串');
// });


// //封装函数

// function checkInput(obj,reg,mag){
//     var Val=obj.val();
//     var result=reg.test(Val);
//     if(result){
//         obj.css('border', '1px solid green').next().html('').siblings('p').css('color', '').closest('div').siblings('label').css('color', '');
//     }else{
//         obj.css('border', '1px solid #a94442').next().html(msg).siblings('p').css('color', '#a94442').closest('div').siblings('label').css('color', '#a94442');
//     }
//     return result;
// }



















// })