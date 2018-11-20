<%@page import="javax.annotation.PostConstruct"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	session.invalidate(); //첫 페이지로 오면 다 지움
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>login</title>
</head>
<body>
	<h2 align="center">Login</h2>
	<form name="form1" action="setProduct.jsp" method="post">
		<table align="center">
			<tr>
				<td align="center">아이디</td>
				<td><input type="text" required name="id" /></td>
				<!-- required 사용 -->
				<td><input type="submit" name="login" value="로그인" /></td>
			</tr>
		</table>
	</form>
</body>
</html>