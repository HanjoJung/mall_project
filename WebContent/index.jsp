<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<jsp:include page="./temp/bootStrap.jsp"></jsp:include>
</head>
<jsp:include page="./temp/header.jsp"></jsp:include>
<body>
	<h1>index.jsp</h1>
	<h1>saewoom</h1>
	<a href="${pageContext.request.contextPath}/member/memberList.do">회원</a>
	<a href="${pageContext.request.contextPath}/product/productList.do">제품</a>
	<jsp:include page="./temp/footer.jsp"></jsp:include>
	
</body>
</html>
