$(function() {
	$(".brz-icon-checkbox").parent().click(function() {
		var checked = $(this).parent();
		var c = checked.attr("class").lastIndexOf("checked");
		if (c > 0) {
			checked.attr("class","input-checkbox uk-width-1-1")
			checked.children("input").attr("checked", false)
		} else {
			checked.attr("class","input-checkbox uk-width-1-1 checked")
			checked.children("input").attr("checked", true)
		}
	})
	var total = 0;
	$(".info-price").find(".priceText").each(function() {
		var price = parseInt($(this).attr("data-price"));
		total += price;
	})
	$(".total").children().attr("data-amount", total);
	
	$(".priceText").each(function() {
		var price = $(this).attr("data-price");

		if($(this).parent().attr("class") == "price sale total"){
			var price = $(this).attr("data-amount");
		}
		
		if (price.length <= 3) {
			$(this).text(price + " 원");
		} else if (price.length <= 6) {
			$(this).text(price.slice(-6, -3) + "," + price.slice(-3) + " 원");
		} else {
			$(this).text(
			price.slice(-9, -6) + "," + price.slice(-6, -3) + ","+ price.slice(-3) + " 원");
		}
	})
})