<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>CheckOut</title>
</head>
<body>
	<form>
		<h2 align="center">계산</h2>
		<p align="center">선택한 상품 목록</p>
		<hr>
		<%
			if (session.getAttribute("productlist") == null) { //추가한 물품(추가)를 하지 않은 경우
		%>
		<p align="center">추가된 상품 없을무</p>
		<%
			} else {
		%>
		<p align="center"><%=session.getAttribute("productlist").toString()%></p>
		//session에 저장된 list 불러옴
		<%
			}
		%>
		<a href="setProduct.jsp" align="center">뒤로가기</a>
	</form>
	<form action="login.jsp">
		<table align="center">
			<tr>
				<td><input type="submit" value="로그아웃"></td>
			</tr>
		</table>
	</form>
</body>
</html>