$(function(){
    $(".huifu").click(function(){
        $("#ulEmail").empty();
        var id=$(this).closest("tr").attr("id");
        var emailId = $(this).closest("tr").find('.emailId').val();
        $("#emailId").val(id);
        $("#emailId2").val($(this).closest("tr").find('.emailId').val());
        $("#sendName").val($(this).closest("tr").find('.sendName').html());
        $("#sendtitle").val($(this).closest("tr").find('.name').html());
        $.ajax({
            url:"/memberCenter/findSendAndReceiveEmail.html" ,
            type:'POST',
            data:{"id":id,"emailId":emailId},
            dataType:"json",
            success:function(date){
                $.each(date,function(emailList,email){
                    $("#ulEmail").append("<li class='clearfix'> <div class='name_time'> <div class='message_name'>"+email.yourselfName+"</div>" +
                    "<div class='message_time'>"+email.createTime+"</div> </div><div class='title_detail'>" +
                    "<div class='message_title'>"+email.title+"</div> <div class='message_detail'>"+email.content+"</div>" +
                    " </div></li> ");
                })
            }
        });
        $(".dialog_filter").show();
        $(".dialog_box").show();
    });

})
function spanValidate(){
    var phone=$("#phone").val();
    var mobile=$("#mobile").val();
    if(phone=="" && mobile==""){
        $("#spanId").show();
        return false;
    }else{
        return true;
    }
}