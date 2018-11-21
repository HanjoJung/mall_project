<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>쇼핑몰 프로젝트</title>
<jsp:include page="./temp/bootStrap.jsp"></jsp:include>
<script src="/mall_project/js/index.js"></script>
<link href="/mall_project/css/index.css" rel="stylesheet"
	type="text/css">
</head>
<body>
	<jsp:include page="./temp/header.jsp"></jsp:include>
	<div class="container-fluid wrapper content-container">
		<div class="row redactor-editor">
			<div class="col-lg-1"></div>
			<div class="col-lg-10 pwhArea pc-only">
				<div class="bgArea">
					<img alt="bg"
						src="${pageContext.request.contextPath}/images/180830_pwh_men_all_shoes_p1_bg.jpg">
				</div>
				<div class="txtArea">
					<img alt="당신을 위한 완벽한 신발. 원하는 운동과 목적에 최적화된 맞춤형 신발을 찾아보세요"
						src="${pageContext.request.contextPath}/images/p1_shoes_pwh_title_161013.png">
				</div>
				<ul class="linkArea">
					<li class="on"><a data-click-area="pwh"
						data-click-name="pwh_1_180319_running" href="#"><span
							class="btn_buy" style="opacity: 1; display: none;">구매하기</span> </a>
						<p class="txt_btn">
							<a data-click-area="pwh" data-click-name="pwh_1_180319_running"
								href="#"><span>러닝</span></a>
						</p></li>
					<li class="on"><a data-click-area="pwh"
						data-click-name="pwh_2_180319_training &amp; gym" href="#"><span
							class="btn_buy" style="opacity: 1; display: none;">구매하기</span> </a>
						<p class="txt_btn">
							<a data-click-area="pwh"
								data-click-name="pwh_2_180319_training &amp; gym" href="#"><span>트레이닝</span></a>
						</p></li>
					<li class="on"><a data-click-area="pwh"
						data-click-name="pwh_3_180319_lifestyle" href="#"><span
							class="btn_buy" style="opacity: 1; display: none;">구매하기</span> </a>
						<p class="txt_btn">
							<a data-click-area="pwh" data-click-name="pwh_3_180319_lifestyle"
								href="#"><span>라이프스타일</span></a>
						</p></li>
					<li class="on"><a data-click-area="pwh"
						data-click-name="pwh_4_180319_basketball" href="#"><span
							class="btn_buy" style="opacity: 1; display: none;">구매하기</span> </a>
						<p class="txt_btn">
							<a data-click-area="pwh"
								data-click-name="pwh_4_180319_basketball" href="#"><span>농구</span></a>
						</p></li>
					<li class="on"><a data-click-area="pwh"
						data-click-name="pwh_5_180319_football" href="#"><span
							class="btn_buy" style="opacity: 1; display: none;">구매하기</span> </a>
						<p class="txt_btn">
							<a data-click-area="pwh" data-click-name="pwh_5_180319_football"
								href="#"><span>축구</span></a>
						</p></li>
				</ul>
			</div>
			<div class="col-lg-1"></div>
		</div>
		<div class="row">
			<div class="col-lg-1"></div>
			<div class="col-lg-10">
				<div>
					<h3>신상품</h3>
				</div>
			</div>
			<div class="col-lg-1"></div>
		</div>
		<div class="row border">
			<div class="col-lg-1"></div>
			<div class="col-lg-10">
				<div class="wrap-pl product-item" id="p1">
					<div>
						<div class="action-hover">
							<a href="#"><img
								src="/mall_project/images/KakaoTalk_20181116_115549319.jpg"></a>
						</div>
						<div class="item-info">
							<a href="#"><span class="item-title">나이키 클래식 코르테즈 프리미엄</span></a>
							<div class="item-location">
								<span>MEN 신발 라이프스타일</span>
							</div>
							<span class="item-price"><span>119,000 원</span></span>
						</div>
					</div>
					<div>
						<div class="action-hover">
							<a href="#"><img
								src="/mall_project/images/AH7365-400_AH7365-400_primary.jpg"></a>
						</div>
						<div class="item-info">
							<a href="#"><span class="item-title">나이키 클래식 코르테즈 프리미엄</span></a>
							<div class="item-location">
								<span>MEN 신발 라이프스타일</span>
							</div>
							<span class="item-price"><span>119,000 원</span></span>
						</div>
					</div>
					<div>
						<div class="action-hover">
							<a href="#"><img
								src="/mall_project/images/AH7365-400_AH7365-400_primary.jpg"></a>
						</div>
						<div class="item-info">
							<a href="#"><span class="item-title">나이키 클래식 코르테즈 프리미엄</span></a>
							<div class="item-location">
								<span>MEN 신발 라이프스타일</span>
							</div>
							<span class="item-price"><span>119,000 원</span></span>
						</div>
					</div>
					<div>
						<div class="action-hover">
							<a href="#"><img
								src="/mall_project/images/AH7365-400_AH7365-400_primary.jpg"></a>
						</div>
						<div class="item-info">
							<a href="#"><span class="item-title">나이키 클래식 코르테즈 프리미엄</span></a>
							<div class="item-location">
								<span>MEN 신발 라이프스타일</span>
							</div>
							<span class="item-price"><span>119,000 원</span></span>
						</div>
					</div>
					<div>
						<div class="action-hover">
							<a href="#"><img
								src="/mall_project/images/AH7365-400_AH7365-400_primary.jpg"></a>
						</div>
						<div class="item-info">
							<a href="#"><span class="item-title">나이키 클래식 코르테즈 프리미엄</span></a>
							<div class="item-location">
								<span>MEN 신발 라이프스타일</span>
							</div>
							<span class="item-price"><span>119,000 원</span></span>
						</div>
					</div>
					<div>
						<div class="action-hover">
							<a href="#"><img
								src="/mall_project/images/AH7365-400_AH7365-400_primary.jpg"></a>
						</div>
						<div class="item-info">
							<a href="#"><span class="item-title">나이키 클래식 코르테즈 프리미엄</span></a>
							<div class="item-location">
								<span>MEN 신발 라이프스타일</span>
							</div>
							<span class="item-price"><span>119,000 원</span></span>
						</div>
					</div>
					<div>
						<div class="action-hover">
							<a href="#"><img
								src="/mall_project/images/AH7365-400_AH7365-400_primary.jpg"></a>
						</div>
						<div class="item-info">
							<a href="#"><span class="item-title">나이키 클래식 코르테즈 프리미엄</span></a>
							<div class="item-location">
								<span>MEN 신발 라이프스타일</span>
							</div>
							<span class="item-price"><span>119,000 원</span></span>
						</div>
					</div>
					<div>
						<div class="action-hover">
							<a href="#"><img
								src="/mall_project/images/AH7365-400_AH7365-400_primary.jpg"></a>
						</div>
						<div class="item-info">
							<a href="#"><span class="item-title">나이키 클래식 코르테즈 프리미엄</span></a>
							<div class="item-location">
								<span>MEN 신발 라이프스타일</span>
							</div>
							<span class="item-price"><span>119,000 원</span></span>
						</div>
					</div>
					<div>
						<div class="action-hover">
							<a href="#"><img
								src="/mall_project/images/AH7365-400_AH7365-400_primary.jpg"></a>
						</div>
						<div class="item-info">
							<a href="#"><span class="item-title">나이키 클래식 코르테즈 프리미엄</span></a>
							<div class="item-location">
								<span>MEN 신발 라이프스타일</span>
							</div>
							<span class="item-price"><span>119,000 원</span></span>
						</div>
					</div>
					<div>
						<div class="action-hover">
							<a href="#"><img
								src="/mall_project/images/bg-shutdown.jpg" class="img-responsive"></a>
						</div>
						<div class="item-info">
							<a href="#"><span class="item-title">나이키 클래식 코르테즈 프리미엄</span></a>
							<div class="item-location">
								<span>MEN 신발 라이프스타일</span>
							</div>
							<span class="item-price"><span>119,000 원</span></span>
						</div>
					</div>
				</div>
			</div>
			<div class="col-lg-1"></div>
		</div>
	</div>
	<jsp:include page="./temp/footer.jsp"></jsp:include>
</body>
</html>