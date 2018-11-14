<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<c:import url="../../../temp/bootStrap.jsp" />
<script type="text/javascript">
	$(function() {
		$("#btn").click(function() {
			//opener.document.getElementById("id").value='${param.id}';
			opener.document.frm.id.value = '${param.id}';
			opener.document.frm.idCheck.value = 's';
			self.close();
		})
	})
</script>
</head>
<body>

	<div class="container-fluid">
		<div class="row">
			<form action="./memberCheckId.do" method="get">
				<div class="form-group">
					<input type="text" class="form-control" name="id"
						placeholder="Enter id" value="${param.id}">
				</div>
				<c:if test="${result eq '1'}">
					<h4>${param.id}는 사용 가능합니다</h4>
					<input type="button" id="btn" class="btn btn-default" value="사용하기">
				</c:if>
				<c:if test="${result eq '2'}">
					<h4>${param.id}는사용할 수 없습니다</h4>
				</c:if>
				<button class="btn btn-default">중복확인</button>
			</form>
		</div>
	</div>

</body>
</html>