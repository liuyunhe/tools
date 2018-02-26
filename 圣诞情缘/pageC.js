/**
 * Created by Administrator on 2017/6/19.
 */
    
function pageC () {

    this.$window = $(".page-c .window");
    this.$leftWin = this.$window.find(".window-left");
    this.$rightwin = this.$window.find(".window-right");
    this.$sceneBg = this.$window.find("window-scene-bg");
    this.$closeBg  = this.$window.find(".window-close-bg");

    //背景切换
    this.$sceneBg.transition({
        "opacity" : "0",
    },3000);
    this.$closeBg.css("transform","translateZ(0)");
    this.$closeBg.transition({
        "opacity" : "1",
    },5000);

    //关门动作
    this.closeWindow();

}
/**
 * 关闭窗
 * @return {[type]} [description]
 */
pageC.prototype.closeWindow = function () {
    var count = 1;
    var complete = function () {
        count++;
        if(count == 3){
            alert("窗户关闭");
        }
    }
    var bind = function (element) {
        element.addClass("close").one("animationend webkitAnimationEnd",function () {
            complete();
        })
    }
    bind(this.$leftWin);
    bind(this.$rightwin);
}

