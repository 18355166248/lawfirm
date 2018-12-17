$(function () {
  $.getJSON("../data/lawyer_intro.json", function (data) {
    console.log(data)
    $(".banner>.txt>h2").text(data.title)
    $(".banner>.txt>p:first").text(data.txt1)
    $(".banner>.txt>p:last").text(data.txt2)
    const list = data.list
    let html = ''
    list.forEach(v => {
      html += '<div class="mini-box">' +
        '<img src="./images/lawyer_intro/'+ v.url +'.png" alt="">' +
        '<div class="describ">' +
        '<h3>'+ v.name +'</h3>' +
        '<span></span>' +
        '<p>'+ v.intro +'</p>' +
        '</div>' +
        '</div>'
    })
    $(".box").html(html)
  });
})