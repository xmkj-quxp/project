// js 常量对象！！！
var Constant = {
    /****************************************** 分页 Start ******************************************/
    /* 分页查询得到的数据集合，含分页信息*/
    PAGEED_DATA_KEY: "pagedData",
    /* 分页查询得到的数据集合*/
    DATA_LIST_KEY: "dataList",
    /* 分页查询得到的数据条数*/
    DATA_COUNT_KEY: "dataCount",
    /* 默认页码*/
    DEFAULT_PAGE_NUMBER: 1,
    /* 默认条码*/
    DEFAULT_PAGE_SIZE: 12,
    /******************************************* 分页 End *******************************************/

    /****************************************** ajax Start ******************************************/
    /* 返回状态 key值*/
    RETURN_STATUS_KEY: "status",
    /* 返回消息 key值*/
    RETURN_MESSAGE_KEY: "message",
    /* 返回状态 为成功时的value值*/
    RETURN_STATUS_VALUE_SUCCESS: "success",
    /* 返回状态 为失败时的value值*/
    RETURN_STATUS_VALUE_FAILURE: "failure",
    /* 返回状态 为认证失败时的value值*/
    RESPONSE_STATUS_VALUE_AUTH_ERROR: "authError",
    /* 响应数据关键字 */
    DATA: "data",
    /* 查询得到的数据对象*/
    DATA_VO_KEY: "dataVO",
    /* AjaxError 提示消息*/
    AJAX_ERROR_MESSAGE: "错误，请重新登录！",
    /* 修改权限 */
    MODIFY_AUTHORITY: "1",
    /******************************************* ajax End *******************************************/

    /****************************************** 路径 Start ******************************************/
    /* 返回上一层路径 */
    RETURN_PATH_RELATION: "../",
    /* 返回根路径 */
    RETURN_PATH_BASE: "../../",
    /* 返回路径分隔符 */
    PATH_SEPARATOR: "/",
    /****************************************** 路径 End ********************************************/

    /****************************************** 通用URL START ********************************************/

    /**
     * 通用模块URL
     */
    COMMON_MODULE_URL: "/commonModule",




};

$(document).ready(function () {


    $(window).resize(function () {
        // resize 时，改变位置 并且重新计算 详细按钮
        setTimeout(function () {
            Xui.adjust();
            bindMoreTxt();
        }, 50);
    });

    $(".is-image-container img").click(function () {
        window.open($(this).attr('src'));
    })
});

/*
 * 通用普通提交表单
 *
 * paramFormSelector: 表单选择器（jQuery 选择器 或 对象）
 * paramDisableBlockerBool: 是否使用遮罩 false : 用 ,true : 不用遮罩
 */
function commonNormalSubmitFunc(paramFormSelector, paramDisableBlockerBool) {

    // 如果参数没有指定不使用遮罩，则调用通用遮罩方法
    if (!paramDisableBlockerBool) {
        commonOpenLoadingBlockerFunc();
    }

    // 判断 参数表单选择器 非空时，提交该表单
    if (!isNull($(paramFormSelector))) {
        $(paramFormSelector).submit();
        // 否则，提交画面上第一个表单
    } else {
        $("form:first").submit();
    }
}

/*
 * ajax提交表单
 *
 * paramFormSelector: 表单选择器（jQuery 选择器 或 对象）
 * paramOptions: ajax 提交参数
 * paramDisableBlockerBool: 是否使用遮罩 false : 用 ,true : 不用遮罩
 */
function commonAjaxFormSubmitFunc(paramFormSelector, paramOptions, paramDisableBlockerBool) {

    var tmpAjaxOptions = Object.create(paramOptions);
    // 如果参数没有指定不使用遮罩，则调用通用遮罩方法
    if (!paramDisableBlockerBool) {
        var tmpBlockerObj = commonOpenLoadingBlockerFunc();

        tmpAjaxOptions.success = function (data) {

            // 如果 后台Ajax 响应了 认证异常（登录或权限认证异常）
            if (data[Constant.RETURN_STATUS_KEY] === Constant.RESPONSE_STATUS_VALUE_AUTH_ERROR) {
                // 提示消息
                commonShowErrorMessageFunc(data[Constant.RETURN_MESSAGE_KEY], function () {
                    // 点击确认后，返回登录页
                    commonGoToPageFunc("/");
                });
            }

            paramOptions.success(data);
            commonCloseLoadingBlockerFunc(tmpBlockerObj);
        };

        tmpAjaxOptions.error = function (data) {

            paramOptions.error(data);
            commonCloseLoadingBlockerFunc(tmpBlockerObj);
        };
    }
    $(paramFormSelector).ajaxSubmit(tmpAjaxOptions);
}

/*
 * 不需指定表单选择器 的 ajax提交表单
 *
 * paramOptions: ajax 提交参数
 * paramDisableBlockerBool: 是否使用遮罩 false : 用 ,true : 不用遮罩
 */
function commonAjaxFormSubmitWithoutFormSelectorFunc(paramOptions, paramDisableBlockerBool) {
    commonAjaxFormSubmitFunc("form", paramOptions, paramDisableBlockerBool);
}

/*
 * 通用 打开loading 遮罩的方法
 *
 * 返回 遮罩对象（用于关闭）
 */
function commonOpenLoadingBlockerFunc() {

    if (!layer) {
        console.log('不在layer作用域，无法开启blocker！');
        return false;
    }
    return layer.load(1, {shade: [0.1, '#393D49']});
}

/*
 * 通用 关闭loading 遮罩的方法
 *
 * paramLoadingBlockerObj : 参数 遮罩对象
 */
function commonCloseLoadingBlockerFunc(paramLoadingBlockerObj) {
    if (!layer || !paramLoadingBlockerObj) {
        console.log('不在layer作用域或未正确传入blocker对象参数，无法关闭blocker！');
        return false;
    }
    layer.close(paramLoadingBlockerObj);
}

/*
 * 通用改变Action式提交表单
 *
 * paramActionUrl : 提交目标路径
 * paramFormSelector : 提交表单的选择器
 * paramDisableBlockerBool: 是否使用遮罩 false : 用 ,true : 不用遮罩
 *
 */
function commonChangeActionSubmitFunc(paramActionUrl, paramFormSelector, paramDisableBlockerBool) {

    if (!isNull(paramActionUrl) && !isNull($(paramFormSelector))) {
        $(paramFormSelector).attr("action", paramActionUrl);
    }

    commonNormalSubmitFunc(paramFormSelector, paramDisableBlockerBool);
}

/*
 * 通用提交表单跳页
 *
 * paramActionUrl : 提交目标路径
 * paramDisableBlockerBool: 是否使用遮罩 false : 用 ,true : 不用遮罩
 *
 */
function commonSubmitGoToPageFunc(paramActionUrl, paramDisableBlockerBool) {

    commonChangeActionSubmitFunc(paramActionUrl, "form", paramDisableBlockerBool);
}

/*
 * 通用普通跳转
 * paramHref : 跳转目标路径
 * paramDisableBlockerBool: 是否使用遮罩 false : 用 ,true : 不用遮罩
 */
function commonGoToPageFunc(paramHref, paramDisableBlockerBool) {

    // 如果参数没有指定不使用遮罩，则调用通用遮罩方法
    if (!paramDisableBlockerBool) {
        commonOpenLoadingBlockerFunc();
    }
    window.location.href = paramHref;
}

/*
 * 通过选择器 隐藏元素，并为隐藏元素中 需要验证的录入项 取消验证和提交（取消name）
 */
function commonHidElementFunc(paramTargetSelector) {

    // 为尚未隐藏的元素添加隐藏样式。
    var match = $(paramTargetSelector).filter(function () {
        return !$(this).hasClass('layui-hide');
    });
    match.addClass('layui-hide');

    // 取消需要隐藏的元素下的所有需要校验的输入项的校验
    Xui.banEle($(match).find('[xui-verify]'));

    // 矫正异常消息的位置
    Xui.adjust();
}

/*
 * 通过选择器 展示隐藏的元素，并为元素中 需要验证的录入项 恢复验证和提交（恢复name）
 */
function commonShowElementFunc(paramTargetSelector) {

    // 为尚未隐藏的元素添加隐藏样式。
    var match = $(paramTargetSelector).filter(function () {
        return $(this).hasClass('layui-hide');
    });
    match.removeClass('layui-hide');

    // 取消需要展示的元素下的所有被禁校验的输入项的校验
    Xui.banEle($(match).find('[xui-ban]'), true);

    // 矫正异常消息的位置
    Xui.adjust();
}

/*
 * 通过选择器 移除元素，并清除元素中，验证输入项的异常弹出，并矫正其他吹泡位置。
 */
function commonRemoveElementFunc(paramTargetSelector) {

    $(paramTargetSelector).remove();

    // 矫正异常消息的位置
    Xui.adjust();

}

/*
 * 向目标位置 动态写入html代码。
 * paramAddMode：写入模式,
 * paramTargetSelector：目标元素，
 * paramParamContent：写入内容
 */
function commonWriteHtmlFunc(paramAddMode, paramTargetSelector, paramParamContent) {

    if (paramAddMode == 'before') {
        $(paramTargetSelector).before(paramParamContent);
    } else if (paramAddMode == 'after') {
        $(paramTargetSelector).after(paramParamContent);
    } else if (paramAddMode == 'append') {
        $(paramTargetSelector).append(paramParamContent);
    } else if (paramAddMode == 'prepend') {
        $(paramTargetSelector).prepend(paramParamContent);
    } else if (paramAddMode == 'html') {
        $(paramTargetSelector).html(paramParamContent);
    } else if (paramAddMode == 'text') {
        $(paramTargetSelector).text(paramParamContent);
    } else {
        console.log('添加元素方法参数异常，请检查！！！！');
        return;
    }

    // 矫正异常消息的位置
    Xui.adjust();
}

/*
 * 验证上传文件大小是否超过限制
 * 参数说明：
 * paramFileObj：需要验证的文件对象
 * paramFileMaxSize：上传文件大小的最大限制
 */
function validateUploadFileFunc(paramFileObj, paramFileMaxSize) {
    // 最大文件大小
    var fileMaxSize = paramFileMaxSize * 1024 * 1024;
    // 上传文件大小
    var fileSize = $(paramFileObj).get(0).files[0].size;
    // 上传文件大小超过最大限制时
    if (fileSize >= fileMaxSize) {
        return false;
    } else {
        return true;
    }
}

/*
 * 数字保留两位小数（四舍五入）
 */
function getTwoDecimalsNum(paramNum) {
    return (Math.round(paramNum * 100) / 100).toFixed(2);
}

/*
 * 将千分位货币格式转换为数字
 */
function convertCurrencyFormatToNum(currencyStr) {
    return Number(currencyStr.replace(new RegExp(/(,)/g), ''));
}

/*
 * 将数字转换为千分位货币格式
 */
function convertNumFormatToCurrency(num) {
    return (Number(Math.round(num * 100) / 100).toFixed(2) + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
}

/*
 * 判断参是是否为空
 */
function isNull(paramVar) {
    var paramVarIsNullBool = false;
    if (paramVar === undefined || paramVar === null || paramVar === '' || paramVar.length === 0) {
        paramVarIsNullBool = true;
    }
    return paramVarIsNullBool;
}

/*
 * 检查qq号码格式
 */
function checkQQValidateFunc(qq) {
    var resultBln = false;
    if (isNull(qq)) {
        resultBln = true;
    } else {
        var filter = /^[1-9][0-9]{4,9}$/;
        if (filter.test(qq)) {
            resultBln = true;
        }
    }
    return resultBln;
}

/*
 * 判断是否满足8位整数位，2位小数的数字
 */
function isValidateDoublePriceNumFunc(paramValue) {
    var paramVarIsNullBool = false;
    var value = paramValue;
    if (value != "") {
        var reg = /^\d{0,8}(\.\d{1,2})?$/;
        var ret = value.match(reg);
        if (ret == null) {
            paramVarIsNullBool = false;
        } else {
            paramVarIsNullBool = true;
        }
    } else {
        paramVarIsNullBool = false;
    }
    return paramVarIsNullBool;
}

/*
 * 判断是否满足3位整数位，2位小数的数字
 */
function isValidateDoublePercentNumFunc(paramValue) {
    var paramVarIsNullBool = false;
    var value = paramValue;
    if (value != "") {
        var reg = /^\d{0,3}(\.\d{1,2})?$/;
        var ret = value.match(reg);
        if (ret == null || Number(value) > 100) {
            paramVarIsNullBool = false;
        } else {
            paramVarIsNullBool = true;
        }
    } else {
        paramVarIsNullBool = false;
    }
    return paramVarIsNullBool;
}

/*
 * 检查普通字符串（由字母，数字和下划线组成）格式，并且小于指定长度
 */
function checkNormalStrBelowTargetLengthFunc(paramStr, targetLength) {
    var resultBln = false;
    var length = 0;
    length = targetLength;
    if (isNull(paramStr)) {
        resultBln = true;
    } else {
        var filter = /^[a-zA-Z\d_]{1,}$/;
        if (filter.test(paramStr) && paramStr.length <= targetLength) {
            resultBln = true;
        }
    }
    return resultBln;
}

/*
 * 检查手机号码格式
 */
function checkMobileFunc(mobile) {
    var filter = /^((\+?86)|(\(\+86\)))?(13[012356789][0-9]{8}|15[012356789][0-9]{8}|18[02356789][0-9]{8}|147[0-9]{8}|1349[0-9]{7})$/;
    if (filter.test(mobile)) {
        return true;
    } else {
        return false;
    }
}

/*
 * 检查座机号码格式
 */
function checkTelFunc(tel) {
    var filter = /^(\d{3,4}-?)?\d{7,8}$/;
    if (filter.test(tel)) {
        return true;
    } else {
        return false;
    }
}

/*
 * 弹出错误消息或者弹出错误消息后执行某操作
 */
function commonShowErrorMessageFunc(paramMsg, paramFunc) {
    layer.alert(paramMsg, {
        title: "错误消息",// 页面标题
        btn: ["确认"] // 页面【确认】按钮
    }, function (i) {
        // 执行某操作
        if (paramFunc) {
            paramFunc();
        }
        // 点击【确认】按钮，关闭弹出层
        layer.close(i);
    });
    // 失去焦点  避免按回车时不断的弹出提示信息
    $(':focus').blur();
}

/*
 * 第三方confirm
 */
function commonShowConMessageFunc(paramMsg, paramFunc) {
    layer.confirm(paramMsg, {
        btn: ["是", "否"] //按钮会根据这个数组的长度出现，文字就是数组当前元素
    }, function (i) {

        // 执行某操作
        if (paramFunc) {
            paramFunc();
        }

        //如果写了回调 则必须手动调用close方法 关闭弹窗 否则不会关闭
        layer.close(i);
    });
    // 失去焦点  避免按回车时不断的弹出提示信息
    $(':focus').blur();
}

/*
 * 处理ajax Error 方法
 */
function commonAjaxErrorHandlerFunc(paramAjaxData) {
    commonShowErrorMessageFunc(Constant.AJAX_ERROR_MESSAGE, function () {
        commonGoToPageFunc("/");
    });
}


/*▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼2018/2/5 JLF 修改密码弹出 START▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼*/

/*
 * 判断用户是否登录
 */
function updateCheckLogin() {

    // AJAX 参数
    var options = {
        url: '/commonModule/checkLogin',
        type:"post",
        dataType:"json",
        success:function(data){

            // 如果 响应提示操作成功
            if (data[Constant.RETURN_STATUS_KEY] === Constant.RETURN_STATUS_VALUE_SUCCESS) {
                showUpdateLoginPwdLayerFunc();
                // 如果 响应提示操作成功
            }else if (data[Constant.RETURN_STATUS_KEY] === Constant.RETURN_STATUS_VALUE_FAILURE) {
                // 提示错误消息
                commonShowErrorMessageFunc(data[Constant.RETURN_MESSAGE_KEY],function () {
                    // 此处为 异常消息提示框 关闭的回调
                });

            }
        },
        error:function(data){
            // 通用Ajax 错误 处理
            commonAjaxErrorHandlerFunc(data);
        }
    };
    commonAjaxFormSubmitWithoutFormSelectorFunc(options);

}

/*
 * 点击头像，弹出修改密码
 */
function showUpdateLoginPwdLayerFunc() {

    layer.open({
        type: 2,
        title: "修改密码",
        skin: 'pwd_modify_div',
        resize: false,
        area: ['900px', '260px'], //宽高
        content: '/commonModule/toCommonUpdatePassword'

    });
    // 失去焦点  避免按回车时不断的弹出提示信息
    $(':focus').blur();
}

/*▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲2018/2/5 JLF 修改密码弹出 END▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲*/

/*▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼2019/1/29 JWL 消息中心 START▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼*/

/*
 * 判断用户是否登录
 */
function messageCheckLogin() {

    // AJAX 参数
    var options = {
        url: '/commonModule/checkLogin',
        type:"post",
        dataType:"json",
        success:function(data){

            // 如果 响应提示操作成功
            if (data[Constant.RETURN_STATUS_KEY] === Constant.RETURN_STATUS_VALUE_SUCCESS) {
                showMessageCenterLayerFunc();
                // 如果 响应提示操作成功
            }else if (data[Constant.RETURN_STATUS_KEY] === Constant.RETURN_STATUS_VALUE_FAILURE) {
                // 提示错误消息
                commonShowErrorMessageFunc(data[Constant.RETURN_MESSAGE_KEY],function () {
                    // 此处为 异常消息提示框 关闭的回调
                });

            }
        },
        error:function(data){
            // 通用Ajax 错误 处理
            commonAjaxErrorHandlerFunc(data);
        }
    };
    commonAjaxFormSubmitWithoutFormSelectorFunc(options);

}

/*
 * 点击消息中心
 */
function showMessageCenterLayerFunc() {

    $(".has_message").removeClass();

    layer.open({
        type: 2,
        title: "消息中心",
        skin: 'message_center_div',
        resize: false,
        area: ['800px', '320px'], //宽高
        content: '/message/list/toList'

    });
    // 失去焦点  避免按回车时不断的弹出提示信息
    $(':focus').blur();
}

/*▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲2019/1/29 JWL 消息中心 END▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲*/

function commonFileChooseCallBack(obj) {

    // 页面元素 ： 上传按钮
    var tmpUploadBtnObj = $(this.elem);
    // base64 用Hidden 项
    var fileContentObj = tmpUploadBtnObj.siblings(".upload-file-content");
    // 文件名 用Hidden 项
    var fileNameObj = tmpUploadBtnObj.siblings(".upload-file-name");

    // 如果按钮元素找得到，且 按钮元素存在兄弟元素 文件上传input，且 文件上传input 中 确实有文件
    if (tmpUploadBtnObj.length !== 0
        && tmpUploadBtnObj.siblings(".layui-upload-file").length !== 0
        && tmpUploadBtnObj.siblings(".layui-upload-file")[0].files.length !== 0) {


        // 如果 本次选择的文件，大于 声明限制的文件大小，就提示消息，终止图片渲染 等。
        if ($(tmpUploadBtnObj).siblings(".layui-upload-file")[0].files[0].size > this.size) {

            // 重新设置类型，避免上传一次之后，不能再次上传问题
            $('.layui-upload-file').attr('type', 'hidden');
            $('.layui-upload-file').attr('type', 'file');

            layer.msg('文件过大，请重新选择！');

            return;
        }
        // 打开遮罩
        var tmpThisBlocker = commonOpenLoadingBlockerFunc();

        // 选择文件后，将文件对应的Base64 字符串 以及 文件名，写入兄弟隐藏项（hidden 项 ，依据class）
        obj.preview(function (index, file, result) {

            // 截取 图片字符串 base64 部分
            $(fileContentObj).val(result.split(',')[1]);

            var fileName = file.name;
            $(fileNameObj).val(fileName.substring(fileName.lastIndexOf(".") + 1, fileName.length));

            // 临时变量：图片预览层
            var tmpShowPicDiv = tmpUploadBtnObj.parent().siblings(".pic-show-div");
            tmpShowPicDiv.find("img").attr("src", result);

            commonCloseLoadingBlockerFunc(tmpThisBlocker);
        });
    }

}

/*
 * 弹出操作成功提示信息
 */
function commonShowSuccessMessageFunc(paramMsg, paramFunc) {
    parent.layer.alert(paramMsg, {
        title: "信息",// 页面标题
        btn: ["确认"],
        closeBtn: false//  不显示右上角叉
    }, function (i) {
        // 执行某操作
        if (paramFunc) {
            paramFunc();
        }
        // 点击【确认】按钮，关闭弹出层
        parent.layer.close(i);
    });
    // 失去焦点  避免按回车时不断的弹出提示信息
    $(':focus').blur();
}

//查看详细文字的绑定
function bindMoreTxt() {
    var theClas = ".more-txt";
    var eles = $(theClas);
    //判断元素文字是否溢出
    eles.each(function () {
        var that = this;
        var $that = $(that);
        //绑定
        $(that).on("click", function (e) {
            e.stopPropagation();
        });
        $("body").on("click", function (e) {
            if (!$(e.target).hasClass('detail')) {
                $(that).removeClass("active").removeClass('user-select-none');
            }
        });
        //判断是否溢出
        var scW = that.scrollWidth;
        if (scW > $(that).outerWidth()) {
            $(that).addClass("extend");
            //添加展示详情
            //如果没有详情展示元素则添加详情元素
            if (!($that.next('span.detail').length)) {
                $that.after('<span class="detail">'+$that.attr("data-title")+'</span>');
            }
        } else {
            $(that).removeClass("extend");
        }
    });
    //给所有em绑定事件
    $(theClas + "~ em").off("click");
    $(theClas + "~ em").on("click", function (e) {
        e.stopPropagation();

        $(".more-txt.extend.active").removeClass("active");

        var parentName = $(this).parent('.layui-input-block').length === 0 ? '.layui-input-inline' : '.layui-input-block';
        var more = $(this).parent(parentName).find('.more-txt');

        if (more.length && more.hasClass("extend")) {
            more.addClass("active").addClass('user-select-none');
        }
    });
};

//这个方法用来检测文字是否溢出
bindMoreTxt();