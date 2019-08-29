layui.use(['element', 'form', 'layer', 'laypage'], function () {

    // 进入画面 初始查询 TODO
    searchPageFunc();

    // 新建按钮
    $('#createBtn').on("click", function () {
        commonGoToPageFunc("/course/toAddCourse");
    });

    var tmpDataTableSelector = '#dataTable';


    // 编辑按钮 事件
    $(tmpDataTableSelector).on("click", ".modifyBtn", function () {

        var tmpCourseId = $(this).data('course-id');

        commonGoToPageFunc("/course/toEditCourse?courseid="+tmpCourseId);

        // commonSubmitGoToPageFunc("toEditCourse");

    });


    // 刪除按钮 事件
    $(tmpDataTableSelector).on("click", ".delBtn", function () {


        // AJAX 参数
        var options = {
            url: "doDelCourse",
            type: "post",
            dataType: "json",
            success: function (data) {
                // 如果 响应提示操作成功
                if (data[Constant.RETURN_STATUS_KEY] === Constant.RETURN_STATUS_VALUE_SUCCESS) {

                    // 弹出消息
                    commonShowSuccessMessageFunc(data.message,function(){
                        // 刷新页面
                        window.location.reload();
                    });

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

        var tmpCourseId = $(this).data('del-id');

        commonShowConMessageFunc("确认删除信息吗？",function(){


            $("#courseid").val(tmpCourseId);

            commonAjaxFormSubmitWithoutFormSelectorFunc(options);
        });


    });

    // 点击搜索按钮时重置页码后 提交表单查询表格数据
    $('#searchBtn').on("click", function () {
        // 页码归一
        $('#pageNumber').val(Constant.DEFAULT_PAGE_NUMBER);
        // 检索条件：课程名
        $("#condTitle").val($("#title").val());

        // 查询 分页数据列表
        searchPageFunc();
    });

    // 表格查询方法
    function searchPageFunc() {



        // AJAX 参数
        var options = {
            url: "doSearchCourseList",
            type: "post",
            dataType: "json",
            success: function (data) {
                // 如果 响应提示操作成功
                if (data[Constant.RETURN_STATUS_KEY] === Constant.RETURN_STATUS_VALUE_SUCCESS) {

                    // 重绘分页控件
                    renderPagerFunc(data, searchPageFunc);
                    // 重绘表格
                    drawDataTbodyFunc(data[Constant.PAGEED_DATA_KEY][Constant.DATA_LIST_KEY]);
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


    /*
     * 依据查询结果 绘制组织Table
     */
    function drawDataTbodyFunc(paramDataList) {

        // HTML 拼入目标 Tbody对象
        var dataTbodyHtmlObj = $('#dataTable tbody');

        // 清空 tbody
        dataTbodyHtmlObj.empty();

        // 临时变量：tbody Html字符串
        var tmpTbodyHtmlStr = '';

        // 如果查到了数据
        if (paramDataList && paramDataList.length > 0) {
            // 依据每一条数据 绘制html 元素
            for (var i = 0; i < paramDataList.length; i++) {
                var tmpEachDataObj = paramDataList[i];

                tmpTbodyHtmlStr += '<tr>';
                tmpTbodyHtmlStr += '<td title="' + tmpEachDataObj['title'] + '">' + tmpEachDataObj['title'] + '</td>';
                tmpTbodyHtmlStr += '<td>' + tmpEachDataObj['introduce'] + '</td>';
                tmpTbodyHtmlStr += '<td>' + tmpEachDataObj['createtime'] + '</td>';
                tmpTbodyHtmlStr += '<td class="centerAlign">';
                // 绘制修改跳转按钮
                tmpTbodyHtmlStr += '<a class="layui-btn layui-btn-xs modifyBtn" ' +
                        'data-course-id="' + tmpEachDataObj['courseid'] + '">' +
                        '<i class="layui-icon">&#xe642;</i>' +
                        '修改' +
                        '</a>';

                // 绘制删除按钮
                tmpTbodyHtmlStr += '<a class="layui-btn layui-btn-xs delBtn" ' +
                    'data-del-id="' + tmpEachDataObj['courseid'] + '">' +
                    '<i class="layui-icon">&#xe640;</i>' +
                    '删除' +
                    '</a>';

                tmpTbodyHtmlStr += '</td>';
                tmpTbodyHtmlStr += '</tr>';
            }
        } else {
            // colspan="5" 是依据数据表格列数 得来的。很重要！！
            tmpTbodyHtmlStr += '<tr>' +
                '<td colspan="4" class="centerAlign">无数据！</td>' +
                '</tr>';
        }
        dataTbodyHtmlObj.append(tmpTbodyHtmlStr);
    }
});

