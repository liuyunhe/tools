/**
 * Created by Administrator on 2017/10/23.
 */
(function ($) {
    $.Dialog = function (options) {
        var _url = options.url,
            _width = options.width ? options.width : "500",
            _height = options.height ? options.height : "300",
            _title = options.title ? options.title : "系统对话框",
            _leftText = options.leftText ? options.leftText : "确定",
            _rightText = options.rightText ? options.rightText : "取消",
            _leftShow = options.leftShow || options.leftShow  ==　undefined ? true : false,
            _rightShow = options.rightShow || options.rightShow  == undefined ? true : false;


        var _html = '';
            _html += '<div class="jfDialog-wrap">';
                _html += '<div class="jfMask"></div>';
                    _html += '<div class="jfDialog-box" style="width:'+_width+'px;height:'+_height+'px;margin-left:'+(-_width / 2)+'px;margin-top:'+(-_height / 2)+'px;">';
                        _html += '<div class="jfDialog-title">';
                            _html += '<strong>'+_title+'</strong>';
                            _html += '<span class="jfDialog-close">x</span>';
                        _html += '</div>';
                        _html += '<div class="jfDialog-main" style="height:'+(_height - 80)+'px;"><iframe src="'+_url+'" width="100%" height="100%"></iframe></div>';
                        _html += '<div class="jfDialog-btn">';
                            _html += '<a href="javascript:;" class="jfDialog-ok">'+_leftText+'</a>';
                            _html += '<a href="javascript:;" class="jfDialog-no">'+_rightText+'</a>';
                        _html += '</div>';
                    _html += '</div>';
            _html += '</div>';

        //显示弹窗
        $(".jfDialog-wrap").remove();
        $("body").append(_html);
        $(".jfMask").fadeIn(300);
        $(".jfDialog-box").addClass("show");

        //默认显示按钮
        if(!_leftShow){$(".jfDialog-ok").hide();};
        if(!_rightShow){$(".jfDialog-no").hide();};

        //关闭弹窗
        $(".jfDialog-close,.jfDialog-no").on("click",function () {
            $.Dialog.hide();
            if(options.cancelFun){
                //有值则执行“取消”回调函数
                options.cancelFun();
            }
        })
        
        //确定回调
        $(".jfDialog-ok").on("click", function(){
            //有值则执行“确定”回调函数
            if(options.okFun){
                options.okFun();
            }
        });
    }
    $.Dialog.hide = function () {
        $(".jfMask").fadeOut(300);
        $(".jfDialog-box").removeClass("show");
    }
})(jQuery);