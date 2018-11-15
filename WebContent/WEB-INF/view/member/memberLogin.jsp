<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head class="uk-notouch">
<meta charset="UTF-8">
<title>Insert title here</title>
<c:import url="../../../temp/bootStrap.jsp" />
<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/memberJoin.js"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/memberLogin.js"></script>
</head>
<body>
	<c:import url="../../../temp/header.jsp" />

	<section class="wrapper">
		<div class="container-fluid">
			<div class="row">
				<article id="common-modal" class="uk-modal uk-open"
					style="z-index: 1010; display: block; overflow-y: scroll;">
					<div class="uk-modal-dialog" style="width: 480px; top: 67.5px;">
						<a class="uk-modal-close uk-close"></a>
						<div class="contents">
							<c:import url="./test.jsp" />
						</div>
					</div>
				</article>
				<!-- 
				<form action="./memberLogin.do" method="post">
					<div class="form-group">
						<label for="id">ID:</label> <input type="text"
							class="form-control" id="id2" placeholder="Enter id" name="id2">
					</div>
					<div class="form-group">
						<label for="pw">PASSWORD:</label> <input type="password"
							class="form-control" id="pw" placeholder="Enter password"
							name="pw">
					</div>
					<button type="submit" class="btn btn-default">로그인</button>
				</form> -->
			</div>
		</div>
	</section>
</body>
</html>