<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<c:import url="../../../temp/bootStrap.jsp" />
<link href="/mall_project/css/common.css" rel="stylesheet"
	type="text/css">
<script type="text/javascript">
	$(function() {
		$(".pop-detail-title").click(function() {
			console.log("click");
			if($(this).attr("class")=="pop-detail-title uk-accordion-title"){
				$(this).attr("class","pop-detail-title uk-accordion-title uk-active");
				$(this).next(".accordion-wrapper").css({height: "auto"});
				$(this).next(".accordion-wrapper").children().attr("class","pop-detail-content uk-accordion-content uk-active");
			}else{
				$(this).attr("class","pop-detail-title uk-accordion-title");
				$(this).next(".accordion-wrapper").css({height: "0"});
				$(this).next(".accordion-wrapper").children().attr("class","pop-detail-content uk-accordion-content");
			}
		})
	})
</script>
</head>
<c:import url="../../../temp/header.jsp" />
<body>

	<section class="wrapper">
		<section class="content-area">
			<section>
				<article>
					<article class="contents width-max">
						<span class="uk-hidden" data-breadcrumbs="">Home||MEN||신발||라이프스타일</span>

						<div class="bread-crumb">
							<div class="crumb left">
								<a class="btn-link sky-blue normal" href="/kr/ko_kr/"> Home
								</a> <span class="breadcrumb-divider">></span> <a
									class="btn-link sky-blue normal" href="/kr/ko_kr/l/men">
									MEN </a> <span class="breadcrumb-divider">></span> <a
									class="btn-link sky-blue normal" href="/kr/ko_kr/w/men/fw">
									신발 </a> <span class="breadcrumb-divider">></span> <a
									class="btn-link sky-blue normal"
									href="/kr/ko_kr/w/men/fw/lifestyle"> 라이프스타일 </a> <span
									class="breadcrumb-divider">></span> <span class="current">${pDTO.productName}</span>
							</div>
						</div>
					</article>

					<article class="contents margin-small pt_product-detail">
						<div class="product-detail_wrap uk-grid">
							<div
								class="img-detail_product_n uk-width-medium-1-1 uk-width-large-3-5">
								<div class="product-gallery-wrap bottom">
									<ul id="product-gallery" class="uk-grid img-detail-list">
										<li class="uk-width-1-1 image-list uk-width-large-1-2">
											<div class="prd-gutter">
												<%-- <c:if test="${fileOne.put eq 'max'}" > --%>
												<img src="/mall_project/upload/${fileOne.fname}" />
												<%-- </c:if> --%>
											</div>
										</li>

										<li class="uk-width-1-1 image-list uk-width-large-1-2">
											<div class="prd-gutter">
												<img
													src="https://static-breeze.nike.co.kr/kr/ko_kr/cmsstatic/product/624041-009_624041-009_2.jpg?gallery" />
											</div>
										</li>

										<li class="uk-width-1-1 image-list uk-width-large-1-2">
											<div class="prd-gutter">
												<img
													src="https://static-breeze.nike.co.kr/kr/ko_kr/cmsstatic/product/624041-009_624041-009_3.jpg?gallery" />
											</div>
										</li>

										<li class="uk-width-1-1 image-list uk-width-large-1-2">
											<div class="prd-gutter">
												<img
													src="https://static-breeze.nike.co.kr/kr/ko_kr/cmsstatic/product/10000008722/624041-009_624041-009_4.jpg?gallery" />
											</div>
										</li>

										<li class="uk-width-1-1 image-list uk-width-large-1-2">
											<div class="prd-gutter">
												<img
													src="https://static-breeze.nike.co.kr/kr/ko_kr/cmsstatic/product/624041-009_624041-009_5.jpg?gallery" />
											</div>
										</li>

										<li class="uk-width-1-1 image-list uk-width-large-1-2">
											<div class="prd-gutter">
												<img
													src="https://static-breeze.nike.co.kr/kr/ko_kr/cmsstatic/product/624041-009_624041-009_6.jpg?gallery" />
											</div>
										</li>
									</ul>

									<ul id="color-swipe"></ul>
									<div class="pdp-gallery-fullview">
										<div class="pdp-gallery-fullview-wrapper">
											<div class="pdp-gallery-fullview-overlay">
												<div class="button-wrapper">
													<button class="pdp-gallery-fullview-close">
														<i class="icon-delete_thin"></i>
													</button>
												</div>
												<div class="gallery-images"></div>
											</div>
										</div>
									</div>
								</div>
							</div>

							<div
								class="info-wrap_product_n uk-width-medium-1-1 uk-width-large-2-5">
								<div class="product-option-container">
									<h1 class="title-wrap">
										<span class="tit" data-name="나이키 에어 폼포짓 프로">${pDTO.productName}</span>
										<button class="close-btn">
											<i class="icon-delete_bold"></i>
										</button>
									</h1>

									<div class="price-wrap">
										<div class="item-location">
											<span>${pDTO.kind}</span>
										</div>
										<span class="price"><strong data-price="269000">${pDTO.price}
												원</strong></span>
									</div>
									<div class="pinfo-item-box">
										<form method="POST" action="/kr/ko_kr/cart/add">
											<div class="option-wrap">
												<!--*/ 상세화면 */-->

												<div class="product-option_radio" id="product-option_color"
													data-component-color="">
													<div>

														<a class="input-radio checked"
															href="/kr/ko_kr/t/men/fw/nike-sportswear/624041-009/owhk76/air-foamposite-pro">
															<span class="label img-type"> <img
																src="https://static-breeze.nike.co.kr/kr/ko_kr/cmsstatic/product/624041-009_624041-009_primary.jpg?option" />
														</span> <!-- 컬러사진 주소이동/이미지 -->

														</a>
													</div>
													<div>
														<a class="input-radio"
															href="/kr/ko_kr/t/men/fw/nike-sportswear/624041-304/eedw51/air-foamposite-pro">
															<span class="label img-type"> <img
																src="https://static-breeze.nike.co.kr/kr/ko_kr/cmsstatic/product/624041-304_624041-304_primary.jpg?option" />
														</span>
														</a>
													</div>
												</div>

												<!-- 사이즈 선택  -->
												<div class="size-grid-type">
													<a class="btn-option"> <strong class="tit">사이즈
															선택</strong>
													</a> <input class="hidden-option" type="hidden" value=""
														name="itemAttributes[FW_SIZE]" />
													<h2 class="tit">
														<span class="txt">FW_SIZE</span> <span class="over-txt"></span>
														<span class="msg"></span>
													</h2>

													<div class="product-option_radio square">
														<div class="opt-list">
															<span class="input-radio" typeName="240"
																disabled="disabled" value="35"> <label
																class="sd-out">240</label> <input type="radio"
																name="SIZE" disabled="disabled" value="35" />
															</span>
															<!--  <span class="input-radio" typeName="245"
																disabled="disabled" value="36"> <label
																class="sd-out">245</label> <input type="radio"
																data-attributename="FW_SIZE" data-id="0"
																data-friendly-name="245" data-value="245" id="FW_SIZE1"
																name="SIZE" disabled="disabled" value="36" />
															</span> <span class="input-radio" typeName="250"
																disabled="disabled" value="38"> <label
																class="sd-out">250</label> <input type="radio"
																data-attributename="FW_SIZE" data-id="0"
																data-friendly-name="250" data-value="250" id="FW_SIZE1"
																name="SIZE" disabled="disabled" value="38" />
															</span> <span class="input-radio" typeName="255"
																disabled="disabled" value="39"> <label
																class="sd-out">255</label> <input type="radio"
																data-attributename="FW_SIZE" data-id="0"
																data-friendly-name="255" data-value="255" id="FW_SIZE1"
																name="SIZE" disabled="disabled" value="39" />
															</span> <span class="input-radio" typeName="260"
																disabled="disabled" value="42"> <label
																class="sd-out">260</label> <input type="radio"
																data-attributename="FW_SIZE" data-id="0"
																data-friendly-name="260" data-value="260" id="FW_SIZE1"
																name="SIZE" disabled="disabled" value="42" />
															</span> <span class="input-radio" typeName="265"
																disabled="disabled" value="43"> <label
																class="sd-out">265</label> <input type="radio"
																data-attributename="FW_SIZE" data-id="0"
																data-friendly-name="265" data-value="265" id="FW_SIZE1"
																name="SIZE" disabled="disabled" value="43" />
															</span> <span class="input-radio" typeName="270"
																disabled="disabled" value="46"> <label
																class="sd-out">270</label> <input type="radio"
																data-attributename="FW_SIZE" data-id="0"
																data-friendly-name="270" data-value="270" id="FW_SIZE1"
																name="SIZE" disabled="disabled" value="46" />
															</span> <span class="input-radio" typeName="275"
																disabled="disabled" value="47"> <label
																class="sd-out">275</label> <input type="radio"
																data-attributename="FW_SIZE" data-id="0"
																data-friendly-name="275" data-value="275" id="FW_SIZE1"
																name="SIZE" disabled="disabled" value="47" />
															</span> <span class="input-radio" typeName="280"
																disabled="disabled" value="50"> <label
																class="sd-out">280</label> <input type="radio"
																data-attributename="FW_SIZE" data-id="0"
																data-friendly-name="280" data-value="280" id="FW_SIZE1"
																name="SIZE" disabled="disabled" value="50" />
															</span> <span class="input-radio" typeName="285"
																disabled="disabled" value="51"> <label
																class="sd-out">285</label> <input type="radio"
																data-attributename="FW_SIZE" data-id="0"
																data-friendly-name="285" data-value="285" id="FW_SIZE1"
																name="SIZE" disabled="disabled" value="51" />
															</span> <span class="input-radio" typeName="290"
																disabled="disabled" value="54"> <label
																class="sd-out">290</label> <input type="radio"
																data-attributename="FW_SIZE" data-id="0"
																data-friendly-name="290" data-value="290" id="FW_SIZE1"
																name="SIZE" disabled="disabled" value="54" />
															</span> <span class="input-radio" typeName="295"
																disabled="disabled" value="55"> <label
																class="sd-out">295</label> <input type="radio"
																data-attributename="FW_SIZE" data-id="0"
																data-friendly-name="295" data-value="295" id="FW_SIZE1"
																name="SIZE" disabled="disabled" value="55" />
															</span> <span class="input-radio" typeName="300"
																disabled="disabled" value="58"> <label
																class="sd-out">300</label> <input type="radio"
																data-attributename="FW_SIZE" data-id="0"
																data-friendly-name="300" data-value="300" id="FW_SIZE1"
																name="SIZE" disabled="disabled" value="58" />
															</span> <span class="input-radio" typeName="305"
																disabled="disabled" value="59"> <label
																class="sd-out">305</label> <input type="radio"
																data-attributename="FW_SIZE" data-id="0"
																data-friendly-name="305" data-value="305" id="FW_SIZE1"
																name="SIZE" disabled="disabled" value="59" />
															</span> <span class="input-radio" typeName="310"
																disabled="disabled" value="62"> <label
																class="sd-out">310</label> <input type="radio"
																data-attributename="FW_SIZE" data-id="0"
																data-friendly-name="310" data-value="310" id="FW_SIZE1"
																name="SIZE" disabled="disabled" value="62" />
															</span> <span class="input-radio" typeName="320"
																disabled="disabled" value="66"> <label
																class="sd-out">320</label> <input type="radio"
																data-attributename="FW_SIZE" data-id="0"
																data-friendly-name="320" data-value="320" id="FW_SIZE1"
																name="SIZE" disabled="disabled" value="66" />
															</span> <span class="input-radio" typeName="330"
																disabled="disabled" value="69"> <label
																class="sd-out">330</label> <input type="radio"
																data-attributename="FW_SIZE" data-id="0"
																data-friendly-name="330" data-value="330" id="FW_SIZE1"
																name="SIZE" disabled="disabled" value="69" />
															</span> -->
														</div>
													</div>
												</div>
												<div class="quantity"
													data-component-quantity="{maxQuantity:1,msg:개 까지 구매가능 합니다.,quantityStateMsg:상품의 수량이 없습니다.}">
													<h2 class="tit">
														<span>수량</span> <span class="msg"></span>
													</h2>
													<span class="btn-qty"> <input name="quantity"
														class="label" type="text" value="1" />
														<button class="btn minus">
															<i class="icon-minus"></i>
														</button>
														<button class="btn plus">
															<i class="icon-plus"></i>
														</button>
													</span>
												</div>
											</div>

											<div class="store-shipping-state">
												<h2 class="tit">배송방법</h2>

												<div class="select-box width-max"
													data-component-select="{changeType:normal,icon:brz-icon-opt-select_down,required:true}">
													<select id="fType" name="fType">
														<option value="PHYSICAL_SHIP" selected="true">택배배송</option>
														<option value="PHYSICAL_PICKUP">매장방문</option>
													</select>
												</div>
											</div>


											<div class="btn-group-box line type2">
												<div>
													<div>
														<div data-add-item="" class="status-wrap btn-wrap">
															<div class="order-wrap">
																<a
																	class="btn-link width-max xlarge btn-cart addcart-btn"
																	data-cartbtn="" action-type="add" href="#">장바구니</a><a
																	class="btn-link xlarge btn-order width-max"
																	data-cartbtn="" action-type="redirect" id="btn-buy"
																	href="#"> <span>바로구매</span></a>
															</div>
														</div>
														<button
															class="wish-btn btn-link sky-blue normal btn-wishlist">
															<i class="ns-heart"></i> <span class="tooltip-bg">위시리스트
																담기</span>
														</button>
													</div>
												</div>
											</div>

											<input type="hidden" name="csrfToken"
												value="6K6X-IUNB-NPYZ-VUEE-E2DT-E149-EDAQ-Z4LF" />
										</form>
									</div>

									<div class="discription-wrap uk-accordion">

										<div class="pop-detail-content">
											<div class="description conTab" id="pdp-description-summary"></div>

											<span class="style-color">현재 컬러 : 블랙/메탈릭 골드<br /></span> <span
												class="style-code" data-model="624041-009">스타일 :
												624041-009<br />
											</span> <a href="#" class="sky-blue btn-more-pop">더 보기</a>
										</div>

										<h2 class="pop-detail-title uk-accordion-title">
											리뷰
											<div class="review-wrap">
												<span class="like" style="display: none"> <i
													class="icon-star5 per" style="width: 0.0%"></i> <i
													class="icon-star5 star-default-bg"></i>
												</span> <span class="upc-code"></span>
											</div>
										</h2>
										<div data-wrapper="true" class="accordion-wrapper" aria-expanded="true">
											<div class="pop-detail-content uk-accordion-content">
												<div class="detail-review" id="detail-review">
													<div
														data-module-review="{target:#detail-review,api:/kr/ko_kr/review/list,isSignIn:false}">
														<div class="no-detail-review">
															<p class="star-average">
																<span class="like"> <i class="icon-star5 per"
																	style="width: 0.0%"></i> <i
																	class="icon-star5 star-default-bg"></i>
																</span>
															</p>
															<div class="review-noti">이 상품의 첫 번째 리뷰를 작성해 주세요.</div>
															<a href="#common-modal-large" class="review-write-btn"
																data-successmsg="완료되었습니다." data-productid="10000008722">리뷰
																작성하기</a>
														</div>
													</div>
												</div>
											</div>
										</div>

										<h2 class="pop-detail-title uk-accordion-title">
											배송<span class="sub-title-wrap">무료배송 / 5일 이내 배송</span>
										</h2>
										<div class="accordion-wrapper">
											<div class="pop-detail-content uk-accordion-content">
												<p>상품의 구매금액에 상관없이 모든 상품이 무료배송 됩니다.</p>
												<h3 class="detail-content-title">배송안내</h3>
												<ul class="detail-content-list">
													<li>배송지역 : 전국(일부 지역 제외)</li>
													<li>배송비 : 상품의 구매금액에 상관없이 모든 상품 무료배송</li>
													<li>배송기간 : 결제 후 5~7일 이내 (토요일, 공휴일 제외)</li>
												</ul>
											</div>
										</div>

										<h2 class="pop-detail-title uk-accordion-title">
											반품/AS<span class="sub-title-wrap">무료반품</span>
										</h2>
										<div class="accordion-wrapper">
											<div class="pop-detail-content uk-accordion-content">
												<p>상품의 구매금액에 상관없이 모든 상품이 무료반품 됩니다.</p>
												<h3 class="detail-content-title">반품 안내</h3>
												<ul class="detail-content-list">
													<li>고객님의 단순변심(사이즈 부정확 및 디자인 컬러 불만 등)으로 인한 반품은 실제 상품을
														수령하신 날로부터 7일 이내</li>
												</ul>

												<h3 class="detail-content-title">AS 안내</h3>
												<ul class="detail-content-list">
													<li>나이키닷컴에서 구매하신 제품에 대해 A/S 접수를 원하실 경우에는 <a
														href="https://nike-breeze.zendesk.com/hc/ko/requests/new"
														class="deco-underline">1:1 이메일 문의</a>와 나이키닷컴 고객센터(TEL:
														080-022-0182)를 이용해주세요.
													</li>
												</ul>

												<h3 class="detail-content-title">미성년자 권리보호 안내</h3>
												<ul class="detail-content-list">
													<li>미성년 고객께서 상품을 주문(계약) 하시는 경우, 법정대리인(부모님 등)의 동의가 없으면
														미성년자 본인 또는 법정대리인(부모님 등)이 그 주문(계약)을 취소하실 수 있습니다.</li>
												</ul>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="btn-group-box line type2">
								<div class="status-wrap btn-wrap">
									<div class="order-wrap">
										<a class="btn-link width-max xlarge btn-cart addcart-btn"
											href="./${board}Update.do?code=${pDTO.productCode}">수정</a> <a
											class="btn-link xlarge btn-order width-max"
											href="./${board}Delete.do?code=${pDTO.productCode}"> <span>삭제</span></a>
									</div>
								</div>
							</div>
						</div>
					</article>
				</article>
			</section>
		</section>
	</section>

	<c:import url="../../../temp/footer.jsp" />
</body>
</html>