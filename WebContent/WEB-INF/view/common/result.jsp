<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<script type="text/javascript">
	alert('${message}');
	var sns = "${sns}";
	
	if(sns == ""){
		location.href="${path}";
	}else{
		location.href="${path}?id=${id}&name=${name}&kakaoID=${snsid}&sns${sns}";
	}
</script>
</head>
<body>

</body>
</html>