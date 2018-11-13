$(function() {
	$("#join").click(
			function() {
				if ($("#id").val() == "") {
					$("#id").parent().children("span").html(
							'<h6 style="color: red;">필수 입력사항입니다</h6>')
					$("#idCheck").val('f');
				} else {
					$("#id").parent().children("span").html("");
					if ($("#idCheck").val() == "f") {
						$("#id").parent().children("span").html("");
						$("#id").parent().children("span").html(
								'<h6 style="color: red;">ID 중복검사를 해주세요</h6>')
					}
				}

				if ($("#pw1").val() == "" || $("#pw2").val() == "") {
					$("#pw2").parent().children("span").html(
							'<h6 style="color: red;">필수 입력사항입니다</h6>')
					$("#idCheck").val('f');
				} else {
					$("#pw2").parent().children("span").html("");
				}

				if ($("#name").val() == "") {
					$("#name").parent().children("span").html(
							'<h6 style="color: red;">필수 입력사항입니다</h6>')
					$("#idCheck").val('f');
				} else {
					$("#name").parent().children("span").html("");
				}

				if ($("#phone").val() == "") {
					$("#phone").parent().children("span").html(
							'<h6 style="color: red;">필수 입력사항입니다</h6>')
					$("#idCheck").val('f');
				} else {
					$("#phone").parent().children("span").html("");
				}

				if ($("#idCheck").val() != "f") {
					$("#frm").submit();
				}
			})

	$("#id").change(function() {
		$("#idCheck").val('f');
	})

	$("#pw2").change(
			function() {
				if ($("#pw1").val() != $("#pw2").val()) {
					$("#pw2").parent().children("span").children().html(
							"비밀번호가 일치하지 않습니다");
					$("#idCheck").val('f');
				} else {
					$("#pw2").parent().children("span").children().html("");
				}
			})

	$("#btn").click(
			function() {
				$("#idCheck").val('f');
				var id = document.frm.id.value;
				window.open("./memberCheckId.do?id=" + id, "",
						"width=300, height=200, top=300, left=500");
			})

	$(".brz-icon-checkbox").parent().click(function() {
		alert($(this).parent().find("first-child"));
	})
})