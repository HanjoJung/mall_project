<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%><!DOCTYPE html>
<script src="/mall_project/js/kakaoLogin.js"></script>

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

						var userID = res.id; //유저의 카카오톡 고유 id
						var userEmail = res.kaccount_email; //유저의 이메일
						var userNickName = res.properties.nickname; //유저가 등록한 별명
						var thumbnail_image = res.properties.thumbnail_image; //유저가 프로필 이미지 
					
						
						$.ajax({
							url : "${pageContext.request.contextPath}/ajax/memberCheckId.do",
							type : "POST",
							data : {
								id : userEmail
							},
							async: false,
							success : function(data) {
								data = data.trim();
								if (data == '1') {
									$.ajax({
										url : "${pageContext.request.contextPath}/ajax/memberJoin.do",
										type : "GET",
										data : {
											id : userEmail,
											name : userNickName,
											fname : thumbnail_image,
											snsid : userID
										},
										async: false, 
										success : function() {
											var url = "${pageContext.request.contextPath}/member/memberJoin.do?id="+userEmail+"&snsid="+userID
											location.href = url;
										}
									})
								}
							},
							error : function() {
								alert("error 발생");
							},
							/* complete : function() {
								
								$.ajax({
									url : "${pageContext.request.contextPath}/ajax/memberLogin.do",
									type : "POST",
									data : {
										id : userEmail+"("+userID+")",
										pw : userID/2,
										name : userNickName,
										fname : thumbnail_image
									},
									async: false,
									success : function(data) {
										location.reload();
									}
								})
							} */
						}); 
						
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
