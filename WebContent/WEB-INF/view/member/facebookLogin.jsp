<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

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

$(function() {
	$("#facebook").click(function facebookLogin() {
		FB.login(function(response) {
		}, {scope: 'email',
			auth_type: 'rerequest'});
		
		FB.getLoginStatus(function(response) {
			FB.api("/me?fields=id,name,email", function(response) {
				if (response && !response.error) {
					sns = "facebook"
					userID = response.id;
					userName = response.name;
					userEmail = response.email;
					
					$.ajax({
						url : "${pageContext.request.contextPath}/member/memberCheckId.do",
						type : "POST",
						data : {
							id : userEmail
								},
						success : function(data) {
							data = data.trim();
							if (data == '1') {
							var url = "${pageContext.request.contextPath}/member/snsLogin.do?id=" + userEmail
								+ "&snsid=" + userID
								+ "&name=" + userName 
								+ "&sns=" + sns;
								location.href = url;
							} else {
								$.ajax({
									url : "${pageContext.request.contextPath}/member/memberCheckSns.do",
									type : "POST",
									data : {
										snsid : userID,
										sns : sns
									},
									success : function(data) {
										if(data == '1'){
											location.href = "${pageContext.request.contextPath}/member/snsLogin."
											+ "do?sns="+sns+"&snsid="+userID+"&name="+userName+"&id="+userEmail;
										}else{
											$.ajax({
												url : "${pageContext.request.contextPath}/member/memberLogin.do",
												type : "POST",
												data : {
													id : userEmail,
													snsid : userID,
													name : userName,
													sns : sns
												},
												success : function(data) {
													location.reload();
												}
											})
										}
									}
								})
							}
						},
						error : function() {
							console.log("error 발생");
						}
					});
				}
			});
		});
	})
})
</script>
<a class="btn-link line large btn-facebook"> <i
	class="icon-facebook"></i><span class="txt">페이스북으로 로그인</span>
</a>
