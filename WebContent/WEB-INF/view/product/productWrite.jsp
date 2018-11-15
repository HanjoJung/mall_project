<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>

<c:import url="../../../temp/bootStrap.jsp" />
<script src="https://cdn.ckeditor.com/4.10.1/standard/ckeditor.js"></script>
<script type="text/javascript">
$(function() {
	$("#btn").click(function() {
		var title = $("#title").val();
		if (title != "") {
			$("#frm").submit();
		} else {
			alert("제목을 입력하세요");
		}
	})
})
</script>
</head>
<body id="myPage" data-spy="scroll" data-target=".navbar"
	data-offset="60">
<c:import url="../../../temp/header.jsp" />

	<div class="container-fluid wrapper">
		<div class="row">
			<form id="frm" action="./${board}Write.do" method="post"
				enctype="multipart/form-data">
				<div class="form-group">
					<label for="writer">멤버:</label> <input type="text"
						class="form-control" id="writer" 
						 name="writer" value="${member.id}" readonly="readonly">
				</div>
			<!-- 	<div class="form-group">
					<label for="productCode">상품코드:</label> <input type="text"
						class="form-control" id="code" placeholder="Enter code"
						name="code">
				</div> -->
				<div class="form-group">
					<label for="productName">삼품명:</label> <input type="text"
						class="form-control" id="name" 
						 name="name">
				</div>
				<div class="form-group">
					<label for="kind">종류:</label> <input type="text"
						class="form-control" id="kind" 
						 name="kind">
				</div>
				<div class="form-group">
					<label for="price">가격:</label> <input type="text"
						class="form-control" id="price" 
						 name="price">
				</div>
				<div class="form-group">
					<label for="manufacturerCode">제조사:</label> <input type="text"
						class="form-control" id="mCode" 
						 name="mCode">
				</div>
				<!-- <div class="form-group">
					<label for="fname">사진:</label> <input type="file"
						class="form-control" id="fname" 
						 name="fname">
				</div> -->
				
				<div class="form-group">
					<label for="contents">내용:</label>
					<textarea rows="15" cols="" class="form-control" name="contents"></textarea>
				</div>
				

				<script>
					CKEDITOR.replace('contents');
				</script>
		
				<input type="button" id="btn" class="btn btn-default" value="등록">
			</form>
		</div>
	</div>


	<c:import url="../../../temp/footer.jsp" />

</body>
</html>