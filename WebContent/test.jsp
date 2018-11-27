<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<jsp:include page="./temp/bootStrap.jsp"></jsp:include>
<script type="text/javascript">
$(function() {
	setCookie("test", "test", 1);
	var data = getCookie("test");
	console.log(data);
	checkCookie();
})

</script>
</head>
<body>

</body>
</html>