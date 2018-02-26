/**
 * Created by Administrator on 2017/6/14.
 */
/////////
//页面滑动 //
/////////

/**
 * [Swipe description]
 * @param {[type]} container [页面容器节点]
 * @param {[type]} options   [参数]
 */

function Swipe(container) {
    var element = container.find(":first");             // 获取第一个子节点
    var swipe ={};                                      // 滑动对象
    var slides = element.find(">");                     // li页面数量
    var width = container.width();                      // 获取容器尺寸
    var height = container.height();

    element.css({
        width : (slides.length * width) + "px",         // 设置li页面总宽度
        height : height + "px"
    })

    $.each(slides,function (index) {                    // 设置每一个li元素的宽度
        //console.log(index);
        var slide = slides.eq(index);
        slide.css({
            width: width + 'px',
            height: height + 'px'
        })
    })

    swipe.scrollTo = function (x,speed) {               // 监控完成与移动
        element.css({                                   // 执行动画移动
            "transition-timing-function" : "linear",
            "transition-duration" : speed + "ms",
            "transform" : "translate3d(-" + x + "px,0px,0px)"
        })
        return this;
    };

    return swipe;
}
