$(document).ready(function() {
	var timeoutId = null;
	var $oneDepth = $('.onedepth-list');
	$oneDepth.on({
		'mouseenter.lnb' : function() {
			clearInterval(timeoutId);
			$(this).find('>').addClass('active');
			$(this).siblings().find('>').removeClass('active');
		},
		'mouseleave.lnb' : function() {
			var $this = $(this);
			timeoutId = setTimeout(function() {
				$this.find('>').removeClass('active');
			}, 300);
		}
	});

	$('body').on('hidden.bs.modal', '.modal', function() {
		$(this).removeData('bs.modal');
	});

	$("#p1>div").mouseenter(function() {
		$(this).addClass('hover');
	});

	$("#p1>div").mouseleave(function() {
		$(this).removeClass('hover');
	});

	$(".cart").click(function() {
		$(this).removeClass('cartadd');
		$('body').removeClass('stop-scrolling');
	});

	$(".cart-main").click(function(e) {
		e.stopPropagation();
	});

	$('li.on>a').mouseenter(function() {
		$(this).children('span.btn_buy').css('display', 'block');
	})
	$('li.on>a').mouseleave(function() {
		$(this).children('span.btn_buy').css('display', 'none');
	})

});