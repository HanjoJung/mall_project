<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<jsp:include page="./temp/bootStrap.jsp"></jsp:include>
<link href="/mall_project/css/index.css" rel="stylesheet"
	type="text/css">
</head>
<body>
	<jsp:include page="./temp/header.jsp"></jsp:include>
	<section class="wrapper">
		<section class="content-area">
			<section>
				<article class="contents height-max">
					<div class="location-title">FIND STORE</div>
					<div>
						<div id="map" class="location-map"
							style="position: relative; overflow: hidden;"></div>
					</div>
				</article>
			</section>
		</section>
	</section>
	<script type="text/javascript"
		src="//dapi.kakao.com/v2/maps/sdk.js?appkey=083cecc48e1fd0dc7223ec5944e19c0f"></script>
	<script>
		var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
		mapOption = {
			center : new daum.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
			level : 3
		// 지도의 확대 레벨
		};

		var map = new daum.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

		// 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
		var mapTypeControl = new daum.maps.MapTypeControl();

		// 지도 타입 컨트롤을 지도에 표시합니다
		map.addControl(mapTypeControl, daum.maps.ControlPosition.TOPRIGHT);
	</script>
	<jsp:include page="./temp/footer.jsp"></jsp:include>
</body>
</html>