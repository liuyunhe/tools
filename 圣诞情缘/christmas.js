/**
 * Created by Administrator on 2017/6/19.
 */
/**
 * 慕课网特制
 * 圣诞主题效果
 * @type {Object}
 */

/**
 * 切换页面
 * 模拟镜头效果
 * @return {[type]} [description]
 */
function changePage(element,effect,callback){
    //从jQuery 1.7开始，one()函数的用法和on()函数是完全一致的，只不过通过one()函数绑定的都是一次性的事件处理函数。
    element
        .addClass(effect)
        .one("animationend webkitAnimationEnd", function() {
            callback && callback();
        })
}


/**
 * 中间调用
 */
var Christmas = function() {
    //页面容器元素
    var $pageA = $(".page-a");
    var $pageB = $(".page-b");
    var $pageC = $(".page-c");

    //观察者
    var observer = new Observer();


    //A场景页面
    new pageA($pageA,function () {
         observer.publish("completeA");
    });

    //页面A-B场景切换
    observer.subscribe("completeA",function () {
        changePage($pageA,"effect-out",function () {
            observer.publish("pageB");
        })
    });

     //进入B场景
    observer.subscribe("pageB",function () {
        new pageB($pageB,function () {
            observer.publish("completeB");
        })
    });

    //页面B-C场景切换
    observer.subscribe("completeB",function () {
        changePage($pageC,"effect-in",function () {
            observer.publish("pageC");
        })
    })

    //进入C场景
    observer.subscribe("pageC",function () {
        new pageC()
    });




};



$(function() {
    $("button").click(function () {
        //圣诞主题效果，开始
        Christmas();
    })
})


/**
 * 背景音乐
 * @param {[type]} url  [description]
 * @param {[type]} loop [description]
 */
function HTML5Audio(url, loop) {
    var audio = new Audio(url);
    audio.autoplay = true;
    audio.loop = loop || false; //是否循环
    audio.play();
    return {
        end: function(callback) {
            audio.addEventListener('ended', function() {
                callback()
            }, false);
        }
    }
}

//
// $(function() {
//     $("button:first").click(function() {
//         //背景音乐
//         var audio1 = HTML5Audio('http://www.sunnylinner.com/Games/Music/Media/407.mp3');
//         audio1.end(function() {
//             alert("音乐结束")
//         })
//     })
//     $("button:last").click(function() {
//         //循环播放那'
//         var audio2 = HTML5Audio('http://www.sunnylinner.com/Games/Music/Media/407.mp3');
//         audio2.end(function () {
//             HTML5Audio('http://www.sunnylinner.com/Games/Music/Media/407.mp3',true);
//         })
//     })
// })
