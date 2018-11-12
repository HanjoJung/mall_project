<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<c:import url="../../../temp/bootStrap.jsp" />
</head>
<body>
	<c:import url="../../../temp/header.jsp" />
	<div class="container-fluid">
		<div class="row">
			<form action="./memberUpdate.do" method="post"
				enctype="multipart/form-data" name="frm">
				<div class="form-group">
					<label for="id">ID:</label> <input type="email" class="form-control"
						value="${member.id}" name="id" readonly="readonly">
				</div>
				<div class="form-group">
					<label for="pw1">PASSWORD:</label> <input type="password"
						class="form-control" id="pw1" name="pw1">
				</div>
				<div class="form-group">
					<label for="pw2">PASSWORD:</label> <input type="password"
						class="form-control" id="pw2" name="pw2">
				</div>
				<div class="form-group">
					<label for="name">이름:</label> <input type="text"
						class="form-control" value="${member.name}" name="name" >
				</div>
				<div class="form-group">
					<label for="phone">연락처:</label> <input type="text"
						class="form-control" value="${member.phone}" name="phone">
				</div>
				<div class="form-group">
					<label for="address">주소:</label> <input type="text"
						class="form-control" value="${member.address}" name="address">
				</div>
				<div class="form-group">
					<c:if test="${member.sex eq '남자'}">
					남자<input type="radio" name="sex" value="남자" checked="checked">
					여자<input type="radio" name="sex" value="여자">
					</c:if>
					<c:if test="${member.sex eq '여자'}">
					남자<input type="radio" name="sex" value="남자">
					여자<input type="radio" name="sex" value="여자" checked="checked">
					</c:if>
				</div>
				<div class="form-group">
					<label for="birthday">생년월일:</label> <input type="date"
						class="form-control" value="${member.birthday}" name="birthday">
				</div>
				<div class="form-group">
					<label for="file">프로필 사진:</label> <input type="file"
						class="form-control" id="file" name="f">
				</div>
				<button class="btn btn-default">수정</button>
			</form>
		</div>
	</div>
	<c:import url="../../../temp/footer.jsp" />
</body>
</html>