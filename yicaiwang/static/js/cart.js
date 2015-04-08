$(function(){

    //进入页面获取货品总额
    if($(".kinds").html()==''){
		var allJin=0;
		$(".jine").each(function(){
			allJin+=$(this).html()-0;
		})
		$(".kinds").html(allJin);
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
        caculate($(this),num)
	});


	// 加号
	$('.cart_list').on('click','.increment',function(){
		var $input=$(this).prev();
		var num=$input.val()-0+1;
		$input.val(num);
		//这里是判断库存量的操作
		var productRepertory=$(this).closest('.cart_tbody_bd').prev().val();
		if(num>productRepertory){
			$.alert('库存量不足请重新输入库存量为'+productRepertory+'个');
			$input.val(1);
            caculate($(this),1);
			$(this).prevAll('.decrement').addClass('disabled')
			return;
		}
		if(num==1){
			$(this).prevAll('.decrement').addClass('disabled')
		}else{
			$(this).prevAll('.decrement').removeClass('disabled')
		}
        caculate($(this),num);
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
		var productRepertory=$(this).closest('.cart_tbody_bd').prev().val();
		if(num>productRepertory){
			$.alert('库存量不足请重新输入库存量为'+productRepertory+'个');
			$input.val(1);
            caculate($(this),1)
			$(this).prevAll('.decrement').addClass('disabled')
			return;
		}
		if(num==1){
			$(this).prevAll('.decrement').addClass('disabled')
		}else{

			$(this).prevAll('.decrement').removeClass('disabled')
		}
        caculate($(this),num)
	});
});

function caculate(item,num){
    var price=$(item).closest('.sumPrice').find('.price').html()-0;
    //改变金额
    $(item).closest('.sumPrice').find('.jine').html(price*num);

    //改变购物商品总数
    var allNum=0;
    $('.cart_list .num').each(function(){
        allNum+=$(this).val()-0;
    });
    $(".sumCount").find('span').html(allNum);

    //总的购物金额
    var sumKinds=0;
    $('.cart_list .jine').each(function(){
        sumKinds+=$(this).closest('.sumPrice').find('.jine').html()-0;
    });
    // 改变总的货品金额
    $(".kinds").html(sumKinds);
}

