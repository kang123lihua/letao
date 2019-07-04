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
