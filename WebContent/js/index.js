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

	$("body").on("click", "[data-click-name]", function(e) {
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
		}
	});
});