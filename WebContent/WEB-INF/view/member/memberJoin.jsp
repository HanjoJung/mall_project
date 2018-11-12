<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<c:import url="../../../temp/bootStrap.jsp" />
<script type="text/javascript">
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
	
					if($("#idCheck").val()!="f"){
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
	})
</script>
</head>
<body>
	<c:import url="../../../temp/header.jsp" />

	<div class="container-fluid" style="max-width: 1500px;">
		<div class="row">
			<form action="./memberJoin.do" method="post"
				enctype="multipart/form-data" name="frm" id="frm">
				<input type="hidden" value="f" id="idCheck" name="idCheck">

				<div class="form-group">
					<label for="id">ID:</label> <input type="email" class="form-control"
						id="id" placeholder="Enter id" name="id"> <input
						type="button" id="btn" class="btn btn-default" value="중복확인">
					<span></span>
				</div>
				<div class="form-group">
					<label for="pw1">PASSWORD:</label> <input type="password"
						class="form-control" id="pw1" placeholder="Enter password"
						name="pw1">
				</div>
				<div class="form-group">
					<input type="password" class="form-control" id="pw2"
						placeholder="Enter password" name="pw2">
					<span></span>
				</div>
				<div class="form-group">
					<label for="name">이름:</label> <input type="text"
						class="form-control" id="name" placeholder="Enter name"
						name="name">
					<span></span>
				</div>
				<div class="form-group">
					<label for="name">연락처:</label> <input type="text"
						class="form-control" id="phone" placeholder="Enter phone"
						name="phone">
					<span></span>
				</div>
				<div class="form-group">
					<label for="name">주소:</label> <input type="text"
						class="form-control" id="address" placeholder="Enter address"
						name="address">
					<span></span>
				</div>
				<div class="form-group">
					남자<input type="radio" name="sex" value="남자"> 여자<input
						type="radio" name="sex" value="여자">
				</div>
				<div class="form-group" style="width: 262px;">
					<label for="name">생년월일:</label> <input type="date"
						class="form-control" id="birthday" name="birthday"
						value="1990-01-01">
				</div>
				<div class="form-group">
					<label for="file">프로필 사진:</label> <input type="file"
						class="form-control" id="file" name="f">
				</div>
				<button class="btn btn-default">가입</button>
				<input type="button" class="btn btn-default" value="가입 script"
					id="join">
			</form>
		</div>
	</div>
	<c:import url="../../../temp/footer.jsp" />
</body>
</html>