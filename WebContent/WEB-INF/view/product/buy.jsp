<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<script type="text/javascript"
	src="https://code.jquery.com/jquery-1.12.4.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script type="text/javascript"
	src="https://service.iamport.kr/js/iamport.payment-1.1.5.js"></script>

<script type="text/javascript">
$(function() {
	if('${member}'!=null){
	$.ajax({
		url : "../member/memberUpdate.do",
		type : "POST",
		data : {
			id : "${param.email}",
			pw2 : "${member.password}",
			firstName : "${param.name}",
			phone : "${param.tel}",
			address : "${param.addr}"
		},
		success : function() {
			alert("데이터 저장");
		} 
	})
		}

		IMP.init('imp27429041'); //iamport 대신 자신의 "가맹점 식별코드"를 사용하시면 됩니다
		IMP.request_pay({
			merchant_uid : 'merchant_' + new Date().getTime(),
			name : '${param.title}',
			amount : 100,//${param.amount}
			buyer_email : '${param.email}',
			buyer_name : '${param.name}',
			buyer_tel : '${param.tel}',
			buyer_addr : '${param.addr}',
			buyer_postcode : '${param.postcode}'
		}, function(rsp) {
			if (rsp.success) {
				var msg = '결제가 완료되었습니다.';
				console.log(msg);
				msg += '고유ID : ' + rsp.imp_uid;
				msg += '상점 거래ID : ' + rsp.merchant_uid;
				msg += '결제 금액 : ' + rsp.paid_amount;
				msg += '카드 승인번호 : ' + rsp.apply_num;
				console.log(rsp);
				
/* 				$.ajax({
					url : "./productSaleup.do",
					type : "POST",
					data : {
						imp_uid : rsp.imp_uid,
						merchant_uid ; rsp.merchant_uid,
						code : '${param.postcode}',
						size : '${param.size}',
						id : '${param.email}',
						address : '${param.addr}'
					},
					success : function(data) {
						alert(data);
					}
				}) */
				
			} else {
				var msg = '결제에 실패하였습니다.';
				msg += '에러내용 : ' + rsp.error_msg;
				alert(msg);
			}
		});
	})
</script>
</head>
</html>