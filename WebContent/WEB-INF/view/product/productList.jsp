<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<c:import url="../../../temp/bootStrap.jsp"></c:import>
</head>
<body>
<c:import url="../../../temp/header.jsp"></c:import>
	<div class="container-fluid">
		<div class="row">
			<h1>${board}</h1>	
		</div>
		<div class="row">
			<form class="form-inline" action="./${board}List.do">
		    <div class="form-group">
		    	<div class="form-group">
				  <label for="sel1">Select list:</label>
				  <select class="form-control" id="sel1" name="kind">
				    <option>Code</option>
				    <option>Name</option>
				  </select>
				</div>
		      <input type="text" class="form-control" id="search" placeholder="Enter search" name="search">
		    </div>
		    <button type="submit" class="btn btn-default">Submit</button>
		  </form>
		    	<!-- 서치 폼 -->
		</div>
			<table class="table table-hover">
				<thead>
				<tr class="info">
					<td>CODE</td>
					<td>NAME</td>
					<td>PRICE</td>
					<td>KIND</td>
					<td>HIT</td>
					<td>SALE</td>
					<td>GOOD</td>
					<td>M_CODE</td>
				</tr>
				</thead>
			<c:forEach items="${list}" var="productDTO">
				<tr>
					<td>${productDTO.productCode}</td>
					<td><a href="./${board}SelectOne.do?code=${productDTO.productCode}">
						<%-- 일단은 주석처리 
						<c:catch>
							<c:forEach begin="1" end="${boardDTO.depth}">
								<span class="glyphicon glyphicon-hand-right"></span>
							</c:forEach>
						</c:catch> --%>
					${productDTO.productName}</a></td>
					<td>${productDTO.price}</td>
					<td>${productDTO.kind}</td>
					<td>${productDTO.hit}</td>
					<td>${productDTO.sale}</td>
					<td>${productDTO.good}</td>
					<td>${productDTO.manufacturerCode}</td>
				</tr>
			</c:forEach>
			</table>
	</div>

<c:import url="../../../temp/footer.jsp"></c:import>
</body>
</html>





















