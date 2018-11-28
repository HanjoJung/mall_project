<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
</head>
<body>
	<div class="detail-reviewlist-summary">
		<div class="n-review-read">
			<ul id="review-summary">
				<c:choose>
					<c:when test="${empty list}">
						<div class="uk-grid detail-review-summary">
							<div class="uk-width-large-1-3 summary-sect">
								<div class="star-total-info">
									<p class="star-average">
										<span class="like"> <i class="icon-star5 per"
											style="width: 0.0%"></i> <i
											class="icon-star5 star-default-bg"></i>
										</span> <span class="total-star-point">2.8 점</span>
									</p>
									<div class="review-noti">이 상품의 첫 번째 리뷰를 작성해 주세요.</div>
								</div>
							</div>
						</div>
					</c:when>
					<c:otherwise>
						<c:forEach items="${list}" var="dto">
							<li data-reviewid="${dto.num}">
								<div class="uk-grid">
									<div class="read-list uk-width-large-2-3">
										<p class="read-subject">${dto.title}</p>
										<p class="user-info">
											<span class="review-filter star like"
												data-productid="${dto.productcode}"> <i
												class="brz-icon-star_small star-5 per" style="width: 40.0%"></i>
												<i class="brz-icon-star_small"></i>
											</span>
										</p>
										<div class="user-name">
											<span>${dto.writer}-</span>
										</div>
										<span class="write-date" date="${dto.reg_date}">${dto.reg_date}</span>
										<p></p>
										<p class="read-comment shorten-txt">${dto.contents}</p>
										<p class="review-img-info"></p>
										<div class="review-help"></div>
									</div>
								</div>
							</li>
						</c:forEach>
						<a class="btn-more-review">더 많은 리뷰 보기${curPage}</a>
					</c:otherwise>
				</c:choose>
				
			</ul>
		</div>
	</div>
</body>
</html>