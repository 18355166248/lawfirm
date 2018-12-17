$(function() {
    var o = {};
    o.province = $('#province');
    o.city = $('#city');
    o.submit = $('#submit');
    o.ulList = $('#list');

    var pro_id = 0;
    var city_id = 0;


    var data = [{
        value: '0',
        province: '北京',
        children: [{
            value: "0",
            city: "北京",
            desp: [{
                txt: "燕莎OUTLETS购物中心店",
                shopadd: "朝阳区东四环南路9号2F",
                lng: "116.492885",
                lat: "39.883657"
            },{
                txt: "百盛购物中心店",
                shopadd: "西城区复兴门内大街101号3F",
                lng: "116.364911",
                lat: "39.914127"
            }]
        }]
    },{
        value: '1',
        province: '上海',
        children: [{
            value: "0",
            city: "上海",
            desp: [{
                txt: "港汇名店运功城店",
                shopadd: "徐汇区虹桥路1号B115-MERRELL专柜",
                lng: "121.444238",
                lat: "31.201263"
            }]
        }]
    },{
        value: '2',
        province: '内蒙古自治区',
        children: [{
            value: "0",
            city: "赤峰",
            desp: [{
                txt: "Sportmaster万达广场店",
                shopadd: "新城区宝山路东赤峰万达广场购物中心1层1A号商铺",
                lng: "118.922316",
                lat: "42.25953"
            }]
        }]
    },{
        value: '3',
        province: '辽宁',
        children: [{
            value: "0",
            city: "沈阳",
            desp: [{
                txt: "Sportmaster奥体万达店",
                shopadd: "东陵区营盘西街17号万达广场购物中心B1-A 号商铺",
                lng: "123.466216",
                lat: "41.741501"
            },{
                txt: "Sportmaster北一路万达店",
                shopadd: "铁西区北一路1号万达广场购物中心",
                lng: "123.386494",
                lat: "41.819797"
            },{
                txt: "Sportmaster星摩尔店",
                shopadd: "铁西区北二中路6号星摩尔购物中心 F.F-01、F.F-03、F.F-12、F.F-13",
                lng: "123.380965",
                lat: "41.814573"
            }]
        }]
    },{
        value: '4',
        province: '河北',
        children: [{
            value: "0",
            city: "石家庄",
            desp: [{
                txt: "先天下购物广场",
                shopadd: "中山东路326号4F",
                lng: "114.532406",
                lat: "38.047398"
            }]
        }]
    },{
        value: '5',
        province: '天津',
        children: [{
            value: "0",
            city: "天津",
            desp: [{
                txt: "Sportmaster恒隆广场店",
                shopadd: "和平区兴安路166号天津恒隆广场【4030,4031】",
                lng: "117.206313",
                lat: "39.133692"
            },{
                txt: "Sportmaster远洋未来广场店",
                shopadd: "河东区新开路71号天津远洋未来广场3层3-20店铺",
                lng: "117.228158",
                lat: "39.144906"
            }]
        }]
    },{
        value: '6',
        province: '山东',
        children: [{
                value: "0",
                city: "德州",
                desp: [{
                    txt: "Sportmaster万达店",
                    shopadd: "德城区湖滨南大道669号万达广场购物中心1层次主力店1商铺",
                    lng: "116.318357",
                    lat: "37.435346"
                }]
            }, {
                value: "1",
                city: "青岛",
                desp: [{
                    txt: "Sportmaster乐客城店",
                    shopadd: "李沧区夏庄路1号伟东乐客城购物中心二层L2-B-14",
                    lng: "120.433469",
                    lat: "36.166102"
                }]
            },
            {
                value: "2",
                city: "烟台",
                desp: [{
                    txt: "Sportmaster大悦城店",
                    shopadd: "芝罘区北马路150号烟台大悦城购物中心4F-22",
                    lng: "121.393559",
                    lat: "37.551231"
                }]
            }
        ]
    }, {
        value: '7',
        province: '陕西',
        children: [{
            value: "0",
            city: "渭南",
            desp: [{
                txt: "Sportmaster万达店",
                shopadd: "高新区东路28号万达广场 一楼",
                lng: "109.459963",
                lat: "34.513039"
            }]
        }]
    }, {
        value: '8',
        province: '湖北',
        children: [{
            value: "0",
            city: "武汉",
            desp: [{
                txt: "武汉中商广场",
                shopadd: "武昌区中南路9号中商广场5楼长天户外",
                lng: "114.338197",
                lat: "30.542776"
            }]
        }]
    }]


    function setProvince(province, city) {
        var _province, html = '<option value="省份">省份</option>';
        for (var i = 0; i < data.length; i++) {
            html += '<option value="' + data[i].value + '">' + data[i].province + '</option>';
        };
        o.province.html(html).val("1" );
		province_change()
    };

    $("#province").on("change", province_change);
    $("#city").on("change", city_change);

    function getcity() {
        pro_id = $("#province").val();
        if (pro_id == "省份") {
            var html = '<option value="城市">城市</option>'
        } else {
            var _province, html = '<option value="城市">城市</option>';
            
            for (var i = 0; i < data[pro_id].children.length; i++) {
                html += '<option value="' + data[pro_id].children[i].value + '">' + data[pro_id].children[i].city + '</option>';
            };
        }
        o.city.html(html);        
    }

    function province_change() {
		var pro_id = $("#province").val();
		var html = '';
		var pos = [];
		for( var  i = 0; i<data[pro_id].children.length;i++){
			var res = createlist(pro_id, data[pro_id].children[i].value);
			html += res.list;
			pos = pos.concat(res.pos);
		}
		console.log(pos);
		$('.listbox ul').html(html);
		map_show(pos);
		getcity();
    }
	
	function city_change() {
		var city_id = $("#city").val();
		if (city_id == "城市") {
			province_change()
		}
		var res = createlist(pro_id, city_id);

		$('.listbox ul').html(res.list);
		//var shopData = [{ lng: 121.458321, lat: 31.184323 }, { lng: 121.458321, lat: 31.180023 }];
		map_show(res.pos);
    }

    setProvince('省份', '城市');
	
	function createlist(pro_id, city_id){
		var shop_pos = []
        var html = "";
        for( var  i = 0; i<data[pro_id].children[city_id].desp.length;i++){
          html += '<li data-lng="'+data[pro_id].children[city_id].desp[i].lng+'" data-lat="'+data[pro_id].children[city_id].desp[i].lat+'">\
            <div class="imgbg">\
            <span>'+(i+1)+'</span>\
            </div>\
            <dic class="wordbox">\
            <p class="name">'+data[pro_id].children[city_id].desp[i].txt+'</p>\
            <p class="address fz11 mt10">'+data[pro_id].children[city_id].desp[i].shopadd+'</p>\
            </dic>\
            </li>'

            var x={ lng: data[pro_id].children[city_id].desp[i].lng, lat: data[pro_id].children[city_id].desp[i].lat };
            shop_pos.push(x);
        }
		return {list:html, pos:shop_pos}
	}


});
// 百度地图API功能
//      创建自定义的覆盖物

function  map_show (shopData) {
  var mp = new BMap.Map("map");
  //mp.centerAndZoom(new BMap.Point(shopData[0].lng,shopData[0].lat), 15);
  mp.enableScrollWheelZoom();
  // 复杂的自定义覆盖物
  function ComplexCustomOverlay(point, text, mouseoverText) {
      this._point = point;
      this._text = text;
      this._overText = mouseoverText;
  }
  ComplexCustomOverlay.prototype = new BMap.Overlay();
  ComplexCustomOverlay.prototype.initialize = function(map) {
      this._map = map;
      var div = this._div = document.createElement("div");
      div.style.position = "absolute";
      div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
      div.style.color = "white";
      div.style.width = "21px";
      div.style.height = "30px";
      div.style.textAlign = "center";
      div.style.lineHeight = "18px";
      div.style.whiteSpace = "nowrap";
      div.style.MozUserSelect = "none";
      div.style.fontSize = "12px"
      var span = this._span = document.createElement("span");
      span.style.position = "absolute";
      span.style.display = "block";
      span.style.width = "21px";
      span.style.height = "30px";
      span.style.textAlign = "center";
      span.style.zIndex = "99";
      span.style.lineHeight = "20px";
      div.appendChild(span);
      span.appendChild(document.createTextNode(this._text));
      var that = this;
      var arrow = this._arrow = document.createElement("div");
      arrow.style.background = "url(images/service_center/mapiconbg.png) no-repeat";
      arrow.style.position = "absolute";
      arrow.style.width = "21px";
      arrow.style.height = "30px";
      arrow.style.top = "0";
      arrow.style.left = "0";
      arrow.style.overflow = "hidden";
      arrow.style.zIndex = "0";
      div.appendChild(arrow);
      div.onmouseover = function() {
          //      this.getElementsByTagName("span")[0].innerHTML = that._overText;
          arrow.style.background = "url(images/service_center/mapiconbg2.png) no-repeat";
      }
      div.onmouseout = function() {
          //      this.getElementsByTagName("span")[0].innerHTML = that._text;
          arrow.style.background = "url(images/service_center/mapiconbg.png) no-repeat";
      }
      mp.getPanes().labelPane.appendChild(div);
      return div;
  }
  ComplexCustomOverlay.prototype.draw = function() {
      var map = this._map;
      var pixel = map.pointToOverlayPixel(this._point);
      this._div.style.left = pixel.x - parseInt(this._arrow.style.left) + "px";
      this._div.style.top = pixel.y - 30 + 'px';
  }
  var mouseoverTxt = '99';
  // 向地图添加点
  pointArr = []; //
  overlayArr = [];
  for (var i = 0; i < shopData.length; i++) {
      var point = new BMap.Point(shopData[i].lng, shopData[i].lat);
      var myCompOverlay = new ComplexCustomOverlay(point, i + 1, mouseoverTxt);
      mp.addOverlay(myCompOverlay);
      pointArr.push(point);
      overlayArr.push(myCompOverlay);
  }
  var viewport = mp.getViewport(pointArr); //此类代表视野，不可实例化，通过对象字面量形式表示
	mp.setViewport(viewport);
  var lis = $("#list").find("li");
  lis.on("mouseover", function() {
      var _index = $(this).index();
      $(overlayArr[_index]._div).trigger("onmouseover");
  })
  lis.on("mouseout", function() {
      var _index = $(this).index();
      $(overlayArr[_index]._div).trigger("onmouseout");
  })
}