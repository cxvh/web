/**
 * Created by Administrator on 2016/6/28.
 */
/****** 闭包 ******/
(function($){
    /* 说明：获取浏览器前缀 */
    /* 实现：判断某个元素的 css 样式中是否存在 transition 属性 */
    /* 参数：dom 元素 */
    /* 返回值：boolean，有则返回浏览器样式前缀，否则返回 false */
    var _prefix = (function(temp){
        var aPrefix = ["webkit","Moz","o","ms"],
            props = "";
        for (var i in aPrefix){
            props = aPrefix[i] + "Transition";
            if(temp.style[props] !== undefined){
                return "-" + aPrefix[i].toLowerCase() + "-";
            }
        }
        return false;
    })(document.createElement(PageSwitch));
    var PageSwitch = (function(){
        function PageSwitch(element,options){
            this.settings = $.extend(true, $.fn.PageSwitch.defaults,options || {});
            this.element = element;
            this.init();
        }
        PageSwitch.prototype = {
            /* 说明：初始化插件 */
            /* 实现：初始化dom结构，布局，分页及绑定事件 */
            init : function(){
                var me = this;
                me.selectors = me.settings.selectors;
                me.sections = me.element.find(me.selectors.sections);
                me.section = me.sections.find(me.selectors.section);

                me.direction = me.settings.direction == "vertical" ? true : false;

                me.pagesCount = me.pagesCount();

                me.index = (me.settings.index >= 0 && me.settings.index < me.pagesCount) ? me.settings.index : 0;

                me.canScroll = true;

                if(!me.direction){ // 如果是横屏
                    me._initLayout(me.pagesCount);
                }

                if(me.settings.pagination){
                    me._initPaging();
                }

                me._initEvent();
            },
            /* 说明：获取滑动页面数量 */
            pagesCount : function(){
                return this.section.length;
            },
            /* 说明：获取滑动的宽度(横屏滑动) 或高度 （竖屏滑动） */
            switchLength : function(){
                return this.direction ? this.element.height() : this.element.width();
            },
            /* 说明:向前滑动即上一页面 */
            prev : function(){
                var me = this;
                if(me.index > 0){
                    me.index --;
                }else if(me.settings.loop){
                    me.index = me.pagesCount - 1;
                }
                me._scrollPage();
            },
            /* 说明:向后滑动即下一页面 */
            next : function(){
                var me = this;
                if(me.index < me.pagesCount){
                    me.index ++;
                }else if(me.settings.loop){
                    me.index = 0;
                }
                me._scrollPage();
            },
            /* 说明：主要针对横屏情况进行页面布局 */
            /*
            _initLayout : function(){
                var me = this;
                var width = (me.pagesCount() * 100) + "%",
                    cellWidth = (100/me.pagesCount()).toFixed(2)+"%";
                me.sections.width(width);
                me.section.width(cellWidth).css("float","left");
            },
            */
            _initLayout : function(oLen){
                var me = this;
                var width = (oLen * 100) + "%",
                    cellWidth = (100/oLen).toFixed(2)+"%";
                me.sections.width(width);
                me.section.width(cellWidth).css("float","left");
            },
            /* 说明：实现分页的dom结构及css样式 */
            _initPaging : function(){
                var me = this,
                    pagesClass = me.selectors.page.substring(1);
                me.activeClass = me.selectors.active.substring(1);
                var pageHtml = "<div class="+pagesClass+"><ul>";
                for(var i=0;i<me.pagesCount;i++){
                    pageHtml += "<li></li>";
                }
                pageHtml += "</ul></div>";
                me.element.append(pageHtml);
                var pages = me.element.find(me.selectors.page);
                me.pageItem = pages.find("li");
                me.pageItem.eq(me.index).addClass(me.activeClass);

                if(me.direction){
                    pages.addClass("vertical");
                }else{
                    pages.addClass("horizontal");
                }
            },
            /* 说明：初始化插件事件 */
            _initEvent : function(){
                var me = this;
                me.element.on("click",me.selectors.page + " li",function(){
                    me.index = $(this).index();
                    me._scrollPage();
                });

                me.element.on("mousewheel DOMMouseScroll",function(e){
                    var delta = e.originalEvent.wheelDelta || e.originalEvent.detail;
                    if(delta > 0 && (me.index && !me.settings.loop || me.settings.loop)){
                        me.prev();
                    }else if(delta < 0 && (me.index < (me.pagesCount - 1) && !me.settings.loop || me.settings.loop)){
                        me.next();
                    }
                });

                if(me.settings.keyboard){
                    $(window).on("keyup",function(e){
                        var keyCode = e.keyCode;
                        if(keyCode == 37 || keyCode == 38){
                            me.prev();
                        }else if(keyCode == 39 || keyCode == 40){
                            me.next();
                        }
                    });
                }

                $(window).resize(function(){
                    var currentLength = me.switchLength(),
                        offset = me.settings.direction ? me.section.eq(me.index).offset().top : me.section.eq(me.index).offset().left;
                    if(Math.abs(offset) > currentLength/2 && me.index < (me.pagesCount - 1)){
                        me.index ++;
                    }
                    if(me.index){
                        me._scrollPage();
                    }
                });

                me.sections.on("transitionend webkitTransitionEnd oTransitionEnd otransitionend",function(){
                    me.canScroll = true;
                    if(me.settings.callback && $.type(me.settings.callback) == "function"){
                        me.settings.callback();
                    }
                });
            },
            /* 说明：滑动动画 */
            _scrollPage : function(){
                var me = this,
                    dest = me.section.eq(me.index).position();
                if(!dest){return;}

                me.canScroll = false;
                if(_prefix){
                    me.sections.css(_prefix + "transition","all " + me.settings.duration + "ms " + me.settings.easing);
                    var translate = me.direction ? "translateY(-"+dest.top+"px)" : "translateX(-"+dest.left+"px)";
                    me.sections.css(_prefix + "transform",translate);
                }else {
                    var animateCss = me.direction ? {top : -dest.top} : {left : -dest.left};
                    me.sections.animate(animateCss,me.sections.direction,function(){
                        me.canScroll = true;
                        if(me.settings.callback && $.type(me.settings.callback) == "function"){
                            me.settings.callback();
                        }
                    });
                }
                if(me.settings.pagination){
                    me.pageItem.eq(me.index).addClass(me.activeClass).siblings("li").removeClass(me.activeClass);
                }
            }
        };
        return PageSwitch;
    })();
    $.fn.PageSwitch = function(options){
        return this.each(function(){
            var me = $(this),
                instance = me.data("PageSwitch");
            if(!instance){
                instance = new PageSwitch(me,options);
                me.data("PageSwitch",instance);
            }
            if($.type(options) === "string"){
                return instance[options]();
            }
        });
    }
    $.fn.PageSwitch.defaults = {
        selectors : {       // 获取轮播的 html 结构
            sections : ".sections", // ul 获取
            section : ".section",   // li 获取
            page : ".pages",        // 分页 class名称
            active : ".active"      // 分页符选中 class名称
        },
        index : 0,          // 开始索引值
        easing : "ease",    // CSS3 动画效果
        // easing 的值有
        /*
         linear	规定以相同速度开始至结束的过渡效果（等于 cubic-bezier(0,0,1,1)）。
         ease	规定慢速开始，然后变快，然后慢速结束的过渡效果（cubic-bezier(0.25,0.1,0.25,1)）。
         ease-in	规定以慢速开始的过渡效果（等于 cubic-bezier(0.42,0,1,1)）。
         ease-out	规定以慢速结束的过渡效果（等于 cubic-bezier(0,0,0.58,1)）。
         ease-in-out	规定以慢速开始和结束的过渡效果（等于 cubic-bezier(0.42,0,0.58,1)）。
         cubic-bezier(n,n,n,n)	在 cubic-bezier 函数中定义自己的值。可能的值是 0 至 1 之间的数值。
         */
        duration : 500,     // 动画时间
        loop : false,       // 是否循环
        pagination : true,  // 是否进行分页处理
        keyboard : true,    // 表示是否触发键盘事件
        direction : "vertical", // 动画方向 有两个属性 第二个 horizontal（横屏滑动）
        callback : ""       // 回调函数
    }
    $(function(){
        $("[data-PageSwitch]").PageSwitch();
    })
})(jQuery);