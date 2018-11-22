<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<c:import url="./temp/bootStrap.jsp"></c:import>
<style type="text/css">
.labeli {
	display: inline-block;
	float: left;
	font-size: 14px;
	color: #000;
	font-weight: 500;
	letter-spacing: -1px;
}

.labell {
	display: block;
	padding: 10px 8px;
	color: #383838;
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

<script type="text/javascript">
	$(function() {
		$(".anonymous").click(function() {
			if($("#orderinfo-review").attr("class") == "body view uk-hidden"){
				$("#orderinfo-review").attr("class","body view");
				$(".icon-plus").attr("class","icon-toggle-order icon-plus uk-hidden")
				$(".icon-minus").attr("class","icon-toggle-order icon-minus")
			} else {
				$("#orderinfo-review").attr("class","body view uk-hidden");
				$(".icon-plus").attr("class","icon-toggle-order icon-plus")
				$(".icon-minus").attr("class","icon-toggle-order icon-minus uk-hidden")
			}
		})
		
		$("#order").click(function() {
			if($("#order-summary").attr("class") == "body view uk-hidden"){
				$("#order-summary").attr("class","body view")
			}else{
				$("#order-summary").attr("class","body view uk-hidden")
			}
		})
		
		$(".select-head").click(function() {
			var slect = $(this).parent()
			if(slect.attr("class") == "select-box width-max"){
				slect.attr("class","select-box width-max checked");
			} else if(slect.attr("class") == "select-box width-max pc checked"){
				slect.attr("class","select-box width-max ");
			}
		})
	$(".labell").click(function() {
		$(".labell").each(function() {
			$(this).parent().parent().attr("class","list");
		})
		$(this).parent().parent().attr("class","list checked");
		$(".currentOpt").text($(this).text());
		$(".select-box").attr("class","select-box width-max");
		if($(this).parent().attr("data-value") == "dt_1"){
			$("#personalMessageText").parent().attr("class","input-textfield width-max uk-margin-mini-top");
		} else {
			$("#personalMessageText").parent().attr("class","input-textfield width-max uk-margin-mini-top uk-hidden");
		}
	})
})
</script>
</head>
<body data-device="pc">

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
						<div class="order-tab product-checkout checkout" data-order-tab="">
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
												src="https://static-breeze.nike.co.kr/kr/ko_kr/cmsstatic/product/AJ7748-002_AJ7748-002_primary.jpg?browse""
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
									class="btn-link line mini login">로그인</a> <span
									class="preview uk-hidden">gkffndnl123@naver.com</span> <i
									class="icon-toggle-order icon-plus"></i> <i
									class="icon-toggle-order icon-minus uk-hidden"></i>
							</div>
							<div id="orderinfo-review" class="body view uk-hidden"
								data-module-order-customer="{name: ,phoneNum:01012344567,emailAddress:gkffndnl123@naver.com}">
								<div class="order-complete">
									<div class="uk-grid uk-margin-bottom">
										<div class="uk-width-7-10">
											<dl>
												<dd class="uk-margin-small-bottom" data-name=" "></dd>
											</dl>
											<dl>
												<dd class="uk-margin-small-bottom"
													data-component-phone="{phonenum:01012344567}">010-1234-4567</dd>
											</dl>
											<dl>
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
															<div class="input-textfield width-max">
																<input type="text" data-parsley-minlength="2"
																	data-parsley-minlength-message="입력값이 너무 짧습니다."
																	data-parsley-required-message="필수 입력 항목입니다."
																	id="address.fullName" name="address.fullName"
																	placeholder="이름" value="${member.name}"> <span
																	class="error-message filled"></span>
															</div>
														</div>

														<div
															class="order-field-list uk-width-small-1-1 uk-width-medium-1-2"
															style="padding-left: 10px">
															<h6 class="tit">연락처</h6>
															<div class="input-textfield width-max">
																<label for="address.phonePrimary.phoneNumber"></label> <input
																	type="text" data-parsley-minlength="8"
																	data-parsley-maxlength="12"
																	data-parsley-pattern="^01([0|1|6|7|8|9]?)+([0-9]{3,4})+([0-9]{4})$"
																	data-parsley-minlength-message="입력값이 너무 짧습니다."
																	data-parsley-type-message="올바른 휴대폰 번호를 입력해주세요."
																	data-parsley-required-message="필수 입력 항목입니다."
																	data-parsley-maxlength-message="입력값이 너무 깁니다."
																	id="phoneNumber" name="phoneNumber"
																	placeholder="-없이 입력" value="${member.phone}"> <span
																	class="error-message filled"></span>
															</div>
														</div>

														<div
															class="order-field-list uk-width-small-1-1 uk-width-medium-1-1 uk-margin-small-bottom">

															<h6 class="tit">배송 주소</h6>

															<div class="search-field shipping-address">

																<span class="input-textfield width-max"> <input
																	type="text" data-parsley-minlength="2"
																	data-parsley-minlength-message="입력값이 너무 짧습니다."
																	data-parsley-required-message="필수 입력 항목입니다."
																	id="sample3_address" name="address.addressLine1"
																	placeholder="예) 문래동 강서타워, 선유로 82" value=""
																	readonly="readonly">
																</span> <input type="button"
																	onclick="sample3_execDaumPostcode()"
																	class="btn_search button line xlarge width-fix"
																	value="검색"><br> <input type="hidden"
																	id="sample3_postcode"> <span
																	class="error-message filled"></span>
															</div>
															<div id="wrap"
																style="display: none; border: 1px solid; width: 500px; height: 444px; margin: 5px 0px; position: relative;">
																<img
																	src="//t1.daumcdn.net/localimg/localimages/07/postcode/320/close.png"
																	id="btnFoldWrap"
																	style="cursor: pointer; position: absolute; right: 0px; top: -1px; z-index: 1"
																	onclick="foldDaumPostcode()" alt="접기 버튼">
															</div>
															<span
																class="input-textfield width-max uk-margin-mini-top">
																<input type="text" data-parsley-minlength="2"
																data-parsley-minlength-message="입력값이 너무 짧습니다."
																data-parsley-required-message="필수 입력 항목입니다."
																id="address.addressLine2" name="address.addressLine2"
																placeholder="나머지 주소 입력" value=""> <span
																class="error-message filled"></span>
															</span>
														</div>
													</div>
												</li>

												<li
													class="order-field-list uk-width-small-1-1 uk-width-medium-1-1">
													<div class="select-box width-max">
														<a class="select-head"><span class="currentOpt">배송
																메모를 선택해주세요.</span></a>
														<ul class="select-body">
															<li class="list checked"><a id="dt_0"
																data-value="dt_0"><span class="labell">배송 메모를
																		선택해주세요.</span></a></li>
															<li class="list"><a id="dt_3" data-value="dt_3"><span
																	class="labell">배송 시 연락 부탁드립니다.</span></a></li>
															<li class="list"><a id="dt_2" data-value="dt_2"><span
																	class="labell">빠른 배송 부탁드립니다.</span></a></li>
															<li class="list"><a id="dt_1" data-value="dt_1"><span
																	class="labell">직접입력</span></a></li>
														</ul>
													</div> <span
													class="input-textfield width-max uk-margin-mini-top uk-hidden">
														<input type="text" id="personalMessageText"
														name="personalMessageText" placeholder="배송메모를 입력하여 주십시오."
														value="">
												</span>
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
													<input type="button"
													class="button indian-red xlarge width-max" id="btn-next"
													value="다음 단계 진행">
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
</body>
</html>

<script src="http://dmaps.daum.net/map_js_init/postcode.v2.js"></script>
<script>
    // 우편번호 찾기 찾기 화면을 넣을 element
    var element_wrap = document.getElementById('wrap');

    function foldDaumPostcode() {
        // iframe을 넣은 element를 안보이게 한다.
        element_wrap.style.display = 'none';
    }

    function sample3_execDaumPostcode() {
        // 현재 scroll 위치를 저장해놓는다.
        var currentScroll = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
        new daum.Postcode({
            oncomplete: function(data) {
                // 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

                // 각 주소의 노출 규칙에 따라 주소를 조합한다.
                // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
                var fullAddr = data.address; // 최종 주소 변수
                var extraAddr = ''; // 조합형 주소 변수

                // 기본 주소가 도로명 타입일때 조합한다.
                if(data.addressType === 'R'){
                    //법정동명이 있을 경우 추가한다.
                    if(data.bname !== ''){
                        extraAddr += data.bname;
                    }
                    // 건물명이 있을 경우 추가한다.
                    if(data.buildingName !== ''){
                        extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                    }
                    // 조합형주소의 유무에 따라 양쪽에 괄호를 추가하여 최종 주소를 만든다.
                    fullAddr += (extraAddr !== '' ? ' ('+ extraAddr +')' : '');
                }

                // 우편번호와 주소 정보를 해당 필드에 넣는다.
                document.getElementById('sample3_postcode').value = data.zonecode; //5자리 새우편번호 사용
                document.getElementById('sample3_address').value = fullAddr;

                // iframe을 넣은 element를 안보이게 한다.
                // (autoClose:false 기능을 이용한다면, 아래 코드를 제거해야 화면에서 사라지지 않는다.)
                element_wrap.style.display = 'none';

                // 우편번호 찾기 화면이 보이기 이전으로 scroll 위치를 되돌린다.
                document.body.scrollTop = currentScroll;
            },
            // 우편번호 찾기 화면 크기가 조정되었을때 실행할 코드를 작성하는 부분. iframe을 넣은 element의 높이값을 조정한다.
            onresize : function(size) {
                element_wrap.style.height = size.height+'px';
            },
            width : '100%',
            height : '100%'
        }).embed(element_wrap);

        // iframe을 넣은 element를 보이게 한다.
        element_wrap.style.display = 'block';
    }
</script>