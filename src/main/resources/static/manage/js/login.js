layui.use(['element', 'layer'], function () {

    // $(window).keydown(function(event){
    //     switch (event.keyCode) {
    //         case 13: submitFun();
    //             break;
    //         default:;
    //     }
    // });

    $(window).on('click',function(event){
        var $target = $(event.target);
        if ($target.hasClass('loginBtn')) {
            if (isNull($('input[name=username]').val()) && isNull($('input[name=password]').val())) {
                // 提示错误消息
                commonShowErrorMessageFunc('请输入账号和密码', function () {
                    // 此处为 异常消息提示框 关闭的回调
                });
            } else if (!isNull($('input[name=username]').val()) && isNull($('input[name=password]').val())) {
                // 提示错误消息
                commonShowErrorMessageFunc('请输入密码', function () {
                    // 此处为 异常消息提示框 关闭的回调
                });
            } else if (isNull($('input[name=username]').val()) && !isNull($('input[name=password]').val())) {
                // 提示错误消息
                commonShowErrorMessageFunc('请输入账号', function () {
                    // 此处为 异常消息提示框 关闭的回调
                });
            } else {
                submitFun();
            }
        }
    });

    function submitFun() {
        // AJAX 参数
        var options = {
            url: '/doLogin',
            type: "post",
            dataType: "json",
            success: function (data) {

                // 如果 响应提示操作成功
                if (data[Constant.RETURN_STATUS_KEY] === Constant.RETURN_STATUS_VALUE_SUCCESS) {
                    // 重定向 跳转路径
                    commonGoToPageFunc("/xxx/toXXXList");
                    // 如果 响应提示操作成功
                } else if (data[Constant.RETURN_STATUS_KEY] === Constant.RETURN_STATUS_VALUE_FAILURE) {
                    // 提示错误消息
                    commonShowErrorMessageFunc(data[Constant.RETURN_MESSAGE_KEY], function () {
                        // 此处为 异常消息提示框 关闭的回调
                    });
                }
            },
            error: function (data) {
                // 通用Ajax 错误 处理
                commonAjaxErrorHandlerFunc(data);
            }
        };
        commonAjaxFormSubmitWithoutFormSelectorFunc(options);
    }


});