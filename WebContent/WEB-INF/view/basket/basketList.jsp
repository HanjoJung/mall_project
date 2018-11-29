<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<div class="uk-width-1-1">
	<h5 class="minicart-title">미니 장바구니</h5>
</div>
<div class="uk-width-1-1">
	<c:forEach items="${blist}" var="bDTO" varStatus="i">
		<dl class="order-list" data-product-item="">
			<dt class="image-wrap">
				<img src="/mall_project/upload/${bDTO.fname}" alt="">
			</dt>
			<dd class="order-info">
				<a class="tit"
					href="./productSelectOne.do?code=${productDTO.productCode}"
					title="${bDTO.productName}">${bDTO.productName}</a>
				<div class="style-code">스타일 :
					${bDTO.productCode}</div> <span class="opt quantity">수량:
					${blist.size()}</span> <span class="price-wrap">
					<div class="total-price">
						<strong class="retail-price">${bDTO.price} 원</strong>
					</div>
				</span>
			</dd>
		</dl>
	</c:forEach>
</div>