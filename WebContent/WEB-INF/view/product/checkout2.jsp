<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
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

.labell {
	display: block;
	padding: 10px 8px;
	color: #383838;
}

.textfield {
	width: 100%;
	height: 50px;
	border: 1px solid #e5e5e5;
	padding: 9px 12px;
	outline: none;
	box-sizing: border-box;
}
</style>
<script type="text/javascript">
	$(function() {
		
		function checkForm(data) {
			var error = data.parent().children(".error-message");
			var pat = (RegExp)(data.attr("data-parsley-pattern"));
			
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
		
		$("#btn-buy").click(function() {
			var check = true;
			$(".input-textfield").children("input").each(function() {
				if(!checkForm($(this))){
					$(this).focus();
					check = false;
					return check;
				};
			})
			if(check){
				$.ajax({
					url : "${pageContext.request.contextPath}/product/buy.do",
					tpye : "POST",
					data : {
						title : $(".style-code").attr("data-model"),
						amount : $(".total").children().attr("data-amount"),
						email : $("#dataEmail").text(),
						name : $("#addressFullName").val(),
						tel : $("#phoneNumber").val(),
						addr : $("#sample3_address").val()+"/"+$("#sample3_address2").val(),
						postcode : $("#sample3_postcode").val(),
						size : $("#FW_SIZE").val()
					  },
					  success: function(data) {
						  $("#iamport").html(data);
					}
				})
				
			}
		})
	})
</script>

<script type="text/javascript">
	$(function() {
		var data_phone = $("#data-phone").attr("data-phone");
		$("#data-phone").text(data_phone.substring(0,3) + "-" + data_phone.substring(3,7) + "-" + data_phone.substring(7));
		
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
			} else {
				slect.attr("class","select-box width-max");
			}
		})
		$(".select-body").mouseleave(function() {
			$(this).parent().attr("class","select-box width-max");
		})
		
		$(".labell").click(function() {
			$(".labell").each(function() {
				$(this).parent().parent().attr("class","list");
			})
			$(this).parent().parent().attr("class","list checked");
			$(".currentOpt").text($(this).text());
			$(".select-box").attr("class","select-box width-max");
			if($(".select-body").children(".checked").children().attr("id") == "dt_1"){
				$("#personalMessageText").parent().attr("class","width-max uk-margin-mini-top");
				$("#personalMessageText").val("");
			} else {
				$("#personalMessageText").parent().attr("class","width-max uk-margin-mini-top uk-hidden");
				$("#personalMessageText").val($(this).text());
			}
		}); 
		
	})
</script>
</head>
<body data-device="pc">

	<div class="order-tab-wrap">
		<div class="order-tab reservations-customer" data-order-tab="">
			<div class="header anonymous">
				<h5 class="tit">주문고객</h5>
				<a data-toggle="modal" data-target="#myModal"
					data-component-loginmodal="" title="로그인"
					href="${pageContext.request.contextPath}/member/memberLogin.do"
					class="btn-link line mini login">로그인</a> <i
					class="icon-toggle-order icon-plus"></i> <i
					class="icon-toggle-order icon-minus uk-hidden"></i>
			</div>
			<div id="orderinfo-review" class="body view uk-hidden"
				data-module-order-customer="{name: ,phoneNum:01012344567,emailAddress:gkffndnl123@naver.com}">
				<div class="order-complete">
					<div class="uk-grid uk-margin-bottom">
						<div class="uk-width-7-10">
							<dl>
								<dd class="uk-margin-small-bottom" id="data-phone"
									data-phone="${param.phone}"></dd>
							</dl>
							<dl>
								<dd id="dataEmail">${param.email}</dd>
							</dl>
						</div>
						<div class="uk-width-3-10">
							<a class="btn-link mini uk-align-right"
								onclick="location.reload()">수정</a>
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
						action="/kr/ko_kr/checkout/singleship">
						<input type="hidden" name="address.isoCountryAlpha2" value="US">
						<input type="hidden" name="isSearchAddress" value="false">
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
													id="addressFullName" name="addressFullName"
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
													id="phoneNumber" name="phoneNumber" placeholder="-없이 입력"
													value="${member.phone}"> <span
													class="error-message filled"></span>
											</div>
										</div>

										<div
											class="order-field-list uk-width-small-1-1 uk-width-medium-1-1 uk-margin-small-bottom">

											<h6 class="tit">배송 주소</h6>

											<div class="search-field shipping-address">
												<input type="hidden" id="sample3_postcode" value="06112">
												<span class="input-textfield width-max"> <input
													type="text" data-parsley-minlength="2"
													data-parsley-minlength-message="입력값이 너무 짧습니다."
													data-parsley-required-message="필수 입력 항목입니다."
													id="sample3_address" name="addressSddressLine1"
													placeholder="예) 문래동 강서타워, 선유로 82"
													value="서울 강남구 논현로123길 4-1 (논현동)" readonly="readonly">
												</span> <input type="button" onclick="sample3_execDaumPostcode()"
													class="btn_search button line xlarge width-fix" value="검색"><br>
												<span class="error-message filled"></span>
											</div>
											<div id="wrap"
												style="display: none; border: 1px solid; width: 100%; height: 450px; margin: 5px 0px; position: relative;">
												<img
													src="//t1.daumcdn.net/localimg/localimages/07/postcode/320/close.png"
													id="btnFoldWrap"
													style="cursor: pointer; position: absolute; right: 0px; top: -1px; z-index: 1"
													onclick="foldDaumPostcode()" alt="접기 버튼">
											</div>
											<span class="input-textfield width-max uk-margin-mini-top">
												<input type="text" data-parsley-minlength="2"
												data-parsley-minlength-message="입력값이 너무 짧습니다."
												data-parsley-required-message="필수 입력 항목입니다."
												id="sample3_address2" name="sample3_address2"
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
											<li class="list checked"><a id="dt_0"><span
													class="labell">배송 메모를 선택해주세요.</span></a></li>
											<li class="list"><a id="dt_3"><span class="labell">배송
														시 연락 부탁드립니다.</span></a></li>
											<li class="list"><a id="dt_2"><span class="labell">빠른
														배송 부탁드립니다.</span></a></li>
											<li class="list"><a id="dt_1"><span class="labell">직접입력</span></a></li>
										</ul>
									</div> <span class="width-max uk-margin-mini-top uk-hidden"> <input
										type="text" id="personalMessageText" class="textfield"
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
								</span>
								</li>
							</ul>
						</div>
						<div class="footer">
							<div class="uk-grid">
								<span class="uk-width-small-1-1 uk-width-medium-1-1"> <input
									type="button" class="button indian-red xlarge width-max"
									id="btn-buy" value="결제">
								</span>
							</div>
						</div>
						<input type="hidden" name="csrfToken"
							value="1ODU-YSOE-7ZIQ-751G-TJNV-MZSR-81EN-BUEB">
					</form>
				</div>
			</div>
		</div>
	</div>

	<div id="iamport"></div>
</body>

<script src="/mall_project/js/daum_Postcode.js"></script>

</html>