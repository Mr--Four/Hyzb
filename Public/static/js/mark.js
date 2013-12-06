$(function () {
	/**
	 *  invest贷款主页面标滚动选择部分
	 */
	var scrollBox = $(".markSelectScrollBox")
	if ( scrollBox.html() != undefined) {
		var scrollLi = $(".markSelectScrollBox ul:eq(0) li")
		var scrollTime1
		var scrollTime2
		scrollLi.mouseover(function () {
			var doThis = $(this)
			clearTimeout(scrollTime1)
			scrollTime1 = setTimeout(function () {
				doThis.stop(true).animate({"marginRight" : "130"})
				doThis.parent().stop(true).animate({"marginLeft" : -20*(doThis.index())})
			}, 10)
		})
		scrollLi.mouseleave(function () {
			var doThis = $(this)
			clearTimeout(scrollTime2)
			scrollTime2 = setTimeout(function () {
				doThis.stop(true).animate({"marginLeft" : "0", "marginRight" : "-85"})
				doThis.parent().stop(true).animate({"marginLeft" : 0});
			}, 10)
		})
	}
})
