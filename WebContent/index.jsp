<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<jsp:include page="./temp/bootStrap.jsp"></jsp:include>
<link href="/mall_project/css/index.css" rel="stylesheet"
	type="text/css">
<script type="text/javascript">
	$(document).ready(function() {
		$(".onedepth-list").mouseenter(function() {
			$(this).find('>').addClass('active');
			$(this).siblings().find('>').removeClass('active');
		});
		$(".onedepth-list").mouseleave(function() {
			var $this = $(this);
			timeoutId = setTimeout(function() {
				$this.find('>').removeClass('active');
			}, 300);
		});
	});
</script>
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