<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%><!DOCTYPE html>
<script src="/mall_project/js/kakao.js"></script>

<div class="uk-width-1-1 uk-width-medium-1-1"></div>
<a id="custom-login-btn" class="btn-link line large btn-kakao"
	href="javascript:loginWithKakao()"> <i class="icon-kakaotalk"></i>
	<span class="txt">카카오계정 로그인</span>
</a>
<script>
	// 사용할 앱의 JavaScript 키를 설정해 주세요.
	Kakao.init('a7faf288e5a8465c117a4a09197eca5a');
	// 카카오 로그인 버튼을 생성합니다.

	function loginWithKakao() {
		// 로그인 창을 띄웁니다.
		Kakao.Auth.login({
			success : function(authObj) {
				Kakao.API.request({
					url : '/v1/user/me',
					success : function(res) {
						console.log(res);

						var userID = res.id; //유저의 카카오톡 고유 id
						var userEmail = res.kaccount_email; //유저의 이메일
						var userEmail_verified = res.Kaccount_email_verified; //유저의 이메일
						var userNickName = res.properties.nickname; //유저가 등록한 별명
						console.log(userID);
						console.log(userEmail);
						console.log(userEmail_verified);
						console.log(userNickName);
						var profile_image = res.properties.profile_image; //유저가 프로필 이미지 
						console.log(profile_image);
						var thumbnail_image = res.properties.thumbnail_image; //유저가 프로필 이미지 
						console.log(thumbnail_image);
						//var email = res.kakao_account.email; //유저 이메일 소유여부
						//console.log(email);
						//var age_range = res.kakao_account.age_range	; //유저 연령대 값
						//console.log(age_range);
						//var birthday = res.kakao_account.birthday	; //유저 생일 값
						//console.log(birthday);
						//var gender = res.kakao_account.gender	; //유저 성별 값
						//console.log(gender);

					},
					fail : function(error) {
						alert("사용자 정보를 불러들이는데 실패하였습니다");
					}
				});
			},
			fail : function(err) {
				alert("로그인에 실패하였습니다");
			}
		});
	};
</script>
