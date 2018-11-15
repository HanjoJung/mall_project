<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/memberJoin.js"></script>
<button type="button" class="uk-modal-close uk-close"
	data-dismiss="modal"></button>
<div class="login-wrap width-small" data-login="false" data-show="true">
	<div class="header uk-text-center">
		<span class="ns-swoosh"></span>
		<h2 class="title">로그인</h2>
	</div>
	<div class="body">
		<div>
			<div class="uk-grid">
				<div class="uk-width-1-1">
					<div class="dynamic-form" data-form="">
						<!-- <div class="uk-alert uk-alert-danger" id="jq_uk-alert-danger"
							style="display: none;">
							<div>이메일 혹은 비밀번호가 잘못 입력되었습니다.</div>
						</div> -->
						<form method="POST" class="uk-form-large"
							action="${pageContext.request.contextPath}/member/memberLogin.do">
							<!-- <input type="hidden" name="locale" value="ko_KR"> <input
								type="hidden" name="dynamicForm" value="login"> <input
								type="hidden" name="templatePath" value="/authentication/login">
							<input type="hidden" name="userId" value=""> -->
							<div class="uk-form-row">
								<label class="uk-form-label">아이디</label>
								<div class="input-textfield width-max  "
									data-component-textfield="">
									<!-- <label for="j_username">아이디</label> <input type="text"
										data-parsley-trigger="keyup"
										data-parsley-required-message="필수 입력 항목입니다."
										data-parsley-equalto-message="입력값이 일치하지 않습니다."
										data-parsley-required="true"
										data-parsley-type-message="이메일 형식으로 입력해주세요."
										data-parsley-pattern-message="이메일 형식으로 입력해주세요."
										id="j_username" name="j_username" value=""> -->
									<input type="text" class="form-control" id="id"
										placeholder="Enter id" name="id">
								</div>
							</div>
							<div class="uk-form-row">
								<label class="uk-form-label">패스워드</label>
								<div class="input-textfield width-max  "
									data-component-textfield="">
									<!-- <label for="pw"></label> <input  placeholder="Enter password" class="form-control" type="password"
										autocomplete="new-password" data-parsley-trigger="keyup"
										data-parsley-equalto-message="입력값이 일치하지 않습니다."
										data-parsley-required="true"
										data-parsley-pattern-message="영문/숫자/특수문자 조합 8~16자 조합으로 입력해주세요."
										data-parsley-required-message="필수 입력 항목입니다." id="pw"
										name="pw"> -->
									<input type="password" class="form-control" id="pw"
										placeholder="Enter password" name="pw">
								</div>
							</div>
							<div class="uk-form-row">
								<label class="uk-form-label"></label>
								<div class="input-form-group">
									<span class="input-checkbox checked" data-component-checkbox="">
										<input type="checkbox" data-parsley-required="false"
										data-parsley-required-message="필수 입력 항목입니다." id="breeze-me"
										name="breeze-me" checked="checked"> <label
										for="breeze-me"> <i class="brz-icon-checkbox">rediobox</i>
											<span class="label">로그인 유지하기</span>
									</label>
									</span> <input type="hidden" value="off" name="breeze-me">
								</div>
							</div>
							<!-- <input type="hidden" name="csrfToken"
								value="69DM-O1RL-VOS7-3G2Z-O50T-EOM8-C4I9-2WGJ"> -->
							<div class="uk-grid login_btn_line">
								<div class="uk-width-1-1">
									<button class="button large width-max" type="submit">로그인</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- <div class="social-login-container">
		<div class="uk-grid social_wrap" data-module-social-login="">
			<div class="uk-width-1-1 uk-width-medium-1-1">
				<a href="" class="btn-link line large btn-facebook"
					data-social-btn="social_facebook"><i class="icon-facebook"></i><span
					class="txt">페이스북으로 로그인</span></a>
			</div>
			<div class="uk-width-1-1 uk-width-medium-1-1">
				<a href="" class="btn-link line large btn-kakao"
					data-social-btn="social_kakao"><i class="icon-kakaotalk"></i><span
					class="txt">카카오계정 로그인</span></a>
			</div>
			<form name="social_facebook" method="post"
				action="/kr/ko_kr/signin/facebook">
				<input type="hidden" name="scope" value="public_profile,email">
				<input type="hidden" name="csrfToken"
					value="69DM-O1RL-VOS7-3G2Z-O50T-EOM8-C4I9-2WGJ">
			</form>
			<form name="social_kakao" method="post"
				action="/kr/ko_kr/signin/kakao">
				<input type="hidden" name="csrfToken"
					value="69DM-O1RL-VOS7-3G2Z-O50T-EOM8-C4I9-2WGJ">
			</form>
		</div>
	</div> -->
	<div class="footer uk-clearfix">
		<div class="join_line">
			<span class="log_txt01">회원이 아니신가요?</span> <a class=""
				href="${pageContext.request.contextPath}/member/memberJoin.do">회원가입</a>
		</div>
		<div class="search_line">
			<a data-component-forgotpasswordmodal="" class="find_log_acc">비밀번호를
				잊으셨습니까?</a> <a href="#">비회원 주문 조회</a>
		</div>
	</div>
</div>