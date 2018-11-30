$(function() {
			function formCheck(data){
				// 정규식 패턴
				var pat = (RegExp)(data.attr("data-parsley-pattern"));
				// 입력 여부
				if (data.val().length == 0) { // 입력하지 않은 경우
					// 메세지 출력
					data.parent().children(".error-message").html(data.attr("data-parsley-required-message")); 
					// 필수 입력 항목입니다.
					// 메세지 블럭 노출
					data.parent().children(".uk-form-row .error-message").css({
						display : "block"
					});
					data.css({
						"border-color" : "red"
					});
				} else { // 입력한 경우
					// 정규식 패턴 검사
					if (pat.test(data.val())) {
						// 검사 승인
						data.parent().children(".error-message").html("");

						// 에러 메세지 숨김
						data.parent().children(".uk-form-row .error-message").css({
									display : "none"
								});
						data.css({
							"border-color" : "#e5e5e5"
						});
						return true;
					} else {
						// 검사 비승인
						// 메세지 출력
						data.parent().children(".error-message").html(data.attr("data-parsley-message"));

						// 메세지 블럭 노출
						data.parent().children(".uk-form-row .error-message").css({
									display : "block"
								});
						data.css({
							"border-color" : "red"
						});
					}
				}
				return false;
	}
	function password(data) {
		// 패스워드 검사
		if ($("#pw1").val()==$("#pw2").val()) {
			data.parent().children(".error-message").html("");
			// 에러 메세지 숨김
			data.parent()
				.children(".error-message").css({
					display : "none"
				});
			return true;
		} else {
			// 메세지 출력
			data.parent().children(".error-message").html(data.attr("data-parsley-equalto-message")); 
			// 메세지 블럭 노출
			data.parent().children(".error-message").css({
				display : "block",
			});
			data.css({
				"border-color" : "red"
			});
			return false;
		}
	}
	
	$(".data").keyup(function() {
		formCheck($(this));
	});

	$('.data').keydown(function(e){
		if(e.keyCode == 13){
			submitFrm();
		}
	})

	$("#submit").click(submitFrm)
	
	function submitFrm() {
			var check = true;
			$(".data").each(function() {
				if(!formCheck($(this))){
					$(this).focus();
					check = false;
					return check;
				};
			});
			if((password($("#pw2")) || $("#pw2").val().length == 0) && check){
				check = false;
				$("#pw2").focus();
			}
			if(check){
				$(".essential").each(function() {
					if(!$(this).attr("checked")) {
						alert($(this).attr("data-parsley-message"));
						$(this).focus();
						check = false;
						return check;
					}
				})
			}
			if($(this).attr("data-parsley-required")!=null){
				var id = $("#id").val();
				 $.get("../member/memberCheckId.do?id="+id, function(data) {
					if(data!=1){
						check = false;
						$("#id").parent().children(".error-message").html("이미 사용중인 아이디입니다");
						$("#id").parent().children(".uk-form-row .error-message").css({
									display : "block"
								});
						$("#id")
						.css({
							"border-color" : "red"
						});
						$("#id").focus();
					};
					
					if(check){
						$(".uk-form-large").submit();
					}
				 })
				}else{
					if(check){
						$(".uk-form-large").submit();
					}
				}
		}
})
