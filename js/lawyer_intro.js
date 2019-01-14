$(function () {
  $.getJSON("data/lawyer_intro.json", function (data) {
    console.log(data);
    //公共变量的定义
    var now = 1 ;//初始页面显示分页数
    var onePageNum = 6;//每次点击加载数量(分页内容数量)
    var totalNum = data.list.length;
    var pageCount = Math.ceil(totalNum / onePageNum); //总分页数
    $(".banner>.txt>h2").text(data.title)
    $(".banner>.txt>p:first").text(data.txt1)
    $(".banner>.txt>p:last").text(data.txt2)
    if (!os.pc || $(window).width() < 768) {
      //mob端;
      renderActives();
      $("#loadMore").on("click", renderActives);

    } else {
      //pc端
      var html = ''
      data.list.forEach(function(v) {
        html += '<div class="mini-box">' +
          '<img src="./images/lawyer_intro/' + v.url + '.png" alt="">' +
          '<div class="describ">' +
          '<h3>' + v.name + '</h3>' +
          '<span></span>' +
          '<p>' + v.intro + '</p>' +
          '</div>' +
          '</div>'
      })
      $(".box").html(html)
    }
    function renderActives() {
      var html = "";
      var begin = (now - 1) * onePageNum;
      for (var i = begin; i < begin + onePageNum; i++) {
        if (i < totalNum) {
          html += '<div class="mini-box">' +
            '<img src="./images/lawyer_intro/' + data.list[i].url + '.png" alt="">' +
            '<div class="describ">' +
            '<h3>' + data.list[i].name + '</h3>' +
            '<span></span>' +
            '<p>' + data.list[i].intro + '</p>' +
            '</div>' +
            '</div>'
        }
      }
      $(".box").append(html);
      now++;
      if (pageCount < now) {
        $("#loadMore").hide();
      }
    }//end func
  });
})