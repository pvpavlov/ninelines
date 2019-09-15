import "@babel/polyfill";
import svg4everybody from "svg4everybody";
import $ from "jquery";

svg4everybody();

window.$ = $;
window.jQuery = $;

require("ninelines-ua-parser");

$(".checkbox").on("click", function() {
	var values = [];
	$(".checkbox:checked").each(function() {
		var e = $(this);
		values.push(e.val());
	});
	var result = values.map(function(item, index, arr) {
		var number = parseInt(item);
		return isNaN(number) ? item : number;
	});
	function arraySum(array) {
		var sum = 0;
		for (var i = 0; i < array.length; i++) {
			sum += array[i];
		}
		return sum;
	}
	var rangeMeter = arraySum(result);
	rangeMeter = parseInt(rangeMeter);
	var rangeShow = document.querySelector("#show");
	var rangeClock = document.querySelector(".meter-clock");
	
	/*анимация*/
	function rangeChange() {
		var rotateClock = rangeMeter;
		rangeClock.style.transform =
			"rotate(" + (-90 + (rotateClock * 180) / 100) + "deg)";
	}
	rangeChange();
	function number_to(id, from, to, duration) {
		var element = document.getElementById(id);
		var start = new Date().getTime();
		setTimeout(function say() {
			var now = new Date().getTime() - start;
			var progress = now / duration;
			var result = Math.floor((to - from) * progress + from) + "%";
			element.innerHTML = progress < 1 ? result : to + "%";
			if (progress < 1) setTimeout(say, 10);
		}, 10);
	}
	var from = parseInt(rangeShow.innerHTML);
	number_to("show", from, rangeMeter, 750);
});
