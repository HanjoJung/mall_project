<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script>
	window.fbAsyncInit = function() {
		FB.init({
			appId : '258476371506098',
			xfbml : true,
			version : 'v3.2'
		});
		FB.AppEvents.logPageView();
	};

	(function(d, s, id) {
		var js, fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) {
			return;
		}
		js = d.createElement(s);
		js.id = id;
		js.src = "https://connect.facebook.net/ko_KR/sdk.js";
		fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));
</script>
<script type="text/javascript">
	$(function() {
		$("#btn").click(function() {
			FB.login(function(response) {
			}, {scope: 'email',
				auth_type: 'rerequest'});
			
			FB.getLoginStatus(function(response) {
				FB.api("/me?fields=id,name,email", function(response) {
					if (response && !response.error) {
						console.log(response.id);
						console.log(response.name);
						console.log(response.email);
					}
				});
			});
		})
	})
</script>
</head>
<body>
	<button id="btn">btn</button>
</body>
</html>