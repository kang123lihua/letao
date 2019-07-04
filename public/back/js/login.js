$(function(){
    // 1. 进行表单校验
    //    校验要求: (1) 用户名不能为空
    //              (2) 密码不能为空, 且必须是 6-12 位
    // alert(123);
$("#form").bootstrapValidator({

    // 配置图标
    feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
    },

    fields:{
            username:{
                validators:{
                    notEmpty:{
                        message:'用户名不能为空'
                    },
                    stringLength:{
                        min:2,
                        max:6,
                        message:'用户名长度必须在 2-6 位'
                    },
                    callback:{
                        message:'用户名不存在'
                    }
                }
            },
            password:{
                validators: {
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    stringLength: {
                        min:6,
                        max:12,
                        message:"密码长度必须在 6-12 位"
                    },
                    callback:{
                        message:'密码错误'

                    }
                }
            }

    }

});


$("#form").on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑
        // console.log($('#form').serialize());
        $.ajax({
            type: "post",
            url: "/employee/employeeLogin",
            dataType: "json",
            data: $('#form').serialize(),
            success: function( info ) {
                // console.log( info );

                if ( info.success ) {
                    // alert( "登录成功" );
                    location.href = "index.html";
                }

                if ( info.error === 1000 ) {
                    // alert( "用户名不存在" )
                    $('#form').data("bootstrapValidator").updateStatus("username", "INVALID", "callback");
                }

                if ( info.error === 1001 ) {
                    // alert( "密码错误" );
                    // updateStatus
                    // 参数1: 字段名称
                    // 参数2: 校验状态
                    // 参数3: 校验规则, 可以设置提示文本
                    $('#form').data("bootstrapValidator").updateStatus("password", "INVALID", "callback")
                }
            }

        })
    });


/*重置功能*/
$('[type="reset"]').click(function(){
    $('#form').data('bootstrapValidator').resetForm();
})





});



