$(function(){
    // 1. 进行表单校验
    //    校验要求: (1) 用户名不能为空
    //              (2) 密码不能为空, 且必须是 6-12 位
    // alert(123);
$("#form").bootstrapValidator({
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
                    }
                }
            }

    }

})

});
