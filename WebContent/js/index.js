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
	
	$('.modal').on('hidden.bs.modal', function (e) {
	    console.log('modal close');
	  $(this).find('form')[0].reset()
	});
	
	$('#p1>div').mouseenter(function() {
		$(this).addClass('hover');
	});
	$('#p1>div').mouseleave(function() {
		$(this).removeClass('hover');
	});
});