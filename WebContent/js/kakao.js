				
// 사용할 앱의 JavaScript 키를 설정해 주세요.
Kakao.init('a7faf288e5a8465c117a4a09197eca5a');
// 카카오 로그인 버튼을 생성합니다.
Kakao.Auth.createLoginButton({
	container : '#kakao-login-btn',
	success : function(authObj) {
		Kakao.API.request({
			url : '/v1/user/me',
			success : function(res) {
				console.log(res);

				var userID = res.id; // 유저의 카카오톡 고유 id
				var userEmail = res.kaccount_email; // 유저의 이메일
				var userNickName = res.properties.nickname; // 유저가 등록한 별명

				console.log(userID);
				console.log(userEmail);
				console.log(userNickName);
			},
			fail : function(error) {
				alert(JSON.stringify(error));
			}
		});

	},
	fail : function(err) {
		alert(JSON.stringify(err));
	}
});