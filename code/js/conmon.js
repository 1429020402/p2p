$(function(){
    function chick(){
        var ID=localStorage.getItem('ID');
        var username=localStorage.getItem('username');

        if(!(ID&&username)){
            alert('请登录!');
            location.href='/enter.html';
            // return false;
        }
    }

    chick();








})