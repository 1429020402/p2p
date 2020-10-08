$(function () {
    //top
    $('.top .left a i').click(function () {
        $(this).css('color', 'skyblue');
    })

    $('.top .left a span').click(function () {
        $(this).prev().css('color', '');

    })

    //nav
    // $('.nav li').on('mouseover',function(){
    //     $(this).addClass('on').siblings().removeClass('on');
    // });


    // $(".main").load("../../poges/home.html");
    // $(".main").load("../../poges/invest.html");
    // $(".main").load("../../poges/borrow.html");
    // $(".main").load("../../poges/personal.html");
    // 页面加载时调用函数
    Hash();
    //事件hash发送改变时调用函数
    window.onhashchange = Hash;




    function Hash() {
        //获取
        var Hash = location.hash;
        //如果
        if (Hash == '') {
            Hash = '#home'
        };
        //判定
        switch (Hash) {
            case '#home':
                $(".main").load("../../poges/home.html");
                break
            case '#invest':
                $(".main").load("../../poges/invest.html");
                break
            case '#borrow':
                $(".main").load("../../poges/borrow.html");
                break
            case '#personal':
                // $(".main").load("../../poges/personal.html",function(){
                //     $(".col-md-9").load("../../poges/personal/getuserinfo.html");
                // });
                personalHash('#personal/getuserinfo');
                break
                //账户信息
            case '#personal/getuserinfo':
                // $(".main").load("../../poges/personal.html",function(){
                //     $(".col-md-9").load("../../poges/personal/getuserinfo.html")
                // });

                // if($(".col-md-9").length){//点击
                //     $(".col-md-9").load("../../poges/personal/getuserinfo.html");
                // }else{//刷新
                //     $(".main").load("../../poges/personal.html",function(){
                //         $(".col-md-9").load("../../poges/personal/getuserinfo.html");
                //     });
                // }
                //调用函数
                personalHash(Hash);
                break
                //充值明细
            case '#personal/charge':
                // $(".main").load("../../poges/personal.html",function(){
                //     $(".col-md-9").load("../../poges/personal/charge.html");
                // });
                //调用函数
                personalHash(Hash);
                break
                //实名认证
            case '#personal/realAuth':
                // $(".main").load("../../poges/personal.html",function(){
                //     $(".col-md-9").load("../../poges/personal/realAuth.html");
                // });
                //调用函数
                personalHash(Hash);
                break
                //账户流水
            case '#personal/accountFlow_list':
                // $(".main").load("../../poges/personal.html",function(){
                //     $(".col-md-9").load("../../poges/personal/realAuth.html");
                // });
                //调用函数
                personalHash(Hash);
                break
            case '#personal/bid_request_list':
                // $(".main").load("../../poges/personal.html",function(){
                //     $(".col-md-9").load("../../poges/personal/realAuth.html");
                // });
                //调用函数
                personalHash(Hash);
                break
                //个人资料
            case '#personal/userInfo':
                personalHash(Hash);
                break
            case '#personal/borrow_apply':
                personalHash(Hash);
                break
                //如果hash地址错误时加载首页
            default:
                $(".main").load("../../poges/home.html");
                break
        }
        Navactive(Hash);
    }

    //个人中心二级页面加载
    function personalHash(Hash) {

        if ($(".col-md-9").length) { //点击
            $(".col-md-9").load("../../poges/" + Hash.substr(1) + ".html", function () {
                Navparentalactive(Hash);
            });
        } else { //刷新
            $(".main").load("../../poges/personal.html", function () {
                $(".col-md-9").load("../../poges/" + Hash.substr(1) + ".html");
                Navparentalactive(Hash);
            });
        }
    }

    //个人中心二级页面导航样式
    function Navparentalactive(Hash) {
        //去掉所有
        $('.col-md-3>ul>li>ul>li').removeClass('active');

        $('.col-md-3>ul>li>ul>li a[href="' + Hash + '"]').parent().addClass('active');
    }

    //导航样式
    function Navactive(Hash) {
        if (Hash.includes('#personal')) {
            Hash = "#personal";
        }

        $(".nav .container ul li").removeClass("active");
        //给当前的 加上 active
        $('.nav .container ul li a[href="' + Hash + '"]').parent().addClass("active");
    }


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