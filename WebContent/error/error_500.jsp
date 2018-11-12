<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<style type="text/css">
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
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}

html, body {
    width: 100%;
    height: 100%;
}

div {
	display: block;
}

.contens_wrap {
	position: relative;
	width: 100%;
	height: 100%;
	background: url(../../../../../../mall_project/error/bg-shutdown.jpg) no-repeat center center fixed;
	webkit-background-size: cover;
	-moz-background-size: cover;
	-o-background-size: cover;
	background-size: cover;
}

.layerwrap {
	position: absolute;
	top: 50%;
	left: 50%;
	width: 886px;
	height: 443px;
	margin: -222px 0 0 -443px;
	background-color: #fff;
}

.logo {
	margin: 55px 0 50px 414px;
	width: 89px;
	height: 32px;
	background: url(../../../../../../mall_project/error/logo_shut.jpg) no-repeat 0 0;
	text-indent: -9999em;
}

.layerwrap .tit {
	margin-bottom: 30px;
	font-size: 27px;
	font-weight: bold;
	color: #2a2a2a;
	text-align: center;
}

.layerwrap .contens>p {
	line-height: 19px !important;
}

.layerwrap .contens>p {
	font-size: 15px;
	font-weight: bold;
	color: #727272;
	text-align: center;
	line-height: 25px;
}

footer {
	position: absolute;
	bottom: 0;
	left: 0;
	height: 69px;
	width: 100%;
	padding-top: 35px;
	background-color: #fafafa;
	border-top: 1px solid #e2e2e2;
}

.contect {
	clear: both;
	overflow: hidden;
	text-align: center;
}

.contect li {
	width: 100%;
	text-align: center;
	font-size: 13px;
	color: #474747;
	list-style: none;
}

.btn {
	display: inline-block;
	border: 1px solid #ddd;
	padding: 3px 5px;
	color: #666;
	text-align: center;
	font-size: 12px;
	text-decoration: none;
}
</style>
</head>
<body>

	<div class="contens_wrap">
		<div class="layerwrap" id="shutdown_layer">
			<div class="logo">nike</div>
			<p class="tit">서비스 이용에 불편을 드려서 죄송합니다.</p>
			<div class="contens">
				<p>(500-server error)</p>
				<p>현재 서비스에 일시적인 오류가 발생했습니다.</p>
				<p>요청하신 모듈을 찾을 수 없습니다. 사이트 관리자에게 모듈 점검 요청 바랍니다.</p>
				<p>이용에 불편을 드린 점 진심으로 사과 드리며, 고객 여러분의 양해 부탁 드립니다.</p>
			</div>
			<footer>
				<ul class="contect" style="margin-top: -15px">
					<li>관련문의사항은 고객센터에 문의해주시면 친절히 안내해드리겠습니다.</li>
					<li>고객상담전화 : 080-022-018</li>
					<li style="margin-top: 10px"><a
						href="${pageContext.request.contextPath}/index.jsp" class="btn">홈페이지</a></li>
				</ul>
			</footer>
		</div>
	</div>
</body>
</html>