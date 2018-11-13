<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
<div class="container-fluid">
		<div class="row">
			<form action="./memberLogin.do" method="post">
				<div class="form-group">
					<label for="id">ID:</label> <input type="text" class="form-control"
						id="id" placeholder="Enter id" name="id">
				</div>
				<div class="form-group">
					<label for="pw">PASSWORD:</label> <input type="password"
						class="form-control" id="pw" placeholder="Enter password"
						name="pw">
				</div>
				<button type="submit" class="btn btn-default">로그인</button>
			</form>
		</div>
	</div>
</body>
</html>