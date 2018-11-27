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
	
	var count=1;
	var index=0;
	
 	$("#add").click(function() {
		if(count<9){
		var r ='<div class="form-group" id="fname'+index+'">';
		var r = r+'<label for="file">사진:</label>';
		var r = r+'<input type="file" class="form-control" id="file" name="fname'+index+'">';
		var r = r+'<span class="remove" title="'+index+'">X</span>';
		var r = r+'</div>';
		$("#file").append(r);
		count++;
		index++;
		}else{
			alert("파일은 8개가지 가능");
		}
	});
 	
 	$("#file").on("click", ".remove", function () {
		var t = $(this).attr("title");
		$("#fname"+t).remove();
		count--;
	});
	
})
</script>
</head>
<body id="myPage" data-spy="scroll" data-target=".navbar"
	data-offset="60">
	<c:import url="../../../temp/header.jsp" />

	<div class="container-fluid wrapper">
		<div class="row" style="padding: 30px;">
			<form id="frm" action="./${board}Write.do" method="post"
				enctype="multipart/form-data">
				<div class="form-group">
					<label for="writer">멤버:</label> <input type="text"
						class="form-control" id="writer" name="writer"
						value="${member.id}" readonly="readonly">
				</div>
				<!-- 	<div class="form-group">
					<label for="productCode">상품코드:</label> <input type="text"
						class="form-control" id="code" placeholder="Enter code"
						name="code">
				</div> -->
				<div class="form-group">
					<label for="productName">삼품명:</label> <input type="text"
						class="form-control" id="name" name="name">
				</div>
				<div class="form-group">
					<label for="kind">종류:</label> <input type="text"
						class="form-control" id="kind" name="kind">
				</div>
				<div class="form-group">
					<label for="price">가격:</label> <input type="text"
						class="form-control" id="price" name="price">
				</div>
				<div class="form-group">
					<label for="manufacturerCode">제조사:</label> <input type="text"
						class="form-control" id="mCode" name="mCode">
				</div>
				<div class="form-group">
					<label for="manufacturerCode">사이즈:</label> 
						<select class="form-control" id="sizemin" name="sizemin" style="display: inline; width: 10%">
						<c:forEach begin="225" end="280" step="5" var="i">
						<option>${i}</option>
						</c:forEach>
						</select>
						~
						<select class="form-control" id="sizemax" name="sizemax" style="display: inline; width: 10%">
						<c:forEach begin="0" end="50" step="5" var="i">
						<option>${330-i}</option>
						</c:forEach>
						</select>
						<br>
				</div>



				<input class="btn btn-primary" id="add" type="button"
					value="File Add">
				<div class="form-group files" id="file"></div>

				<div class="form-group">
					<label for="contents">내용:</label>
					<textarea rows="15" cols="" class="form-control" name="contents"></textarea>
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