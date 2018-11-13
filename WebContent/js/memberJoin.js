$(function() {
	$(".brz-icon-checkbox").parent().click(
			function() {
				var checked = $(this).parent().attr("class");
				var c = checked.lastIndexOf("checked");
				if (c > 0) {
					$(this).parent().attr("class",
							"input-checkbox uk-width-1-1")
					$(this).parent().attr("checked", "")
				} else {
					$(this).parent().attr("class",
							"input-checkbox uk-width-1-1 checked")
					$(this).parent().attr("checked", "checked")
				}
			})

	$(".key").keyup(
			function() {
				// 정규식 패턴
				var pat = (RegExp)($(this).attr("data-parsley-pattern")); 
				
				// 입력 여부
				if ($(this).val().length == 0) { // 입력하지 않은 경우
					// 메세지 출력
					$(this).parent().children(".error-message").html(
							$(this).attr("data-parsley-required-message")); 
					// 필수 입력 항목입니다.
					// 메세지 블럭 노출
					$(this).parent().children(".uk-form-row .error-message")
							.css({
								display : "block"
							});
				} else { // 입력한 경우
					// 정규식 패턴 검사
					if (pat.test($(this).val())) {
						// 검사 승인
						$(this).parent().children(".error-message").html("");

						// 에러 메세지 숨김
						$(this).parent()
								.children(".uk-form-row .error-message").css({
									display : "none"
								});
					} else {
						// 검사 비승인
						// 메세지 출력
						$(this).parent().children(".error-message").html(
								$(this).attr("data-parsley-message"));

						// 메세지 블럭 노출
						$(this).parent()
								.children(".uk-form-row .error-message").css({
									display : "block"
								});
					}
				}
			})
			
			$("#pw2").keyup(
					function() {
						// 패스워드 검사
						if ($("#pw1").val()==$("#pw2").val()) {
							$(this).parent().children(".error-message").html("");

							// 에러 메세지 숨김
							$(this).parent()
									.children(".uk-form-row .error-message").css({
										display : "none"
									});
						} else {
							// 메세지 출력
							$(this).parent().children(".error-message").html(
									$(this).attr("data-parsley-equalto-message")); 
							// 메세지 블럭 노출
							$(this).parent().children(".uk-form-row .error-message")
									.css({
										display : "block"
									});
						}
					})
			$("#submit").click(function() {
				alert("click")
			})
})