<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<jsp:include page="../../../temp/bootStrap.jsp"></jsp:include>
<script src="https://cdn.ckeditor.com/4.10.1/standard/ckeditor.js"></script>
<script type="text/javascript">
$(function() {
	var count = 1;
	var index = 0;
	$("#file_btn").click(function() {
		var file = document.getElementById("file")
		if(count<6){
			var r = '<div class="form-group" id="f'+index+'">';
			r = r+'<input type="file" class="form-control" id="file" name="f'+index+'">';
			r = r+'<span class="remove"style="color:red;" title="'+index+'">X</span>'; 
			r = r+'</div>';
			$("#file").append(r);
				//file.innerHTML += r;
				count++;
				index++;
		} else {
			alert("파일은 5개까지만 등록 가능합니다");
		}
	})
		$("#file").on("click", ".remove", function() {
			var t = $(this).attr("title");
			$("#f"+t).remove();
			count--;
		});

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

	<jsp:include page="../../../temp/header.jsp"></jsp:include>

	<div class="container-fluid">
		<div class="row">
			<form id="frm" action="./${board}Write.do" method="post"
				enctype="multipart/form-data">
				<div class="form-group">
					<label for="title">Title:</label> <input type="text"
						class="form-control" id="title" placeholder="Enter Title"
						name="title">
				</div>
				<div class="form-group">
					<label for="writer">Writer:</label> <input type="text"
						class="form-control" id="writer" readonly="readonly"
						value="${member.id}" name="writer">
				</div>
				
				<div class="form-group">
					<label for="contents">Contents:</label>
					<textarea rows="15" cols="" class="form-control" name="contents"></textarea>
				</div>

				<script>
					CKEDITOR.replace('contents');
				</script>
				
				<input id="file_btn" type="button" value="추가"
					class="btn btn-default">
				<div class="files" id="file"></div>

				<input type="button" id="btn" class="btn btn-default" value="등록">
			</form>
		</div>
	</div>


	<jsp:include page="../../../temp/footer.jsp"></jsp:include>

</body>
</html>