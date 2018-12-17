//2017.5.2

//pm给的监测代码贴在这里
// (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
//   (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
//   m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
//   })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

//   ga('create', 'UA-97461263-12', 'auto');
//   ga('send', 'pageview');

// var _hmt = _hmt || [];
// (function() {
//   var hm = document.createElement("script");
//   hm.src = "https://hm.baidu.com/hm.js?3f899ea56974ee72c8276a7bf86b4269";
//   var s = document.getElementsByTagName("script")[0]; 
//   s.parentNode.insertBefore(hm, s);
// })();

var hmsr=icom.getQueryString('hmsr');
var imonitor=importMonitor();


function importMonitor(){
	var monitor={};
	
	monitor.add=function(option){
		if(option){
			var obj=option.obj;
			var category=option.category||'';
			var action=option.action||'touchend';
			var label=option.label||'';
			var index=option.index||'0';
			if(obj && obj.length>0){
				obj.each(function(i) {
					$(this).on(action,{category:category,label:obj.length==1?label:label+(i+1),index:index},event_bind);}
				);
			}//end if
			else event_bind(null,{category:category,label:label,index:index});
		}//end if
	}//end func
	
	function event_bind(e,data){
		if(e) event_handler(e.data);
		else event_handler(data);
	}//end func
	
	function event_handler(data){
		_hmt.push(['_trackEvent', hmsr?'来源：'+hmsr:'来源：默认', data.index, (data.category!=''?data.category+'-':'') + data.label]);
		if(window.ga) ga('send', 'event', hmsr?'来源：'+hmsr:'来源：默认', data.index, (data.category!=''?data.category+'-':'') + data.label);
		icom.console('监测来源：'+(hmsr?hmsr:'默认')+' | '+'监测说明：'+(data.index!='0'?data.index+'-':'')+(data.category!=''?data.category+'-':'') + data.label);
	}//end func
	
	return monitor;
}//end import