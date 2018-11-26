<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<c:import url="../../../temp/bootStrap.jsp"></c:import>
<link href="/mall_project/css/index.css" rel="stylesheet"
	type="text/css">

<style type="text/css">
body {
	position: relative;
}

.global_gnb ~ .proList {
	padding-top: 0 !important
}

.global_gridwall_top_info {
	position: relative;
}

.pwhArea {
	position: relative;
	max-width: 100%;
	margin-bottom: 0px !important;
	height: auto;
}

.pwhArea * {
	font-family: '나눔고딕', 'NanumGothic', Malgun Gothic, '맑은고딕', Apple Gothic,
		Dotum, '돋움', sans-serif;
	font-size: 13px;
	letter-spacing: 0 !important
}

.pwhArea:after {
	display: block;
	clear: both;
	content: "";
}

.pwhArea .bgArea, .pwhArea .bgArea img {
	width: 100%;
}

.pwhArea .txtArea {
	position: absolute;
	left: 3%;
	top: 50%;
	margin-top: -94px;
}

.pwhArea .linkArea {
	position: absolute;
	left: 21%;
	top: 7.5%;
	width: 75.5%;
	height: 92.5%;
	z-index: 26;
}

.pwhArea .linkArea:after {
	display: block;
	clear: both;
	content: "";
}

.pwhArea .linkArea li {
	float: left;
	width: 20%;
	height: 100%;
	position: relative;
	text-align: center;
}

.pwhArea .linkArea li>a {
	display: block;
	width: 100%;
	height: 76%;
	position: relative;
}

.pwhArea .linkArea li>a span {
	position: absolute;
	top: 50%;
	left: 50%;
	margin-top: -18px;
	margin-left: -40px;
	display: inline-block;
	*display: inline;
	*zoom: 1;
	padding: 0 20px;
	height: 40px;
	line-height: 40px;
	font-size: 1em;
	font-weight: 500;
	background: #fff;
	vertical-align: middle;
	text-align: center;
	border-radius: 3px;
	color: #000;
	text-decoration: none;
}

.pwhArea .linkArea li .txt_btn {
	position: absolute;
	bottom: 4.5%;
	left: 0%;
	width: 100%;
	text-align: center;
}

.pwhArea .linkArea li.on {
	
}

.pwhArea .linkArea li .txt_btn a {
	display: block;
	padding: 9% 0;
}

.pwhArea .linkArea li .txt_btn a span {
	font-size: 1.1em;
	font-weight: 600;
	color: #b2b2b2;
	word-break: keep-all;
}

.pwhArea .linkArea li.on .txt_btn a span {
	color: #000;
}

.pwhArea .linkArea li .txt_btn a:hover span {
	border-bottom: 1px solid #000;
}

.pwhArea .tabArea ul li.border_none {
	border-left: 0px none;
}

.pwhArea a {
	text-decoration: none;
}

/** 수정사항 **/
.content-container {
	margin-bottom: 0px;;
}
/* 모바일 */
.redactor-editor ul, .redactor-editor ol, .redactor-editor p {
	padding-left: 0em;
	margin-bottom: 0 !important;
}

.redactor-editor a {
	text-decoration: none;
}

.mobileCbArea {
	padding-bottom: 0px
}

.mobileCbArea .mobileTab li a {
	display: block;
	background: #f2f2f2;
	text-align: center;
	font-weight: bold;
	color: #555;
	border-right: 1px solid #e5e5e5;
	border-top: 1px solid #e5e5e5;
	padding: 15px
}

.mobileCbArea .mobileTab li a:active span, .mobileCbArea .mobileTab li a.on
	{
	background: #fff;
	color: #000
}

@media ( max-width : 1269px) and (min-width: 1024px) {
	.pwhArea * {
		font-size: 12px
	}
	.pwhArea .txtArea {
		margin-top: -82px;
	}
	.pwhArea .linkArea li .txt_btn {
		bottom: 3.5%;
	}
	.pwhArea .linkArea li>a span {
		padding: 0 15px;
		height: 35px;
		line-height: 35px;
	}
}

@media ( max-width : 1023px) {
	.pwhArea * {
		font-size: 11px
	}
	.pwhArea .txtArea {
		margin-top: -55px;
	}
	.pwhArea .txtArea img {
		width: 60%;
	}
	.pwhArea .linkArea li .txt_btn {
		bottom: 1.5%;
	}
	.pwhArea .linkArea li .txt_btn a span {
		font-size: 1em;
	}
	.pwhArea .linkArea li>a span {
		margin-left: -25px;
		padding: 0 10px;
		height: 30px;
		line-height: 30px;
		font-size: 0.9em;
	}
}
</style>
<script>
	$(function(){
		$(".pwhArea .linkArea li > a span").hide();
		$(".pwhArea .linkArea li > a").mouseenter(function(){
			$(this).find("span.btn_buy").stop().fadeIn(300);
		}).mouseleave(function(){
			$(this).find("span.btn_buy").stop().fadeOut(300);
		});
		$(".pwhArea .linkArea li .txt_btn a").mouseenter(function(){
			$(this).parent().parent().children().find("span.btn_buy").stop().fadeIn(300);
		}).mouseleave(function(){
			$(this).parent().parent().children().find("span.btn_buy").stop().fadeOut(300);
		});
	});
</script>
</head>
<body>
	<c:import url="../../../temp/header.jsp"></c:import>

	<div class="container-fluid wrapper">
		<section class="contents filter-category-wrap content-area">
			<section class="pt_category">
				<article class="contents filter-category-wrap">
					<form action="" method="GET"
						enctype="application/x-www-form-urlencoded" data-filter-form="">
						
						<section class="section-filter"
							data-module-filter="{filterType:checkbox, target:.section-category, filterOpenBtn:.btn-filter-open, form:data-filter-form}">
							<div class="category-filter-box">
								<div class="f-title-box">
									<span class="tit-text">MEN</span> <a class="uk-close btn-close"></a>
								</div>

								<div class="f-cagetory-sect borderline-top">
									<ul id="category-filter-list"
										data-component-filtercategory="{url:/w/men/fw}">
										<li class="f-item shoes-1edpth" id="one-depth-shoes"><a
											data-click-area="LHN" data-click-name="신발" href="#">신발</a></li>
										<li class="f-item shoes-2edpth active" id="two-depth-shoes"
											style="padding-left: 14px;"><a data-click-area="LHN"
											data-click-name="신발 전체" href="#">신발 전체</a></li>

										<li class="f-item shoes-2edpth" id="two-depth-shoes"
											style="padding-left: 14px;"><a data-click-area="LHN"
											data-click-name="라이프스타일" href="#">라이프스타일</a></li>

										<li class="f-item shoes-2edpth" id="two-depth-shoes"
											style="padding-left: 14px;"><a data-click-area="LHN"
											data-click-name="러닝" href="#">러닝</a></li>

										<li class="f-item shoes-2edpth" id="two-depth-shoes"
											style="padding-left: 14px;"><a data-click-area="LHN"
											data-click-name="트레이닝 &amp; 짐" href="#">트레이닝 &amp; 짐</a></li>

										<li class="f-item shoes-2edpth" id="two-depth-shoes"
											style="padding-left: 14px;"><a data-click-area="LHN"
											data-click-name="농구" href="#">농구</a></li>

										<li class="f-item shoes-2edpth" id="two-depth-shoes"
											style="padding-left: 14px;"><a data-click-area="LHN"
											data-click-name="조던" href="#">조던</a></li>

										<li class="f-item shoes-2edpth" id="two-depth-shoes"
											style="padding-left: 14px;"><a data-click-area="LHN"
											data-click-name="축구" href="#">축구</a></li>

										<li class="f-item shoes-2edpth" id="two-depth-shoes"
											style="padding-left: 14px;"><a data-click-area="LHN"
											data-click-name="스케이트보딩" href="#">스케이트보딩</a></li>

										<li class="f-item shoes-2edpth" id="two-depth-shoes"
											style="padding-left: 14px;"><a data-click-area="LHN"
											data-click-name="골프" href="#">골프</a></li>

										<li class="f-item shoes-2edpth" id="two-depth-shoes"
											style="padding-left: 14px;"><a data-click-area="LHN"
											data-click-name="테니스" href="#">테니스</a></li>

										<li class="f-item" id="more"
											style="padding-left: 14px; display: none;"><a
											href="javascript:;">더보기 + </a></li>

										<li class="f-item"><a data-click-area="LHN"
											data-click-name="의류 전체" href="#">의류 전체</a></li>

										<li class="f-item"><a data-click-area="LHN"
											data-click-name="후디 &amp; 크루" href="#">후디 &amp; 크루</a></li>

										<li class="f-item"><a data-click-area="LHN"
											data-click-name="아우터웨어" href="#">아우터웨어</a></li>

										<li class="f-item"><a data-click-area="LHN"
											data-click-name="팬츠 &amp; 타이츠" href="#">팬츠 &amp; 타이츠</a></li>

										<li class="f-item"><a data-click-area="LHN"
											data-click-name="탑 &amp; 티셔츠" href="#">탑 &amp; 티셔츠</a></li>

										<li class="f-item"><a data-click-area="LHN"
											data-click-name="숏 팬츠" href="#">숏 팬츠</a></li>

										<li class="f-item"><a data-click-area="LHN"
											data-click-name="나이키 프로" href="#">나이키 프로</a></li>

										<li class="f-item"><a data-click-area="LHN"
											data-click-name="가방" href="#">가방</a></li>

										<li class="f-item"><a data-click-area="LHN"
											data-click-name="양말" href="#">양말</a></li>

										<li class="f-item"><a data-click-area="LHN"
											data-click-name="모자 &amp; 용품" href="#">모자 &amp; 용품</a></li>
									</ul>
								</div>
							</div>
							<!-- / category-filter-box -->
						</section>
					</form>

					<section class="section-category">
						<div class="category-header" data-category-header-content="">
							<div class="content-container">
								<div class="redactor-editor">
									<div class="pwhArea pc-only">
										<div class="bgArea">
											<img alt="bg"
												src="https://static-breeze.nike.co.kr/kr/ko_kr/cmsstatic/structured-content/2357/180830_pwh_men_all_shoes_p1_bg.jpg">
										</div>
										<div class="txtArea">
											<img alt="당신을 위한 완벽한 신발. 원하는 운동과 목적에 최적화된 맞춤형 신발을 찾아보세요"
												src="https://static-breeze.nike.co.kr/kr/ko_kr/cmsstatic/display/assets/1/p1_shoes_pwh_title_161013.png">
										</div>
										<ul class="linkArea">
											<li class="on"><a href="#"><span class="btn_buy"
													style="display: none; opacity: 1;">구매하기</span> </a>
												<p class="txt_btn">
													<a href="#"><span>러닝</span></a>
												</p></li>
											<li class="on"><a href="#"><span class="btn_buy"
													style="display: none; opacity: 1;">구매하기</span> </a>
												<p class="txt_btn">
													<a href="#"><span>트레이닝</span></a>
												</p></li>
											<li class="on"><a href="#"><span class="btn_buy"
													style="display: none; opacity: 1;">구매하기</span> </a>
												<p class="txt_btn">
													<a href="#"><span>라이프스타일</span></a>
												</p></li>
											<li class="on"><a href="#"><span class="btn_buy"
													style="opacity: 1; display: none;">구매하기</span> </a>
												<p class="txt_btn">
													<a href="#"><span>농구</span></a>
												</p></li>
											<li class="on"><a href="#"><span class="btn_buy"
													style="opacity: 1;">구매하기</span> </a>
												<p class="txt_btn">
													<a href="#"><span>축구</span></a>
												</p></li>
										</ul>
									</div>

									<div class="mobileCbArea mobile-only">
										<ul class="mobileTab">
											<li class="trisection"><a href="#"><span>러닝</span></a></li>
											<li class="trisection"><a href="#"><span>트레이닝</span></a></li>
											<li class="trisection"><a href="#"><span>라이프스타일</span></a></li>
											<li class="bisection"><a href="#"><span>농구</span></a></li>
											<li class="bisection"><a href="#"><span>축구</span></a></li>
										</ul>
									</div>
								</div>
							</div>
						</div>
						<div class="filter-wrap_category">
							<div class="filter-tagbox">
								<div class="filter-tit">
									신발 <span class="num">(${totalCount})</span>
								</div>
								<div class="filter_check_wrap"></div>
							</div>
							<div class="select-box sort right pc"
								data-component-select="{'changeType':'submit', 'icon':'icon-arrow_bottom'}">
								<a class="select-head"><span class="currentOpt">신상품순</span></a>
								<ul class="select-body">
									<li class="list"><a href="" data-value=""><span
											class="label">SORT BY</span></a></li>
									<li class="list checked "><a href="default"
										data-value="default"><span class="label">신상품순</span></a></li>
									<li class="list  "><a href="price desc"
										data-value="price desc"><span class="label">높은 가격순</span></a></li>
									<li class="list  "><a href="price asc"
										data-value="price asc"><span class="label">낮은 가격순</span></a></li>
								</ul>
								<select name="sort">
									<option value="">SORT BY</option>
									<option value="default" selected="selected">신상품순</option>
									<option value="price desc">높은 가격순</option>
									<option value="price asc">낮은 가격순</option>
								</select>
							</div>


						</div>
						<script type="text/javascript">
							$(function() {
								$(".action-hover").mouseenter(function() {
									$(this).parent().attr("class", "hover");
								});
								$(".action-hover").mouseleave(function() {
									$(this).parent().attr("class", "");
								});
							})
						</script>
						<ul class="uk-grid item-list-wrap">
							<c:forEach items="${list}" var="productDTO" varStatus="i">
								<li
									class="product-item uk-width-1-2 uk-width-small-1-2 uk-width-medium-1-3 uk-width-large-1-5">
									<div>
										<div class="action-hover">
											<div class="item-imgwrap">
												<a
													href="./productSelectOne.do?code=${productDTO.productCode}">
													<span class="category-overlaytext"> </span> <img
													src="/mall_project/upload/${file[i.index].fname}">
												</a>
												<div class="item-opt-box">
													<span class="item-label_ico left"> <span
														class="brz-badge-container"> </span>
													</span>
												</div>
											</div>

										</div>
										<div class="item-info">
											<span class="item-title">${productDTO.productName}</span>
											<div class="item-location">
												<span>${productDTO.kind}</span>
											</div>

											<span class="item-price"> <span>${productDTO.price}
													원</span>
											</span>
										</div>
									</div> <!-- 검색 -->
								</li>
							</c:forEach>
						</ul>

						<div class="container-fluid" align="center">
							<div class="row">
								<div style="float: left;">
									<a href="./${board}Write.do" class="btn btn-primary">Write</a>
								</div>

								<ul class="pagination">
									<li><a href="./${board}List.do?curPage==1"><span
											class="glyphicon glyphicon-backward"></span></a></li>

									<c:if test="${pager.curBlock gt 1}">
										<li><a
											href="./${board}List.do?curPage=${pager.startNum-1}"><span
												class="glyphicon glyphicon-chevron-left"></span></a></li>
									</c:if>

									<c:forEach begin="${pager.startNum}" end="${pager.lastNum}"
										var="i">
										<li><a href="./${board}List.do?curPage=${i}">${i}</a></li>
									</c:forEach>


									<c:if test="${pager.curBlock lt pager.totalBlock}">
										<li><a
											href="./${board}List.do?curPage=${pager.lastNum+1}"><span
												class="glyphicon glyphicon-chevron-right"></span></a></li>
									</c:if>
									<li><a href="./${board}List.do?curPage=${pager.totalPage}"><span
											class="glyphicon glyphicon-forward"></span></a></li>
								</ul>
							</div>
						</div>
					</section>
				</article>
			</section>
		</section>
	</div>
	<c:import url="../../../temp/footer.jsp"></c:import>
</body>
</html>