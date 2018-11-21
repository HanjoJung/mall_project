<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<c:import url="../../../temp/bootStrap.jsp"></c:import>
<style type="text/css">
.labeli {
	display: inline-block;
	float: left;
	font-size: 14px;
	color: #000;
	font-weight: 500;
	letter-spacing: -1px;
}
</style>
<script type="text/javascript">
	$(function() {
		
		function checkForm(data) {
			var error = data.parent().children(".error-message");
			var pat = (RegExp)(data.attr("data-parsley-pattern"));
			console.log(data.val());
			console.log(!pat.test(data.val()));
			
			if (data.val().length == 0) {
				data.parent().attr("class","input-textfield width-max error");
				error.html(data.attr("data-parsley-required-message"));
				return false;

			}else if(data.val().length <= data.attr("data-parsley-minlength")){
				data.parent().attr("class","input-textfield width-max error");
				error.html(data.attr("data-parsley-minlength-message"));
				return false;
			
			}else if(!pat.test(data.val())){
				data.parent().attr("class","input-textfield width-max error");
				error.html(data.attr("data-parsley-type-message"));
				return false;
				
			}else if(data.val().length >= data.attr("data-parsley-maxlength")){
				data.parent().attr("class","input-textfield width-max error");
				error.html(data.attr("data-parsley-maxlength-message"));
				return false;
				
			}else{
				data.parent().attr("class","input-textfield width-max");
				error.html("");
				return true;
			}
		}
		
		$(".input-textfield").children("input").keyup(function() {
			checkForm($(this));
		})
		
		$("#btn-next").click(function() {
			var check = true;
			$(".input-textfield").children("input").each(function() {
				if(!checkForm($(this))){
					$(this).focus();
					check = false;
					return check;
				};
			})
			if(check){
				alert("clear");
				//$("#order_info").submit();
			}
		})
	})
</script>
</head>
<body data-device="pc">
	<header class="header_layout_1" data-module-header="{isSignIn:false}">
		<article class="contents header-line">
			<nav class="header-lnb">
				<a class="header-logo" href="/kr/ko_kr/"><span class="ns-swoosh"></span></a>
			</nav>
		</article>
	</header>

	<section class="wrapper">
		<section class="content-area">
			<section class="order-checkout" data-module-checkout="">
				<article class="contents">
					<div class="order-wrap order-summary-toggle">
						<h2 class="contents-title">
							<span class="title">주문결제</span>
							<div class="order__simply__tit">
								<strong>119,000 원</strong>
							</div>
						</h2>

						<div
							class="order-tab-wrap order__tab__wrap order__tab__wrap--right">
							<div class="order-tab product-checkout checkout"
								data-order-tab="">
								<div class="header" id="order">
									<h5 class="tit">
										<strong>주문내역</strong>
									</h5>
								</div>

								<div id="order-summary" class="body view">
									<div class="cart-order_list" data-order="">
										<dl class="order-list">
											<input type="hidden" name="productCode" value="10000009565">
											<input type="hidden" name="model" data-model="807480-004"
												value="807480-004">

											<dt class="image-wrap">
												<img
													src="https://static-breeze.nike.co.kr/kr/ko_kr/cmsstatic/product/807480-004_807480-004_primary.jpg?thumbnail"
													alt="나이키 클래식 코르테즈">
											</dt>

											<dd class="order-info">
												<a class="tit" data-name="나이키 클래식 코르테즈 프리미엄"
													data-eng-name="나이키 클래식 코르테즈 프리미엄"
													href="/kr/ko_kr/t/men/fw/nike-sportswear/807480-004/qdzn76/classic-cortez-prem"
													title="나이키 클래식 코르테즈 프리미엄">나이키 클래식 코르테즈 프리미엄</a>
												<div class="style-code" data-model="807480-004">스타일 :
													807480-004</div>
												<span class="uk-hidden" data-upc="191887852100"
													data-model="807480-004"></span>

												<!-- skuOptionDisplayProcess -->
												<div class="current-option-wrap">
													<input type="hidden" name="FW_SIZE" value="300">
													<!-- bundle product -->
													<!-- product -->
													<span class="opt" data-opt="{FW_SIZE:300}"
														data-attribute-name="FW_SIZE">사이즈 : 300</span>
												</div>

												<!-- itemAttribute -->
												<span class="qty" data-quantity="1">수량 : 1개</span> <span
													class="price-wrap"> <strong class="retail-price"
													data-retail-price="119000">119,000 원</strong>

												</span>
											</dd>
										</dl>
									</div>

									<div class="uk-width-1-1 info-price">
										<span class="item-price"> <span class="labeli">상품
												금액</span> <span class="price"> <strong>119,000 원</strong>
										</span>
										</span> <span class="delivery-price"> <span class="labeli">배송비</span>
											<span class="price"><strong>0 원</strong></span>
										</span> <span class="item-price"> <span class="labeli">상품
												할인 금액</span> <span class="price sale"> <strong>0 원</strong>
										</span>
										</span> <span class="item-price"> <span class="labeli">주문
												할인 금액</span> <span class="price sale"> <strong> 0 원
											</strong>
										</span>
										</span>

										<div class="total-price">
											<span class="labeli">총 결제 예정 금액</span> <span
												class="price sale total"><strong data-amount="119000">119,000
													원</strong></span>
										</div>

										<div class="info">
											<span style="color: black;"><strong>배송비 안내<br></strong></span>
											<span><ul>
													<li>전 상품 무료배송 입니다.</li>
													<li>장기간 장바구니에 보관하신 상품은 시간이 지남에 따라 가격과 혜택이 변동 될 수 있으며,
														최대 30일동안 보관됩니다.</li>
												</ul></span> <br> <span style="color: black;"><strong>프로모션
													코드 사용 안내<br>
											</strong></span> <span><ul>
													<li>프로모션 코드 사용에 따라 최종 결제 금액은 달라질 수 있습니다.</li>
												</ul></span>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div class="order-tab-wrap">
							<div class="order-tab reservations-customer" data-order-tab="">
								<div class="header anonymous">
									<h5 class="tit">주문고객</h5>
									<a data-toggle="modal" data-target="#myModal"
										data-component-loginmodal="" title="로그인"
										href="${pageContext.request.contextPath}/member/memberLogin.do"
										class="btn-link line mini login">로그인</a>
								</div>

								<div data-checkout-step="order">
									<div data-module-order-customer="">
										<form method="post" name="order_info" id="order_info"
											novalidate="" action="/kr/ko_kr/checkout/savedetails">
											<div class="body">
												<ul class="order-field-container uk-grid uk-grid-medium">
													<li
														class="order-field-list uk-width-small-1-1 uk-width-medium-1-2">
														<h6 class="tit">이메일</h6> <span
														class="input-textfield width-max"><input
															type="text"
															data-parsley-pattern="^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$"
															data-parsley-minlength="5" data-parsley-maxlength="50"
															data-parsley-minlength-message="입력값이 너무 짧습니다."
															data-parsley-type-message="이메일 형식으로 입력해주세요."
															data-parsley-required-message="필수 입력 항목입니다."
															data-parsley-maxlength-message="입력값이 너무 깁니다."
															id="emailAddress" name="emailAddress" placeholder="이메일"
															value="${member.id}"> <span
															class="error-message filled"></span></span>
													</li>
													<li
														class="order-field-list uk-width-small-1-1 uk-width-medium-1-2">
														<h6 class="tit">연락처</h6> <span
														class="input-textfield width-max"> <input
															type="text" data-parsley-minlength="8"
															data-parsley-maxlength="12"
															data-parsley-pattern="^01([0|1|6|7|8|9]?)+([0-9]{3,4})+([0-9]{4})$"
															data-parsley-minlength-message="입력값이 너무 짧습니다."
															data-parsley-type-message="올바른 휴대폰 번호를 입력해주세요."
															data-parsley-required-message="필수 입력 항목입니다."
															data-parsley-maxlength-message="입력값이 너무 깁니다."
															id="phoneNumber" name="phoneNumber" placeholder="-없이 입력"
															value="${member.phone}"> <!-- th:field="*{phoneNumber}"  -->
															<span class="error-message filled"></span>
													</span>
													</li>

													<li class="order-field-list uk-width-1-1">
														<div class="agree">
															<div class="uk-grid">
																<h6 class="uk-width-1-2 tit">이용약관</h6>
																<a target="_blank"
																	class="uk-width-1-2 uk-text-right font-size-mini"
																	href="../cscenter/policy.do">전문보기</a>
															</div>
															<div class="uk-grid uk-margin-top-remove">
																<div class="uk-width-1-1">
																	<div class="scroll-box agree-content">
																		<c:import
																			url="/WEB-INF/view/cscenter/policyContents.jsp"></c:import>
																	</div>
																</div>
															</div>
														</div>
													</li>
													<li
														class="order-field-list uk-width-1-1 uk-margin-bottom-remove">
														<div class="agree">
															<div class="uk-grid">
																<h6 class="uk-width-1-2 tit">비회원 개인정보수집 이용 동의</h6>
																<a target="_blank"
																	class="uk-width-1-2 uk-text-right font-size-mini"
																	href="../cscenter/guestPolicy.do">전문보기</a>
															</div>
															<div class="uk-grid uk-margin-top-remove">
																<div class="uk-width-1-1">
																	<div class="scroll-box agree-content">
																		<c:import url="/WEB-INF/view/cscenter/guestPolicy.jsp"></c:import>
																	</div>
																</div>
															</div>
														</div>
													</li>
												</ul>
											</div>
											<div class="footer">
												<div class="uk-grid">
													<span class="uk-width-small-1-1 uk-width-medium-1-1">
														<input type="button"
														class="button indian-red xlarge width-max"
														data-order-info-submit-btn="" id="btn-next"
														value="동의하고 다음 단계 진행">
													</span>
												</div>
											</div>
											<input type="hidden" name="csrfToken"
												value="HRNV-SXMK-MA3H-7XBV-81OI-RO6A-HUC7-89AH">
										</form>
									</div>
								</div>
							</div>

							<div class="order-tab" data-order-tab="">
								<div class="header inactive">
									<h5 class="tit">배송지 정보</h5>
								</div>
							</div>

							<div class="order-tab" data-order-tab="">
								<div class="header inactive">
									<h5 class="tit">할인/혜택사용</h5>
								</div>
							</div>

							<div class="order-tab reservations-order" data-order-tab=""
								data-checkout-step="payment">
								<div class="header inactive">
									<h5 class="tit">결제수단 선택</h5>
								</div>
							</div>
						</div>
					</div>
				</article>
			</section>
		</section>
	</section>
	<c:import url="../../../temp/footer.jsp"></c:import>
</body>
</html>