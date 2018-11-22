<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:import url="./temp/bootStrap.jsp"></c:import>
<input type="text" id="sample3_postcode" placeholder="우편번호">
<input type="button" onclick="sample3_execDaumPostcode()"value="우편번호 찾기"><br>

<div id="wrap" style="display:none;border:1px solid;width:500px;height:300px;margin:5px 0;position:relative">
<img src="//t1.daumcdn.net/localimg/localimages/07/postcode/320/close.png" id="btnFoldWrap" style="cursor:pointer;position:absolute;right:0px;top:-1px;z-index:1" onclick="foldDaumPostcode()" alt="접기 버튼">
</div>

														<select name="selectPersonalMessage">
															<option value="dt_0">배송 메모를 선택해주세요.</option>
															<option value="dt_3" contenteditable="true">배송 시 연락 부탁드립니다.</option>
															<option value="dt_2" role="">빠른 배송 부탁드립니다.</option>
															<option value="dt_1" selected="selected">직접입력</option>
														</select>