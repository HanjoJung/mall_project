<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<script type="text/javascript">
$(document).ready(function(){
    var myKey = "Qryj6enpsUFG6KnoERTc2w"; // sweet tracker에서 발급받은 자신의 키 넣는다.
     
        // 택배사 목록 조회 company-api
        $.ajax({
            type:"GET",
            dataType : "json",
            url:"http://info.sweettracker.co.kr/api/v1/companylist?t_key="+myKey,
            success:function(data){
                     
                    // 방법 1. JSON.parse 이용하기
                    var parseData = JSON.parse(JSON.stringify(data));
                    console.log(parseData.Company); // 그중 Json Array에 접근하기 위해 Array명 Company 입력
                     
                    // 방법 2. Json으로 가져온 데이터에 Array로 바로 접근하기
                    var CompanyArray = data.Company; // Json Array에 접근하기 위해 Array명 Company 입력
                    console.log(CompanyArray); 
                     
                    var myData="";
                    $.each(CompanyArray,function(key,value) {
                            myData += ('<option value='+value.Code+'>' +'key:'+key+', Code:'+value.Code+',Name:'+value.Name + '</option>');                     
                    });
                    $("#tekbeCompnayList").html(myData);
            }
        });
 
        // 배송정보와 배송추적 tracking-api
        $("#myButton1").click(function() {
            var t_code = $('#tekbeCompnayList option:selected').attr('value');
            var t_invoice = $('#invoiceNumberText').val();
            $.ajax({
                type:"GET",
                dataType : "json",
                url:"http://info.sweettracker.co.kr/api/v1/trackingInfo?t_key="+myKey+"&t_code="+t_code+"&t_invoice="+t_invoice,
                success:function(data){
                    console.log(data);
                    var myInvoiceData = "";
                    if(data.status == false){
                        myInvoiceData += ('<p>'+data.msg+'<p>');
                    }else{
                        myInvoiceData += ('<tr>');                
                        myInvoiceData += ('<th>'+"보내는사람"+'</td>');                  
                        myInvoiceData += ('<th>'+data.senderName+'</td>');                  
                        myInvoiceData += ('</tr>');     
                        myInvoiceData += ('<tr>');                
                        myInvoiceData += ('<th>'+"제품정보"+'</td>');                   
                        myInvoiceData += ('<th>'+data.itemName+'</td>');                    
                        myInvoiceData += ('</tr>');     
                        myInvoiceData += ('<tr>');                
                        myInvoiceData += ('<th>'+"송장번호"+'</td>');                   
                        myInvoiceData += ('<th>'+data.invoiceNo+'</td>');                   
                        myInvoiceData += ('</tr>');     
                        myInvoiceData += ('<tr>');                
                        myInvoiceData += ('<th>'+"송장번호"+'</td>');                   
                        myInvoiceData += ('<th>'+data.receiverAddr+'</td>');                    
                        myInvoiceData += ('</tr>');                                       
                    }
                     
                     
                    $("#myPtag").html(myInvoiceData)
                     
                    var trackingDetails = data.trackingDetails;
                     
                     
                    var myTracking="";
                    var header ="";
                    header += ('<tr>');               
                    header += ('<th>'+"시간"+'</th>');
                    header += ('<th>'+"장소"+'</th>');
                    header += ('<th>'+"유형"+'</th>');
                    header += ('<th>'+"전화번호"+'</th>');                  
                    header += ('</tr>');     
                     
                    $.each(trackingDetails,function(key,value) {
                        myTracking += ('<tr>');               
                        myTracking += ('<td>'+value.timeString+'</td>');
                        myTracking += ('<td>'+value.where+'</td>');
                        myTracking += ('<td>'+value.kind+'</td>');
                        myTracking += ('<td>'+value.telno+'</td>');                     
                        myTracking += ('</tr>');                                  
                    });
                     
                    $("#myPtag2").html(header+myTracking);
                     
                }
            });
        });
        
        $('.modal').on('hidden.bs.modal', function (e) {
    	    console.log('modal close');
    	  $(this).find('form')[0].reset()
    	});
         
});
</script>
<style>
.tracking {
	margin: 10px;
	position: relative;
}

.tracking * {
	font-size: 18px;
	color: black;
}

#myButton1 {
	position: relative;
	left: 50%;
	transform: translateX(-50%);
}

.tracking>div {
	margin-bottom: 10px;
}
</style>
<div class="tracking">
	<button type="button" class="close" data-dismiss="modal">&times;</button>
	<div>
		<span id="tekbeCompnayName">택배회사명: </span> <select
			id="tekbeCompnayList" name="tekbeCompnayList"></select>
	</div>
	<div>
		<span id="invoiceNumber">운송장번호: </span> <input type="text"
			id="invoiceNumberText" name="invoiceNumberText">
	</div>
	<div>
		<button type="button" class="btn btn-default" id="myButton1">택배
			조회하기</button>
	</div>
	<div>
		<table id="myPtag"></table>
	</div>
	<div>
		<table id="myPtag2"></table>
	</div>
</div>