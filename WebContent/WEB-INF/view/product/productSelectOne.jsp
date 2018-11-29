<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<c:import url="../../../temp/bootStrap.jsp" />
<style type="text/css">
.form-control {
	height: 20px;
	padding: 0px 6px;
	margin: 2px;
}

.review-write-btn, .btn-more-review {
	display: inline-block;
	width: auto;
	margin-top: 0;
	padding: 0;
	color: #2e2e2e;
	border-bottom: 1px solid #2e2e2e;
	font-size: 13px;
	line-height: 14px;
	background-color: white;
}
</style>
<script type="text/javascript">
	$(function() {
		function review(Page) {
			$.ajax({
				url : "../review/reviewList.do",
				type : "POST",
				data : {
					code : "${param.code}",
					Page : page
				},
				success : function(data) {
					$(".detail-review").html(data);
				}
			})
		}
		var page = 1;
		review(page);
		$(".detail-review").on("click", ".btn-more-review", function() {
			page++
			review(page);
		})

		$(".review-write-btn").click(function() {
			if($("#writer").val().length==0){
				alert("로그인해주세요");
			} else if($("#score").find(".active").attr("class") == null){
				alert("별점을 달아주세요");
			} else if($("#title").val().length==0){
				alert("제목을 입력해주세요");
			} else if($("#contents").val().length==0){
				alert("내용을 입력해주세요");
			} else {
				$.ajax({
					url : "../review/reviewWrite.do",
					type : "POST",
					data : {
						code : "${param.code}",
						writer : $("#writer").val(),
						title : $("#title").val(),
						contents : $("#contents").val(),
						score : $(".rating-star").children(".active:last").attr("data-value")
					},
					success : function() {
						review(page);
					}
				})
			}
		})
		$(".review-write-btn").click(
				function() {
					$.ajax({
						url : "../review/reviewWrite.do",
						type : "POST",
						data : {
							code : "${param.code}",
							writer : $("#writer").val(),
							title : $("#title").val(),
							contents : $("#contents").val(),
							score : $(".rating-star").children(".active:last")
									.attr("data-value")
						},
						success : function() {
							review(page);
						}
					})
				})

		$(".pop-detail-title")
				.click(
						function() {
							if ($(this).attr("class") == "pop-detail-title uk-accordion-title") {
								$(this).attr("class","pop-detail-title uk-accordion-title uk-active");
								$(this).next(".accordion-wrapper").css({
									height : "auto"
								});
								$(this).next(".accordion-wrapper").children().attr("class","pop-detail-content uk-accordion-content uk-active");
							} else {
								$(this).attr("class","pop-detail-title uk-accordion-title");
								$(this).next(".accordion-wrapper").css({
									height : "0"
								});
								$(this).next(".accordion-wrapper").children().attr("class","pop-detail-content uk-accordion-content");
							}
						})

		var s = $(".opt-list");

		$(".input-radio").click(function() {
			if (!$(this).attr('disabled')) {
				$(this).addClass("checked");
				$(this).siblings().removeClass('checked');
				$(this).children("label").addClass("selected");
				$(this).siblings().children('label').removeClass('selected');
				$("#size").attr('value', s.find(".selected").text());
			}
		});

		$("#btn-buy").click(function() {
			var size = $("#size").val();
			if (size != "") {
				$("#frm").submit();
			} else {
				alert("사이즈를 선택하세요!");
			}

		});
		var num = 1
		$(".plus").click(function() {
			if (num < 5) {
				num++;
				$(".btn-qty").children("input").val(num);
				$(".minus").attr("class", "btn minus currentQty");
			} else {
				alert("5개 까지만 구매가능합니다");
			}
		})

		$(".minus").click(function() {
			if (num > 1) {
				num--;
				$(".btn-qty").children("input").val(num);

				if (num == 1) {
					$(".minus").attr("class", "btn minus");
				}
			}
		})

		$(".brz-icon-star_xlarge").click(function() {
			$(this).prevAll().attr("class", "brz-icon-star_xlarge active");
			$(this).attr("class", "brz-icon-star_xlarge active");
			$(this).nextAll().attr("class", "brz-icon-star_xlarge");
			$(".rating-description").text($(this).attr("data-message"));
		})
	});
</script>
<style type="text/css">
label.selected {
	background-color: #111;
	color: #fff;
}

.labeli {
	width: 50px;
	height: 40px;
	padding: 6px 5px;
	margin-right: 8px;
	text-align: center;
	outline: none;
	box-sizing: border-box;
}
</style>
</head>
<c:import url="../../../temp/header.jsp" />
<body>
	<section class="wrapper">
		<section class="content-area">
			<section>
				<article>
					<article class="contents width-max">
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
										<c:forEach items="${file}" var="fileDTO">
											<li class="uk-width-1-1 image-list uk-width-large-1-2">
												<div class="prd-gutter">
													<img src="/mall_project/upload/${fileDTO.fname}" />
												</div>
											</li>
										</c:forEach>
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
										<span class="tit">${pDTO.productName}</span>
										<button class="close-btn">
											<i class="icon-delete_bold"></i>
										</button>
									</h1>

									<div class="price-wrap">
										<div class="item-location">
											<span>${pDTO.kind}</span>
										</div>
										<span class="price"><strong class="priceText"
											data-price="${pDTO.price}"></strong></span>
									</div>
									<div class="pinfo-item-box">
										<div class="option-wrap">
											<form id="frm" method="POST" action="./productSelectOne.do">
												<!--*/ 상세화면 */-->


												<input type="hidden" id="code" name="code"
													value="${pDTO.productCode}"> <input type="hidden"
													id="name" name="name" value="${pDTO.productName}">
												<input type="hidden" id="price" name="price"
													value="${pDTO.price}"> <input type="hidden"
													id="size" name="size" value="">


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
															<c:forEach begin="235" end="330" step="5" var="i">
																<c:choose>
																	<c:when test="${size[0] le i and size[1] ge i}">
																		<span class="input-radio"> <label>${i}</label>
																			<input type="radio" name="SIZE" disabled="disabled">
																		</span>
																	</c:when>
																	<c:otherwise>
																		<span class="input-radio" disabled="disabled">
																			<label class="sd-out">${i}</label> <input
																			type="radio" name="SIZE" disabled="disabled">
																		</span>
																	</c:otherwise>
																</c:choose>
															</c:forEach>
														</div>
													</div>
												</div>
												<div class="quantity">
													<h2 class="tit">
														<span>수량</span> <span class="msg"></span>
													</h2>
													<span class="btn-qty"> <input name="quantity"
														class="labeli" type="text" value="1" readonly="readonly">
														<button type="button" class="btn minus">
															<i class="icon-minus"></i>
														</button>
														<button type="button" class="btn plus">
															<i class="icon-plus"></i>
														</button>
													</span>
												</div>
											</form>
										</div>

										<div class="store-shipping-state">
											<h2 class="tit">배송방법</h2>

											<div class="select-box width-max"
												data-component-select="{changeType:normal,icon:brz-icon-opt-select_down,required:true}">
												<select id="fType" name="fType">
													<option value="PHYSICAL_SHIP" selected="selected">택배배송</option>
													<option value="PHYSICAL_PICKUP">매장방문</option>
												</select>
											</div>
										</div>


										<div class="btn-group-box line type2">
											<div>
												<div>
													<div data-add-item="" class="status-wrap btn-wrap">
														<div class="order-wrap">
															<button type="button"
																class="btn-link xlarge btn-order width-max addcart-btn"
																id="btn-add">장바구니</button>
															<button type="button"
																class="btn-link xlarge btn-order width-max" id="btn-buy">바로구매</button>
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
									</div>

									<div class="discription-wrap uk-accordion">

										<div class="pop-detail-content">
											<div class="description conTab" id="pdp-description-summary">
												<div class="merit">
													<div class="content">
														<style type="text/css">
.conTab .merit .content .sectionL .imgArea {
	width: 250px;
	height: 250px;
	padding: 25px
}

.conTab .merit .content .sectionL .imgArea img {
	max-width: 100%;
	height: auto !important
}

.conTab .merit .content sectionL>p {
	display: none !important
}

.description .merit .content .sectionR h2 {
	margin-top: 27px !important;
	font-size: 15px !important;
	line-height: 14px !important;
}

.product-option-container .sectionR>h3:nth-of-type(2)+ul li {
	height: 24px !important;
}

.sectionR .imgArea {
	position: relative;
}

.sectionR .link {
	position: absolute;
	bottom: 9%;
	left: 47%;
	width: 39%;
	height: 25px;
	margin-left: -60px;
}
</style>
														<div class="sectionR">${pDTO.contents}</div>
													</div>
												</div>

											</div>
										</div>

										<h2 class="pop-detail-title uk-accordion-title">리뷰
										<span class="review-num">(${reviewTotal}개)</span>
											<div class="review-wrap">
												<span class="like" style="display: none"> <i
													class="icon-star5 per" style="width: ${scoreAvg}%"></i> <i
													class="icon-star5 star-default-bg"></i>
												</span> <span class="upc-code"></span>
											</div>
										</h2>

										<div class="accordion-wrapper">
											<div class="pop-detail-content uk-accordion-content">
												<form id="frm" action="../review/reviewWrite.do"
													method="post" class="form-inline">
													<div class="form-group">
														<input type="hidden" class="form-control" id="writer"
															name="writer" value="${member.name}">
													</div>
													<div class="form-group">

														<div class="rating-star-data">
															<div class="rating-star" id="score">
																<a data-value="1" data-message="별로에요."
																	class="brz-icon-star_xlarge"></a> <a data-value="2"
																	data-message="그저 그래요." class="brz-icon-star_xlarge"></a>
																<a data-value="3" data-message="나쁘지 않아요."
																	class="brz-icon-star_xlarge"></a> <a data-value="4"
																	data-message="마음에 들어요." class="brz-icon-star_xlarge"></a>
																<a data-value="5" data-message="좋아요!"
																	class="brz-icon-star_xlarge"></a>
															</div>
															<p class="rating-description"></p>
														</div>
													</div>
													<br>
													<div class="form-group" style="width: 100%;">
														<label for="productName">제목:</label> <input type="text"
															class="form-control" style="width: 90%;" id="title"
															name="title" value="">
													</div>
													<br>

													<div class="form-group" style="width: 100%;">
														<label for="kind">내용:</label> <input type="text"
															class="form-control" style="width: 90%;" id="contents"
															name="contents" value="">
													</div>
													<br> <a class="review-write-btn" id="submit">리뷰
														작성하기</a>
												</form>
												<div class="detail-review"></div>
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
										<a class="btn-link width-max xlarge btn-cart"
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