<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>쇼핑몰 프로젝트</title>
<jsp:include page="./temp/bootStrap.jsp"></jsp:include>
</head>
<body>
	<jsp:include page="./temp/header.jsp"></jsp:include>
	<div class="container-fluid wrapper">
		<div class="row">
			<div class="col-lg-12">
				<h1>index.jsp</h1>
				<h1>saewoom</h1>
				<a href="${pageContext.request.contextPath}/member/memberList.do">회원</a>
			</div>
		</div>
	</div>
	<jsp:include page="./temp/footer.jsp"></jsp:include>
</body>
</html>