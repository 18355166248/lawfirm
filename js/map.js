// 创建百度地图
var baidumap = function(){
    var _self = this;
    var markerArr;
    var localSearch;
    var title = "";
    var add = "";

    //初始化
    _self.init = function(ele){
        var map = new BMap.Map(ele);//在百度地图容器中创建一个地图
        var point = new BMap.Point(116.464925,39.915126);//定义一个中心点坐标
        localSearch = new BMap.LocalSearch(map);
        map.centerAndZoom(point,15);//设定地图的中心点和坐标并将地图显示在地图容器中
        window.map = map;//将map变量存储在全局
        var top_left_navigation = new BMap.NavigationControl();  //左上角，添加默认缩放平移控件
        map.addControl(top_left_navigation);
        map.addEventListener("tilesloaded",function(){
            if(!$("#loading").hasClass('act')) $("#loading").fadeOut(300);
        });

        // _self.locateMarker("国贸中心","北京市朝阳区建国门外大街1号中国国际贸易中心西楼SB125");
    }//end func

    _self.locateMarker = function(t,a){
        //标注点数组
        title = t;
        add = a;
        searchAdd();
    }

    //查询地址
    function searchAdd(){
    　  localSearch.setSearchCompleteCallback(function (searchResult) {
    　　　　var poi = searchResult.getPoi(0);
            addNewMarker(poi.point.lng,poi.point.lat);
            locateCenterPoint(poi.point.lng,poi.point.lat);
    　　});
        localSearch.search(add)
    }//end func

    //添加一个mark
    function addNewMarker(lng,lat){
        // markerArr = {title:title,content:add,point:lng+"|"+lat,isOpen:0,icon:{w:80,h:90,l:0,t:0,x:0,lb:40,oftx:0,ofty:70}};
        markerArr = { title: '', content: add, point: lng + "|" + lat, isOpen: 0, icon: { w: 101, h: 111, l: 0, t: 0, x: 0, lb: 40, oftx: 0, ofty: 70 } };
        map.clearOverlays();
        addMarker();//向地图中添加marker
    }//end func

    //定位一个中心点
    function locateCenterPoint(lng,lat){
        var point = new BMap.Point(lng,lat);
        $("#loading").removeClass('act').show();
        map.centerAndZoom(point,15);
    }//end func

    //创建marker
    function addMarker(){
        var json = markerArr;
        var p0 = json.point.split("|")[0];
        var p1 = json.point.split("|")[1];
        var point = new BMap.Point(p0,p1);
        var iconImg = createIcon(json.icon);
        var marker = new BMap.Marker(point,{icon:iconImg});
        map.addOverlay(marker);
        // marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画

        var label = new BMap.Label(json.title,{"offset":new BMap.Size(json.icon.lb-json.icon.x+10,-20)});
        marker.setLabel(label);
        label.setStyle({
            borderColor:"#808080",
            color:"#333",
            cursor:"pointer"
        });
            
    }
    //创建一个Icon
    function createIcon(json){
        var icon = new BMap.Icon("images/common/site.png", new BMap.Size(json.w,json.h),
            {
                imageOffset: new BMap.Size(-json.l,-json.t),
                infoWindowOffset:new BMap.Size(json.lb+5,1),
                offset:new BMap.Size(json.x,json.h),
                anchor:new BMap.Size(json.oftx,json.ofty)
            });
        return icon;
    }
}//end func

