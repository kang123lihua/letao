$(function(){
    // console.log(333);
    var currentpage = 1;
    var pageSize = 5;

    render();

    function render(){
        $.ajax({
            type:"get",
            url:"/category/queryTopCategoryPaging",
            data:{
                page:currentpage,
                pageSize:pageSize
            },
            dataType:"json",
            success:function( info ){
                // console.log(info);
                var htmlStr = template('tpl',info);
                $('tbody').html( htmlStr );

                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage:info.page,
                    totalPages:Math.ceil( info.total /info.size ),
                    onPageClicked:function(a, b, c,page){
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        currentpage = page;
                        render();
                    }

                })
            }
        })
    }

});
