/******输出函数******/
function print(x){
	document.write(x);
}
//设为首页
function SetHome(obj,url){
    try{
        obj.style.behavior='url(#default#homepage)';
       obj.setHomePage(url);
   }catch(e){
       if(window.netscape){
          try{
              netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
         }catch(e){
              alert("抱歉，此操作被浏览器拒绝！nn请在浏览器地址栏输入“about:config”并回车然后将[signed.applets.codebase_principal_support]设置为'true'");
          }
       }else{
        alert("抱歉，您所使用的浏览器无法完成此操作。您需要手动将【"+url+"】设置为首页。");
       }
  }
}
//收藏本站
function AddFavorite(sURL, sTitle)
{
    try
    {
        window.external.addFavorite(sURL, sTitle);
    }
    catch (e)
    {
        try
        {
            window.sidebar.addPanel(sTitle, sURL, "");
        }
        catch (e)
        {
            alert("加入收藏失败，请使用Ctrl+D进行添加");
        }
    }
}
/******日期******/
today=new Date();
function initArray(){
this.length=initArray.arguments.length
for(var i=0;i<this.length;i++)
this[i+1]=initArray.arguments[i]  }
var d=new initArray(
"星期日",
"星期一",
"星期二",
"星期三",
"星期四",
"星期五",
"星期六");
var mon=today.getMonth()+1;
/******定时滚动新闻******/
(function($){
	$.fn.textSlider = function(settings){    
            settings = jQuery.extend({
                speed : "normal",
                line : 2,
                timer : 3000
            }, settings);
            return this.each(function() {
                $.fn.textSlider.scllor( $( this ), settings );
            });
        };
	$.fn.textSlider.scllor = function($this, settings){
            var ul = $("ul:eq(0)",$this );
            var timerID;
            var li = ul.children();
            var liHight=$(li[0]).height();
            var upHeight=0-settings.line*liHight;//滚动的高度；
            var scrollUp=function(){
                ul.animate({marginTop:upHeight},settings.speed,function(){
                    for(i=0;i<settings.line;i++){
                        ul.find("li:first",$this).appendTo(ul);
                    }
                    ul.css({marginTop:0});
                });
            };
            var autoPlay=function(){
                timerID = window.setInterval(scrollUp,settings.timer);
            };
            var autoStop = function(){
                window.clearInterval(timerID);
            };
            //事件绑定
            ul.hover(autoStop,autoPlay).mouseout();
	};
})(jQuery);
/******二级菜单******/
$(document).ready(function(){$(".menu li").mouseover(function(){
$('.menu2bg ol').css('display','none').eq($('.menu li').index(this)).css('display','block');
});});
$(document).ready(function(){$(".menu li.nav_search").mouseover(function(){
$('.menu2bg ol').css('display','none').eq(0).css('display','block');
});});
$(document).ready(function(){$(".menu li").mouseout(function(){
$('.menu2bg ol').css('display','none').eq(0).css('display','block');
});});

$(document).ready(function(){$(".menu2bg ol").mouseover(function(){
$('.menu2bg ol').css('display','none');$(this).css('display','block');
$('.menu li a').removeClass('m_l_ah').eq($('.menu2bg ol').index(this)).addClass('m_l_ah');
$('.menu li a').eq(0).removeClass('m_l_ah');
});});
$(document).ready(function(){$(".menu2bg ol").mouseout(function(){
$('.menu2bg ol').css('display','none').eq(0).css('display','block');
$('.menu li a').removeClass('m_l_ah');
});});
/******box1选项卡效果******/
$(document).ready(function(){$(".b1_l_tit li").mouseover(function(){
$('.b1_l_tit li').removeClass('b1_xxk_on');$(this).addClass('b1_xxk_on');
$('.b1_l_cont ul').removeClass('block_on').eq($('.b1_l_tit li').index(this)).addClass('block_on');
});});
$(document).ready(function(){$(".box3_xxk1 li").mouseover(function(){
$('.box3_xxk1 li').removeClass('box3_lt_on');$(this).addClass('box3_lt_on');
$('.b3_l_cont1 ul').removeClass('block_on').eq($('.box3_xxk1 li').index(this)).addClass('block_on');
});});
$(document).ready(function(){$(".box3_xxk2 li").mouseover(function(){
$('.box3_xxk2 li').removeClass('box3_lt_on');$(this).addClass('box3_lt_on');
$('.b3_l_cont2 ul').removeClass('block_on').eq($('.box3_xxk2 li').index(this)).addClass('block_on');
});});
$(document).ready(function(){$(".box5_xxk li").mouseover(function(){
$('.box5_xxk li').removeClass('box5_lt_on');$(this).addClass('box5_lt_on');
$('.b5_l_cont ul').removeClass('block_on').eq($('.box5_xxk li').index(this)).addClass('block_on');
});});
$(document).ready(function(){$(".box7_xxk li").mouseover(function(){
$('.box7_xxk li').removeClass('box7_lt_on');$(this).addClass('box7_lt_on');
$('.b7_l_cont table').removeClass('block_on').eq($('.box7_xxk li').index(this)).addClass('block_on');
});});
/******列表折叠效果******/
$(document).ready(function(){$(".foldmenu span").click(function(){if($('.foldmenu ul').eq($(".foldmenu span").index(this)).css('display')=='none'){$('.foldmenu ul').slideUp("1000").eq($(".foldmenu span").index(this)).slideDown("1000");}else{$('.foldmenu ul').slideUp("1000");}})});