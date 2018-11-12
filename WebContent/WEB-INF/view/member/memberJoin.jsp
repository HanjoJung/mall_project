<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<c:import url="../../../temp/bootStrap.jsp" />
<script type="text/javascript">
	$(function() {
		$("#join")
				.click(
						function() {
							if ($("#id").val() == "") {
								$("#id")
										.parent()
										.children("span")
										.html(
												'<h6 style="color: red;">필수 입력사항입니다</h6>')
								$("#idCheck").val('f');
							} else {
								$("#id").parent().children("span").html("");
								if ($("#idCheck").val() == "f") {
									$("#id").parent().children("span").html("");
									$("#id")
											.parent()
											.children("span")
											.html(
													'<h6 style="color: red;">ID 중복검사를 해주세요</h6>')
								}
							}

							if ($("#pw1").val() == "" || $("#pw2").val() == "") {
								$("#pw2")
										.parent()
										.children("span")
										.html(
												'<h6 style="color: red;">필수 입력사항입니다</h6>')
								$("#idCheck").val('f');
							} else {
								$("#pw2").parent().children("span").html("");
							}

							if ($("#name").val() == "") {
								$("#name")
										.parent()
										.children("span")
										.html(
												'<h6 style="color: red;">필수 입력사항입니다</h6>')
								$("#idCheck").val('f');
							} else {
								$("#name").parent().children("span").html("");
							}

							if ($("#phone").val() == "") {
								$("#phone")
										.parent()
										.children("span")
										.html(
												'<h6 style="color: red;">필수 입력사항입니다</h6>')
								$("#idCheck").val('f');
							} else {
								$("#phone").parent().children("span").html("");
							}

							if ($("#idCheck").val() != "f") {
								$("#frm").submit();
							}
						})

		$("#id").change(function() {
			$("#idCheck").val('f');
		})

		$("#pw2")
				.change(
						function() {
							if ($("#pw1").val() != $("#pw2").val()) {
								$("#pw2").parent().children("span").children()
										.html("비밀번호가 일치하지 않습니다");
								$("#idCheck").val('f');
							} else {
								$("#pw2").parent().children("span").children()
										.html("");
							}
						})

		$("#btn").click(
				function() {
					$("#idCheck").val('f');
					var id = document.frm.id.value;
					window.open("./memberCheckId.do?id=" + id, "",
							"width=300, height=200, top=300, left=500");
				})

		$(".brz-icon-checkbox").parent().click(function() {
			alert($(this).parent().find("first-child"));
		})
	})
</script>
<style type="text/css">
body, button, input {
	font-size: 13px;
	font-family: "Helvetica LT W01 Roman", "Apple SD Gothic Neo",
		"Noto Sans KR", "Malgun Gothic", "MalgunGothic", Dotum, serif, Arial,
		Helvetica;
	color: #606060;
	line-height: 1;
}

i {
	font-family: 'icomoon' !important;
	speak: none;
	font-style: normal;
	font-weight: normal;
	font-variant: normal;
	text-transform: none;
	line-height: 1;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}

h6 {
	display: block;
	font-size: 0.67em;
	margin-block-start: 2.33em;
	margin-block-end: 2.33em;
	margin-inline-start: 0px;
	margin-inline-end: 0px;
	font-weight: bold;
}

a {
	color: #111111;
	text-decoration: none;
	outline: none;
}

::selection {
	background: #39f;
	color: #fff;
	text-shadow: none;
}

.icon-background, .brz-icon-instagram, .brz-icon-facebook,
	.brz-icon-twitter, .brz-icon-cart, .brz-icon-search,
	.brz-icon-registerdone, .brz-icon-star_small, .brz-icon-star_normal,
	.brz-icon-star_large, .brz-icon-star_xlarge, .star-bullet,
	.brz-icon-bambug, .brz-icon-bambug_small, .brz-icon-logo,
	.brz-icon-info, .brz-icon-select_up, .brz-icon-select_down,
	.brz-icon-opt-select_up, .brz-icon-opt-select_down, .brz-icon-slidebar,
	.brz-icon-radio, .brz-icon-checkbox, .brz-icon-delete, .brz-icon-file,
	.brz-icon-img-file, .brz-icon-arrow, .file-remove_btn, .popup-close_btn
	{
	display: inline-block;
	overflow: hidden;
	background-image: url(../../../../../../mall_project/img/icon.png);
	background-repeat: no-repeat;
	text-indent: -9999px;
	background-size: 800px auto;
}

.wrapper {
	min-height: 100%;
	padding-top: 108px;
}

.uk-margin-xlarge-top {
	margin-top: 70px !important;
}

.uk-width-1-1 {
	width: 100%;
}

.login-wrap.width-small {
	max-width: 420px;
}

.login-wrap {
	margin: 0 auto;
	width: 100%;
	position: relative;
	padding: 0 20px 32px;
	box-sizing: border-box;
}

.login-wrap .header {
	margin-bottom: 40px;
}

.login-wrap>* {
	margin: 0 auto;
}

.uk-text-center {
	text-align: center !important;
}

.login-wrap .header>.title {
	margin-top: 15px;
	margin-bottom: 15px;
	text-align: center;
	font-size: 24px;
	color: #111111;
	font-weight: 500;
}

.uk-grid {
	margin-left: -20px;
	display: -ms-flexbox;
	display: -webkit-flex;
	display: flex;
	-ms-flex-wrap: wrap;
	-webkit-flex-wrap: wrap;
	flex-wrap: wrap;
	margin: 0;
	padding: 0;
	list-style: none;
}

.login-wrap .body .register-terms .tit {
	font-size: 11px;
	margin-top: 30px;
	padding-bottom: 8px;
	font-weight: bold;
	color: #000000;
}

.login-wrap .body .register-terms .btn-agree-allview {
	font-size: 11px;
	margin-top: 30px;
}

.uk-width-1-1 {
	width: 100%;
}

[class*='uk-width'] {
	box-sizing: border-box;
	width: 100%;
}

.uk-grid>* {
	padding-left: 20px;
}

.uk-grid>* {
	-ms-flex: none;
	-webkit-flex: none;
	flex: none;
	margin: 0;
	float: left;
}

.uk-grid>*>:last-child {
	margin-bottom: 0;
}

.uk-form-row:before, .uk-form-row:after {
	content: "";
	display: table;
}

.uk-form-row:after {
	clear: both;
}

.input-textfield.width-max {
	width: 100%;
}

.width-max {
	max-width: 100%;
}

.input-textfield {
	display: inline-block;
	position: relative;
	width: 200px;
}

.uk-form-row+.uk-form-row {
	margin-top: 15px;
}

.input-textfield>input {
	width: 100%;
	height: 40px;
	border: 1px solid #e5e5e5;
	padding: 9px 12px;
	outline: none;
	box-sizing: border-box;
}

input, textarea {
	-webkit-border-radius: 2px;
	-moz-border-radius: 2px;
	border-radius: 2px;
	-webkit-appearance: none;
	font-size: 14px;
}

.login-wrap .body .register-terms .uk-grid {
	margin-left: 0;
}

.login-wrap .body .register-terms .uk-grid>* {
	padding-left: 0;
}

.uk-text-right {
	text-align: right !important;
}

.uk-width-1-2, .uk-width-2-4, .uk-width-3-6, .uk-width-5-10 {
	width: 50%;
}

.uk-grid:after {
	clear: both;
}

.uk-grid:before, .uk-grid:after {
	content: "";
	display: block;
	overflow: hidden;
}

.scroll-box {
	overflow-y: scroll;
	height: 110px;
	padding: 15px 8px;
	border: 1px solid #d1d1d1;
}

.login-wrap .body .register-terms .agree-test {
	padding-top: 7px;
	font-size: 11px;
	line-height: 1.5;
}

.input-checkbox>input {
	-webkit-appearance: checkbox;
	left: -1000px;
	position: relative;
}

.input-checkbox>label>i {
	display: table-cell;
}

.input-checkbox>label>i {
	margin-right: 5px;
}

.brz-icon-checkbox {
	float: left;
	width: 18px;
	height: 19px;
	background-position: -22px -320px;
	z-index: 10;
}

.dynamic-form-register input[type=checkbox]+label .label.font-normal {
	font-weight: normal;
	text-decoration: none;
}

.dynamic-form-register input[type=checkbox]+label .label {
	font-size: 14px;
	font-weight: bold;
	text-decoration: underline;
}

.input-checkbox.checked i {
	background-position: -89px -320px;
}

.input-checkbox>label .label {
	display: table-cell;
	vertical-align: middle;
}

element.style {
	
}

.dynamic-form-register input[type=checkbox]+label .label.font-normal {
	font-weight: normal;
	text-decoration: none;
}

.dynamic-form-register input[type=checkbox]+label .label {
	font-size: 14px;
	font-weight: bold;
	text-decoration: underline;
}

.input-checkbox>label>.label {
	display: table-cell;
	vertical-align: middle;
}

.input-checkbox>label>.label {
	font-size: 13px;
}

html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p,
	blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn,
	em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var,
	b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend,
	table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas,
	details, embed, figure, figcaption, footer, header, hgroup, menu, nav,
	output, ruby, section, summary, time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
}

.input-checkbox>label {
	display: inline-block;
	line-height: 20px;
	cursor: pointer;
}

.label {
	color: #606060;
	padding: 0 0 5px;
}
</style>
</head>
<body>
	<c:import url="../../../temp/header.jsp" />
	<section class="wrapper">
		<div class="content-area">
			<div class="uk-width-1-1 uk-margin-xlarge-top">
				<div class="login-wrap width-small">
					<div class="header uk-text-center">
						<h2 class="title">회원가입</h2>
					</div>
					<div class="body">
						<div class="uk-grid">
							<div class="uk-width-1-1 dynamic-form-register">
								<div class="dynamic-form">
									<form action="./memberJoin.do" method="post"
										enctype="multipart/form-data" name="frm" id="frm">
										<input type="hidden" value="f" id="idCheck" name="idCheck">

										<div class="uk-form-row">
											<div class="input-textfield width-max">
												<input type="email" class="form-control" id="id"
													placeholder="사용하실 ID를 입력해주세요. (수신 가능 E-mail)" name="id">
												<!-- <input type="button" id="btn" class="btn btn-default"
													value="중복확인"> -->
												<span></span>
											</div>
										</div>
										<div class="uk-form-row">
											<div class="input-textfield width-max">
												<input type="password" class="form-control" id="pw1"
													placeholder="영문+숫자+특수문자 조합 8~16자리 이내" name="pw1">
											</div>
										</div>
										<div class="uk-form-row">
											<div class="input-textfield width-max">
												<input type="password" class="form-control" id="pw2"
													placeholder="패스워드를 다시 입력해 주세요." name="pw2"> <span></span>
											</div>
										</div>
										<div class="uk-form-row">
											<div class="input-textfield width-max">
												<input type="text" class="form-control" id="name"
													placeholder="이름을 입력해 주세요." name="name"> <span></span>
											</div>
										</div>
										<div class="uk-form-row">
											<div class="input-textfield width-max">
												<input type="text" class="form-control" id="phone"
													placeholder="휴대폰 번호 '-'표 없이 입력해 주세요." name="phone">
												<span></span>
											</div>
										</div>
										<!-- 이용약관 -->
										<div class="register-terms">
											<div class="agree">
												<div class="uk-grid">
													<h6 class="uk-width-1-2 tit">이용약관</h6>
													<a href="../cscenter/policy.do" target="_blank"
														class="uk-width-1-2 uk-text-right btn-agree-allview">전문보기</a>
												</div>
												<div class="uk-grid uk-margin-top-remove">
													<div class="uk-width-1-1">
														<div class="scroll-box agree-content"></div>
													</div>
												</div>
												<div class="uk-width-1-1 agree-test">
													<span id="checkTerms" class="input-checkbox uk-width-1-1">
														<input type="checkbox" id="checkGcAgree"
														name="checkGcAgree"> <label for="checkGcAgree">
															<i class="brz-icon-checkbox"> </i><span
															class="label font-normal">[필수] 약관에 동의 합니다.</span>
													</label>
													</span>
												</div>
											</div>
										</div>




										<input type="button" class="btn btn-default" value="가입 "
											id="join">
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
	<c:import url="../../../temp/footer.jsp" />
</body>
</html>