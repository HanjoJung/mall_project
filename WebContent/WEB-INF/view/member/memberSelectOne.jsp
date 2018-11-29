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
	src="${pageContext.request.contextPath}/js/memberinit.js"></script>
<style type="text/css">
.labeli {
	display: table-cell;
	vertical-align: middle;
	font-size: 13px;
	line-height: 20px;
	cursor: pointer;
	list-style: none;
	font-family: "Helvetica LT W01 Roman", "Apple SD Gothic Neo",
		"Noto Sans KR", "Malgun Gothic", "MalgunGothic", Dotum, serif, Arial,
		Helvetica;
	color: #606060;
	font-weight: normal;
}
</style>
<script type="text/javascript">
	function leave() {
		var leave = confirm("정말 탈퇴하시겠습니까?");
		if(leave){
			location.href = "./memberDelete.do"
		}
	}
</script>
</head>
<body>
	<c:import url="../../../temp/header.jsp" />

	<section class="wrapper">
		<section class="content-area">
			<article class="contents width-max">
				<div class="customer-title">
					<h2 class="tit">MY PAGE</h2>
				</div>
			</article>

			<article class="contents width-xlarge">
				<div class="customer-wapper min-height_large">
					<div class="customer-aside mypage pc-only">
						<div class="customer-name">
							<span class="ns-mypage icon-user"></span> <span>s</span>
						</div>

						<div class="lnb">
							<h2 class="title m_init">
								<a href="#">회원등급 현황</a>
							</h2>
						</div>

						<div class="lnb">
							<h2 class="title">나의정보</h2>
							<a class="btn-link sky-blue normal" href="#">배송지 관리<i
								class="icon-arrow_right right"></i></a> <a
								class="btn-link sky-blue normal" href="./memberSelectOne.do">회원정보
								관리<i class="icon-arrow_right right"></i>
							</a> <a class="btn-link sky-blue normal" onclick="leave()">회원탈퇴<i
								class="icon-arrow_right right"></i></a>
						</div>

						<div class="lnb">
							<h2 class="title">고객센터</h2>
							<a href="#" class="btn-link sky-blue normal">1:1 E-mail 문의<i
								class="icon-arrow_right right"></i>
							</a>
						</div>
						<div class="lnb">
							<h2 class="title">나이키닷컴 고객센터</h2>
							<p class="phone">
								<a href="#">080-022-0182</a>
							</p>
							<p class="txt">월~일: 오전 9시 ~ 오후 8시</p>

						</div>
					</div>

					<div class="customer-contents">
						<div class="customer-update">
							<h2 class="title">
								<span class="label" style="padding: 0px;">회원정보 수정</span>
							</h2>

							<div data-module-dynamicform="">
								<div class="uk-grid">
									<div class="uk-width-medium-1-2 uk-width-small-1-1">
										<div class="dynamic-form" data-form="">
											<form method="POST" class="uk-form-large"
												action="./memberUpdate.do">
												<div class="uk-form-row">
													<label class="uk-form-label">아이디</label>
													<div class="input-textfield width-max disabled value">
														<input type="text" id="id" name="id" readonly="readonly"
															value="${member.id}">
													</div>
												</div>

												<div class="uk-form-row">
													<label class="uk-form-label">패스워드</label>
													<div class="input-textfield width-max value">
														<input class="data" type="password"
															autocomplete="new-password"
															data-parsley-message="영문/숫자/특수문자 조합 8~16자 조합으로 입력해주세요."
															data-parsley-pattern="^(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9])(?=.*[0-9]).{8,16}$"
															data-parsley-required-message="필수 입력 항목입니다."
															placeholder="영문+숫자+특수문자 조합 8~16자리 이내" id="pw1" name="pw1" />
														<span class="error-message filled"></span>
													</div>
												</div>

												<div class="uk-form-row">
													<label class="uk-form-label">패스워드 확인</label>
													<div class="input-textfield width-max value">
														<label for="username"></label> <input class="data"
															type="password" autocomplete="new-password"
															data-parsley-equalto-message="입력값이 일치하지 않습니다."
															data-parsley-message="영문/숫자/특수문자 조합 8~16자 조합으로 입력해주세요."
															data-parsley-pattern="^(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9])(?=.*[0-9]).{8,16}$"
															data-parsley-required-message="필수 입력 항목입니다."
															placeholder="패스워드를 다시 입력해 주세요." id="pw2" name="pw2" /> <span
															class="error-message filled"></span>
													</div>
												</div>

												<div class="uk-form-row">
													<label class="uk-form-label">이름</label>
													<div class="input-textfield width-max value">
														<input class="data" type="text"
															data-parsley-required-message="필수 입력 항목입니다."
															id="firstName" name="firstName" value="${member.name}"><span
															class="error-message filled"></span>
													</div>
												</div>

												<div class="uk-form-row">
													<label class="uk-form-label">휴대폰</label>
													<div class="input-textfield width-max value">
														<input class="data" type="text"
															data-parsley-pattern="^[0-9]*$"
															data-parsley-required-message="필수 입력 항목입니다."
															data-parsley-type-message="숫자만 입력 가능합니다."
															placeholder="휴대폰 번호 &#39;-&#39;표 없이 입력해 주세요." id="phone"
															name="phone" value="${member.phone}"><span
															class="error-message filled"></span>
													</div>
												</div>

												<div class="uk-form-row">
													<label class="uk-form-label">주소</label>
													<div class="input-textfield width-max disabled value">
														<input type="email" readonly="readonly"
															value="${member.address}" placeholder="상품 주문시 입력">
													</div>
												</div>

												<div class="uk-form-row">
													<label class="uk-form-label"></label>
													<div class="input-form-group">
														<span class="input-checkbox"> <input
															type="checkbox"> <label for="receiveEmail">
																<i class="brz-icon-checkbox">rediobox</i> <span
																class="labeli">이메일을 통한 상품 및 이벤트 정보 수신에 동의합니다.(선택)</span>
														</label>
														</span>
													</div>
												</div>

												<div class="uk-form-row">
													<label class="uk-form-label"></label>
													<div class="input-form-group">
														<span class="input-checkbox"> <input
															type="checkbox" data-parsley-required="false"
															data-parsley-required-message="필수 입력 항목입니다."> <label>
																<i class="brz-icon-checkbox">rediobox</i> <span
																class="labeli">휴대폰을 통한 상품 및 할인쿠폰 등의 정보 수신에
																	동의합니다.(선택)</span>
														</label>
														</span>
													</div>
												</div>
											</form>
										</div>
									</div>
								</div>

								<div class="uk-grid uk-margin-large-top">
									<div class="uk-width-medium-1-2 uk-width-small-1-1">
										<button class="button xlarge width-max" type="submit"
											onclick="$('.uk-form-large').submit()">수정하기</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</article>
		</section>
	</section>
	<c:import url="../../../temp/footer.jsp" />
</body>
</html>