$(function () {
    var row = 2;
    var page = 1;
    loadData();

    function loadData() {
        $.ajax({
            url: 'http://127.0.0.1:8848/getborrow.php',
            type: 'get',
            data: {
                page: page,
                row: row
            },
            dataType: 'json',
            success: function (res) {
                // console.log(res);
                var total = res.total;
                var pageSize = Math.ceil(total / row);
                $('#page').pagenation({
                    nowPage: page, //当前页
                    pageNum: pageSize, //总页数
                    callback: function (p) {
                        page = p //改变全局变量 当前页的数据
                        loadData(); //重新调用加载数据的函数
                    }
                });

                var lists = res.list;
                var len = lists.length;
                var resHtml = '';
                for (var i = 0; i < len; i++) {
                    resHtml += '<tr>'
                    resHtml += '<td>' + lists[i].userid + '</td>'
                    resHtml += '<td>' + lists[i].title + '</td>'
                    resHtml += ' <td class="text-primary">' + Number(lists[i].interest).toFixed(2) + '</td>'
                    resHtml += '<td class="text-primary">' + Number(lists[i].borrowmoney).toFixed(2) + '</td>'
                    resHtml += '<td>' + (lists[i].repaytype == 0 ? '按月分期' : '按月到期') + '</td>'
                    resHtml += '<td>' + ((lists[i].ownmoney / lists[i].borrowmoney) * 100).toFixed(2) + '%</td>'
                    resHtml += "<td>"
                    resHtml += "<a href='#' class='btn btn-danger btn-sm' data-borrowid='" + lists[i].id + "'>查看</a>"
                    resHtml += "</td>"
                    resHtml += "</tr>"
                }
                $('#borrow_list').html(resHtml);
            }

        })
    }

    $('#borrow_list').on('click','a.btn',function(){
        var borrowid=$(this).data('borrowid');
        sessionStorage.setItem('borrowid',borrowid);
        //跳转
        location.href='/borrow_info.html';
        return false;

    })



})