$(function(){

	// 进入页面循环取值显示件数
	if($(".sumCount").find('span').html()==0){
		var allNum=0;
		$('.cart_list .num').each(function(){
			allNum+=$(this).val()-0;
		});
		$(".sumCount").find('span').html(allNum)
	}

    //进入页面获取货品总额
    if($(".kinds").html()==''){
		var allJin=0;
		$(".jine").each(function(){
			allJin+=$(this).html()-0;
		})
		$(".kinds").html(allJin);
		$(".sunZong").html(allJin+'元');
	}

	//进入页面判断购买数量的框如果等于1就添加样式否则可以点击
	$('.cart_list .num').each(function(){
		if($(this).val()==1){
			$(this).prevAll('.decrement').addClass('disabled');
		}else{
			$(this).prevAll('.decrement').removeClass('disabled');
		}
	});


	//减号
	$('.cart_list').on('click','.decrement',function(){
		if($(this).hasClass('disabled')){
			return false;
		}
		var $input=$(this).next();
		var num=$input.val()-1;
		$input.val(num);
		if(num==1){
			$(this).addClass('disabled')
		}else{
			$(this).removeClass('disabled')
		}
		var price=$(this).closest('.sumPrice').find('.price').html()-0;
		//改变金额
		$(this).closest('.sumPrice').find('.jine').html(price*num-0);
		//改变购物商品总数
		var allNum=0;
		$('.cart_list .num').each(function(){
			allNum+=$(this).val()-0;
		});
		$(".sumCount").find('span').html(allNum);

		//总的购物金额
		var sumKinds=0;
		$('.cart_list .num').each(function(){
			sumKinds+=$(this).closest('.sumPrice').find('.jine').html()-0;
		});
		$(".kinds").html(sumKinds);
		$(".sunZong").html(parseFloat($(".kinds").html()-0)+parseFloat($(".sunYunFei").html()-0)+"元")
		$("#totalPrices").val($(".sunZong").html().substring(0,$(".sunZong").html().length-1));

	});


	// 加号
	$('.cart_list').on('click','.increment',function(){
		var $input=$(this).prev();
		var num=$input.val()-0+1;
		$input.val(num);
		//这里是判断库存量的操作
		var productRepertory=$(this).closest('.cart_tbody_bd').prev().find('.productRepertory').val();
		if(num>productRepertory){
			$.alert('库存量不足请重新输入库存量为'+productRepertory+'个');
			$input.val(1);
			productOrdersNum($(this),1);
			$(this).prevAll('.decrement').addClass('disabled')
			return;
		}
		if(num==1){
			$(this).prevAll('.decrement').addClass('disabled')
		}else{
			$(this).prevAll('.decrement').removeClass('disabled')
		}
		productOrdersNum($(this),num);

	});


	//鼠标移出事件

	$('.cart_list').on('blur','.num',function(){
	if($(this).hasClass('disabled')){
			return false;
		}
		var $input=$(this).closest('.num');
		var num=$input.val()-0;
		$input.val(num);
		//这里是判断库存量的操作
		var productRepertory=$(this).closest('.cart_tbody_bd').prev().find('.productRepertory').val();
		if(num>productRepertory){
			$.alert('库存量不足请重新输入库存量为'+productRepertory+'个');
			$input.val(1);
			productOrdersNum($(this),1);
			$(this).prevAll('.decrement').addClass('disabled')
			return;
		}
		if(num==1){
			$(this).prevAll('.decrement').addClass('disabled')
		}else{

			$(this).prevAll('.decrement').removeClass('disabled')
		}
		productOrdersNum($(this),num);
	});


	//运费移出事件

	$('.cart_list').on('blur','.yunFei',function(){
		//改变运费
		var allYun=0;
		$('.cart_list .yunFei').each(function(){
			var $yunFei=$(this).closest('.yunFei');
			var num=$yunFei.val()-0;
			allYun+=num;
		});
		$(".sunYunFei").html(allYun);
		//改变总金额
		//获取运费
	    var yunFei=	$(".sunYunFei").html()-0;
      /*  //获取金额
		var jine= $(this).closest('.sumPrice').find('.jine').html()-0;*/
		var allNum=0;
		$('.cart_list .jine').each(function(){
			allNum+=$(this).closest('.sumPrice').find('.jine').html()-0;
		});
         $(".sunZong").html(yunFei+allNum+"元");
		$("#totalPrices").val($(".sunZong").html().substring(0,$(".sunZong").html().length-1));

	});

		 //点击使用新地址
		$("#radigroup0_0").click(function (){
			var addressNone=$("#address");
			var addressNone1=$("#address1");
			var isAddress=$("#isAddress");
			addressNone.css("display","inline-block");
			addressNone1.css("display","none");
			isAddress.css("display","none")
		});

		  //点击使用默认地址
		  $("#radigroup0_1").click(function(){
			  var addressNone=$("#address");
			  var addressNone1=$("#address1");
			  var isAddress=$("#isAddress");
			  addressNone.css("display","none");
			  addressNone1.css("display","inline-block");
			  isAddress.css("display","inline-block")
		  })


	   //点击地址确认的操作
		$(".readOnly").click(function(){
			$(this).closest('ul').find('input').prop('readonly',true).end().find('select').prop('disabled',true);
			$(this).closest('ul').find(':checkbox').prop('disabled',true);
		})

	   $(".readOnlyUpdate").click(function(){
		   $(this).closest('ul').find('input').prop('readonly',false).end().find('select').prop('disabled',false);
		   $(this).closest('ul').find(':checkbox').prop('disabled',false);
	   })

		//默认地址点击事件
		$("#inpt_default").click(function(){
		  $("#isAddress1").val($("#inpt_default").val());
		})
});


function productOrdersNum(item,num){
	var price=$(item).closest('.sumPrice').find('.price').html()-0;
	//改变金额
	$(item).closest('.sumPrice').find('.jine').html(parseFloat(price*num));
	//改变购物商品总数
	var allNum=0;
	$('.cart_list .num').each(function(){
		allNum+=$(this).val()-0;
	});
	$(".sumCount").find('span').html(allNum);

	//总的购物金额
	var sumKinds=0;
	$('.cart_list .num').each(function(){
		sumKinds+=$(this).closest('.sumPrice').find('.jine').html()-0;
	});

	$(".kinds").html(sumKinds);
	$(".sunZong").html(parseFloat($(".kinds").html()-0)+parseFloat($(".sunYunFei").html()-0)+"元");
	$("#totalPrices").val($(".sunZong").html().substring(0,$(".sunZong").html().length-1));
}

