<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%><!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="viewport"
	content="user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, width=device-width" />
<title>Login Demo - Kakao JavaScript SDK</title>
<script src="//developers.kakao.com/sdk/js/kakao.min.js"></script>

</head>
<body>
	<a id="kakao-login-btn"></a>
	<a href="http://developers.kakao.com/logout"></a>
	<script type='text/javascript'>
    // 사용할 앱의 JavaScript 키를 설정해 주세요.
    Kakao.init('a7faf288e5a8465c117a4a09197eca5a');
    // 카카오 로그인 버튼을 생성합니다.
    Kakao.Auth.createLoginButton({
      container: '#kakao-login-btn',
      success: function(authObj) {
			Kakao.API.request({
			url: '/v1/user/me',
			success: function(res) {
				console.log(res);
				
				var userID = res.id;						//유저의 카카오톡 고유 id
				var userEmail = res.kaccount_email;			//유저의 이메일
				var userNickName = res.properties.nickname;	//유저가 등록한 별명
				
				console.log(userID);
				console.log(userEmail);
				console.log(userNickName);
			},
			fail: function(error) {
				alert(JSON.stringify(error));
			}
		});


      },
      fail: function(err) {
         alert(JSON.stringify(err));
      }
    });

</script>

</body>
</html>