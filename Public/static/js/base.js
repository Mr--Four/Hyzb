if (typeof jQuery === "undefined") { throw new Error("It's requires jQuery!!") }

$(document).ready(function () {
  /*list页面标的浮上效果*/
  $(".markList li").mouseover(function(){
    $(this).find(".markListPercent:eq(0)").css("opacity",1);
  });
  $(".markList li").mouseleave(function(){
    $(this).find(".markListPercent:eq(0)").css("opacity",0.6);
  });

  /**
  author:peach
  time:2013-07-15
  page:所有页面
  content:导航的用户信息部分
  */

  var navUser = $("#navUserLink");
  var navUserBox = $("#myAccountBox");

  navUser.mouseover(function(){
    $(this).css("border","1px solid #DDD");
    navUserBox.show();
    $(this).addClass("navUserNoHover");
  });
  navUser.mouseleave(function(){
    $(this).css("border","0");
    navUserBox.hide();
    $(this).removeClass("navUserNoHover");
  });
  navUserBox.mouseover(function(){
    navUser.css("border","1px solid #DDD");
    navUserBox.show();
    navUser.addClass("navUserNoHover");
  });
  navUserBox.mouseleave(function(){
    navUser.css("border","0");
    navUserBox.hide();
    navUser.removeClass("navUserNoHover");
  });

	/**
	author:peach
	time:2013-06-29
	page:all page
	content:过长字段浮动框显示信息部分
	*/

	var floatInfoBox = $("<span></span>");
	var floatBoxTriangle = $("<span></span>");
	var floatInfoTxt = $("<p></p>");

	floatInfoBox.css({"position":"relative","position":"absolute",
		"display":"none","zIndex":"100","opacity":"0.9","_width":"170px","maxWidth":"170px"});
	floatBoxTriangle.css({"position":"absolute","width":"0px","height":"0px","fontSize":"1px","lineHeight":"1px",
		"display":"block","borderLeft":"5px solid transparent","borderRight":"5px solid transparent",
		"borderTop":"5px solid #333","top":"100%","left":"50%","marginLeft":"-5px","zIndex":"10",
		"marginTop":"-6px"});
	floatInfoTxt.css({"padding":"5px 10px","backgroundColor":"#333","boxShadow":"0 0 5px 0 #666",
		"border":"1px solid #999","color":"#DDD","borderRadius":"5px","fontSize":"12px","_width":"150px"
		,"maxWidth":"150px","wordWrap":"break-word","marginBottom":"5px"});

	floatInfoBox.append(floatInfoTxt);
	floatInfoBox.append(floatBoxTriangle);
	$("body").append(floatInfoBox);

	$(document).on("mouseover", ".needShowFullInfo" ,function(){
		var tempInfo = $(this).attr("data-full");
		if(tempInfo == "None" || tempInfo == undefined)
			return;
		floatInfoTxt.html(tempInfo);
		floatInfoBox.css({"top":$(this).offset().top-floatInfoBox.outerHeight(),"left":$(this).offset().left+$(this).outerWidth()*0.5-floatInfoBox.outerWidth()*0.5});
		floatInfoBox.show();
	});
	$(document).on("mouseleave", ".needShowFullInfo" ,function(){
		floatInfoBox.hide();
	});
})



/* ========================================================================
 * Bootstrap: transition.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#transitions
 * ========================================================================
*/

+function ($) { "use strict";

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      'WebkitTransition' : 'webkitTransitionEnd'
    , 'MozTransition'    : 'transitionend'
    , 'OTransition'      : 'oTransitionEnd otransitionend'
    , 'transition'       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false, $el = this
    $(this).one($.support.transition.end, function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()
  })

}(window.jQuery);

/**
 *  登陆提交操作AJAX.POST,刷新验证码,
 *  @param   {[type]}  $  [description]
 *  @return  {[type]}     [description]
 */
+function ($) { "use strict";
    $(function () {
    /* 刷新验证码 */
      var verifyImg = $("#reloadVerify").attr("src")
      $("#reloadVerify").click(function(){
        if( verifyImg.indexOf('?')>0){
            $(this).attr("src", verifyImg+'&random='+Math.random());
        }else{
            $(this).attr("src", verifyImg.replace(/\#.*$/,'')+'#'+Math.random());
        }
      })

      /* 登陆AJAX */
      $("#loginForm").submit(function () {
        $.post($(this).attr("action"), {username: $("input[name=username]").val(), password: $("input[name=password]").val(), remember: $("input[name=remember]:checked").val()}, function (data) {
          if (data.status === 1) {
            window.location.href= nextUrl
          } else {
            $("input[name=password]").val('')
            $(".loginError").parent("td").parent("tr").removeAttr("style")
            $(".loginError").text('* ' + data.info)
          }
        }, "json")
        return false
      })
    })
}(window.jQuery)
