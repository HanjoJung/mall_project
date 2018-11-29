<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
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
				<div class="style-code" data-model="AR1689-001">스타일 :
					${bDTO.productCode}</div>
				<span class="uk-hidden" data-upc="091204574916"
					data-model="AR1689-001"></span> <span class="opt quantity">수량:
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