<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<c:import url="../../../temp/bootStrap.jsp" />
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
								<a href="/kr/ko_kr/account/grade">회원등급 현황</a>
							</h2>
						</div>

						<div class="lnb">
							<h2 class="title">나의정보</h2>
							<a class="btn-link sky-blue normal" data-click-area="Mypagenav"
								data-click-name="Address Setting"
								href="/kr/ko_kr/account/addresses">배송지 관리<i
								class="icon-arrow_right right"></i></a> <a
								class="btn-link sky-blue normal" data-click-area="Mypagenav"
								data-click-name="Account Settting" href="/kr/ko_kr/account">회원정보
								관리<i class="icon-arrow_right right"></i>
							</a> <a class="btn-link sky-blue normal" data-click-area="Mypagenav"
								data-click-name="Change Password"
								href="/kr/ko_kr/account/password">비밀번호 변경<i
								class="icon-arrow_right right"></i></a> <a
								class="btn-link sky-blue normal" data-click-area="Mypagenav"
								data-click-name="Withdrawal" href="/kr/ko_kr/withdrawal">회원탈퇴<i
								class="icon-arrow_right right"></i></a>
						</div>

						<div class="lnb">
							<h2 class="title">고객센터</h2>
							<a href="https://nike-breeze.zendesk.com/hc/ko/requests/new"
								class="btn-link sky-blue normal" data-click-area="Mypagenav"
								data-click-name="Email inquiry" target="_blank">1:1 E-mail
								문의<i class="icon-arrow_right right"></i>
							</a>
						</div>
						<div class="lnb">
							<h2 class="title">나이키닷컴 고객센터</h2>
							<p class="phone">
								<a href="tel:080-022-0182">080-022-0182</a>
							</p>
							<p class="txt">월~일: 오전 9시 ~ 오후 8시</p>

						</div>
					</div>










					<div class="customer-contents">
						<h2 class="customer-location">
							회원정보 수정<a href="/kr/ko_kr/mypage"><i class="icon-arrow_left"></i></a>
						</h2>
						<div class="customer-update">
							<h2 class="title">
								<span class="label">회원정보 수정</span>
							</h2>







							<div data-module-dynamicform="">

								<div class="uk-grid">
									<div class="uk-width-medium-1-2 uk-width-small-1-1">

										<div class="dynamic-form" data-form="">




											<div class="uk-alert uk-alert-danger" id="jq_uk-alert-danger"
												style="display: none;">
												<div>이메일 혹은 비밀번호가 잘못 입력되었습니다.</div>
											</div>







											<form method="POST" class="uk-form-large"
												action="/kr/ko_kr/account" novalidate="">
												<input type="hidden" name="locale" value="ko_KR"> <input
													type="hidden" name="dynamicForm" value="updateCustomer">
												<input type="hidden" name="templatePath"
													value="/authentication/registerSuccess"> <input
													type="hidden" name="successUrl"
													value="/updateAccountSuccess"> <input type="hidden"
													name="userId" value="">



												<div class="uk-form-row">

													<label class="uk-form-label">아이디</label>
													<div class="input-textfield width-max  disabled value"
														data-component-textfield="">
														<label for="username"></label> <input type="text"
															data-parsley-trigger="keyup"
															data-parsley-required-message="필수 입력 항목입니다."
															data-parsley-equalto-message="입력값이 일치하지 않습니다."
															data-parsley-required="false" id="username"
															name="username" readonly="readonly"
															value="gkffndnl123@naver.com">

													</div>



												</div>


												<div class="uk-form-row">

													<label class="uk-form-label">이름</label>
													<div class="input-textfield width-max  disabled value"
														data-component-textfield="">
														<label for="firstName"></label> <input type="text"
															data-parsley-trigger="keyup"
															data-parsley-required-message="필수 입력 항목입니다."
															data-parsley-equalto-message="입력값이 일치하지 않습니다."
															data-parsley-required="true" id="firstName"
															name="firstName" readonly="readonly" value="s">

													</div>



												</div>


												<div class="uk-form-row">

													<label class="uk-form-label">이메일</label>
													<div class="input-textfield width-max  disabled value"
														data-component-textfield="">
														<label for="emailAddress"></label> <input type="email"
															data-parsley-trigger="keyup"
															data-parsley-equalto-message="입력값이 일치하지 않습니다."
															data-parsley-required="true"
															data-parsley-type-message="Validation_pattern_email_CUSTOMER_MODIFY"
															data-parsley-type="email"
															data-parsley-required-message="필수 입력 항목입니다."
															id="emailAddress" name="emailAddress" readonly="readonly"
															value="gkffndnl123@naver.com">

													</div>



												</div>


												<div class="uk-form-row">

													<label class="uk-form-label">휴대폰</label>
													<div class="input-textfield width-max  disabled value"
														data-component-textfield="">
														<label for="phone"></label> <input type="text"
															data-parsley-trigger="keyup"
															data-parsley-pattern="^[0-9]*$"
															data-parsley-required-message="필수 입력 항목입니다."
															data-parsley-equalto-message="입력값이 일치하지 않습니다."
															data-parsley-required="true"
															data-parsley-type-message="숫자만 입력 가능합니다."
															data-parsley-pattern-message="숫자만 입력 가능합니다." id="phone"
															name="phone" readonly="readonly" value="12">

													</div>



													<!-- 이용약관 -->


												</div>


												<div class="uk-form-row">

													<label class="uk-form-label"></label>
													<div class="input-form-group">


														<span class="input-checkbox" data-component-checkbox="">
															<input type="checkbox" data-parsley-required="false"
															data-parsley-required-message="필수 입력 항목입니다."
															id="receiveEmail" name="receiveEmail"
															data-parsley-multiple="receiveEmail"> <label
															for="receiveEmail"> <i class="brz-icon-checkbox">rediobox</i>
																<span class="label">이메일을 통한 상품 및 이벤트 정보 수신에
																	동의합니다.(선택)</span>
														</label>
														</span> <input type="hidden" value="off" name="receiveEmail">
													</div>




												</div>


												<div class="uk-form-row">

													<label class="uk-form-label"></label>
													<div class="input-form-group">


														<span class="input-checkbox" data-component-checkbox="">
															<input type="checkbox" data-parsley-required="false"
															data-parsley-required-message="필수 입력 항목입니다."
															name="ATTRIBUTE@smsAgree"
															data-parsley-multiple="ATTRIBUTE@smsAgree"> <label>
																<i class="brz-icon-checkbox">rediobox</i> <span
																class="label">휴대폰을 통한 상품 및 할인쿠폰 등의 정보 수신에
																	동의합니다.(선택)</span>
														</label>
														</span> <input type="hidden" value="off"
															name="ATTRIBUTE@smsAgree">
													</div>




												</div>


												<input type="hidden" name="csrfToken"
													value="OS3K-VM0Z-FKUB-BF5W-ZOV1-LI4W-MYZR-Q4HO">
											</form>
										</div>



									</div>
								</div>


								<div class="uk-grid uk-margin-large-top">
									<div class="uk-width-medium-1-2 uk-width-small-1-1">
										<button class="button xlarge width-max" type="submit"
											data-endpoint-type="updateProfile"
											data-endpoint-value="personal info">수정하기</button>
									</div>
								</div>

							</div>
						</div>
					</div>
				</div>
			</article>
		</section>
	</section>






	<div class="container-fluid wrapper">
		<div class="row" align="center">
			<table class="table table-hover" style="max-width: 1500px">
				<tr>
					<td width="5%"></td>
					<td width="10%">ID</td>
					<td width="10%">이름</td>
					<td width="10%">연락처</td>
					<td width="30%">주소</td>
					<td width="10%">가입날짜</td>
					<td width="10%">kakao</td>
					<td width="10%">facebook</td>
					<td width="5%"></td>
				</tr>
				<tr>
					<td width="5%"></td>
					<td>${member.id}</td>
					<td>${member.name}</td>
					<td>${member.phone}</td>
					<td>${member.address}</td>
					<td>${member.join_date}</td>
					<td>${member.kakaoID}</td>
					<td>${member.facebookID}</td>
					<td width="5%"></td>
				</tr>

			</table>
			<a href="../index.jsp">
				<button class="btn btn-default">홈으로</button>
			</a> <a href="./memberUpdate.do?id=${member.id}">
				<button class="btn btn-default">수정</button>
			</a> <a href="./memberDelete.do?id=${member.id}">
				<button class="btn btn-default">탈퇴</button>
			</a>
		</div>
	</div>
	<c:import url="../../../temp/footer.jsp" />
</body>
</html>