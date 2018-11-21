$(document).ready(function() {
	var timeoutId = null;
	/*var $divhover = $('#p1');
	$divhover.on({
		'mouseenter' : function() {
			clearInterval(timeoutId);
			$(this).child('div').addClass('hover');
			$(this).child('div').siblings().removeClass('hover');
		},
		'mouseleave' : function() {
			var $this = $(this);
			timeoutId = setTimeout(function() {
				$this.child('div').removeClass('hover');
			}, 300);
		}
	});*/

	$("#p1>div").mouseenter(function() {
		clearInterval(timeoutId);
		$(this).addClass('hover');
		var $this = $(this);
		timeoutId = setTimeout(function() {
			$this.siblings().removeClass('hover');
		}, 5000);
	});
	
	$("#p1>div").mouseleave(function() {
		var $this = $(this);
		timeoutId = setTimeout(function() {
			$this.removeClass('hover');
		}, 5000);
	});
	
});