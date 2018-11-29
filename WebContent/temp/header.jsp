<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<script src="/mall_project/js/index.js"></script>
<script type="text/javascript">
	$(document).ready(function() {
		$(".log_user").click(function() {
			if ($("#account-box").attr("class") == "account-box uk-hidden") {
				$("#account-box").attr("class", "account-box");
				$(this).attr("class", "log_user on")
			} else {
				$("#account-box").attr("class", "account-box uk-hidden");
				$(this).attr("class", "log_user")
			}
		});
		
		$("#btn-add").on("click", function(event) {
			var size = $("#size").val();
			if ( size == "") {
				alert("사이즈를 선택하세요!");
			} else if ('${member.id}' == '') {
				alert("회원만 구입 가능합니다");
			} else {
				alert("상품명   ${pDTO.productName}  1개를 장바구니에 담았습니다");
				$.post('${pageContext.request.contextPath}/basket/basketAdd.do?id=${member.id}&productCode=${pDTO.productCode}&productSize='+size);
				$.post('${pageContext.request.contextPath}/basket/minicart.do?id=${member.id}');
			}
		});		

		$(".cart").click(function() {
			$(this).removeClass('cartadd');
			$('body').removeClass('stop-scrolling');
		});
	
		$(".cart-main").click(function(e) {
			e.stopPropagation();
		});
	});
</script>
<script src="/mall_project/js/index.js?=fgrt"></script>
<link href="/mall_project/css/index.css" rel="stylesheet"
	type="text/css">
<header class="header_layout_1">
	<div class="header-gnb">
		<div class="uk-clearfix header-gnb_maxwidth">
			<ul class="uk-float-left header-brand">
				<li><a
					href="${pageContext.request.contextPath}/member/memberList.do"><span>회원</span></a></li>
				<li><a
					href="${pageContext.request.contextPath}/product/productList.do"><span>제품</span></a></li>
				<li><a
					href="${pageContext.request.contextPath}/notice/noticeList.do"><span>게시판</span></a></li>
				<li><a href="${pageContext.request.contextPath}/qna/qnaList.do"><span>QNA</span></a></li>
			</ul>
			<ul class="uk-float-right header-mymenu">
				<c:choose>
					<c:when test="${empty member}">
						<li><span> <a class="join"
								href="${pageContext.request.contextPath}/member/memberJoin.do">회원가입</a>
								<a style="padding: 0px;">/</a> <a data-toggle="modal"
								data-target="#myModal"
								href="${pageContext.request.contextPath}/member/memberLogin.do"
								class="login">로그인</a></span></li>
					</c:when>
					<c:otherwise>
						<li><span class="log_user"><i class="ns-profile"></i><a
								class="user_name">${member.name}</a> </span>
							<div class="account-box uk-hidden" id="account-box"
								aria-hidden="true">
								<a title="마이페이지"
									href="${pageContext.request.contextPath}/member/memberSelectOne.do">마이페이지</a>
								<a title="로그아웃"
									href="${pageContext.request.contextPath}/member/memberLogout.do">로그아웃</a>
							</div></li>
					</c:otherwise>
				</c:choose>
				<li><a
					href="${pageContext.request.contextPath}/cscenter/cscenter.do">고객센터</a></li>
				<li><a class="cart-item"
					href="${pageContext.request.contextPath}/basket/selectList.do?id=${member.id}"><i
						class="ns-cart"></i> </a></li>
				<li><a href="#"><span class="flag-kr" title="대한민국"></span></a></li>
			</ul>
		</div>
	</div>
	<article class="contents">
		<nav class="header-lnb">
			<a class="header-logo"
				href="${pageContext.request.contextPath}/index.jsp"> <span
				class="ns-swoosh"></span>
			</a>
			<ul class="header-menu_onedepth">
				<li class="onedepth-list"><a
					href="${pageContext.request.contextPath}/product/productList.do"
					class="">MEN</a>
					<div class="header-menu_twodepth">
						<div class="twodepth-maxwidth">
							<ul class="twodepth-submenu-t1">
								<ul class="header-menu_threedepth">
									<li><a href="#" data-click-area="GNB_feature"
										data-click-name="신상품">신상품</a></li>
									<li><a href="#" data-click-area="GNB_feature"
										data-click-name="SNKRS 런칭 캘린더">SNKRS 런칭 캘린더</a></li>
									<li><a href="#" data-click-area="GNB_feature"
										data-click-name="아우터웨어 컬렉션">아우터웨어 컬렉션</a></li>
									<li><a href="#" data-click-area="GNB_feature"
										data-click-name="SB x NBA 컬렉션">SB x NBA 컬렉션</a></li>
									<li><a href="#" data-click-area="GNB_feature"
										data-click-name="레트로 컬렉션">레트로 컬렉션</a></li>
									<li><a href="#" data-click-area="GNB_feature"
										data-click-name="에어로로프트 컬렉션">에어로로프트 컬렉션</a></li>
									<li><a href="#" data-click-area="GNB_feature"
										data-click-name="THE BEST">THE BEST</a></li>
									<li><a href="#" data-click-area="GNB_feature"
										data-click-name="1 on 1 상품 설명 서비스">1 on 1 상품 설명 서비스</a></li>
									<li><a href="#" data-click-area="GNB_feature"
										data-click-name="가격인하">가격인하</a></li>
								</ul>
							</ul>
							<ul class="twodepth-submenu-t2">
								<li class="twodepth-list"><a href="/mall_project/index.jsp"
									data-click-area="GNB" data-click-name="MEN_신발">신발</a>
									<ul class="header-menu_threedepth">
										<li class="threedepth-list"><a
											href="${pageContext.request.contextPath}/product/productList.do"
											data-click-area="GNB" data-click-name="MEN_신발_신발 전체">신발
												전체</a></li>
										<li class="threedepth-list"><a
											href="${pageContext.request.contextPath}/product/productList.do"
											data-click-area="GNB" data-click-name="MEN_신발_라이프스타일">라이프스타일</a></li>
										<li class="threedepth-list"><a
											href="${pageContext.request.contextPath}/product/productList.do"
											data-click-area="GNB" data-click-name="MEN_신발_러닝">러닝</a></li>
										<li class="threedepth-list"><a
											href="${pageContext.request.contextPath}/product/productList.do"
											data-click-area="GNB" data-click-name="MEN_신발_트레이닝 &amp; 짐">트레이닝
												&amp; 짐</a></li>
										<li class="threedepth-list"><a
											href="${pageContext.request.contextPath}/product/productList.do"
											data-click-area="GNB" data-click-name="MEN_신발_농구">농구</a></li>
										<li class="threedepth-list"><a
											href="${pageContext.request.contextPath}/product/productList.do"
											data-click-area="GNB" data-click-name="MEN_신발_조던">조던</a></li>
										<li class="threedepth-list"><a
											href="${pageContext.request.contextPath}/product/productList.do"
											data-click-area="GNB" data-click-name="MEN_신발_축구">축구</a></li>
										<li class="threedepth-list"><a
											href="${pageContext.request.contextPath}/product/productList.do"
											data-click-area="GNB" data-click-name="MEN_신발_스케이트보딩">스케이트보딩</a>
										</li>
										<li class="threedepth-list"><a
											href="${pageContext.request.contextPath}/product/productList.do"
											data-click-area="GNB" data-click-name="MEN_신발_골프">골프</a></li>
										<li class="threedepth-list"><a
											href="${pageContext.request.contextPath}/product/productList.do"
											data-click-area="GNB" data-click-name="MEN_신발_테니스">테니스</a></li>
									</ul></li>
							</ul>
						</div>
					</div></li>
			</ul>
			</a>
			</div>
			<div class="gnb-search-field"
				data-module-search="{keywordMaxLen:10, isLatestKeyword:false}">
				<form method="GET" id="search-form"
					action="${pageContext.request.contextPath}/product/productList.do">
					<input type="hidden" name="order" value="${param.order}">
					<input type="hidden" name="text" value="${text}">
					<fieldset>
						<legend>gift search</legend>
						<div class="search-field"
							data-component-searchfield="{submit:#search-form}">
							<span class="input-textfield width-max"> <input
								type="search" id="main_search"
								class="jq_search ui-autocomplete-input" name="search"
								placeholder="검색" autocomplete="off" value=""> <span
								class="search_icon mobile-only"><i class="ns-search"></i></span>
								<span class="btn-wrap">
									<button class="delete">
										<i class="" id="jq_icon-delete_thin"></i>
									</button>
							</span>
							</span>
							<button class="btn_search width-fix btn-search-mobile">
								<span class="text">검색</span><i class="ns-search"></i>
							</button>
						</div>
					</fieldset>
				</form>
			</div>
			<div class="header-menu_mobile">
				<a href="#"
					data-uk-offcanvas="{target:'#mobile-menu', mode:'reveal'}"><span
					class="ns-menu"></span></a>
			</div>
		</nav>
	</article>
</header>
<div class="cart uk-offcanvas" id="minicart">
	<div
		class="cart-main section-minicart uk-offcanvas-bar uk-offcanvas-bar-flip">
		<input type="hidden" name="itemSize" value="1"> <input
			type="hidden" name="cartId" value="">
		<div class="cart-order_list uk-grid" id="cart-order_list">
			<div class="uk-width-1-1">
				<h5 class="minicart-title">미니 장바구니</h5>
			</div>
			<div class="uk-width-1-1">
				<c:forEach items="${blist}" var="bDTO" varStatus="i">
					<h2>${bDTO.productCode}test</h2>
					<dl class="order-list" data-product-item="">
						<dt class="image-wrap">
							<img src="/mall_project/upload/${bDTO.fname}" alt="">
						</dt>
						<dd class="order-info">
							<a class="tit"
								href="./productSelectOne.do?code=${productDTO.productCode}"
								title="${bDTO.productName}">${bDTO.productName}</a>
							<div class="style-code">스타일 : ${bDTO.productCode}</div>
							<span class="uk-hidden"></span> <span class="opt quantity">수량:
								${blist.size()}</span> <span class="price-wrap">
								<div class="total-price">
									<strong class="retail-price">${bDTO.price} 원</strong>
								</div>
							</span>
						</dd>
					</dl>
				</c:forEach>
			</div>
			<div class="cart-order_price uk-grid">
				<span class="order-price uk-width-1-1"> <span>총 상품금액</span> <strong>
						원</strong>
				</span>
			</div>
			<div class="cart-order_deliveryinfo uk-grid">
				<div class="uk-width-1-1">배송비는 주문서에서 확인이 가능합니다.</div>
			</div>
			<div class="cart-order_buy uk-grid">
				<div class="uk-width-1-1">
					<a class="btn-link width-max large line"
						href="${pageContext.request.contextPath}/basket/selectList.do?id=${member.id}">장바구니
						가기</a>
				</div>
			</div>
		</div>
	</div>
</div>