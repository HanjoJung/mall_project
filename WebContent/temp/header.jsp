<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
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
				<li><span> <c:choose>
							<c:when test="${empty member}">
								<a class="join"
									href="${pageContext.request.contextPath}/member/memberJoin.do">회원가입</a>
								<a style="padding: 0px;">/</a>
								<a data-toggle="modal" data-target="#myModal"
									href="${pageContext.request.contextPath}/member/memberLogin.do"
									class="login">로그인</a>
							</c:when>
							<c:otherwise>
								<a class="join"
									href="${pageContext.request.contextPath}/member/memberSelectOne.do">
									내 정보</a>
								<a style="padding: 0px;">/</a>
								<a class="login"
									href="${pageContext.request.contextPath}/member/memberLogout.do">
									로그아웃</a>
							</c:otherwise>
						</c:choose>

				</span></li>
				<li><a href="#">고객센터</a></li>
				<li><a href="#" class="cart-item empty"><i class="ns-cart"></i>
						장바구니</a></li>
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
										<li class="threedepth-list"><a href="#"
											data-click-area="GNB" data-click-name="MEN_신발_라이프스타일">라이프스타일</a></li>
										<li class="threedepth-list"><a href="#"
											data-click-area="GNB" data-click-name="MEN_신발_러닝">러닝</a></li>
										<li class="threedepth-list"><a href="#"
											data-click-area="GNB" data-click-name="MEN_신발_트레이닝 &amp; 짐">트레이닝
												&amp; 짐</a></li>
										<li class="threedepth-list"><a href="#"
											data-click-area="GNB" data-click-name="MEN_신발_농구">농구</a></li>
										<li class="threedepth-list"><a href="#"
											data-click-area="GNB" data-click-name="MEN_신발_조던">조던</a></li>
										<li class="threedepth-list"><a href="#"
											data-click-area="GNB" data-click-name="MEN_신발_축구">축구</a></li>
										<li class="threedepth-list"><a href="#"
											data-click-area="GNB" data-click-name="MEN_신발_스케이트보딩">스케이트보딩</a>
										</li>
										<li class="threedepth-list"><a href="#"
											data-click-area="GNB" data-click-name="MEN_신발_골프">골프</a></li>
										<li class="threedepth-list"><a href="#"
											data-click-area="GNB" data-click-name="MEN_신발_테니스">테니스</a></li>
									</ul></li>
							</ul>
						</div>
					</div></li>
			</ul>
			<!-- <ul class="header-menu_onedepth" data-module-gnb="{type:type1}">
				<li class="onedepth-list"><a href="/kr/ko_kr/l/men"
					data-click-area="GNB" data-click-name="MEN" class="active">MEN</a>
					<div class="header-menu_twodepth active">
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
								<li class="twodepth-list"><a href="#" data-click-area="GNB"
									data-click-name="MEN_신발">신발</a>
									<ul class="header-menu_threedepth">
										<li class="threedepth-list"><a href="#"
											data-click-area="GNB" data-click-name="MEN_신발_신발 전체">신발
												전체</a></li>
										<li class="threedepth-list"><a href="#"
											data-click-area="GNB" data-click-name="MEN_신발_라이프스타일">라이프스타일</a></li>
										<li class="threedepth-list"><a href="#"
											data-click-area="GNB" data-click-name="MEN_신발_러닝">러닝</a></li>
										<li class="threedepth-list"><a href="#"
											data-click-area="GNB" data-click-name="MEN_신발_트레이닝 &amp; 짐">트레이닝
												&amp; 짐</a></li>
										<li class="threedepth-list"><a href="#"
											data-click-area="GNB" data-click-name="MEN_신발_농구">농구</a></li>
										<li class="threedepth-list"><a href="#"
											data-click-area="GNB" data-click-name="MEN_신발_조던">조던</a></li>
										<li class="threedepth-list"><a href="#"
											data-click-area="GNB" data-click-name="MEN_신발_축구">축구</a></li>
										<li class="threedepth-list"><a href="#"
											data-click-area="GNB" data-click-name="MEN_신발_스케이트보딩">스케이트보딩</a>
										</li>
										<li class="threedepth-list"><a href="#"
											data-click-area="GNB" data-click-name="MEN_신발_골프">골프</a></li>
										<li class="threedepth-list"><a href="#"
											data-click-area="GNB" data-click-name="MEN_신발_테니스">테니스</a></li>
									</ul></li>
							</ul>
							<ul class="twodepth-submenu-t2">
								<li class="twodepth-list"><a href="#" data-click-area="GNB"
									data-click-name="MEN_의류">의류</a>
									<ul class="header-menu_threedepth">
										<li class="threedepth-list"><a href="#"
											data-click-area="GNB" data-click-name="MEN_의류_의류 전체">의류
												전체</a></li>
										<li class="threedepth-list"><a href="#"
											data-click-area="GNB" data-click-name="MEN_의류_후디 &amp; 크루">후디
												&amp; 크루</a></li>
										<li class="threedepth-list"><a href="#"
											data-click-area="GNB" data-click-name="MEN_의류_아우터웨어">아우터웨어</a></li>
										<li class="threedepth-list"><a href="#"
											data-click-area="GNB" data-click-name="MEN_의류_팬츠 &amp; 타이츠">팬츠
												&amp; 타이츠</a></li>
										<li class="threedepth-list"><a href="#"
											data-click-area="GNB" data-click-name="MEN_의류_탑 &amp; 티셔츠">탑
												&amp; 티셔츠</a></li>
										<li class="threedepth-list"><a href="#"
											data-click-area="GNB" data-click-name="MEN_의류_숏 팬츠">숏 팬츠</a></li>
										<li class="threedepth-list"><a href="#"
											data-click-area="GNB" data-click-name="MEN_의류_나이키 프로">나이키
												프로</a></li>
										<li class="threedepth-list"><a href="#"
											data-click-area="GNB" data-click-name="MEN_의류_가방">가방</a></li>
										<li class="threedepth-list"><a href="#"
											data-click-area="GNB" data-click-name="MEN_의류_양말">양말</a></li>
										<li class="threedepth-list"><a href="#"
											data-click-area="GNB" data-click-name="MEN_의류_모자 &amp; 용품">모자
												&amp; 용품</a></li>
									</ul></li>
							</ul>
							<ul class="twodepth-submenu-t2">
								<li class="twodepth-list"><a href="/kr/ko_kr/l/men"
									data-click-area="GNB" data-click-name="MEN_스포츠">스포츠</a>
									<ul class="header-menu_threedepth">
										<li class="threedepth-list"><a
											href="/kr/ko_kr/l/men/running" data-click-area="GNB"
											data-click-name="MEN_스포츠_러닝">러닝</a></li>
										<li class="threedepth-list"><a
											href="/kr/ko_kr/l/men/gym-training" data-click-area="GNB"
											data-click-name="MEN_스포츠_트레이닝 &amp; 짐">트레이닝 &amp; 짐</a></li>
										<li class="threedepth-list"><a
											href="/kr/ko_kr/l/men/basketball" data-click-area="GNB"
											data-click-name="MEN_스포츠_농구">농구</a></li>
										<li class="threedepth-list"><a
											href="/kr/ko_kr/l/men/football" data-click-area="GNB"
											data-click-name="MEN_스포츠_축구">축구</a></li>
										<li class="threedepth-list"><a
											href="/kr/ko_kr/l/men/skateboarding" data-click-area="GNB"
											data-click-name="MEN_스포츠_스케이트보딩">스케이트보딩</a></li>
										<li class="threedepth-list"><a
											href="/kr/ko_kr/l/men/golf" data-click-area="GNB"
											data-click-name="MEN_스포츠_골프">골프</a></li>
										<li class="threedepth-list"><a href="/kr/ko_kr/l/tennis"
											data-click-area="GNB" data-click-name="MEN_스포츠_테니스">테니스</a></li>
									</ul></li>
							</ul>
							<ul class="twodepth-submenu-t2">
								<li class="twodepth-list"><a href="/kr/ko_kr/l/men"
									data-click-area="GNB" data-click-name="MEN_브랜드">브랜드</a>
									<ul class="header-menu_threedepth">
										<li class="threedepth-list"><a
											href="/kr/ko_kr/l/sportswear" data-click-area="GNB"
											data-click-name="MEN_브랜드_Nike Sportswear">Nike Sportswear</a></li>
										<li class="threedepth-list"><a href="/kr/ko_kr/l/nikelab"
											data-click-area="GNB" data-click-name="MEN_브랜드_NikeLab">NikeLab</a></li>
										<li class="threedepth-list"><a href="/kr/ko_kr/l/jordan"
											data-click-area="GNB" data-click-name="MEN_브랜드_Jordan">Jordan</a>
										</li>
										<li class="threedepth-list"><a href="/kr/ko_kr/l/nba"
											data-click-area="GNB" data-click-name="MEN_브랜드_NBA">NBA</a></li>
										<li class="threedepth-list"><a
											href="/kr/ko_kr/w/men/fan-gear" data-click-area="GNB"
											data-click-name="MEN_브랜드_FAN GEAR">FAN GEAR</a></li>
										<li class="threedepth-list"><a href="/kr/ko_kr/l/acg"
											data-click-area="GNB" data-click-name="MEN_브랜드_ACG">ACG</a></li>
									</ul></li>
							</ul>
						</div>
					</div></li> -->
			<!-- <li class="onedepth-list"><a href="/kr/ko_kr/l/women"
					data-click-area="GNB" data-click-name="WOMEN">WOMEN</a>
					<div class="header-menu_twodepth">
						<div class="twodepth-maxwidth">
							<ul class="twodepth-submenu-t1">
								<ul class="header-menu_threedepth">
									<li><a href="/kr/ko_kr/w/women/xb/xc/f/new"
										data-click-area="GNB_feature" data-click-name="신상품">신상품</a></li>
									<li><a href="/kr/ko_kr/launch?type=feed"
										data-click-area="GNB_feature" data-click-name="SNKRS 런칭 캘린더">SNKRS
											런칭 캘린더</a></li>
									<li><a href="/kr/ko_kr/w/women/xb/xc/metallic-clash"
										data-click-area="GNB_feature" data-click-name="메탈릭 클래시 컬렉션">메탈릭
											클래시 컬렉션</a></li>
									<li><a href="/kr/ko_kr/w/women/ap/jackets-vests"
										data-click-area="GNB_feature" data-click-name="아우터웨어 컬렉션">아우터웨어
											컬렉션</a></li>
									<li><a href="/kr/ko_kr/w/women/xb/xc/retro-collection"
										data-click-area="GNB_feature" data-click-name="레트로 컬렉션">레트로
											컬렉션</a></li>
									<li><a
										href="/kr/ko_kr/w/xg/ap/running/andlka/arolft-collection"
										data-click-area="GNB_feature" data-click-name="에어로로프트 컬렉션">에어로로프트
											컬렉션</a></li>
									<li><a href="/kr/ko_kr/c/women/f/best"
										data-click-area="GNB_feature" data-click-name="THE BEST">THE
											BEST</a></li>
									<li><a href="/kr/ko_kr/w/women/xb/xc/f/1on1"
										data-click-area="GNB_feature"
										data-click-name="1 on 1 상품 설명 서비스">1 on 1 상품 설명 서비스</a></li>
									<li><a href="/kr/ko_kr/w/women/xb/xc/f/clearance"
										data-click-area="GNB_feature" data-click-name="가격인하">가격인하</a>
									</li>
								</ul>
							</ul>
							<ul class="twodepth-submenu-t2">
								<li class="twodepth-list"><a href="/kr/ko_kr/w/women/fw"
									data-click-area="GNB" data-click-name="WOMEN_신발">신발</a>
									<ul class="header-menu_threedepth">
										<li class="threedepth-list"><a
											href="/kr/ko_kr/w/women/fw" data-click-area="GNB"
											data-click-name="WOMEN_신발_신발 전체">신발 전체</a></li>
										<li class="threedepth-list"><a
											href="/kr/ko_kr/w/women/fw/lifestyle" data-click-area="GNB"
											data-click-name="WOMEN_신발_라이프스타일">라이프스타일</a></li>
										<li class="threedepth-list"><a
											href="/kr/ko_kr/w/women/fw/running" data-click-area="GNB"
											data-click-name="WOMEN_신발_러닝">러닝</a></li>
										<li class="threedepth-list"><a
											href="/kr/ko_kr/w/women/fw/gym-training"
											data-click-area="GNB" data-click-name="WOMEN_신발_트레이닝 &amp; 짐">트레이닝
												&amp; 짐</a></li>
										<li class="threedepth-list"><a
											href="/kr/ko_kr/w/women/fw/golf" data-click-area="GNB"
											data-click-name="WOMEN_신발_골프">골프</a></li>
										<li class="threedepth-list"><a
											href="/kr/ko_kr/w/women/fw/tennis" data-click-area="GNB"
											data-click-name="WOMEN_신발_테니스">테니스</a></li>
									</ul></li>
							</ul>
							<ul class="twodepth-submenu-t2">
								<li class="twodepth-list"><a href="/kr/ko_kr/w/women/ap"
									data-click-area="GNB" data-click-name="WOMEN_의류">의류</a>
									<ul class="header-menu_threedepth">
										<li class="threedepth-list"><a
											href="/kr/ko_kr/w/women/ap" data-click-area="GNB"
											data-click-name="WOMEN_의류_의류 전체">의류 전체</a></li>
										<li class="threedepth-list"><a
											href="/kr/ko_kr/w/women/ap/pants-tights"
											data-click-area="GNB" data-click-name="WOMEN_의류_팬츠 &amp; 타이츠">팬츠
												&amp; 타이츠</a></li>
										<li class="threedepth-list"><a
											href="/kr/ko_kr/w/women/ap/hoodies-crews"
											data-click-area="GNB" data-click-name="WOMEN_의류_후디 &amp; 크루">후디
												&amp; 크루</a></li>
										<li class="threedepth-list"><a
											href="/kr/ko_kr/w/women/ap/jackets-vests"
											data-click-area="GNB" data-click-name="WOMEN_의류_아우터웨어">아우터웨어</a>
										</li>
										<li class="threedepth-list"><a
											href="/kr/ko_kr/w/women/ap/tops-tshirts"
											data-click-area="GNB" data-click-name="WOMEN_의류_탑 &amp; 티셔츠">탑
												&amp; 티셔츠</a></li>
										<li class="threedepth-list"><a
											href="/kr/ko_kr/w/women/ap/xc/sports-bras"
											data-click-area="GNB" data-click-name="WOMEN_의류_스포츠 브라">스포츠
												브라</a></li>
										<li class="threedepth-list"><a
											href="/kr/ko_kr/w/women/ap/shorts" data-click-area="GNB"
											data-click-name="WOMEN_의류_숏 팬츠">숏 팬츠</a></li>
										<li class="threedepth-list"><a
											href="/kr/ko_kr/w/women/ap/skirts-dresses"
											data-click-area="GNB"
											data-click-name="WOMEN_의류_스커트 &amp; 드레스">스커트 &amp; 드레스</a></li>
										<li class="threedepth-list"><a
											href="/kr/ko_kr/w/women/eq/bags" data-click-area="GNB"
											data-click-name="WOMEN_의류_가방">가방</a></li>
										<li class="threedepth-list"><a
											href="/kr/ko_kr/w/women/eq/socks" data-click-area="GNB"
											data-click-name="WOMEN_의류_양말">양말</a></li>
										<li class="threedepth-list"><a
											href="/kr/ko_kr/w/women/eq/accessories-equipment"
											data-click-area="GNB" data-click-name="WOMEN_의류_모자 &amp; 용품">모자
												&amp; 용품</a></li>
									</ul></li>
							</ul>
							<ul class="twodepth-submenu-t2">
								<li class="twodepth-list"><a href="/kr/ko_kr/l/women"
									data-click-area="GNB" data-click-name="WOMEN_스포츠">스포츠</a>
									<ul class="header-menu_threedepth">
										<li class="threedepth-list"><a
											href="/kr/ko_kr/l/women/running" data-click-area="GNB"
											data-click-name="WOMEN_스포츠_러닝">러닝</a></li>
										<li class="threedepth-list"><a
											href="/kr/ko_kr/l/women/gym-training" data-click-area="GNB"
											data-click-name="WOMEN_스포츠_트레이닝  &amp; 짐">트레이닝 &amp; 짐</a></li>
										<li class="threedepth-list"><a
											href="/kr/ko_kr/l/women/golf" data-click-area="GNB"
											data-click-name="WOMEN_스포츠_골프">골프</a></li>
										<li class="threedepth-list"><a href="/kr/ko_kr/l/tennis"
											data-click-area="GNB" data-click-name="WOMEN_스포츠_테니스">테니스</a>
										</li>
										<li class="threedepth-list"><a
											href="/kr/ko_kr/l/women/yoga" data-click-area="GNB"
											data-click-name="WOMEN_스포츠_요가">요가</a></li>
									</ul></li>
							</ul>
							<ul class="twodepth-submenu-t2">
								<li class="twodepth-list"><a href="/kr/ko_kr/l/women"
									data-click-area="GNB" data-click-name="WOMEN_브랜드">브랜드</a>
									<ul class="header-menu_threedepth">
										<li class="threedepth-list"><a
											href="/kr/ko_kr/l/sportswear" data-click-area="GNB"
											data-click-name="WOMEN_브랜드_Nike Sportswear">Nike
												Sportswear</a></li>
										<li class="threedepth-list"><a href="/kr/ko_kr/l/nikelab"
											data-click-area="GNB" data-click-name="WOMEN_브랜드_NikeLab">NikeLab</a></li>
										<li class="threedepth-list"><a href="/kr/ko_kr/l/acg"
											data-click-area="GNB" data-click-name="WOMEN_브랜드_ACG">ACG</a>
										</li>
									</ul></li>
							</ul>
						</div>
					</div></li>
				<li class="onedepth-list"><a href="/kr/ko_kr/l/boys"
					data-click-area="GNB" data-click-name="BOYS">BOYS</a>
					<div class="header-menu_twodepth">
						<div class="twodepth-maxwidth">
							<ul class="twodepth-submenu-t1">
								<ul class="header-menu_threedepth">
									<li><a href="/kr/ko_kr/w/boys/xb/xc/f/new"
										data-click-area="GNB_feature" data-click-name="신상품">신상품</a></li>
									<li><a href="/kr/ko_kr/w/ya/xb/babyshop"
										data-click-area="GNB_feature" data-click-name="베이비 샵">베이비
											샵</a></li>
									<li><a
										href="https://www.nike.com/kr/ko_kr/w/ya/xb/heritage-mash-up-collection"
										data-click-area="GNB_feature" data-click-name="헤리티지 매쉬 업">헤리티지
											매쉬 업</a></li>
									<li><a
										href="https://www.nike.com/kr/ko_kr/w/ya/xb/lil-swoosh-pack"
										data-click-area="GNB_feature" data-click-name="리틀 스우시 팩">리틀
											스우시 팩</a></li>
									<li><a href="/kr/ko_kr/w/kids/ap/nsw-dual-new"
										data-click-area="GNB_feature" data-click-name="나이키 에어맥스">나이키
											에어맥스</a></li>
									<li><a href="/kr/ko_kr/w/xg/fw/xc/family-look"
										data-click-area="GNB_feature" data-click-name="패밀리 컬렉션">패밀리
											컬렉션</a></li>
									<li><a href="/kr/ko_kr/w/kids/xc/kids-jordan"
										data-click-area="GNB_feature" data-click-name="조던 키즈">조던
											키즈</a></li>
									<li><a href="/kr/ko_kr/w/ya/xb/kids-air-force1"
										data-click-area="GNB_feature" data-click-name="키즈 에어 포스 1">키즈
											에어 포스 1</a></li>
									<li><a href="/kr/ko_kr/w/boys/xb/xc/f/clearance"
										data-click-area="GNB_feature" data-click-name="가격인하">가격인하</a>
									</li>
								</ul>
							</ul>
							<ul class="twodepth-submenu-t2">
								<li class="twodepth-list"><a href="/kr/ko_kr/w/boys/size"
									data-click-area="GNB" data-click-name="BOYS_사이즈별">사이즈별</a>
									<ul class="header-menu_threedepth">
										<li class="threedepth-list bold"><a
											href="/kr/ko_kr/w/boys/fw" data-click-area="GNB"
											data-click-name="BOYS_사이즈별_신발>">신발</a></li>
										<li class="threedepth-list"><a
											href="/kr/ko_kr/w/boys/fw/baby">베이비(160mm 이하)</a></li>
										<li class="threedepth-list"><a
											href="/kr/ko_kr/w/boys/fw/little-kids">리틀키즈(165-220mm)</a></li>
										<li class="threedepth-list"><a
											href="/kr/ko_kr/w/boys/fw/junior">주니어(225-250mm)</a></li>
										<li class="threedepth-list bold"><a
											href="/kr/ko_kr/w/boys/ap" data-click-area="GNB"
											data-click-name="BOYS_사이즈별_의류>">의류</a></li>
										<li class="threedepth-list"><a
											href="/kr/ko_kr/w/boys/ap/baby">베이비(0-4세)</a></li>
										<li class="threedepth-list"><a
											href="/kr/ko_kr/w/boys/ap/little-kids">리틀키즈(4-7세)</a></li>
										<li class="threedepth-list"><a
											href="/kr/ko_kr/w/boys/ap/junior">주니어(8-13세)</a></li>
									</ul></li>
							</ul>
							<ul class="twodepth-submenu-t2">
								<li class="twodepth-list"><a href="/kr/ko_kr/l/boys"
									data-click-area="GNB" data-click-name="BOYS_스포츠">스포츠</a>
									<ul class="header-menu_threedepth">
										<li class="threedepth-list"><a
											href="/kr/ko_kr/w/boys/running" data-click-area="GNB"
											data-click-name="BOYS_스포츠_러닝">러닝</a></li>
										<li class="threedepth-list"><a
											href="/kr/ko_kr/w/boys/football" data-click-area="GNB"
											data-click-name="BOYS_스포츠_축구">축구</a></li>
										<li class="threedepth-list"><a
											href="/kr/ko_kr/w/boys/basketball" data-click-area="GNB"
											data-click-name="BOYS_스포츠_농구">농구</a></li>
										<li class="threedepth-list"><a
											href="/kr/ko_kr/w/boys/gym-training" data-click-area="GNB"
											data-click-name="BOYS_스포츠_트레이닝 &amp; 짐">트레이닝 &amp; 짐</a></li>
									</ul></li>
							</ul>
							<ul class="twodepth-submenu-t2">
								<li class="twodepth-list"><a href="/kr/ko_kr/w/boys/fw"
									data-click-area="GNB" data-click-name="BOYS_신발">신발</a>
									<ul class="header-menu_threedepth">
										<li class="threedepth-list"><a href="/kr/ko_kr/w/boys/fw"
											data-click-area="GNB" data-click-name="BOYS_신발_신발 전체">신발
												전체</a></li>
										<li class="threedepth-list"><a
											href="/kr/ko_kr/w/boys/fw/lifestyle" data-click-area="GNB"
											data-click-name="BOYS_신발_라이프스타일">라이프스타일</a></li>
										<li class="threedepth-list"><a
											href="/kr/ko_kr/w/boys/fw/running" data-click-area="GNB"
											data-click-name="BOYS_신발_러닝">러닝</a></li>
										<li class="threedepth-list"><a
											href="/kr/ko_kr/w/boys/fw/football" data-click-area="GNB"
											data-click-name="BOYS_신발_축구">축구</a></li>
										<li class="threedepth-list"><a
											href="/kr/ko_kr/w/boys/fw/basketball" data-click-area="GNB"
											data-click-name="BOYS_신발_농구">농구</a></li>
										<li class="threedepth-list"><a
											href="/kr/ko_kr/w/boys/fw/sandal-slipper"
											data-click-area="GNB" data-click-name="BOYS_신발_샌들 &amp; 슬리퍼">샌들
												&amp; 슬리퍼</a></li>
									</ul></li>
							</ul>
							<ul class="twodepth-submenu-t2">
								<li class="twodepth-list"><a href="/kr/ko_kr/w/boys/ap"
									data-click-area="GNB" data-click-name="BOYS_의류">의류</a>
									<ul class="header-menu_threedepth">
										<li class="threedepth-list"><a href="/kr/ko_kr/w/boys/ap"
											data-click-area="GNB" data-click-name="BOYS_의류_의류 전체">의류
												전체</a></li>
										<li class="threedepth-list"><a
											href="/kr/ko_kr/w/boys/ap/hoodies-crews"
											data-click-area="GNB" data-click-name="BOYS_의류_후디 &amp; 크루">후디
												&amp; 크루</a></li>
										<li class="threedepth-list"><a
											href="/kr/ko_kr/w/boys/ap/pants-tights" data-click-area="GNB"
											data-click-name="BOYS_의류_팬츠 &amp; 타이츠">팬츠 &amp; 타이츠</a></li>
										<li class="threedepth-list"><a
											href="/kr/ko_kr/w/boys/ap/jackets-vests"
											data-click-area="GNB" data-click-name="BOYS_의류_아우터웨어">아우터웨어</a>
										</li>
										<li class="threedepth-list"><a
											href="/kr/ko_kr/w/boys/ap/top-tshirts" data-click-area="GNB"
											data-click-name="BOYS_의류_탑 &amp; 티셔츠">탑 &amp; 티셔츠</a></li>
										<li class="threedepth-list"><a
											href="/kr/ko_kr/w/boys/ap/set" data-click-area="GNB"
											data-click-name="BOYS_의류_세트">세트</a></li>
										<li class="threedepth-list"><a
											href="/kr/ko_kr/w/boys/ap/shorts" data-click-area="GNB"
											data-click-name="BOYS_의류_숏 팬츠">숏 팬츠</a></li>
										<li class="threedepth-list"><a
											href="/kr/ko_kr/w/boys/ap/baselayer" data-click-area="GNB"
											data-click-name="BOYS_의류_베이스 레이어">베이스 레이어</a></li>
										<li class="threedepth-list"><a
											href="/kr/ko_kr/w/boys/eq/socks" data-click-area="GNB"
											data-click-name="BOYS_의류_양말">양말</a></li>
										<li class="threedepth-list"><a
											href="/kr/ko_kr/w/boys/eq/accessories-equipment"
											data-click-area="GNB"
											data-click-name="BOYS_의류_가방 &amp; 모자 &amp; 용품">가방 &amp;
												모자 &amp; 용품</a></li>
									</ul></li>
							</ul>
						</div>
					</div></li>
				<li class="onedepth-list"><a href="/kr/ko_kr/l/girls"
					data-click-area="GNB" data-click-name="GIRLS" class="">GIRLS</a>
					<div class="header-menu_twodepth">
						<div class="twodepth-maxwidth">
							<ul class="twodepth-submenu-t1">
								<ul class="header-menu_threedepth">
									<li><a href="/kr/ko_kr/w/girls/xb/xc/f/new"
										data-click-area="GNB_feature" data-click-name="신상품">신상품</a></li>
									<li><a href="/kr/ko_kr/w/ya/xb/babyshop"
										data-click-area="GNB_feature" data-click-name="베이비 샵">베이비
											샵</a></li>
									<li><a
										href="https://www.nike.com/kr/ko_kr/w/ya/xb/heritage-mash-up-collection"
										data-click-area="GNB_feature" data-click-name="헤리티지 매쉬 업">헤리티지
											매쉬 업</a></li>
									<li><a
										href="https://www.nike.com/kr/ko_kr/w/ya/xb/lil-swoosh-pack"
										data-click-area="GNB_feature" data-click-name="리틀 스우시 팩">리틀
											스우시 팩</a></li>
									<li><a href="/kr/ko_kr/w/kids/ap/nsw-dual-new"
										data-click-area="GNB_feature" data-click-name="나이키 에어맥스">나이키
											에어맥스</a></li>
									<li><a href="/kr/ko_kr/w/xg/fw/xc/family-look"
										data-click-area="GNB_feature" data-click-name="패밀리 컬렉션">패밀리
											컬렉션</a></li>
									<li><a href="/kr/ko_kr/w/kids/xc/kids-jordan"
										data-click-area="GNB_feature" data-click-name="조던 키즈">조던
											키즈</a></li>
									<li><a href="/kr/ko_kr/w/ya/xb/kids-air-force1"
										data-click-area="GNB_feature" data-click-name="키즈 에어 포스 1">키즈
											에어 포스 1</a></li>
									<li><a href="/kr/ko_kr/w/girls/xb/xc/f/clearance"
										data-click-area="GNB_feature" data-click-name="가격인하">가격인하</a>
									</li>
								</ul>
							</ul>
							<ul class="twodepth-submenu-t2">
								<li class="twodepth-list"><a href="/kr/ko_kr/w/girls/size"
									data-click-area="GNB" data-click-name="GIRLS_사이즈별">사이즈별</a>
									<ul class="header-menu_threedepth">
										<li class="threedepth-list bold"><a
											href="/kr/ko_kr/w/girls/fw" data-click-area="GNB"
											data-click-name="GIRLS_사이즈별_신발>">신발</a></li>
										<li class="threedepth-list"><a
											href="/kr/ko_kr/w/girls/fw/baby">베이비(160mm 이하)</a></li>
										<li class="threedepth-list"><a
											href="/kr/ko_kr/w/girls/fw/little-kids">리틀키즈(165-220mm)</a></li>
										<li class="threedepth-list"><a
											href="/kr/ko_kr/w/girls/fw/junior">주니어(225-250mm)</a></li>
										<li class="threedepth-list bold"><a
											href="/kr/ko_kr/w/girls/ap" data-click-area="GNB"
											data-click-name="GIRLS_사이즈별_의류>">의류</a></li>
										<li class="threedepth-list"><a
											href="/kr/ko_kr/w/girls/ap/baby">베이비(0-4세)</a></li>
										<li class="threedepth-list"><a
											href="/kr/ko_kr/w/girls/ap/little-kids">리틀키즈(4-7세)</a></li>
										<li class="threedepth-list"><a
											href="/kr/ko_kr/w/girls/ap/junior">주니어(8-13세)</a></li>
									</ul></li>
							</ul>
							<ul class="twodepth-submenu-t2">
								<li class="twodepth-list"><a href="/kr/ko_kr/l/girls"
									data-click-area="GNB" data-click-name="GIRLS_스포츠">스포츠</a>
									<ul class="header-menu_threedepth">
										<li class="threedepth-list"><a
											href="/kr/ko_kr/w/girls/running" data-click-area="GNB"
											data-click-name="GIRLS_스포츠_러닝">러닝</a></li>
										<li class="threedepth-list"><a
											href="/kr/ko_kr/w/girls/gym-training" data-click-area="GNB"
											data-click-name="GIRLS_스포츠_트레이닝 &amp; 짐">트레이닝 &amp; 짐</a></li>
									</ul></li>
							</ul>
							<ul class="twodepth-submenu-t2">
								<li class="twodepth-list"><a href="/kr/ko_kr/w/girls/fw"
									data-click-area="GNB" data-click-name="GIRLS_신발">신발</a>
									<ul class="header-menu_threedepth">
										<li class="threedepth-list"><a
											href="/kr/ko_kr/w/girls/fw" data-click-area="GNB"
											data-click-name="GIRLS_신발_신발 전체">신발 전체</a></li>
										<li class="threedepth-list"><a
											href="/kr/ko_kr/w/girls/fw/lifestyle" data-click-area="GNB"
											data-click-name="GIRLS_신발_라이프스타일">라이프스타일</a></li>
										<li class="threedepth-list"><a
											href="/kr/ko_kr/w/girls/fw/running" data-click-area="GNB"
											data-click-name="GIRLS_신발_러닝">러닝</a></li>
										<li class="threedepth-list"><a
											href="/kr/ko_kr/w/girls/fw/basketball" data-click-area="GNB"
											data-click-name="GIRLS_신발_농구">농구</a></li>
										<li class="threedepth-list"><a
											href="/kr/ko_kr/w/girls/fw/sandal-slipper"
											data-click-area="GNB" data-click-name="GIRLS_신발_샌들 &amp; 슬리퍼">샌들
												&amp; 슬리퍼</a></li>
									</ul></li>
							</ul>
							<ul class="twodepth-submenu-t2">
								<li class="twodepth-list"><a href="/kr/ko_kr/w/girls/ap"
									data-click-area="GNB" data-click-name="GIRLS_의류">의류</a>
									<ul class="header-menu_threedepth">
										<li class="threedepth-list"><a
											href="/kr/ko_kr/w/girls/ap" data-click-area="GNB"
											data-click-name="GIRLS_의류_의류 전체">의류 전체</a></li>
										<li class="threedepth-list"><a
											href="/kr/ko_kr/w/girls/ap/hoodies-crews"
											data-click-area="GNB" data-click-name="GIRLS_의류_후디 &amp; 크루">후디
												&amp; 크루</a></li>
										<li class="threedepth-list"><a
											href="/kr/ko_kr/w/girls/ap/pants-tights"
											data-click-area="GNB" data-click-name="GIRLS_의류_팬츠 &amp; 타이츠">팬츠
												&amp; 타이츠</a></li>
										<li class="threedepth-list"><a
											href="/kr/ko_kr/w/girls/ap/jackets-vests"
											data-click-area="GNB" data-click-name="GIRLS_의류_아우터웨어">아우터웨어</a>
										</li>
										<li class="threedepth-list"><a
											href="/kr/ko_kr/w/girls/ap/top-tshirts" data-click-area="GNB"
											data-click-name="GIRLS_의류_탑 &amp; 티셔츠">탑 &amp; 티셔츠</a></li>
										<li class="threedepth-list"><a
											href="/kr/ko_kr/w/girls/ap/set" data-click-area="GNB"
											data-click-name="GIRLS_의류_세트">세트</a></li>
										<li class="threedepth-list"><a
											href="/kr/ko_kr/w/girls/ap/shorts" data-click-area="GNB"
											data-click-name="GIRLS_의류_숏 팬츠">숏 팬츠</a></li>
										<li class="threedepth-list"><a
											href="/kr/ko_kr/w/girls/ap/baselayer" data-click-area="GNB"
											data-click-name="GIRLS_의류_베이스 레이어">베이스 레이어</a></li>
										<li class="threedepth-list"><a
											href="/kr/ko_kr/w/girls/eq/socks" data-click-area="GNB"
											data-click-name="GIRLS_의류_양말">양말</a></li>
										<li class="threedepth-list"><a
											href="/kr/ko_kr/w/girls/eq/accessories-equipment"
											data-click-area="GNB"
											data-click-name="GIRLS_의류_가방 &amp; 모자 &amp; 용품">가방 &amp;
												모자 &amp; 용품</a></li>
									</ul></li>
							</ul>
						</div>
					</div> </li>
			</ul>-->
			<div class="header-menu_etc">
				<a class="gnb-search-btn" href="#"><i class="ns-search large"></i></a>
				<a icon-text-attr="0" data-click-area="Upper GNB"
					data-click-name="Cart" data-component-cartitemlen="{itemCount:0}"
					href="#" class="mini-cart empty"><i class="ns-cart large"></i>
					<!----></a>
			</div>
			<div class="gnb-search-field"
				data-module-search="{keywordMaxLen:10, isLatestKeyword:false}">
				<form method="GET" id="search-form" action="#">
					<fieldset>
						<legend>gift search</legend>
						<div class="search-field"
							data-component-searchfield="{submit:#search-form}">
							<span class="input-textfield width-max"> <input
								type="search" id="main_search"
								class="jq_search ui-autocomplete-input" name="q"
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
							<div class="btn-search-close mobile-only">취소</div>
							<div class="etc-search-wrap">
								<div id="keyword-count" style="display: none;">
									<h4 class="tit">최근 검색어</h4>
									<div id="keyword-container" class="uk-switcher">
										<ul id="latest-keyword" class="search-wrap latest-search">
											<li class="list"><a href="/kr/ko_kr/search?q="></a></li>
										</ul>
										<div class="search-btn-box">
											<div id="delete-all-latest" class="btn-all-delete">
												<a href="#">비우기</a>
											</div>
										</div>
									</div>
								</div>
								<h4 class="tit">추천 검색어</h4>
								<ul id="favorite-keyword" class="search-wrap favorite-search">
									<li class="list"><a href="#">맥스</a></li>
									<li class="list"><a href="#">에어맥스</a></li>
									<li class="list"><a href="#">베이퍼맥스</a></li>
									<li class="list"><a href="#">에어맥스 97</a></li>
								</ul>
							</div>
							<div class="search-mask"></div>
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