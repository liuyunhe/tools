    /**
     * Created by Administrator on 2017/6/14.
     */
    // 动画结束事件

    var animationEnd = (function() {
        var explorer = navigator.userAgent;
        if (~explorer.indexOf('WebKit')) {
            return 'webkitAnimationEnd';
        }
        return 'animationend';
    })();

    /////////
    //右边飞鸟 //
    /////////

    var bird = {
        elem: $(".bird"),
        fly: function() {
            this.elem.addClass('birdFly');
            this.elem.transition({
                right: container.width()
            }, 15000, 'linear');
        }
    };
    ///////////
    // 灯动画 //
    ///////////
    var lamp = {
        elem : $(".b_background"),
        bright : function () {
            this.elem.addClass("lamp-bright");
        },
        dark : function () {
            this.elem.removeClass("lamp-bright");
        }
    };

    //花瓣
    var snowflakeURl = [
        'http://img.mukewang.com/55adde120001d34e00410041.png',
        'http://img.mukewang.com/55adde2a0001a91d00410041.png',
        'http://img.mukewang.com/55adde5500013b2500400041.png',
        'http://img.mukewang.com/55adde62000161c100410041.png',
        'http://img.mukewang.com/55adde7f0001433000410041.png',
        'http://img.mukewang.com/55addee7000117b500400041.png'
    ]

    ///////
    //飘雪花 //
    ///////

    function snowflake() {
        // 雪花容器
        var $flakeContainer = $('#snowflake');

        // 随机六张图
        function getImagesName() {
            return snowflakeURl[[Math.floor(Math.random() * 6)]];
        }
        // 创建一个雪花元素
        function createSnowBox() {
            var url = getImagesName();
            return $('<div class="snowbox" />').css({
                'width': 41,
                'height': 41,
                'position': 'absolute',
                'backgroundSize': 'cover',
                'zIndex': 100000,
                'top': '-41px',
                'backgroundImage': 'url(' + url + ')'
            }).addClass('snowRoll');
        }
        // 开始飘花
        setInterval(function() {
            // 运动的轨迹
            var startPositionLeft = Math.random() * visualWidth - 100,
                startOpacity    = 1,
                endPositionTop  = visualHeight - 40,
                endPositionLeft = startPositionLeft - 100 + Math.random() * 500,
                duration        = visualHeight * 10 + Math.random() * 5000;

            // 随机透明度，不小于0.5
            var randomStart = Math.random();
            randomStart = randomStart < 0.5 ? startOpacity : randomStart;

            // 创建一个雪花
            var $flake = createSnowBox();

            // 设计起点位置
            $flake.css({
                left: startPositionLeft,
                opacity : randomStart
            });

            // 加入到容器
            $flakeContainer.append($flake);

            // 开始执行动画
            $flake.transition({
                top: endPositionTop,
                left: endPositionLeft,
                opacity: 0.7
            }, duration, 'ease-out', function() {
                $(this).remove() //结束后删除
            });

        }, 200);
    }


    var container = $("#content");
    var swipe = Swipe(container);
    var visualWidth = container.width();
    var visualHeight = container.height();

    // 页面滚动到指定的位置
    function scrollToPage(time,proportionX) {
        var distX = visualWidth * proportionX;
        swipe.scrollTo(distX,time);
    }

    // 获取数据
    var getValue = function(className) {
        var $elem = $('' + className + '');
        // 走路的路线坐标
        return {
            height: $elem.height(),
            top: $elem.position().top
        };
    };

    // 桥的Y轴
    var bridgeY = function() {
        var data = getValue('.c_background_middle');
        return data.top;
    }();
    console.log("bridgeY:" + bridgeY);
    ////////
    //小女孩 //
    ////////
    var girl = {
        elem: $('.girl'),
        getHeight: function() {
            return this.elem.height();
        },
        // 转身动作
        rotate: function() {
            this.elem.addClass('girl-rotate');
        },
        setPosition: function() {
            this.elem.css({
                left: visualWidth / 2,
                top: bridgeY - this.getHeight()
            });
        },
        getPosition: function() {
            return this.elem.position();
        },
        getWidth: function() {
            return this.elem.width()
        }
    };

    // 修正小女孩位置
    girl.setPosition();

    ///////////
    //loge动画 //
    ///////////
    var logo = {
        elem: $('.logo'),
        run: function() {
            this.elem.addClass('logolightSpeedIn')
                .on(animationEnd, function() {
                    $(this).addClass('logoshake').off();
                });
        }
    };

    // 用来临时调整页面
    //swipe.scrollTo(visualWidth * 2, 0);

    //开门
    function doorAction(left,right,time) {
        var $door = $(".door");
        var doorleft = $(".door-left");
        var dooright = $(".door-right");
        var defer = $.Deferred();
        var count = 2;
        //等待开门完成
        var complete = function () {
            if(count == 1){
                defer.resolve();
                return;
            }
            count-- ;
        };
        doorleft.transition({
            "left" : left
        },time,complete);
        dooright.transition({
            "left" : right
        },time,complete);
        return defer;
    }

    function openDoor() {
        return  doorAction("-50%","100%",2000)
    }
    function shutDoor() {
        return doorAction("0%","50%",2000)
    }

    var instanceX ,instanceY;
    /**
     * 小孩走路
     * @param {[type]} container [description]
     */
    function BoyWalk() {
        var container = $("#content");
        // 页面可视区域
        var visualWidth = container.width();
        var visualHeight = container.height();

        var swipe = Swipe(container);
        //获取数据
        var getValue = function (className) {
            var $elem = $("" + className + "");
            return {                                //走路的路线
                height : $elem.height(),
                top : $elem.position().top
            };
        }
        //路的Y轴
        var pathY = function () {
            var data = getValue(".a_background_middle");
            return data.top + data.height / 2;
        }();
        //console.log("pathY:" + pathY);
        var $boy = $("#boy");
        var boyHeight = $boy.height();
        //console.log("biyHeight:" + boyHeight);
        var boyWidth = $boy.width();
        // 修正小男孩的正确位置
        $boy.css({
            top : pathY - boyHeight + 25
        })
    ////////////////////////////////////////////////////////
    //===================动画处理============================ //
    ////////////////////////////////////////////////////////

        // 暂停走路
        function pauseWalk() {
            $boy.addClass("pauseWalk");
        }
        // 恢复走路
        function restoreWalk() {
            $boy.removeClass("pauseWalk");
        }

        // css3的动作变化
        function slowWalk() {
            $boy.addClass("slowWalk");
        }

        // 计算移动距离
        function calculateDist(direction,proportion) {
            return (direction == "x" ? visualWidth : visualHeight) * proportion;
        }

        // 用transition做运动
        function startRun(options,runTime) {
            var dfdplay = $.Deferred();                      //创建Deferred对象
            // 恢复走路
            restoreWalk();
            //运动的属性
            $boy.transition(
                options,
                runTime,
                "linear",
                function (){
                    dfdplay.resolve();                      //动画完成
                }
            );
            return dfdplay;                                 //返回Deferred对象
        }

        //开始走路
        function walkRun(time,dist,disY) {
            time = time || 3000;
            //脚动作
            slowWalk();
            //开始走路
            var d1 = startRun({
                "left" : dist + "px",
                "top" : disY ? disY : undefined
            },time);
            return d1;
        }

        //进店
        function walkToShop(runTime) {
            var defer = $.Deferred();
            var doorObj = $('.door');
            // 门的坐标
            var offsetDoor = doorObj.offset();
            var doorOffsetLeft = offsetDoor.left;
            //console.log(offsetDoor.left)
            // 小孩当前的坐标
            var offsetBoy = $boy.offset();
            var boyOffsetLeft = offsetBoy.left;

            // 当前需要移动的坐标
            instanceX = (doorOffsetLeft + doorObj.width() / 2) - (boyOffsetLeft + $boy.width() / 2);

            // 开始走路
            var walkPlay = startRun({
                transform: 'translateX(' + instanceX + 'px),scale(0.3,0.3)',
                opacity: 0.1
            }, runTime);
            // 走路完毕
            walkPlay.done(function() {
                $boy.css({
                    opacity: 0
                })
                defer.resolve();
            })
            return defer;
        }

        // 走出店
        function walkOutShop(runTime) {
            var defer = $.Deferred();
            restoreWalk();
            // 开始走路
            var walkPlay = startRun({
                transform: 'translateX(' + instanceX + 'px),translateY(0),,scale(1,1)',
                opacity: 1
            }, runTime);
            // 走路完毕
            walkPlay.done(function() {
                defer.resolve();
            })
            return defer;
        }

        // 取花
        function takeFlower() {
            // 增加延时等待效果
            var defer = $.Deferred();
            setTimeout(function() {
                // 取花
                $boy.addClass('slowFlolerWalk');

                defer.resolve();
            }, 1000);
            return defer;
        }

        return {
            //开始走路
            walkTo : function (time,proportionX,proportionY) {
                var distX = calculateDist("x",proportionX);
                var distY = calculateDist("y",proportionY);
                return walkRun(time,distX,distY);
            },
            //停止走路
            stopWalk : function () {
                pauseWalk();
            },
            //走进商店
            toShop : function () {
                return walkToShop.apply(null,arguments);
            },
            //走出商店
            outShop : function () {
                return walkOutShop.apply(null,arguments);
            },
            //调试用颜色
            setColor : function (value) {
                $boy.css("background-color",value);
            },
            //取花
            takeFlower:function () {
                return takeFlower();
            },
            // 获取男孩的宽度
            getWidth: function() {
                return $boy.width();
            },
            // 复位初始状态
            resetOriginal: function() {
                this.stopWalk();
                // 恢复图片
                $boy.removeClass('slowWalk slowFlolerWalk').addClass('boyOriginal');
            },
            // 转身动作
            rotate: function(callback) {
                restoreWalk();
                $boy.addClass('boy-rotate');
                // 监听转身完毕
                if (callback) {
                    $boy.on(animationEnd, function() {
                        callback();
                        $(this).off();
                    })
                }
            }
        }
    }
