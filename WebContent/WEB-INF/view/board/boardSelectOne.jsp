<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<c:import url="../../../temp/bootStrap.jsp" />
<link href="/mall_project/css/digest.css" rel="stylesheet"
	type="text/css">
<style type="text/css">
.form-inline {
	margin-bottom: 10px;
}
</style>
</head>
<body>
	<header class="header">
		<div class="logo">
			<a href="${pageContext.request.contextPath}/index.jsp"> <img
				src="//theme.zdassets.com/theme_assets/2034373/3e78da3d36292b197f9a123ee4a2d0572f36af8a.png"
				alt="로고">
			</a>
		</div>
	</header>
	<main role="main">
	<div class="container width100">
		<nav class="sub-nav w-only">
			<ol class="breadcrumbs">
				<li title="Nike 고객센터"><a href="#">Nike 고객센터</a></li>
				<li><c:if test="${board eq 'notice'}">공지사항</c:if> <c:if
						test="${board eq 'qna'}">QNA</c:if></li>
			</ol>

			<form role="search" class="search" data-search="" action="#"
				accept-charset="UTF-8" method="get">
				<input name="utf8" type="hidden" value="✓"><input
					type="search" name="query" id="query" placeholder="검색"
					aria-label="검색">
			</form>
		</nav>
		<div class="info_layout">

			<!-- customer_1708 ; div.inBox 부모 태그 추가 -->
			<div class="inBox">

				<!-- customer_1708 ; 신규 -->
				<div class="section_left">
					<ul>
						<li class="li_sty01"><strong>자주 찾는 내용</strong>
							<ul>
								<li><a href="#">공지사항</a></li>
								<li><a href="#">회원혜택/서비스</a></li>
								<li><a href="#">A/S</a></li>
								<li><a href="#">THE DRAW</a></li>
								<li><a href="#">주문결제</a></li>
								<li><a href="#">회원정보</a></li>
								<li><a href="#">취소/반품</a></li>
								<li><a href="#">기타</a></li>
								<li><a href="#">배송</a></li>
								<li><a href="#">상품</a></li>
							</ul></li>
						<li class="li_sty01"><strong>나의 정보 조회</strong>
							<ul>
								<li><a href="#" data-click-area="help"
									data-click-name="order status">주문내역 조회</a></li>
								<li><a href="#" data-click-area="help"
									data-click-name="order/shipping status">배송조회</a></li>
								<li><a href="#" data-click-area="help"
									data-click-name="cancel/exchange/return request">반품 신청</a></li>
								<li><a href="#" data-click-area="help"
									data-click-name="forgot my id">아이디 찾기</a></li>
								<li><a href="#" data-click-area="help"
									data-click-name="forgot my pw">패스워드 찾기</a></li>
							</ul></li>
						<li class="li_sty01"><strong>서비스 안내</strong>
							<ul>
								<li><a href="#" data-click-area="help"
									data-click-name="membership benefit">회원 혜택</a></li>
								<li><a href="#" data-click-area="help"
									data-click-name="free exchange/return">무료 반품 서비스</a></li>
								<li><a href="#" data-click-area="help"
									data-click-name="notify me">입고알림 서비스</a></li>
								<li><a href="#" data-click-area="help"
									data-click-name="inventory reservation">매장상품 예약 서비스</a></li>
							</ul></li>
						<li class="li_sty01"><strong><a href="#"
								data-click-area="help" data-click-name="notice">공지사항</a></strong></li>
					</ul>
				</div>
				<!-- // customer_1708 ; 신규 -->

				<div class="sectionR faq">
					<header class="page-header" style="border-bottom: 0px;">
						<h1>
							<c:if test="${board eq 'notice'}">공지사항</c:if>
							<c:if test="${board eq 'qna'}">QNA</c:if>
						</h1>
						<input type="hidden" id="category_name" value="공지사항">

						<div class="faqSelect m-only">
							<label for="faqSelect">자주 찾는 내용 확인</label> <select id="faqSelect"
								onchange="go_buy(this.value);" data-role="none">
								<option value="" style="display: none" selected=""></option>
								<option
									value="/hc/ko/categories/115000485933-%EA%B3%B5%EC%A7%80%EC%82%AC%ED%95%AD"
									data-click-area="help" data-click-name="notice">공지사항</option>
								<option
									value="/hc/ko/categories/115000387934-%ED%9A%8C%EC%9B%90%ED%98%9C%ED%83%9D-%EC%84%9C%EB%B9%84%EC%8A%A4"
									data-click-area="help" data-click-name="membership benefit">회원혜택/서비스</option>
								<option value="/hc/ko/categories/115000387914-A-S"
									data-click-area="help" data-click-name="AS">A/S</option>
								<option value="/hc/ko/categories/115000391093-THE-DRAW"
									data-click-area="help" data-click-name="the draw">THE
									DRAW</option>
								<option
									value="/hc/ko/categories/115000391073-%EC%A3%BC%EB%AC%B8%EA%B2%B0%EC%A0%9C"
									data-click-area="help" data-click-name="order/payment">주문결제</option>
								<option
									value="/hc/ko/categories/115000387894-%ED%9A%8C%EC%9B%90%EC%A0%95%EB%B3%B4">회원정보</option>
								<option
									value="/hc/ko/categories/115000387874-%EC%B7%A8%EC%86%8C-%EA%B5%90%ED%99%98-%EB%B0%98%ED%92%88"
									data-click-area="help"
									data-click-name="cancel/exchange/return request">취소/반품</option>
								<option
									value="/hc/ko/categories/115000391053-%EA%B8%B0%ED%83%80">기타</option>
								<option
									value="/hc/ko/categories/115000391033-%EB%B0%B0%EC%86%A1"
									data-click-area="help" data-click-name="shipping">배송</option>
								<option
									value="/hc/ko/categories/115000387854-%EC%83%81%ED%92%88"
									data-click-area="help" data-click-name="product service">상품</option>
								<option value="https://www.nike.com/kr/ko_kr/account/orders"
									data-click-area="help" data-click-name="order status">주문내역
									조회</option>
								<option value="https://www.nike.com/kr/ko_kr/account/orders"
									data-click-area="help" data-click-name="order/shipping status">배송조회</option>
								<option
									value="https://www.nike.com/kr/ko_kr/account/orders/returnable"
									data-click-area="help"
									data-click-name="cancel/exchange/return request">교환/반품
									신청</option>
								<option
									value="https://www.nike.com/kr/ko_kr/login/forgotPassword"
									data-click-area="help" data-click-name="forgot my id">아이디
									찾기</option>
								<option
									value="https://www.nike.com/kr/ko_kr/login/forgotPassword"
									data-click-area="help" data-click-name="forgot my pw">패스워드
									찾기</option>
								<option
									value="/hc/ko/categories/115000387934-%ED%9A%8C%EC%9B%90%ED%98%9C%ED%83%9D-%EC%84%9C%EB%B9%84%EC%8A%A4"
									data-click-area="help" data-click-name="membership benefit">회원
									혜택</option>
								<option value="/hc/ko/articles/360006588674"
									data-click-area="help" data-click-name="free exchange/return">무료
									반품 서비스</option>
								<option value="https://www.nike.com/kr/ko_kr/stockedService"
									data-click-area="help" data-click-name="notify me">입고알림
									서비스</option>
								<option value="https://www.nike.com/kr/ko_kr/reserveService"
									data-click-area="help" data-click-name="inventory reservation">매장상품
									예약 서비스</option>
							</select>
						</div>
					</header>

					<div class="sectionR faq">

						<article class="article">
							<header class="article-header">
								<h1 title="배송지연 안내" class="article-title">${dto.title}</h1>
							</header>

							<section class="article-info">
								<div class="article-content">
									<div class="article-body">${dto.contents}</div>
								</div>
							</section>


							<div class="article-more-questions">
								또 다른 질문이 있으십니까? <a href="#">문의 등록</a>
							</div>
						</article>
					</div>

				</div>
				<!-- customer_1708 ; 신규 -->
				<div class="section_right">
					<ul>
						<li class="line"></li>
						<li class="li_sty01 tel"><strong>전화 문의</strong>
							<p class="p1">
								<a href="#">080-022-0182</a>
							</p>
							<p class="p2">월~일 오전 9시 ~ 오후 8시</p></li>
						<li class="line"></li>
						<li class="li_sty01 chat"><strong>1:1 채팅서비스</strong>
							<ul>
								<li><a href="#">1:1 채팅문의하기</a></li>
							</ul></li>
						<li class="line"></li>
						<li class="li_sty01 email"><strong>1:1 E-mail 문의</strong>
							<ul>
								<li><a href="#" data-click-area="help"
									data-click-name="email inquiry">E-mail 문의하기</a></li>
								<li><a href="/hc/ko/requests" data-click-area="help"
									data-click-name="check my email inquiry">문의 내역 확인</a></li>
							</ul></li>
						<li class="line"></li>
						<li class="li_sty01 lction"><strong><a href="#"
								data-click-area="help" data-click-name="store locator">매장안내</a></strong>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</main>
	<c:import url="../../../temp/footer.jsp" />
</body>
</html>