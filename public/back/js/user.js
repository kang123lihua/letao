$(function(){
    var currentPage = 1;
    var pageSize = 5 ;
    var currentid;
    var isDelete;


    render();

    function render(){
        $.ajax({
            type:"get",
            url:"/user/queryUser",
            data:{
                page: currentPage,
                pageSize: pageSize
            },
            dataType:"json",
            success:function( info ){
                console.log(info);
                var htmlStr = template('tpl',info);
                $('tbody').html( htmlStr );

                $('#pagination').bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage:info.page,
                    totalPages:Math.ceil(info.total/info.size),
                    onPageClicked:function(a, b, c,page){
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        currentPage = page;
                        render();

                    }
                })

            }
        })
    }


    $('tbody').on('click','.btn',function(){
        // console.log(123);
        $('#userModal').modal( 'show' );

        currentid = $(this).parent().data('id');
        isDelete=  $(this).hasClass('btn-success')? 1 : 0 ;
    });

    $('#submitBtn').click(function(){
        // console.log(currentid);
        // console.log(isDelete);


        $.ajax({
            type:"post",
            url:"/user/updateUser",
            data:{
                id:currentid,
                isDelete:isDelete
            },
            dataType: "json",
            success:function( info ){
                // console.log(info);
                if( info.success ){
                    $('#userModal').modal( 'hide' );
                    render();
                }
            }

        })
    })




});
