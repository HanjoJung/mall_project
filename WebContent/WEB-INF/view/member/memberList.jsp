<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>memberList</title>
<c:import url="../../../temp/bootStrap.jsp" />
</head>
<body>
	<c:import url="../../../temp/header.jsp" />

	<div class="container-fluid">
		<div class="row">
			<table class="table table-hover">
				<thead>
					<tr>
						<td width="5%"><input type="checkbox" id="check"></td>
						<td width="10%">ID</td>
						<td width="10%">닉네임</td>
						<td width="20%">E-mail</td>
						<td width="15%">연락처</td>
						<td width="10%">성별</td>
						<td width="10%">나이</td>
						<td width="10%">가입날짜</td>
					</tr>
				</thead>
				<tbody>
					<c:forEach items="${list}" var="dto">
						<tr>
							<td><input type="checkbox" class="del" value="${dto.id}"
								id="${dto.id}" name="del"></td>
							<td>${dto.id}</td>
							<td>${dto.nickname}</td>
							<td>${dto.email}</td>
							<td>${dto.phone}</td>
							<td>${dto.sex}</td>
							<td>${dto.age}</td>
							<td>${dto.join_date}</td>
						</tr>
					</c:forEach>
				</tbody>
			</table>
			<table>
				<tr>
					<td>
						<button class="btn btn-default">
							<a href="${pageContext.request.contextPath}/index.jsp">홈</a>
						</button>
						<button class="btn btn-default">
							<a href="./memberJoin.do">가입</a>
						</button>
						<button class="btn btn-default">
							<a href="./memberDelete.do">탈퇴</a>
						</button>
						<button class="btn btn-default">
							<a href="./memberLogin.do">로그인</a>
						</button>
						<button class="btn btn-default">
							<a href="./memberLogout.do">로그아웃</a>
						</button>
					</td>
				</tr>
			</table>

			<div class="row" align="center">
				<ul class="pagination">
					<li><a href="./memberList.do?curPage=1"><span
							class="glyphicon glyphicon-backward"></span></a></li>

					<c:if test="${pager.curBlock gt 1}">
						<li><a href="./memberList.do?curPage=${pager.startNum-1}"><span
								class="glyphicon glyphicon-chevron-left"></span></a></li>
					</c:if>
					<c:forEach begin="${pager.startNum}" end="${pager.lastNum}" var="i">
						<li><a href="./memberList.do?curPage=${i}">${i}</a></li>
					</c:forEach>

					<c:if test="${pager.curBlock lt pager.totalBlock}">
						<li><a href="./memberList.do?curPage=${pager.lastNum+1}"><span
								class="glyphicon glyphicon-chevron-right"></span></a></li>
					</c:if>
					<li><a href="./memberList.do?curPage=${pager.totalPage}"><span
							class="glyphicon glyphicon-forward"></span></a></li>
				</ul>
			</div>
		</div>
	</div>

	<c:import url="../../../temp/footer.jsp" />
</body>
</html>