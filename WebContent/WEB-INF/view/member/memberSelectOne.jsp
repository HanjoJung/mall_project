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
		<div class="row" align="center">
			<table class="table table-bordered table-hover"
				style="max-width: 1500px">
				<tr>
					<td style="width: 5%">ID</td>
					<td style="width: 10%">이름</td>
					<td style="width: 10%">연락처</td>
					<td style="width: 30%">주소</td>
					<td style="width: 5%">성별</td>
					<td style="width: 10%">생년월일</td>
					<td style="width: 10%">가입날짜</td>
					<td style="width: 20%">프로필</td>
				</tr>
				<tr>
					<td>${member.id}</td>
					<td>${member.name}</td>
					<td>${member.phone}</td>
					<td>${member.address}</td>
					<td>${member.sex}</td>
					<td>${member.birthday}</td>
					<td>${member.join_date}</td>
					<td><a href="../upload/${member.profileFname}"> 
					<img style="max-width: 50px; max-height: 50px;" alt=""
							src="../upload/${member.profileFname}">
					</a></td>
				</tr>

			</table>
			<a href="../index.jsp">
				<button class="btn btn-default">홈으로</button>
			</a> 
			<a href="./memberUpdate.do?id=${member.id}">
				<button class="btn btn-default">수정</button>
			</a> 
			<a href="./memberDelete.do?id=${member.id}&fname=${member.profileFname}">
				<button class="btn btn-default">탈퇴</button>
			</a>
		</div>
	</div>
	<c:import url="../../../temp/footer.jsp" />
</body>
</html>