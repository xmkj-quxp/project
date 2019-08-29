//Xui构造函数的类方法  全局通用校验
Xui.configVerifier({
    checkNormStrLengthVerify: function (value, elem) {
        // 验证普通字符（a-z,A-Z,_）长度不大于指定长度
        var verify = $(elem).attr("xui-verify");
        // 取得函数
        var funcName = verify.substring(verify.indexOf("checkNormStrLengthVerify"));
        // 取得参数值
        var param = funcName.substring(funcName.indexOf("(") + 1,funcName.indexOf(")"));
        if(!isNull(param) && !checkNormalStrBelowTargetLengthFunc(value,Number(param))){
            return "应不多于" + param + "个普通字符（a-z或A-Z或_）！";
        }
    },
    checkQQVerify: function (value) {
        //自定义校验如果返回一个字符串就会当做错误信息弹出 否则返回啥或者不反回都不会报错
        if(!checkQQValidateFunc(value)){
            return "格式不正确!"
        }
    },
    // 验证必须输入半角字符
    checkHalfWidth: function (value) {
        // 定义正则表达式
        var reg = /^[\x00-\xff]+$/;
        // 将value和正则表达式进行匹配
        var ret = value.match(reg);
        // 判断输入的值不匹配正则表达式 或 输入的值为空
        if (ret == null && !isNull(value)){
            return '不可输入中文/中文符号！';
        }
    },
    checkInputPriceVerify: function (value) {
        // 如果值不符合输入规则
        if (!isValidateDoublePriceNumFunc(value)){
            return "最多整数8位，小数2位！";
        }
    },
    // 验证必须以字母开头
    checkUserName: function (value) {
        // 定义正则表达式
        var reg = /^[a-zA-Z]{1}[0-9a-zA-Z_]{1,}$/;
        // 将value和正则表达式进行匹配
        var ret = value.match(reg);
        // 判断输入的值不匹配正则表达式 或 输入的值为空
        if (ret == null && !isNull(value)){
            return '用户名必须以字母开头可带数字，下划线！';
        }
    },
    // 验证投放计划、单元、创意名称
    checkPlacingName: function (value) {
        // 定义正则表达式
        var reg = /^[a-zA-Z0-9-\()（）\_\u4e00-\u9fa5]+$/;
        // 将value和正则表达式进行匹配
        var ret = value.match(reg);
        // 判断输入的值不匹配正则表达式 或 输入的值为空
        if (ret == null && !isNull(value)){
            return '只能输入大小写字母、数字、汉字、_、-、( )';
        }
    },
    // 检验标准文件名
    checkSpecialChar: function (value) {
        // 定义正则表达式
        var reg = /^[a-zA-Z0-9-\()（）\_\u4e00-\u9fa5]+$/;
        // 将value和正则表达式进行匹配
        var ret = value.match(reg);
        // 判断输入的值不匹配正则表达式 或 输入的值为空
        if (ret == null && !isNull(value)){
            return '只能输入大小写字母、数字、汉字、_、-、( )';
        }
    },
    // 检验素材文件名
    checkMaterialName: function (value,elem,args) {
        if(!args ||  !args[0]) args = [1];
        if(!elem[0].files[args[0] - 1]) return "至少选择" + args[0] + "个文件";
        var fileName = elem[0].files[0].name;
        // 定义正则表达式
        var reg = /^[a-zA-Z0-9-\()（）\_\u4e00-\u9fa5]+$/;
        // 将value和正则表达式进行匹配
        if(fileName.match(/[^\x00-\xff]/ig)){
            return '图片文件名不能包括中文字符以及特殊字符!';
        }
    },
    // 验证频道名称
    checkChannelName: function (value) {
        // 定义正则表达式
        var reg = /^[a-zA-Z0-9-\()（）\_\u4e00-\u9fa5]+$/;
        // 将value和正则表达式进行匹配
        var ret = value.match(reg);
        // 判断输入的值不匹配正则表达式 或 输入的值为空
        if (ret == null && !isNull(value)){
            return '只能输入大小写字母、数字、汉字、_、-、( )';
        }
    },
    // 校验数字
    checkInt: function (value) {
        // 定义正则表达式
        var reg = /^[0-9]+$/;
        // 将value和正则表达式进行匹配
        var ret = value.match(reg);
        // 判断输入的值不匹配正则表达式 或 输入的值为空
        if (ret == null && !isNull(value)){
            return '应为整数！';
        }
    },

    // 检查手机 格式
    checkMobileVerify: function (value) {

        if (!checkMobileFunc(value)){

            return "格式不正确！"
        }
    },
    // 输入空格校验
    checkSpace: function (value) {
        var  reg = /^ +| +$/g;

        // 判断输入的值不匹配正则表达式 或 输入的值为空
        if (value.indexOf(" ")>0 || reg.test(value)) {
            return '不能输入空格！';
        }
    }
});
