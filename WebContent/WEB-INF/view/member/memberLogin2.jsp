<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>쇼핑몰 프로젝트</title>
<jsp:include page="../../../temp/bootStrap.jsp"></jsp:include>
<link href="/mall_project/css/index.css" rel="stylesheet"
	type="text/css">
</head>
<meta charset="utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="viewport"
	content="user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, width=device-width" />
<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/memberinit.js"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/facebook.js"></script>
<script type="text/javascript">
	$(function() {
		$.get("${pageContext.request.contextPath}/ajax/kakaoLogin.do",
				function(data) {
					$("#kakao").html(data);
				})
		$("#btn").click(function() {
			$.ajax({
				url : "${pageContext.request.contextPath}/ajax/memberLogin.do",
				type : "POST",
				data : {
					id : $("#id").val(),
					pw : $("#pw1").val()
				},
				success : function(data) {
					data.trim();
					if (data == 1) {
						$("#jq_uk-alert-danger").css({
							display : "block"
						})
					} else {
						location.reload();
					}
				}
			})
		})
	})
</script>
<body>
	<jsp:include page="../../../temp/header.jsp"></jsp:include>

	<div class="container-fluid wrapper content-container">
		<div class="uk-width-1-1 uk-margin-xlarge-top">
			<div class="login-wrap width-small">
				<div class="header uk-text-center">
					<span class="ns-swoosh"></span>
					<h2 class="title">나이키 로그인</h2>
				</div>
				<div class="body">
					<div class="uk-grid">
						<div class="uk-width-1-1">
							<div class="dynamic-form">
								<div class="uk-alert uk-alert-danger" id="jq_uk-alert-danger"
									style="display: none;">이메일 혹은 비밀번호가 잘못 입력되었습니다.</div>
								<form method="POST" class="uk-form-large" action="">
									<div class="uk-form-row">
										<div class="input-textfield width-max">
											<input class="data" type="email"
												data-parsley-required-message="필수 입력 항목입니다."
												placeholder="아이디" id="id" name="id" /> <span
												class="error-message filled"></span>
										</div>
									</div>

									<div class="uk-form-row">
										<div class="input-textfield width-max">
											<input class="data" type="password"
												autocomplete="new-password"
												data-parsley-required-message="필수 입력 항목입니다." id="pw1"
												placeholder="비밀번호" id="pw" name="pw" /> <span
												class="error-message filled"></span>
										</div>
									</div>
									<div class="uk-form-row">
										<div class="input-form-group">
											<span class="input-checkbox checked"> <input
												type="checkbox" id="breeze-me" name="receiveEmail" /> <label
												for="breeze-me"> <i class="brz-icon-checkbox">rediobox</i>
													<span class="label">로그인 유지하기</span>
											</label>
											</span> <input type="hidden" value="off" name="breeze-me">
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>

					<div class="uk-grid login_btn_line">
						<div class="uk-width-1-1">
							<button class="button large width-max" id="btn" value="로그인">로그인</button>
						</div>
					</div>
				</div>
				<div class="social-login-container">
					<div class="uk-grid social_wrap" data-module-social-login>
						<div class="uk-width-1-1 uk-width-medium-1-1"></div>
						<div class="uk-width-1-1 uk-width-medium-1-1" id="kakao"></div>
					</div>
				</div>
				<div class="footer uk-clearfix">
					<div class="join_line">
						<span class="log_txt01">회원이 아니신가요?</span> <a
							href="${pageContext.request.contextPath}/member/memberJoin.do">회원가입</a>
					</div>
					<div class="search_line">
						<a class="find_log_acc">비밀번호를 잊으셨습니까?</a> <a>비회원 주문 조회</a>
					</div>
				</div>
			</div>
		</div>
	</div>
	<jsp:include page="../../../temp/footer.jsp"></jsp:include>
</body>
</html>
