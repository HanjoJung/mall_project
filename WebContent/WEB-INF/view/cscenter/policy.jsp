<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<c:import url="../../../temp/bootStrap.jsp" />
<style type="text/css">
.customer-contents {
	margin: 0px auto;
}

.customer-policy {
	margin-left: 0px;
}

.labelt {
	font-size: 23px;
	color: #111111;
	font-weight: bold;
}

.margin-xsmall {
	margin-top: 17px;
}
</style>
</head>
<body>
	<c:import url="../../../temp/header.jsp" />
	<div class="content-area wrapper">
		<div class="contents width-xlarge margin-xsmall">
			<div class="customer-policy">
				<h2 class="title">
					<span class="labelt">이용약관</span>
				</h2>
				<c:import url="./text.jsp"></c:import>
			</div>
		</div>
	</div>
	<c:import url="../../../temp/footer.jsp" />
</body>
</html>