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
<c:import url="../../../temp/header.jsp" />
<body>
	<div class="containor-fluid wrapper">
		<div class="row" align="center">
			<table class="table table-boadered table-hover"
				style="max-width: 1500px">
				<tr>
					<td style="width: 10%">상품코드</td>
					<td style="width: 50%">상품명</td>
					<td style="width: 10%">종류</td>
					<td style="width: 10%">가격</td>
					<td style="width: 5%">조회수</td>
					<td style="width: 5%">추천수</td>
					<td style="width: 10%">제조사</td>
				</tr>
				<tr>
					<td>${pDTO.productCode}</td>
					<td>${pDTO.productName}</td>
					<td>${pDTO.kind}</td>
					<td>${pDTO.price}</td>
					<td>${pDTO.hit}</td>
					<td>${pDTO.good}</td>
					<td>${pDTO.manufacturerCode}</td>
				</tr>
				<tr>
					<td colspan="5" align="center">내용</td>
				</tr>
				<tr>
					<td colspan="5" align="center">${pDTO.contents}</td>
				</tr>
				<tr>
					<td colspan="5"><c:forEach items="${files}" var="fileDTO">
							<h3 style="display: inline-block;">
								<a href="../upload/${fileDTO.fname}"><img
									style="max-width: 50px; max-height: 50px;" alt=""
									src="../upload/${fileDTO.fname}"></a>
							</h3>
						</c:forEach></td>
				</tr>
			</table>
			<a href="productList.do" class="btn btn-primary">목록으로</a>
			<%-- <c:if test="${not empty member and member.id eq dto.writer}"> --%>
				<a href="./productUpdate.do?code=${pDTO.productCode}" class="btn btn-primary">수정</a>
				<a href="./productDelete.do?code=${pDTO.productCode}" class="btn btn-primary">삭제</a>
			<%-- </c:if> --%>
		</div>
	</div>


	<c:import url="../../../temp/footer.jsp" />
</body>
</html>