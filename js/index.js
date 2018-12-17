$(function  () {
	var alertBox = $('.alertBox');
	var close = alertBox.find('.close');
	var item_more = $('.container2').find('.item-more');
	var swiperArr = $('.alertBox .swiper').children();
	var arr_left = alertBox.find('.arr_left');
	var arr_right = alertBox.find('.arr_right');
	// console.log(swiperArr.eq(0).data('index'));
	var arr_more = $('.section4').find('.arr_more');
	var currentIndex = 1;
	init();
	function init(){
		var mySwiper = new Swiper('.ban',{
			loop:false,
			onlyExternal : true,
			autoplay : 3000,
			autoplayDisableOnInteraction : false,
		});
		eventBind();
	}//end func
	
	function eventBind(){
		item_more.on('click',item_more_click);
		close.on('click',close_click);
		arr_left.on('click',arr_left_click);
		arr_right.on('click',arr_right_click);
		arr_more.on('click',arr_more_click);
	}//end func

	function item_more_click(e){
		alertBox.fadeIn();
		currentIndex = $(this).parent().index();
		swiperArr.eq(currentIndex).show().siblings('.swiper-slides').hide();
	}//end func
	function close_click(e){
		alertBox.fadeOut();
	}//end func

	function arr_left_click(e){
		currentIndex--;
		if(currentIndex<0){
			currentIndex= 5;
		}
		swiperArr.eq(currentIndex).show().siblings('.swiper-slides').hide();
	}//end func

	function arr_right_click(e){
		currentIndex++;
		if(currentIndex>5){
			currentIndex= 0;
		}
		swiperArr.eq(currentIndex).show().siblings('.swiper-slides').hide();
	}//end func

	function arr_more_click(e){
		$(this).prev('.info').toggleClass('active');
	}

	// 百度地图
	//公共变量定义
	var imap = new baidumap();
	imap.init("map");
	imap.locateMarker("中原律师事务所", "上海市浦东新区东方路8号良丰大厦7楼A室");
})


