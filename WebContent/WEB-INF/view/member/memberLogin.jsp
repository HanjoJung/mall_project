<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head class="uk-notouch">
<meta charset="UTF-8">
<title>Insert title here</title>
<c:import url="../../../temp/bootStrap.jsp" />
<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/memberJoin.js"></script>
</head>
<body style="padding-right: 17px;">
	<c:import url="../../../temp/header.jsp" />

	<section class="wrapper">
		<div class="container-fluid">
			<div class="row">
				<article id="common-modal" class="uk-modal uk-open">
					<div class="uk-modal-dialog">
						<a class="uk-modal-close uk-close"></a>
						<div class="contents">
							<div class="login-wrap width-small" data-login="false">
								<div class="header uk-text-center">
									<span class="ns-swoosh"></span>
									<h2 class="title">나이키 로그인</h2>
								</div>
								<div class="body">
									<div data-module-dynamicform="{isAjax:true,errMsg:로그인 실패 입니다.}">
										<div class="uk-grid">
											<div class="uk-width-1-1">
												<div class="dynamic-form">
													<form method="POST" class="uk-form-large" action="">
														<div class="uk-form-row">
															<div class="input-textfield width-max">
																<input class="data" type="email"
																	data-parsley-required-message="필수 입력 항목입니다."
																	placeholder="아이디" id="id"
																	name="id" /> <span class="error-message filled"></span>
															</div>
														</div>

														<div class="uk-form-row">
															<div class="input-textfield width-max">
																<input class="data" type="password"
																	autocomplete="new-password"
																	data-parsley-required-message="필수 입력 항목입니다." id="pw1"
																	placeholder="비밀번호" id="pw1"
																	name="pw1" /> <span class="error-message filled"></span>
															</div>
														</div>
														<div class="uk-form-row">
															<div class="input-form-group">
																<span class="input-checkbox checked"> <input
																	type="checkbox" id="breeze-me" name="receiveEmail" />
																	<label for="breeze-me"> <i
																		class="brz-icon-checkbox">rediobox</i> <span
																		class="label">로그인 유지하기</span>
																</label>
																</span> <input type="hidden" value="off" name="breeze-me">
															</div>
														</div>
													</form>
												</div>
											</div>
										</div>

										<div class="uk-grid login_btn_line">
											<div class="uk-width-1-1">
												<button class="button large width-max" type="submit">로그인</button>
											</div>
										</div>
									</div>
								</div>
								<div class="social-login-container">
									<div class="uk-grid social_wrap" data-module-social-login>
										<div class="uk-width-1-1 uk-width-medium-1-1"></div>
										<div class="uk-width-1-1 uk-width-medium-1-1"></div>
									</div>
								</div>
								<div class="footer uk-clearfix">
									<div class="join_line">
										<span class="log_txt01">회원이 아니신가요?</span> <a
											href="${pageContext.request.contextPath}/member/memberJoin.do">회원가입</a>
									</div>
									<div class="search_line">
										<a class="find_log_acc" >비밀번호를 잊으셨습니까?</a> <a>비회원 주문 조회</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</article>

				<form action="./memberLogin.do" method="post">
					<div class="form-group">
						<label for="id">ID:</label> <input type="text"
							class="form-control" id="id" placeholder="Enter id" name="id">
					</div>
					<div class="form-group">
						<label for="pw">PASSWORD:</label> <input type="password"
							class="form-control" id="pw" placeholder="Enter password"
							name="pw">
					</div>
					<button type="submit" class="btn btn-default">로그인</button>
				</form>
			</div>
		</div>
	</section>
</body>
</html>