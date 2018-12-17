//2016.3.25
var icom=importCom();

function importCom(){
	var com={};
	
	com.orient=function(){
		if(os.ipad){
			if($(window).height()>$(window).width()) landscape_alert();
			$(window).on("orientationchange",window_orientationchange);
		}//end if
	};//end func
	
	function window_orientationchange(e){
		if(window.orientation!='landscape') landscape_alert();
		else{
			var turnBox=$('#turnBox');
			if(turnBox.length>0) turnBox.remove();
		}//edn func
	};//end func
	
	function landscape_alert(){
		$('<div id="turnBox"><img src="images/common/turn.png" class="turn"><p>请将平板调至竖屏状态，获得最佳浏览体验！</div>').appendTo('body');
	};//end func
	
	com.console=function(msg,type){
		type=type||'log';
		if(window.console){
			switch(type){
				case 'log':
					window.console.log(msg);
				break;
				case 'info':
					window.console.info(msg);
				break;
				case 'warn':
					window.console.warn(msg);
				break;
				case 'error':
					window.console.error(msg);
				break;
				default:
					window.console.log(msg);
				break;
			}//end switch
		}//end if
	};//end func
	
	com.alert=function(text,callback){
		var box=$('<div class="alertBox"><div><p class="text"></p><p class="btn"><a class="close">确认</a></p></div></div>').appendTo($('body'));
		box.find('.text').html(text);
		box.show();
		box.find('a.close').click(function(e) {
           box.remove();
		   if(callback) callback();
        });
	};//end func
	
	com.mouseSelectOff=function(){
		document.onselectstart = function () { return false; };	//阻止ie选取
		document.unselectable= "on";//阻止OPERA选取
		$('body').css({"-moz-user-select":"none","-webkit-user-select":"none","-ms-user-select":"none","user-select":"none"});
	};//end func
	
	com.mouseSelectOn=function(){
		document.onselectstart = function () { return true; };//允许ie选取
		document.unselectable= "off";//允许OPERA选取
		$('body').css({"-moz-user-select":"auto","-webkit-user-select":"auto","-ms-user-select":"auto","user-select":"auto"});
	};//end func	
	
	com.popOn=function(obj,options){
		if(obj && obj.length>0){
			var defaults = {closeType:'button',closeBtn:obj.find('a.close'),remove:false};
			var opts = $.extend(defaults,options);
			if(opts.text) obj.find('.text').html(opts.text);
			if(opts.fade) obj.fadeIn(obj,opts.fade);
			else obj.show();
			if(opts.closeBtn.length>0 && opts.closeType=='button') opts.closeBtn.one('click',obj_close);
			else obj.one('click',obj_close);
			obj.on('close',obj_close);
		}//end if
		function obj_close(e){
			if(opts.closeBtn.length>0 && opts.closeType=='button') opts.closeBtn.off('click',obj_close);
			else obj.off('click',obj_close);
			if(opts.fade) obj.fadeOut(obj,opts.fade,function(){
				if(opts.remove) obj.remove();
			});
			else if(opts.remove) obj.remove();
			else obj.hide();
			obj.off('close',obj_close);
			if(opts.onClose) opts.onClose(obj);
		}//end func
	};//end func
	
	com.popOff=function(obj){
		if(obj && obj.length>0) obj.trigger('close');
	};//end func
	
	
	//获得http url参数
	com.getQueryString=function(name) {
		if(name && name!=''){
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
			var r = window.location.search.substr(1).match(reg);
			if (r != null) return decodeURIComponent(r[2]); return null;
		}//end if
		else return null;
	};//end func
	
	//获得http url文件名末尾的数字
	com.getQueryInt=function(len){
		len=len!=null?len:1;
		var path=window.location.pathname.split('/');
		var file=path[path.length-1];
		var str=file.split('.');
		return parseInt(str[0].substr(str[0].length-len));
	};//end func
	
	//载入图片函数
	com.imageLoad=function(src,callback){
		if(src && src!=''){
			var loader = new PxLoader();
			if($.type(src) === "string" && src!='') loader.addImage(src);
			else if($.type(src) === "array" && src.length>0){
				for(var i=0; i<src.length; i++){
					loader.addImage(src[i]);
				}//end for
			}//end else
			loader.addCompletionListener(function() {
				com.console('images load complete');
				loader=null;
				if(callback) callback(src);
			});			
			loader.start();	
		}//end if
	};//end func	
	
	//打印object数据
	com.objectPrint=function(data){
		if(data){
			com.console("-----------------------------------------------------------------------------");
			var info="";
			for(var i in data) info+=i+":"+data[i]+"  ";
			com.console(info);
			com.console("-----------------------------------------------------------------------------");
		}//end if
	};//end func
	
	//常用正则
	com.checkStr=function(str,type){
		if(str && str!=''){
			type=type||0;
			switch(type){
				case 0:
					var reg= new RegExp(/^1[3-9]\d{9}$/);//手机号码验证
					break;
				case 1:
					var reg= new RegExp(/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/);//匹配EMAIL
					break;
				case 2:
					var reg= new RegExp(/^\d+$/);//是否为0-9的数字
					break;
				case 3:
					var reg= new RegExp(/^[a-zA-Z\u0391-\uFFE5]*[\w\u0391-\uFFE5]*$/);//不能以数字或符号开头
					break;
				case 4:
					var reg= new RegExp(/^\w+$/);//匹配由数字、26个英文字母或者下划线组成的字符串
					break;
				case 5:
					var reg= new RegExp(/^[\u0391-\uFFE5]+$/);//匹配中文
					break;
				case 6:
					var reg= new RegExp(/^[a-zA-Z\u0391-\uFFE5]+$/);//不能包含数字和符号
					break;
			}//end switch
			if(reg.exec($.trim(str))) return true;
			else return false;
		}//end if
		else return false;
	};//end func
	
	//使用post方法进行php中间件通讯
	com.post=function(url,data,callback){
		if(url && url!='') post_handler(url,data,callback,'post');
	};//end func
	
	//使用get方法进行php中间件通讯
	com.get=function(url,data,callback){
		if(url && url!='') post_handler(url,data,callback,'get');
	};//end func
	
	function post_handler(url,data,callback,action){
		if(data && $.isPlainObject(data)) data=JSON.stringify(data);
		$.post("./http/httpPost.php",{api_url:url,post_data:data,action:action},function(resp){
			if(callback) callback(resp);
		}, "json");
	};//edn func
	
	//物体抖动
	com.shake=function(box,options){
		if(box && box.length>0){
			var defaults = {rx:0,ry:0,delay:33,now:0,max:10,restore:true};
			var opts = $.extend(defaults,options);
			var x=imath.randomRange(-opts.rx,opts.rx);
			var y=imath.randomRange(-opts.ry,opts.ry);
			TweenLite.set(box,{x:x,y:y});
			opts.now++;
			if(opts.now>opts.max){
				if(opts.restore) TweenLite.set(box,{x:0,y:0});
				if(opts.onComplete) opts.onComplete();
			}//end if
			else setTimeout(com.shake,opts.delay,box,opts);
		}//end if
	};//end func
	
	return com;
}//end import

