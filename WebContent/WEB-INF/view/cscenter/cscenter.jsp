<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<c:import url="../../../temp/bootStrap.jsp" />
</head>
<body>
	<c:import url="../../../temp/header.jsp" />
	<div class="content-area wrapper">
		<section class="customer-center">
			<div class="customer-center header">
				<div class="customer-center header-inner">
					<h1 class="customer-center title">고객센터</h1>
					<div class="customer-center search-area">
						<div class="customer-center search">
							<form role="search" class="search" data-search action=""
								accept-charset="UTF-8" method="get">
								<input name="utf8" type="hidden" value="✓"> <input
									type="search" name="query" id="query" placeholder="무엇을 도와드릴까요"
									aria-label="무엇을 도와드릴까요" autocomplete="off">
							</form>
						</div>
					</div>
				</div>
			</div>
		</section>
		<div class="customer-center box customer-center box-pc">
			<div class="customer-center box-header">
				<h2 class="customer-center box-title">FAQ</h2>
				<p class="customer-center box-description">자주 찾는 질문에서 궁금한 내용을
					찾아보세요.</p>
				<hr class="customer-center hr">
			</div>
			<div class="customer-center box-contents">
				<div class="customer-center row">
					<div class="customer-center col">
						<ul>
							<li class="customer-center col">나의 정보 조회</li>
							<li class="customer-center list-item"><a href="#"
								data-click-area="help" data-click-name="order status"> 주문 내역
									조회</a></li>
							<li class="customer-center list-item"><a href="#"
								data-click-area="help" data-click-name="shipping status">배송조회</a></li>
							<li class="customer-center list-item"><a href="#"
								data-click-area="help" data-click-name="return">반품신청</a></li>
							<li class="customer-center list-item"><a href="#"
								data-click-area="help" data-click-name="forgot id">아이디 찾기</a></li>
							<li class="customer-center list-item"><a href="#"
								data-click-area="help" data-click-name="forgot pw">패스워드 찾기</a></li>
						</ul>
					</div>
					<div class="customer-center col">
						<ul>
							<li class="customer-center col">배송/주문 안내</li>
							<li class="customer-center list-item"><a href="#"
								data-click-area="help" data-click-name="order info">주문 결제 방법
									안내</a></li>
							<li class="customer-center list-item"><a href="#"
								data-click-area="help" data-click-name="shipping info">배송 안내</a></li>
							<li class="customer-center list-item"><a href="#"
								data-click-area="help" data-click-name="return info">취소/반품
									방법 안내</a></li>
						</ul>
					</div>
					<div class="customer-center col">
						<ul>
							<li class="customer-center col">상품 관련 안내</li>
							<li class="customer-center list-item"><a href="#"
								data-click-area="help" data-click-name="product service">상품
									서비스</a></li>
							<li class="customer-center list-item"><a href="#"
								data-click-area="help" data-click-name="launching calendar">SNRKS
									런칭 캘린더</a></li>
						</ul>
					</div>
				</div>
				<div class="customer-center row">
					<div class="customer-center col">
						<ul>
							<li class="customer-center list-title">서비스 안내</li>
							<li class="customer-center list-item"><a href="#"
								data-click-area="help" data-click-name="membership benefit">회원
									혜택</a></li>
							<li class="customer-center list-item"><a href="#"
								data-click-area="help" data-click-name="a/s service">A/S 서비스</a></li>
							<li class="customer-center list-item"><a href="#"
								data-click-area="help" data-click-name="free return">무료 반품
									서비스</a></li>
							<li class="customer-center list-item"><a href="#"
								data-click-area="help" data-click-name="notify">입고 알림 서비스</a></li>
							<li class="customer-center list-item"><a href="#"
								data-click-area="help" data-click-name="reservation">매장 상품
									예약 서비스</a></li>
							<li class="customer-center list-item"><a href="#"
								data-click-area="help" data-click-name="ther draw">THE DRAW</a></li>
						</ul>
					</div>
					<div class="customer-center col">
						<ul>
							<li class="customer-center list-title">기타 문의</li>
							<li class="customer-center list-item"><a href="#"
								data-click-area="help" data-click-name="help service info">고객센터
									이용안내</a></li>
							<li class="customer-center list-item"><a href="#"
								data-click-area="help" data-click-name="pc issue/error">PC문제/오류
									안내</a></li>
							<li class="customer-center list-item"><a href="#"
								data-click-area="help" data-click-name="receipt">현금영수증 및
									전자영수증 안내</a></li>
							<li class="customer-center list-item"><a href="#"
								data-click-area="help" data-click-name="account setting">회원정보
									변경 및 탈퇴 안내</a></li>
						</ul>
					</div>
					<div class="customer-center col">
						<ul>
							<li class="customer-center list-title"><a href="#"
								data-click-area="help" data-click-name="store info">매장안내</a></li>
							<li class="customer-center list-title"><a href="#"
								data-click-area="help" data-click-name="company info">회사소개</a></li>
							<li class="customer-center list-title"><a
								href="${pageContext.request.contextPath}/notice/noticeList.do"
								data-click-area="help" data-click-name="notice">공지사항</a></li>
						</ul>
					</div>
					<div class="customer-center box">
						<h2 class="customer-center box-title">CONTACT US</h2>
						<hr class="customer-center hr">
					</div>
					<div class="customer-center box-contents">
						<div class="customer-center row customer-center	row--center">
							<div
								class="customer-center col customer-center contact customer-center contact--call">
								<strong>전화문의</strong>
								<p>
									<span>080-022-0182</span> <a href="tel:080-022-0182"
										data-click-area="help" data-click-name="call">
										080-022-0182</a>
								</p>
								<p>월-일 오전 9시~오후 8시</p>
							</div>
							<div
								class="customer-center col customer-center contact customer-center contact--email">
								<strong>1:1 Email 문의</strong> <a href="#" data-click-area="help"
									data-click-name="email">Email 문의하기</a> <a href="#"
									data-click-area="help" data-click-name="1on1 chat">문의내역
									확인하기</a>
							</div>
							<div
								class="customer-center col customer-center contact customer-center contact--store">
								<strong>매장안내</strong> <a href="#" data-click-area="help"
									data-click-name="find stores">가까운 나이키 매장찾기</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<c:import url="../../../temp/footer.jsp" />
	</div>
</body>
</html>