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


    $('.addBtn').click(function(){
        $('#addModal').modal('show');
    })


    // 3. 通过校验插件, 添加校验功能
    $("#form").bootstrapValidator({

        // 配置图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        // 校验的字段
        fields: {
            categoryName: {
                // 校验规则
                validators: {
                    // 非空检验
                    notEmpty: {
                        // 提示信息
                        message: "请输入一级分类名称"
                    }
                }
            }
        }
    });


    // 4. 注册表单校验成功事件
    //    表单校验插件, 会在表单提交时, 进行校验
    //    如果通过校验, 默认会进行提交, 需要阻止, 通过 ajax 进行提交

    // (使用form="form", 通过了校验, 也不会提交了, 可以省去 e.preventDefault() )

    $('#form').on("success.form.bv", function( e ) {
        e.preventDefault();

        $.ajax({
            url: "/category/addTopCategory",
            type: "POST",
            data: $('#form').serialize(),
            success: function( info ) {
                console.log(info);
                if (info.success) {
                    // 关闭模态框
                    $('#addModal').modal("hide");
                    // 重新渲染页面, 添加的项会在第一页, 所以应该重新渲染第一页
                    currentPage = 1;
                    render();

                    // 重置表单校验状态和 表单内容
                    // 传 true 不仅可以重置 状态, 还可以重置内容
                    $('#form').data("bootstrapValidator").resetForm( true );
                }
            }
        })

    })


});
