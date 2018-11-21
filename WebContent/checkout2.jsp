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
									<a data-component-loginmodal="" title="로그인"
										class="btn-link line mini login">로그인</a> <span
										class="preview uk-hidden">gkffndnl123@naver.com</span> <i
										class="icon-toggle-order icon-plus uk-hidden"></i> <i
										class="icon-toggle-order icon-minus"></i>
								</div>
								<div id="orderinfo-review" class="body view"
									data-module-order-customer="{name: ,phoneNum:01012344567,emailAddress:gkffndnl123@naver.com}">
									<div class="order-complete">
										<div class="uk-grid uk-margin-bottom">
											<div class="uk-width-7-10">
												<dl>
													<!-- <dt>주문하시는 분</dt> -->
													<!-- <dd th:utext="${ orderInfoForm?.firstName == null}">브리즈</dd> -->
													<dd class="uk-margin-small-bottom" data-name=" "></dd>
												</dl>
												<dl>
													<!-- <dd th:utext="${ phoneNumber }">01012345678</dd> -->
													<!-- <dt>연락처</dt> -->
													<dd class="uk-margin-small-bottom"
														data-component-phone="{phonenum:01012344567}">010-1234-4567</dd>
												</dl>
												<dl>
													<!-- <dt>이메일</dt> -->
													<dd data-email="gkffndnl123@naver.com">gkffndnl123@naver.com</dd>
												</dl>
											</div>
											<div class="uk-width-3-10">
												<a class="btn-link mini uk-align-right"
													href="/kr/ko_kr/checkout?edit-order-info=true">수정</a>
											</div>
										</div>
									</div>
									<input name="isAlreadyRegistered" type="hidden">
								</div>
							</div>

							<div class="order-tab" data-order-tab="">
								<div class="header">
									<h5 class="tit">배송지 정보</h5>
								</div>

								<div data-checkout-step="shipping">
									<div data-module-order-delivery="">
										<form method="post" id="shipping_info" name="shipping_info"
											novalidate="" action="/kr/ko_kr/checkout/singleship">
											<input type="hidden" name="address.isoCountryAlpha2"
												value="US"> <input type="hidden"
												name="isSearchAddress" value="false">
											<div class="body">
												<ul class="order-field-container uk-grid uk-grid-medium">
													<li
														class="order-field-list uk-width-small-1-1 uk-width-medium-1-1 uk-margin-small-bottom">
														<div class="uk-grid uk-margin-top-remove new-addr-box">
															<div
																class="order-field-list uk-width-small-1-1 uk-width-medium-1-2">
																<h6 class="tit">받으시는 분</h6>
																<div class="input-textfield width-max"
																	data-component-textfield="{'type':'name', comment':'잘못된 아이디 입니다.'}">
																	<label for="address.fullName" data-name="">이름</label> <input
																		type="text" data-parsley-required=""
																		data-parsley-minlength="2"
																		data-parsley-trigger="keyup"
																		data-parsley-minlength-message="입력값이 너무 짧습니다."
																		data-parsley-required-message="필수 입력 항목입니다."
																		id="address.fullName" name="address.fullName" value="">
																</div>
															</div>

															<div
																class="order-field-list uk-width-small-1-1 uk-width-medium-1-2"
																style="padding-left: 10px">
																<h6 class="tit">연락처</h6>
																<div class="input-textfield width-max"
																	data-component-textfield="{'type':'phone', comment':'잘못된 아이디 입니다.'}">
																	<label for="address.phonePrimary.phoneNumber">-없이
																		입력</label> <input type="text" data-parsley-required=""
																		data-parsley-minlength="8" data-parsley-maxlength="12"
																		data-parsley-type="digits"
																		data-parsley-trigger="keyup"
																		data-parsley-minlength-message="입력값이 너무 짧습니다."
																		data-parsley-type-message="숫자만 입력 가능합니다."
																		data-parsley-required-message="필수 입력 항목입니다."
																		data-parsley-maxlength-message="입력값이 너무 깁니다."
																		id="address.phonePrimary.phoneNumber"
																		name="address.phonePrimary.phoneNumber" value="">
																</div>
															</div>
															
															<div
																class="order-field-list uk-width-small-1-1 uk-width-medium-1-1 uk-margin-small-bottom">
																<h6 class="tit">배송 주소</h6>

																<div class="input-textfield width-max uk-hidden"
																	data-component-textfield="'">
																	<label for="address.postalCode">zip code</label> <input
																		type="text" name="address.postalCode"
																		id="address.postalCode" value="">
																</div>

																<div class="search-field shipping-address"
																	data-component-searchfield="{api://api.poesis.kr/post/search.php, errMsg:주소를 입력해주세요, required:true}">
																	<span class="input-textfield width-max"> <label
																		for="address.addressLine1">예) 문래동 강서타워, 선유로 82</label>
																		<input type="text" autocomplete="off"
																		data-parsley-required="" data-parsley-minlength="2"
																		data-parsley-trigger="keyup"
																		data-parsley-minlength-message="입력값이 너무 짧습니다."
																		data-parsley-required-message="필수 입력 항목입니다."
																		id="address.addressLine1" name="address.addressLine1"
																		value="">
																	</span>
																	<button href="#"
																		class="btn_search button line xlarge width-fix">검색</button>
																	<ul class="result-wrap"></ul>
																</div>
																<span
																	class="input-textfield width-max uk-margin-mini-top"
																	data-component-textfield="'"> <label
																	for="address.addressLine2">나머지 주소 입력</label> <input
																	type="text" data-parsley-required=""
																	data-parsley-minlength="2" data-parsley-trigger="keyup"
																	data-parsley-minlength-message="입력값이 너무 짧습니다."
																	data-parsley-required-message="필수 입력 항목입니다."
																	id="address.addressLine2" name="address.addressLine2"
																	value="">
																</span>
															</div>
														</div>
													</li>

													<li
														class="order-field-list uk-width-small-1-1 uk-width-medium-1-1">
														<div class="select-box width-max pc"
															data-component-select="{'changeType':'normal','icon':'icon-arrow_bottom'}">
															<a class="select-head"><span class="currentOpt">배송
																	메모를 선택해주세요.</span></a>
															<ul class="select-body">
																<li class="list checked "><a href="" data-value=""><span
																		class="label">배송 메모를 선택해주세요.</span></a></li>
																<li class="list  "><a href="dt_3" data-value="dt_3"><span
																		class="label">배송 시 연락 부탁드립니다.</span></a></li>
																<li class="list  "><a href="dt_2" data-value="dt_2"><span
																		class="label">빠른 배송 부탁드립니다.</span></a></li>
																<li class="list  "><a href="dt_1" data-value="dt_1"><span
																		class="label">직접입력</span></a></li>
															</ul>
															<select name="selectPersonalMessage">
																<option value="">배송 메모를 선택해주세요.</option>
																<option value="dt_3">배송 시 연락 부탁드립니다.</option>
																<option value="dt_2">빠른 배송 부탁드립니다.</option>
																<option value="dt_1">직접입력</option>
															</select>
														</div> <span
														class="input-textfield width-max uk-margin-mini-top uk-hidden"
														data-component-textfield=""> <label
															for="personalMessageText">배송메모를 입력하여 주십시오.</label> <input
															type="text" id="personalMessageText"
															name="personalMessageText" value="">
													</span>
													</li>
													<li
														class="order-field-list uk-width-small-1-1 uk-width-medium-1-1 uk-hidden">
														<h6 class="tit">배송 방법</h6>
														<div class="input-form-group" data-component-radio="">
															<div
																class="input-radio uk-padding-remove uk-width-small-1-1 uk-width-medium-1-1 uk-margin-small-bottom checked">
																<input type="hidden" name="fulfillmentOptionId"
																	value="1">
															</div>
														</div>
													</li>
													<li
														class="order-field-list uk-width-small-1-1 uk-width-medium-1-1 uk-margin-bottom-remove">
														<span class="info"> 
															<p>
																주문한 상품은 영업일 5~7일(공휴일/주말제외) 이내에 받아보실수 있습니다.<br>
															</p>
															<p>상품준비에 에러사항이 있거나, 발송지연이 불가피할 경우 고객께 안내연락을 드립니다.</p>
															<ul>
															</ul> 
													</span>
													</li>
												</ul>
											</div>
											<div class="footer">
												<div class="uk-grid">
													<span class="uk-width-small-1-1 uk-width-medium-1-1">
														<button type="submit" class="button xlarge width-max"
															data-order-shipping-submit-btn="" id="btn-next">다음
															단계 진행</button>
													</span>
												</div>
											</div>
											<input type="hidden" name="csrfToken"
												value="1ODU-YSOE-7ZIQ-751G-TJNV-MZSR-81EN-BUEB">
										</form>
									</div>
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

	<div class="uk-offcanvas" id="minicart">
		<div class="section-minicart uk-offcanvas-bar uk-offcanvas-bar-flip"
			data-module-minicart="{miniCartCnt:.cart-num}">

			<input type="hidden" name="itemSize" value="1"> <input
				type="hidden" name="cartId" value="16312042">
			<div class="cart-order_list uk-grid">
				<div class="uk-width-1-1">
					<h5 class="minicart-title">미니 장바구니</h5>
				</div>
				<div class="uk-width-1-1">
					<dl class="order-list" data-product-item="">
						<form action="#">
							<input type="hidden" name="productId" data-id="10000009565"
								value="10000009565"> <input type="hidden" name="model"
								data-model="807480-004" value="807480-004"> <input
								type="hidden" name="skuId" value="10000047761"> <input
								type="hidden" name="quantity" data-quantity="1" value="1">
							<input type="hidden" name="orderItemId" value="20587195">
						</form>
						<dt class="image-wrap">

							<img
								src="https://static-breeze.nike.co.kr/kr/ko_kr/cmsstatic/product/807480-004_807480-004_primary.jpg?thumbnail"
								alt="나이키 클래식 코르테즈 프리미엄">


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

							<span class="opt quantity">수량: 1</span> <span class="price-wrap">
								<div class="total-price">
									<strong class="retail-price" data-retail-price="119000">119,000
										원</strong>

								</div>
							</span> <a class="btn-delete" data-remove-item=""
								href="/kr/ko_kr/cart/remove?orderItemId=20587195&amp;productId=10000009565">
								<i class="icon-delete_bold"></i>
							</a>

						</dd>

					</dl>
				</div>
			</div>

			<div class="cart-order_price uk-grid">
				<span class="order-price uk-width-1-1"> <span>총 상품금액</span> <strong>119,000
						원</strong>
				</span>
			</div>
			<div class="cart-order_deliveryinfo uk-grid">
				<div class="uk-width-1-1">배송비는 주문서에서 확인이 가능합니다.</div>
			</div>
			<div class="cart-order_buy uk-grid">
				<div class="uk-width-1-1">
					<a class="btn-link width-max large line" href="/kr/ko_kr/cart">장바구니
						가기</a>
				</div>
				<div class="uk-width-1-1 uk-margin-mini-top">
					<a class="btn-link width-max large indian-red" data-checkout-btn=""
						href="/kr/ko_kr/checkout">바로구매</a>
				</div>
			</div>
		</div>
	</div>

	<div class="scrollup" style="display: none;">
		<i class="icon-arrow_top"></i>
	</div>

	<article id="common-modal" class="uk-modal" aria-hidden="false">
		<div class="uk-modal-dialog">
			<a class="uk-modal-close uk-close"></a>
			<div class="contents"></div>
		</div>
	</article>

	<div id="common-modal-large" class="uk-modal detail-info-modal">
		<div class="uk-modal-dialog-large">
			<a class="uk-modal-close uk-close"></a>
			<div class="contents"></div>
		</div>
	</div>

	<c:import url="../../../temp/footer.jsp"></c:import>
</body>
</html>