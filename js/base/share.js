//2016.3.23
var ishare=importShare();

(function() {
	//-------------------------------------------------------定义当前站点的分享设置
	ishare.url=location.href.substr(0, location.href.lastIndexOf('/')+1);
	ishare.content={
		link:ishare.url,
		image:ishare.url+(ishare.url.substr(ishare.url.length-1)=='/'?'images/share.jpg':'/images/share.jpg')+'?v='+Math.random(),
		title:$('title').html(),
		text:'分享到非微信环境的内容文字'
	};
}());

function importShare(){
	var share={};
	
	//-------------------------------------------------------微信二维码分享
	share.wxShare=function(option){
		var url,txt,img,imgHtml='';
		if(option.obj) var btn=option.obj;
		else var btn=$('a.btnWeixin');
		if(option.weixin) var btn=option.weixin;
		else var btn=$('aside.weixin');
		if(btn.length>0 && weixin.length>0){
			btn.on('click',function(e){
				if($(this).hasClass('active')){
					$(this).removeClass('active');
					weixin.hide();
				}//edn if
				else{
					$(this).addClass('active');
					weixin.show();
				}//edn else
			});
		}//end if
	}//end func
	
	//-------------------------------------------------------微博站外分享函数
	share.wbShare=function(option){
		var url,txt,img,imgHtml='';
		if(option.obj) var btn=option.obj;
		else var btn=$('a.btnWeibo');
		if(btn.length>0){
			url=option.url||window.location.href;
			txt=option.text||"";
			img=option.image;
			txt=encodeURIComponent(txt);
			url=encodeURIComponent(url);
			if(img && img.length>0){
				imgHtml="&pic=";
				if($.type(img) === "string") imgHtml+=img;
				else for(var i=0; i<img.length; i++){
					imgHtml+=img[i];
					if(i<img.length-1) imgHtml+='||'
				}//end for
				imgHtml+='&searchPic=false';
			}//end for
			btn.attr({target:'_blank',href:'http://service.weibo.com/share/share.php?url=' + url + '&title=' + txt + imgHtml });
		}//end if
	}//end func
	
	//-------------------------------------------------------qq空间站外分享函数
	share.qqShare=function(option){
		var url,txt,img,imgHtml='';
		if(option.obj) var btn=option.obj;
		else var btn=$('a.btnQq');
		if(btn.length>0){
			url=option.url||window.location.href;
			txt=option.text||"";
			img=option.image;
			txt=encodeURIComponent(txt);
			url=encodeURIComponent(url);
			if(img && img.length>0){
				imgHtml="&pics=";
				if($.type(img) === "string") imgHtml+=img;
				else for(var i=0; i<img.length; i++){
					imgHtml+=img[i];
					if(i<img.length-1) imgHtml+='||'
				}//end for
			}//end for
			btn.attr({target:'_blank',href:'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + url + '&title=' + txt + imgHtml + '&summary='});
		}//end if
	}//end func
	
	
	
	return share;
}//end import