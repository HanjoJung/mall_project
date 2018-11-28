function setCookie(cname, cvalue, exdays) {
	var d = new Date(); //시간변수
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000)); // 입력값 + 하루
	var expires = "expires=" + d.toUTCString(); //쿠키 유효기한
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	//쿠키 이름, 값, 유효기한, 경로 설정하여 쿠키생성
}
function getCookie(cname) {
	var name = cname + "="; // 쿠키 이름
	var ca = document.cookie.split(';'); // ';'기준으로 파싱
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
			c = c.trim();
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

function checkCookie() {
	var user = getCookie("username");
	if (user != "") {
		alert("Welcome again " + user);
	} else {
		user = prompt("Please enter your name:", "");
		if (user != "" && user != null) {
			setCookie("username", user, 365);
		}
	}
}
