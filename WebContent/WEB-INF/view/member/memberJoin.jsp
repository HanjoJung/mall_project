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
						$("#id").parent().children("div").children().html(
								"필수 입력사항입니다");
					} else {
						$("#id").parent().children("div").html("");
					}

					if ($("#pw1").val() == "" || $("#pw2").val() == "") {
						$("#pw2").parent().children("div").children().html(
								"필수 입력사항입니다");
					} else {
						$("#id").parent().children("div").html("");
					}

					if ($("#idCheck").val() == "f") {
						alert("ID 중복검사를 해주세요");
					}
				})

		$("#id").change(function() {
			$("#idCheck").val('f');
		})

		$("#pw2").keyup(
				function() {
					if ($("#pw1").val() != $("#pw2").val()) {
						$("#pw2").parent().children("div").children().html(
								"비밀번호가 일치하지 않습니다");
					} else {
						$("#pw2").parent().children("div").children().html("");
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

	<div class="container-fluid">
		<div class="row">
			<form action="./memberJoin.do" method="post"
				enctype="multipart/form-data" name="frm">
				<input type="hidden" value="f" id="idCheck" name="idCheck">

				<div class="form-group">
					<label for="id">ID:</label> <input type="text" class="form-control"
						id="id" placeholder="Enter id" name="id"> <input
						type="button" id="btn" class="btn btn-default" value="중복확인">
					<div>
						<h5 style="color: red;"></h5>
					</div>
				</div>
				<div class="form-group">
					<label for="pw1">PASSWORD:</label> <input type="password"
						class="form-control" id="pw1" placeholder="Enter password"
						name="pw1">
				</div>
				<div class="form-group">
					<input type="password" class="form-control" id="pw2"
						placeholder="Enter password" name="pw2">
					<div>
						<h5 style="color: red;"></h5>
					</div>
				</div>
				<div class="form-group">
					<label for="name">닉네임:</label> <input type="text"
						class="form-control" id="nickname" placeholder="Enter nickname"
						name="nickname">
				</div>
				<div class="form-group">
					<label for="email">E-mail:</label> <input type="email"
						class="form-control" id="email" placeholder="Enter E-mail"
						name="email">
				</div>
				<div class="form-group">
					<label for="name">연락처:</label> <input type="text"
						class="form-control" id="phone" placeholder="Enter phone"
						name="phone">
				</div>
				<div class="form-group">
					<label for="name">주소:</label> <input type="text"
						class="form-control" id="address" placeholder="Enter address"
						name="address">
				</div>
				<div class="form-group">
					남자<input type="radio" name="sex" value="남자"> 여자<input
						type="radio" name="sex" value="여자">
				</div>
				<div class="form-group">
					<label for="name">나이:</label> <input type="number"
						class="form-control" id="age" placeholder="Enter age" name="age">
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