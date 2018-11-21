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
</head>
<body>
	<c:import url="../../../temp/header.jsp"></c:import>
	<div class="container-fluid wrapper">
		<div class="row">
			<h1>${board}</h1>
		</div>
		<div class="row">
			<form class="form-inline" action="./${board}List.do">
				<div class="form-group">
					<div class="form-group">
						<label for="sel1">Select list:</label> <select
							class="form-control" id="sel1" name="kind">
							<option value="productCode">제품번호</option>
							<option value="productName">제품이름</option>
						</select>
					</div>
					<input type="text" class="form-control" id="search"
						placeholder="Enter search" name="search">
				</div>
				<button type="submit" class="btn btn-default">Submit</button>
			</form>
			<!-- 서치 폼 -->
		</div>
		<div class="wrap-pl product-item" id="p1">
			<c:forEach items="${list}" var="productDTO" varStatus="i">
				<div>
					<div class="action-hover">
						<a href="./productSelectOne.do?code=${productDTO.productCode}">
						
						<img src="/mall_project/upload/${file[i.index].fname}"></a>
						
						
					</div>
					
					<div class="item-info">
						<span class="item-title">${productDTO.productName}</span>
						<div class="item-location">
							<span>${productDTO.kind}</span>
						</div>
						<span class="item-price"><span>${productDTO.price} 원</span></span>
					</div>
				</div>
			</c:forEach>

		</div>

	</div>
	<div class="container-fluid">
			<div class="row">
				<ul class="pagination">
					<li><a href="./${board}List.do?curPage==1"><span
							class="glyphicon glyphicon-backward"></span></a></li>

					<c:if test="${pager.curBlock gt 1}">
						<li><a href="./${board}List.do?curPage=${pager.startNum-1}"><span
								class="glyphicon glyphicon-chevron-left"></span></a></li>
					</c:if>

					<c:forEach begin="${pager.startNum}" end="${pager.lastNum}" var="i">
						<li><a href="./${board}List.do?curPage=${i}">${i}</a></li>
					</c:forEach>


					<c:if test="${pager.curBlock lt pager.totalBlock}">
						<li><a href="./${board}List.do?curPage=${pager.lastNum+1}"><span
								class="glyphicon glyphicon-chevron-right"></span></a></li>
					</c:if>
					<li><a href="./${board}List.do?curPage=${pager.totalPage}"><span
							class="glyphicon glyphicon-forward"></span></a></li>
				</ul>
			</div>
		</div>
	<div>
		<a href="./${board}Write.do" class="btn btn-primary">Write</a>
	</div>
	<c:import url="../../../temp/footer.jsp"></c:import>
</body>
</html>