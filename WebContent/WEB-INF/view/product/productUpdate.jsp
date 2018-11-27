<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>

<c:import url="../../../temp/bootStrap.jsp" />
<link href="/mall_project/css/common.css" rel="stylesheet"
	type="text/css">
<script src="https://cdn.ckeditor.com/4.10.1/standard/ckeditor.js"></script>
<script type="text/javascript">
$(function() {
	$("#btn").click(function() {
		var title = $("#name").val();
		if (title != "") {
			$("#frm").submit();
		} else {
			alert("상품명을 입력하세요");
		}
	});
	
	
	
})
</script>
</head>
<body id="myPage" data-spy="scroll" data-target=".navbar"
	data-offset="60">
	<c:import url="../../../temp/header.jsp" />

	<div class="container-fluid wrapper">
		<div class="row" style="padding: 30px;">
			<form id="frm" action="./${board}Update.do" method="post"
				enctype="multipart/form-data">
				<div class="form-group">
					<label for="writer">멤버:</label> <input type="text"
						class="form-control" id="writer" name="writer"
						value="${member.id}" readonly="readonly">
				</div>
				<div class="form-group">
					<label for="productCode">상품코드:</label> <input type="hidden"
						class="form-control" id="code" name="code" value="${pDTO.productCode}">
				</div>
				<div class="form-group">
					<label for="productName">상품명:</label> <input type="text"
						class="form-control" id="name" name="name" value="${pDTO.productName}">
				</div>
				<div class="form-group">
					<label for="kind">종류:</label> <input type="text"
						class="form-control" id="kind" name="kind" value="${pDTO.kind}">
				</div>
				<div class="form-group">
					<label for="price">가격:</label> <input type="text"
						class="form-control" id="price" name="price" value="${pDTO.price}">
				</div>
			
				<div class="form-group">
					<label for="manufacturerCode">사이즈:</label> 
						<select class="form-control" id="sizemin" name="sizemin" style="display: inline; width: 10%">
						<c:forEach begin="240" end="280" step="5" var="i">
						<option>${i}</option>
						</c:forEach>
						</select>
						~
						<select class="form-control" id="sizemin" name="sizemax" style="display: inline; width: 10%">
						<c:forEach begin="0" end="50" step="5" var="i">
						<option>${330-i}</option>
						</c:forEach>
						</select>
						<br>
				</div>

				<div class="form-group">
				<c:forEach items="${ar}" var="upload" varStatus="i">
					<label for="file">File:</label> 
					
					<input type="file"
						class="form-control" id="file" name="fname${i.index}">
				</c:forEach>
					
				</div>

				<div class="form-group">
					<label for="contents">내용:</label>
					<textarea rows="15" cols="" class="form-control" name="contents">${pDTO.contents}</textarea>
				</div>


				<script>
					CKEDITOR.replace('contents');
				</script>

				<input type="button" id="btn"
					class="btn-link width-max xlarge btn-cart addcart-btn" value="등록">
			</form>
		</div>
	</div>


	<c:import url="../../../temp/footer.jsp" />

</body>
</html>