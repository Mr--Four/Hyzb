/**
  *** 首页JS文件
  ***  轮播，登陆框提示文字
  **/
!function($) {
	$(function() {
    //开启自动轮播
    $("#bannerLogin").unslider({
      speed: 500,
      delay: 3000,
      init: 5000,
      dots: true,
    })

  	//首页登陆框默认文字，判断是否记住用户名
  	var indexLoginInput = $('.loginTable .textInput')

  	indexLoginInput.each(function () {
  		if($(this).val() != "") {
  			$(this).next().hide()
  		}
  	})

  	indexLoginInput.focus(function () {
  		$(this).next().hide()
  	})

  	indexLoginInput.blur(function () {
  		if($(this).val() == "") {
  			$(this).next().show()
  		} else {
  			$(this).next().hide()
  		}
  	})

    /* 首页登陆AJAX */
    $("#indexLoginForm").submit(function () {
      $.post($(this).attr("action"), {username: $("input[name=username]").val(), password: $("input[name=password]").val(), remember: $("input[name=remember]:checked").val()}, function (data) {
          if (data.status !== 1) {
            window.location.href = loginUrl + "&info=*" + data.info
          } else {
            window.location.href = indexUrl
          }
      }, "json")
      return false
    })
  })
}(window.jQuery);

/**
 *   首页轮播器
 *   Unslider by @idiot and @damirfoy
 */

+function ($, f) {
  var Unslider = function() {
    //  Object clone
    var _ = this;

    //  Set some options
    _.o = {
      speed: 500,     // animation speed, false for no transition (integer or boolean)  换图时的速度
      delay: 3000,    // delay between slides, false for no autoplay (integer or boolean)  几秒换图
      init: 0,        // init delay, false for no delay (integer or boolean)
      pause: !f,      // pause on hover (boolean)  是否鼠标停留时暂停
      loop: !f,       // infinitely looping (boolean) 是否无限循环
      keys: f,        // keyboard shortcuts (boolean) 是否开启键盘按键支持
      dots: f,        // 显示选择按钮 (boolean)
      arrows: f,      // 显示左右选择按钮 (boolean)
      prev: '←',     // text or html inside prev button (string)
      next: '→',     // same as for prev option
      fluid: f,       // is it a percentage width? (boolean)
      complete: f,    // invoke after animation (function with argument)
      items: '>ul',   // slides container selector
      item: '>li',    // slidable items selector
      easing: 'swing' // easing function to use for animation
    };

    _.init = function(el, o) {
      //  Check whether we're passing any options in to Unslider
      _.o = $.extend(_.o, o);

      _.el = el;
      _.ul = el.find(_.o.items);
      _.max = [el.outerWidth() | 0, el.outerHeight() | 0];
      _.li = _.ul.find(_.o.item).each(function(index) {
        var me = $(this),
          width = me.outerWidth(),
          height = me.outerHeight();

        //  Set the max values
        if (width > _.max[0]) _.max[0] = width;
        if (height > _.max[1]) _.max[1] = height;
      });


      //  Cached vars
      var o = _.o,
        ul = _.ul,
        li = _.li,
        len = li.length;

      //  Current indeed
      _.i = 0;

      //  Set the main element
      el.css({width: _.max[0], height: li.first().outerHeight(), overflow: 'hidden'});

      //  Set the relative widths
      ul.css({position: 'relative', left: 0, width: (len * 100) + '%'});
      li.css({'float': 'left', width: (100 / len) + '%'});

      //  Autoslide
      setTimeout(function() {
        if (o.delay | 0) {
          _.play();

          if (o.pause) {
            el.on('mouseover mouseout', function(e) {
              _.stop();
              e.type == 'mouseout' && _.play();
            });
          };
        };
      }, o.init | 0);

      //  Keypresses
      if (o.keys) {
        $(document).keydown(function(e) {
          var key = e.which;

          if (key == 37)
            _.prev(); // Left
          else if (key == 39)
            _.next(); // Right
          else if (key == 27)
            _.stop(); // Esc
        });
      };

      //  Dot pagination
      o.dots && nav('dot');

      //  Arrows support
      o.arrows && nav('arrow');

      //  Patch for fluid-width sliders. Screw those guys.
      if (o.fluid) {
        $(window).resize(function() {
          _.r && clearTimeout(_.r);

          _.r = setTimeout(function() {
            var styl = {height: li.eq(_.i).outerHeight()},
              width = el.outerWidth();

            ul.css(styl);
            styl['width'] = Math.min(Math.round((width / el.parent().width()) * 100), 100) + '%';
            el.css(styl);
          }, 50);
        }).resize();
      };

      //  Swipe support
      if ($.event.special['swipe'] || $.Event('swipe')) {
        el.on('swipeleft swiperight swipeLeft swipeRight', function(e) {
          e.type.toLowerCase() == 'swipeleft' ? _.next() : _.prev();
        });
      };

      return _;
    };

    //  Move Unslider to a slide index
    _.to = function(index, callback) {
      var o = _.o,
        el = _.el,
        ul = _.ul,
        li = _.li,
        current = _.i,
        target = li.eq(index);

      //  To slide or not to slide
      if ((!target.length || index < 0) && o.loop == f) return;

      //  Check if it's out of bounds
      if (!target.length) index = 0;
      if (index < 0) index = li.length - 1;
      target = li.eq(index);

      var speed = callback ? 5 : o.speed | 0,
        easing = o.easing,
        obj = {height: target.outerHeight()};

      if (!ul.queue('fx').length) {
        //  Handle those pesky dots
        el.find('.dot').eq(index).addClass('active').siblings().removeClass('active');

        el.animate(obj, speed, easing) && ul.animate($.extend({left: '-' + index + '00%'}, obj), speed, easing, function(data) {
          _.i = index;

          $.isFunction(o.complete) && !callback && o.complete(el);
        });
      };
    };

    //  Autoplay functionality
    _.play = function() {
      _.t = setInterval(function() {
        _.to(_.i + 1);
      }, _.o.delay | 0);
    };

    //  Stop autoplay
    _.stop = function() {
      _.t = clearInterval(_.t);
      return _;
    };

    //  Move to previous/next slide
    _.next = function() {
      return _.stop().to(_.i + 1);
    };

    _.prev = function() {
      return _.stop().to(_.i - 1);
    };

    //  Create dots and arrows
    function nav(name, html) {
      if (name == 'dot') {
        html = '<ol class="dots">';
          $.each(_.li, function(index) {
            html += '<li class="' + (index == _.i ? name + ' active' : name) + '">' + '</li>';
          });
        html += '</ol>';
      } else {
        html = '<div class="';
        html = html + name + 's">' + html + name + ' prev">' + _.o.prev + '</div>' + html + name + ' next">' + _.o.next + '</div></div>';
      };

      _.el.addClass('has-' + name + 's').append(html).find('.' + name).click(function() {
        var me = $(this);
        me.hasClass('dot') ? _.stop().to(me.index()) : me.hasClass('prev') ? _.prev() : _.next();
      });
    };
  };

  //  Create a jQuery plugin
  $.fn.unslider = function(o) {
    var len = this.length;

    //  Enable multiple-slider support
    return this.each(function(index) {
      //  Cache a copy of $(this), so it
      var me = $(this),
        key = 'unslider' + (len > 1 ? '-' + ++index : ''),
        instance = (new Unslider).init(me, o);

      //  Invoke an Unslider instance
      me.data(key, instance).data('key', key);
    });
  };
}(window.jQuery, false);
