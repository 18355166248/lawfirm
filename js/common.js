
/// <reference path="base/jquery.js" />
/// <reference path="base/com.js" />
var domain = 'http://www.merrell.com.cn';
$(function () {
    var loadNavEnd = false;
    // render
    renderHeader(close_menu_mobile, open_menu_mobile);
    renderFooter();
    $("body").on("click", hidemenu);
    $('input, textarea').placeholder();
    //是否支持标准css3语法的现代浏览器（webkit内核浏览器、ie11以上）
    var newMode = (window.addEventListener && !document.all) || (window.addEventListener && document.documentMode >= 9);
    newMode = newMode || false;
    $('body').on("click", '.btn-video', video_handler);
    $('body').on("click", ".video-modal .close", close_video);

    $(window).on("scroll", scrollx_handler);

    function scrollx_handler(e) {
        var x = document.body.scrollLeft || document.documentElement.scrollLeft;
        $('.nav ').css("left", -x);
    };

    function flash_get(movieName) {
        if (navigator.appName.indexOf("Microsoft") != -1) {
            return window[movieName];
        } else {
            return document[movieName];
        };
    };//end func
    var first = true;
    function video_handler() {
        var playmode = $(this).attr("display");
        if (playmode == "inline") {
            var video_url = $(this).attr("data-src");
            $(this).html(video_url);
        } else {

            if (first) {
                var ht = '<div class="video-modal hide">\
				<div class="contBox">\
				<div class="video-box">\
				<a class="close">×</a>\
				<div class="video-inner">\
				\
				</div>\
				</div>\
				</div>\
				</div>';
                $(ht).appendTo('body');
                first = false;
            };


            var videoBox = $(".video-modal .video-inner");
            var video_url = $(this).attr("data-src");
            var poster = $(this).attr("data-poster");
            videoBox.html("");

            // 判断是否有frame
            if (video_url.indexOf('<iframe') != -1) {
                videoBox.html(video_url);
                $('.video-modal').fadeIn();
            } else {
                if (newMode) {
                    var video = $('<video type="video/mp4" preload="auto" controls poster="' + poster + '">').attr({ src: video_url }).appendTo(videoBox);
                } else {
                    var vid = video_url;
                    var src = 'video.swf?vid=' + vid;
                    var html = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" id="swfVideo0" width="920" height="562" codebase=" http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab"><param name="movie" value="' + src + '" /><param name="quality" value="high" /><param name="wmode" value="opaque" /><param name="bgcolor" value="#000000" /><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="true" /><embed  src="' + src + '"   width="512" height="320" name="swfVideo" bgcolor="#000000" quality="high" allowScriptAccess="always" wmode="opaque" allowFullScreen="true" type="application/x-shockwave-flash" pluginspage=" http://www.macromedia.com/go/getflashplayer"></embed></object>';
                    videoBox.html("");
                    videoBox.html(html);
                };

                $('.video-modal').fadeIn(500, function () {
                    if (newMode) {
                        $(this).find("video")[0].play();
                    } else {
                        setTimeout(function () {
                            flash_get('swfVideo0').flashResume();
                        }, 500)
                    }
                });
            }

        }

    }

    function close_video() {
        $('.video-modal').fadeOut();
        if (newMode) {
            $('.video-modal video')[0].pause()
        } else {
            // flash_get('swfVideo0').flashPause();
        }
    }

    function close_menu_mobile() {
        $('#dialog').on('click', function() {
            if (event.target.id === 'dialog' || event.target.nodeName === 'svg') {
                $('#dialog>.menu-box').removeClass('active')
                setTimeout(() => {
                    $('#dialog').hide()
                    $('html').css('overflow-y', 'auto')
                }, 320)
            }
        })
    }

    function open_menu_mobile() {
        $('.header-mobile .logo').on('click', function() {
            $('html').css('overflow-y', 'hidden')
            $('#dialog').show()
            setTimeout(() => {
                $('#dialog>.menu-box').addClass('active')
            }, 0)
        })
    }
});

if (!Array.prototype.forEach) {
    Array.prototype.forEach = function (callback, thisArg) {
        var T, k;
        if (this == null) {
            throw new TypeError(" this is null or not defined");
        }
        var O = Object(this);
        var len = O.length >>> 0; // Hack to convert O.length to a UInt32  
        if ({}.toString.call(callback) != "[object Function]") {
            throw new TypeError(callback + " is not a function");
        }
        if (thisArg) {
            T = thisArg;
        }
        k = 0;
        while (k < len) {
            var kValue;
            if (k in O) {
                kValue = O[k];
                callback.call(T, kValue, k, O);
            }
            k++;
        }
    };
}

function screenViewer(option) {
    option = $.extend({
        scrollbox: window,
        selecter: '.section',
        curClass: 'screen-viewer',
        percentage: 0.7
    }, option || {});
    option.scrollbox = $(option.scrollbox);
    var size = { width: option.scrollbox.width(), height: option.scrollbox.height() };
    var group = [];
    var o = $(option.selecter);

    var check = function () {
        var top = option.scrollbox.scrollTop();
        for (var i = 0; i < group.length; i++) {
            if (top > group[i].top - size.height * option.percentage) {
                group[i].obj.addClass(option.curClass);
            };
            if (top < group[i].top - size.height) {
                group[i].obj.removeClass(option.curClass);
            };
        };
    };
    setTimeout(function () {
        option.scrollbox.on('scroll', check);
        o.length > 0 && o.each(function (index, element) {
            var self = $(this);
            group.push({ obj: self, top: self.offset().top });
        });
        check();
    }, 1000);
};

function hidemenu(e) {
    var target = $(e.target);
    if (target.closest(".dropdown-menu").length == 0) {
        $('[data-toggle="dropdown"]').parents(".dropdown_parent").removeClass("open");
        $('.dropdown-menu').fadeOut();
    }
}
function gotoTop(box) {
    var top = $('<a class="goto-top"></a>').appendTo('body');
    top.on('click', function () {
        $(window).scrollTop(0);
        //$(window).animate({scrollTop:0}, 300);
    });
    $(window).scroll(function () {
        if ($(this).scrollTop() <= 400) {
            if (!top.hasClass('goto-top-show')) return;
            top.fadeOut().removeClass('goto-top-show');
        } else {
            if (top.hasClass('goto-top-show')) return;
            top.fadeIn().addClass('goto-top-show');
        };
    });
};

gotoTop();

//渲染页面头部导航
function renderHeader(close, open) {
    if ($("#header").length > 0) {
        $("#header").load("publicHtml/header.html?v=" + Math.random(), function () {
            loadNavEnd = true;
            if (loadNavEnd) loadend();
            $('#header .header-top ').scrollFix({ zIndex: 5 });
            open()
        });
        $("#dialog").load("publicHtml/dialog.html?v=" + Math.random(), function () {
            close();
        });
    }
    else {
        loadNavEnd = true;
    }
};//end func
function loadend() {

}

//渲染底部导航部分
function renderFooter() {
    if ($("#footer").length > 0) {
        $("#footer").load("publicHtml/footer.html?v=" + Math.random(), function () {

        });
    }
};//end func

(function ($) {
    $.fn.hoverDelay = function (options) {
        var defaults = {
            hoverDuring: 200,
            outDuring: 200,
            hoverEvent: function () {
                $.noop();
            },
            outEvent: function () {
                $.noop();
            }
        };
        var sets = $.extend(defaults, options || {});
        var hoverTimer, outTimer;
        return $(this).each(function () {
            // 保存当前上下文的this对象
            var $this = $(this);
            $this.hover(function () {
                clearTimeout(outTimer);
                hoverTimer = setTimeout(function () {
                    // 调用替换
                    sets.hoverEvent.apply($this);
                }, sets.hoverDuring);
            }, function () {
                clearTimeout(hoverTimer);
                outTimer = setTimeout(function () {
                    sets.outEvent.apply($this);
                }, sets.outDuring);
            });
        });
    }
})(jQuery);



























