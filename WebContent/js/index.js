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
	
	var $divhover = $('#p1>div');
	$divhover.on({
		'mouseenter#p1' : function() {
			clearInterval(timeoutId);
			$(this).find('>').addClass('hover');
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

/*	$("body").on("click", "[data-click-name]", function(e) {
		var name = $(this).data("click-name");
		var area = $(this).data("click-area");
		var enable = $(this).data("click-enable");
		var endPoint = Core.getComponents('component_endpoint');
		// console.log(target);
		// console.log(href);
		// console.log(endPoint);
		if (enable != false) {
			endPoint.call('clickEvent', {
				area : area,
				name : name
			});
		}*/
	$("#p1>div").mouseenter(function() {
		$(this).addClass('hover');
	});

	$("#p1>div").mouseleave(function() {
		$(this).removeClass('hover');
	});	

	$('li.on>a').mouseenter(function() {
		$(this).children('span.btn_buy').css('display', 'block');
	})
	$('li.on>a').mouseleave(function() {
		$(this).children('span.btn_buy').css('display', 'none');
	})
	
	/*$('.cart-item').click(function(e) {
		if ('${member}' == '' ) {
			alert("로그인 하십시요");
			event.preventDefault();
		} else {
			$('.cart').addClass('cartadd');
			$('body').addClass('stop-scrolling');
			$.post('${pageContext.request.contextPath}/basket/basketList.do?id=${member.id}');
			$("#cart-order_list").load("/mall_project/WEB-INF/view/basket/basketList.jsp");
			e.preventDefault();
		}
	});*/
	
	/*$('.cart-item').on("click", function(event) {
		
		if ('${member}' == '' ) {
			alert("로그인 하십시요");
			event.preventDefault();
		} else {
			$('.cart').addClass('cartadd');
			$('body').addClass('stop-scrolling');
			$.post('${pageContext.request.contextPath}/basket/basketList.do?id=${member.id}');
			$("#cart-order_list").load("/mall_project/WEB-INF/view/basket/basketList.jsp");
			e.preventDefault();
		}
	});		

	$(".cart").click(function() {
		$(this).removeClass('cartadd');
		$('body').removeClass('stop-scrolling');
	});

	$(".cart-main").click(function(e) {
		e.stopPropagation();
	});*/

});