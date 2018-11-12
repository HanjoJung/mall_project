<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<c:import url="../../../temp/bootStrap.jsp" />
<script type="text/javascript">

</script>
</head>
<c:import url="../../../temp/header.jsp" />
<body id="myPage" data-spy="scroll" data-target=".navbar" data-offset="60">
<div class="containor-fluid">
	<div class="row">
		<h1>${board}Update</h1>
	</div>
	
	<div class="row">
		<form action="./${board}Update.do" method="post" enctype="multipart/form-data">
			<input type="hidden" name="num" value="${dto.num}">
				<div class="form-group">
					<label for="title">Title:</label>
					<input type="text" value="${dto.title}" class="form-control" 
					value="${dto.writer}" class="form-control" id="title"
					placeholder="Enter Title" name="title"> 
				</div>
				<div class="form-group">
					<label for="writer">Writer:</label>
					<input type="text" value="${dto.writer}" class="form-control" disabled="disabled"
					value="${dto.writer}" id="writer" placeholder="Enter Writer" name="writer">
				</div>
				<div class="form-group">
					<label for="contents"></label>
					<textarea rows="25"	cols="" class="form-control" name="contents">${dto.contents}</textarea>
				</div>
				<button type="submit" class="btn btn-default">Write</button>
		</form>
	</div>
</div>
<c:import url="../../../temp/footer.jsp"></c:import>
</body>
</html>