//声明使用插件的表单
var xui = new Xui({
    el: "form",
    verifier: {

    }
});

layui.use(['element','form', 'layer'], function() {


    // 提交插入
    $('#submitBtn').on("click",function () {

        // 验证通过后
        var options = {
            url:"doAddCourse",
            type:'POST',
            success : function (dataObj) {
                // 响应成功时
                if (dataObj[Constant.RETURN_STATUS_KEY] === Constant.RETURN_STATUS_VALUE_SUCCESS) {
                    commonShowSuccessMessageFunc(dataObj[Constant.RETURN_MESSAGE_KEY],function () {
                        // 跳转至 列表页
                        commonGoToPageFunc("/course/toCourseList");
                    })
                }
                // 响应失败时
                else if (dataObj[Constant.RETURN_STATUS_KEY] === Constant.RETURN_STATUS_VALUE_FAILURE) {
                    commonShowErrorMessageFunc(dataObj[Constant.RETURN_MESSAGE_KEY],function () {
                        // 此处为 异常消息提示框 关闭的回调
                    });
                }
            }, // 请求返回后取得消息
            error : function (dataObj) {
                commonAjaxErrorHandlerFunc(dataObj);
            },
            dataType : 'json'
        };

        // 该判断是验证表单的输入项是否正确
        if(xui.verify()){
            commonShowConMessageFunc("是否确认提交？",function(){
                commonAjaxFormSubmitWithoutFormSelectorFunc(options);
            });
        }
    });

    // 返回按钮
    $('#cancelBtn').click(function () {
        // 跳转列表页
        commonGoToPageFunc("/course/toCourseList")
    });



});
