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
</style>
</head>
<body>
	<c:import url="../../../temp/header.jsp" />


	<section class="wrapper">
		<section class="content-area">
			<div class="uk-width-1-1 uk-margin-xlarge-top">
				<div class="login-wrap width-small">
					<div class="header uk-text-center">
						<h2 class="title">회원가입</h2>
					</div>
					<div class="body">

						<div class="uk-grid">
							<div class="uk-width-1-1 dynamic-form-register">
								<div class="dynamic-form" data-form="">

									<form method="POST" class="uk-form-large"
										action="./memberJoin.do">

										<div class="uk-form-row">
											<div class="input-textfield width-max">
												<input class="data" type="email"
													data-parsley-message="이메일 형태로 입력해주세요. 해당 계정으로 주문 내역이 발송됩니다."
													data-parsley-pattern="^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$"
													data-parsley-required-message="필수 입력 항목입니다."
													placeholder="사용하실 ID를 입력해주세요. (수신 가능 E-mail)" id="id"
													name="id" /> <span class="error-message filled"></span>
											</div>
										</div>

										<div class="uk-form-row">
											<div class="input-textfield width-max">
												<input class="data" type="password"
													autocomplete="new-password"
													data-parsley-message="영문/숫자/특수문자 조합 8~16자 조합으로 입력해주세요."
													data-parsley-pattern="^(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9])(?=.*[0-9]).{8,16}$"
													data-parsley-required-message="필수 입력 항목입니다." id="pw1"
													placeholder="영문+숫자+특수문자 조합 8~16자리 이내" id="pw1" name="pw1" />
												<span class="error-message filled"></span>
											</div>
										</div>

										<div class="uk-form-row">
											<div class="input-textfield width-max">
												<input class="data" type="password"
													autocomplete="new-password"
													data-parsley-equalto-message="입력값이 일치하지 않습니다."
													data-parsley-message="영문/숫자/특수문자 조합 8~16자 조합으로 입력해주세요."
													data-parsley-required-message="필수 입력 항목입니다."
													placeholder="패스워드를 다시 입력해 주세요." id="pw2" name="pw2" /> <span
													class="error-message filled"></span>
											</div>
										</div>

										<div class="uk-form-row">
											<div class="input-textfield width-max">
												<input class="data" type="text"
													data-parsley-pattern="^[가-힣|a-z|A-Z]*$"
													data-parsley-required-message="필수 입력 항목입니다."
													data-parsley-equalto-message="입력값이 일치하지 않습니다."
													data-parsley-message="한글과 영문만 입력 가능합니다."
													placeholder="이름을 입력해 주세요." id="name" name="name" /> <span
													class="error-message filled"></span>
											</div>
										</div>

										<div class="uk-form-row">
											<div class="input-textfield width-max">
												<input class="data" type="text"
													data-parsley-pattern="^[0-9]*$"
													data-parsley-required-message="필수 입력 항목입니다."
													data-parsley-message="숫자만 입력 가능합니다." id="phone"
													placeholder="휴대폰 번호 &#39;-&#39;표 없이 입력해 주세요." name="phone" />
												<span class="error-message filled"></span>
											</div>

											<!-- 이용약관 -->
											<div class="register-terms">
												<div class="agree">
													<div class="uk-grid">
														<h6 class="uk-width-1-2 tit">이용약관</h6>
														<a target="_blank"
															class="uk-width-1-2 uk-text-right btn-agree-allview"
															href="${pageContext.request.contextPath}/cscenter/policy.do">전문보기</a>
													</div>
													<div class="uk-grid uk-margin-top-remove">
														<div class="uk-width-1-1">
															<div class="scroll-box agree-content">
																<c:import url="../cscenter/text.jsp"></c:import>
															</div>
														</div>
													</div>

													<div class="uk-width-1-1 agree-test">
														<span id="checkTerms" class="input-checkbox uk-width-1-1 ">
															<input type="checkbox" id="checkGcAgree"
															name="checkGcAgree" data-parsley-message="약관에 동의해주세요"
															class="essential" /> <label for="checkGcAgree">
																<i class="brz-icon-checkbox">rediobox</i> <span
																class="label font-normal" style="color: #606060;">[필수]
																	약관에 동의 합니다.</span>
														</label>
														</span>
													</div>
												</div>

												<h6 class="uk-width-1-2 tit">개인정보 수집.이용동의</h6>
												<div class="uk-grid">
													<div class="uk-width-1-1">
														<table>
															<caption>
																<strong>개인정보 수집·이용동의 안내 목록</strong>:일시, 수집항목, 수집목적, 보유기간
																등을 나타내는 표입니다.
															</caption>
															<colgroup>
																<col style="width: 20%" />
																<col style="width: 30%" />
																<col style="width: 25%" />
																<col style="width: 25%" />
															</colgroup>
															<thead>
																<tr>
																	<th>일시</th>
																	<th>수집항목</th>
																	<th>수집목적</th>
																	<th>보유기간</th>
																</tr>
															</thead>
															<tbody>
																<tr>
																	<td>가입시</td>
																	<td>아이디, 이메일, 비밀번호, 이름, 휴대폰 번호</td>
																	<td>회원식별 및 연락</td>
																	<td><strong>회원탈퇴시까지</strong></td>
																</tr>
																<tr>
																	<td>최초 구매시</td>
																	<td>성별, 생년월일, 휴대폰 번호</td>
																	<td>본인확인</td>
																	<td><strong>회원탈퇴시까지</strong></td>
																</tr>
																<tr>
																	<td>상품 주문시</td>
																	<td>수령인 정보(이름, 연락처, 주소), 결제수단 정보</td>
																	<td>상품 주문 및 배송 등 구매계약의 이행, 상품구매 관련문의사항과 반품, 환불등
																		민원사항의 상담 및 처리</td>
																	<td><strong>전자상거래법 등 관련 법령에 따른 보관기간</strong></td>
																</tr>
															</tbody>
														</table>
													</div>
													<div class="uk-width-1-1 agree-test">
														<span id="checkPrivacy"
															class="input-checkbox uk-width-1-1 "> <input
															type="checkbox" id="isCheckAcAgree" name="isCheckAcAgree"
															class="essential"
															data-parsley-message="개인정보 수집.이용 동의해주세요" /> <label
															for="isCheckAcAgree"> <i
																class="brz-icon-checkbox">rediobox</i> <span
																class="label font-normal" style="color: #606060;">[필수]
																	개인정보 수집.이용동의</span>
														</label>
														</span>
													</div>
													<div class="uk-width-1-1 agree-test">
														※ 약관 및 개인정보 처리방침은 홈페이지 하단에 전문이 게재되어 있습니다.<br /> ※ 이용약관 및
														개인정보 수집.이용 내용에 대해 동의 거부가 가능하며, <br />이 경우 회원가입 및 관련 서비스는
														이용이 불가합니다.
													</div>
												</div>
											</div>
										</div>

										<div class="uk-form-row">
											<label class="uk-form-label"></label>
											<div class="input-form-group">
												<span class="input-checkbox"> <input type="checkbox"
													data-parsley-required-message="필수 입력 항목입니다."
													id="receiveEmail" name="receiveEmail" /> <label
													for="receiveEmail"> <i class="brz-icon-checkbox">rediobox</i>
														<span class="label">(선택) 쇼핑정보 E-mail 수신 동의</span>
												</label>
												</span> <input type="hidden" value="off" name="receiveEmail" />
											</div>
										</div>

										<div class="uk-form-row">
											<label class="uk-form-label"></label>
											<div class="input-form-group">
												<span class="input-checkbox"> <input type="checkbox"
													data-parsley-required-message="필수 입력 항목입니다."
													name="ATTRIBUTE@smsAgree" /> <label> <i
														class="brz-icon-checkbox">rediobox</i> <span class="label">(선택)
															쇼핑정보 SMS 수신 동의</span>
												</label>
												</span> <input type="hidden" value="off" name="ATTRIBUTE@smsAgree" />
											</div>
										</div>

										<input type="hidden" name="csrfToken"
											value="V5QG-9I9N-LEQ9-M67G-SPJD-KM41-LLP6-O3ZW" />
									</form>
								</div>
							</div>
						</div>
						<div class="uk-grid register-terms">
							<div class="uk-width-1-1 agree-test">※ 선택 항목으로 동의하지 않아도
								불이익을 받지 않습니다.</div>
							<div class="uk-width-1-1 agree-confirm">만 14세 미만은 회원가입 및
								서비스 이용이 불가합니다.</div>
						</div>

						<div class="uk-grid">
							<div class="uk-width-1-1">
								<button class="button xlarge width-max"
									data-parsley-required="t" type="submit" id="submit">회원가입하기
									(만 14세 이상)</button>
							</div>
						</div>

					</div>
				</div>
			</div>
		</section>
	</section>
	<c:import url="../../../temp/footer.jsp" />
</body>
</html>