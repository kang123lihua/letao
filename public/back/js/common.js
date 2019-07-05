// NProgress.start() ;
// NProgress.done();


$(document).ajaxStart(function(){
    NProgress.start() ;
});

$(document).ajaxStop(function(){
    setTimeout(function(){
        NProgress.done();
    },500)
});


/*登录拦截功能,
* 前后端分离，所有需要发送请求询问后端是否已登录
* 如果登录，让用户继续访问
* 如果未登录，拦截到登录页*/
/*登录页时无需拦截*/
if( location.href.indexOf('login.html') === -1){
    $.ajax({
        type:"get",
        url:"/employee/checkRootLogin",
        dataType: 'json',
        success:function( info ){
            // console.log(info);
            if(info.success){

            }
            if(info.error === 400){
                location.href="login.html"
            }
        }
    });
}


$(function(){
    /*分类功能二级菜单*/
    $('.nav .category').click(function(){
        $('.nav .child').stop().slideToggle();
    });

    /*topbar菜单功能切换*/
    $('.icon-menu').click(function(){
        $('.lt-aside').toggleClass('hidemenu');
        $('.lt-main').toggleClass("hidemenu");
        $('.lt-topbar').toggleClass('hidemenu');

    });

    /*点击topbar退出按钮，显示模态框*/
    $('.icon-logout').click(function(){
        $('#logoutModal').modal('show');
    });

    /*点击模态框退出按钮，跳转到登录页*/
    $('#logoutBtn').click(function(){
        /*发送ajax请求销毁当前用户信息，再跳转到登录页*/
        $.ajax({
            type:'get',
            url:' /employee/employeeLogout',
            dataType:'json',
            success:function( info ){
                console.log(info);
                if(info.success){
                    location.href="login.html"
                }
            }
        })

    })


});
