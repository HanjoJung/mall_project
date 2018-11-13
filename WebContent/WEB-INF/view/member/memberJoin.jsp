<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<c:import url="../../../temp/bootStrap.jsp" />
<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/memberInput.js"></script>
<link href="${pageContext.request.contextPath}/css/member.css"
	rel="stylesheet" type="text/css">
</head>
<body>
	<c:import url="../../../temp/header.jsp" />
	<section class="wrapper">
		<div class="content-area">
			<div class="uk-width-1-1 uk-margin-xlarge-top">
				<div class="login-wrap width-small">
					<div class="header uk-text-center">
						<h2 class="title">회원가입</h2>
					</div>
					<div class="body">
						<div class="uk-grid">
							<div class="uk-width-1-1 dynamic-form-register">
								<div class="dynamic-form">
									<form action="./memberJoin.do" method="post"
										enctype="multipart/form-data" name="frm" id="frm">
										<input type="hidden" value="f" id="idCheck" name="idCheck">

										<div class="uk-form-row">
											<div class="input-textfield width-max">
												<input type="email" class="form-control" id="id"
													placeholder="사용하실 ID를 입력해주세요. (수신 가능 E-mail)" name="id">
												<!-- <input type="button" id="btn" class="btn btn-default"
													value="중복확인"> -->
												<span></span>
											</div>
										</div>
										<div class="uk-form-row">
											<div class="input-textfield width-max">
												<input type="password" class="form-control" id="pw1"
													placeholder="영문+숫자+특수문자 조합 8~16자리 이내" name="pw1">
											</div>
										</div>
										<div class="uk-form-row">
											<div class="input-textfield width-max">
												<input type="password" class="form-control" id="pw2"
													placeholder="패스워드를 다시 입력해 주세요." name="pw2"> <span></span>
											</div>
										</div>
										<div class="uk-form-row">
											<div class="input-textfield width-max">
												<input type="text" class="form-control" id="name"
													placeholder="이름을 입력해 주세요." name="name"> <span></span>
											</div>
										</div>
										<div class="uk-form-row">
											<div class="input-textfield width-max">
												<input type="text" class="form-control" id="phone"
													placeholder="휴대폰 번호 '-'표 없이 입력해 주세요." name="phone">
												<span></span>
											</div>
										</div>
										<!-- 이용약관 -->
										<div class="register-terms">
											<div class="agree">
												<div class="uk-grid">
													<h6 class="uk-width-1-2 tit">이용약관</h6>
													<a href="../cscenter/policy.do" target="_blank"
														class="uk-width-1-2 uk-text-right btn-agree-allview">전문보기</a>
												</div>
												<div class="uk-grid uk-margin-top-remove">
													<div class="uk-width-1-1">
														<div class="scroll-box agree-content"></div>
													</div>
												</div>
												<div class="uk-width-1-1 agree-test">
													<span id="checkTerms" class="input-checkbox uk-width-1-1">
														<input type="checkbox" id="checkGcAgree"
														name="checkGcAgree"> <label for="checkGcAgree">
															<i class="brz-icon-checkbox"> </i><span
															class="label font-normal">[필수] 약관에 동의 합니다.</span>
													</label>
													</span>
												</div>
											</div>
										</div>




										<input type="button" class="btn btn-default" value="가입 "
											id="join">
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
	<c:import url="../../../temp/footer.jsp" />
</body>
</html>