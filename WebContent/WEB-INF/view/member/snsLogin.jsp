<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<jsp:include page="../../../temp/bootStrap.jsp"></jsp:include>
<script type="text/javascript">
$(function() {
	$(".btn-link").click(function() {
		$("#frm").attr("action",$(this).val())
		$("#frm").submit();
	})
})
</script>
</head>
<body>
	<jsp:include page="../../../temp/header.jsp"></jsp:include>
	<section class="wrapper">

		<section class="content-area">

			<section>
				<article class="contents width-xlarge height-max">
					<div class="login-wrap width-small">

						<div class="header uk-text-center" style="margin-top: 30px;">
							<h2 class="title">나이키</h2>
							<p class="description">${param.sns}계정인증이완료되었습니다.</p>
						</div>
						<div class="body">
							<div>
								<div class="description" style="text-align: center;">
									<strong class="brand-name">나이키</strong> ID가 있는 경우,<br> 가입된
									ID로 로그인 하시면 인증 받은 <strong>${param.sns}</strong> 계정으로 자동 연결됩니다.<br>
									(연결된 후에는 <strong>${param.sns}</strong> 계정으로 로그인 가능합니다.)<br>
									<strong>나이키</strong>ID가 없는 경우, 인증 받은 ${param.sns} 계정으로 신규 회원 가입
									해주세요.

								</div>
								<div class="btn-wrap"
									style="width: 100%; margin-top: 25px; text-align: center;">
									<form action="" id="frm">
										<input type="hidden" name="id" value="${param.id}"> <input
											type="hidden" name="snsid" value="${param.snsid}"> <input
											type="hidden" name="name" value="${param.name}"> <input
											type="hidden" name="sns" value="${param.sns}">
									</form>
									<button class="btn-link width-max" style="width: 30%;"
										value="../member/memberJoin.do">회원가입</button>
									<button class="btn-link width-max" style="width: 30%;"
										value="../member/memberLogin2.do">로그인</button>
								</div>
							</div>
						</div>
						<div class="footer uk-clearfix"></div>
					</div>
				</article>
			</section>

		</section>


	</section>
	<jsp:include page="../../../temp/footer.jsp"></jsp:include>
</body>
</html>