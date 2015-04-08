$(function(){
	var menu_hd = $(".menu_hd");
	menu_hd.click(function(){
		$(this).next().slideToggle();
		var i = $(this).find("i");
		if(i.hasClass("minus_ico")){
			i.attr("class","plus_ico");
		}else{
			i.attr("class","minus_ico");
		}
	});
});
$(function(){
	$(".js_tabs_mod .js_tabs_nav").click(function(){
		var i = $(this).index();
		var c = $(this).parents(".js_tabs_mod").find(".js_tabs_con");
		$(this).addClass("current").siblings().removeClass("current");
		c.hide().eq(i).show();
	});
});
var tabs = function(obj,clas){
	var i = $(obj).index();
	$("."+clas).hide().eq(i).siblings("."+clas).show();
};

$(function(){
	$(".ui-select .selectMod").click(function(){
		$(this).next(".select-list").toggle();
		$(this).toggleClass("ui-select_hover");
	});
	$(".ui-select .select-list li").click(function(){
		$(this).parents(".ui-select").find(".select-input").text($(this).text());
		$(this).parents(".ui-select").find(".select-list").hide();
		$(this).parents(".ui-select").find(".selectMod").addClass("ui-select_hover");
	});
});
$(function(){
	var pop_up = $(".dialog_box");
	var pop_filter = $(".dialog_filter");
	$(".js_btn").click(function(){
		pop_up.show();
		pop_filter.show();
	});
	$(".dialog_box .close,.dialog_filter").click(function(){pop_up.hide();pop_filter.hide();});
});
$(function(){
	$('.head_nav .ul-inner a').click(function(){
		var last_index=$(this).closest('.ul-inner').closest('li').index();
		localStorage.setItem('last_index', last_index);
	});

	var uri=location.pathname+location.search,
		a=$('.head_nav a.a-nav[href="'+uri+'"]');
	if(a.length==1){
		a.closest('li').addClass('current').siblings().removeClass('current');
		localStorage.setItem('last_index', a.closest('li').index());
	}else{
		var last_index=localStorage.getItem('last_index');
		if(last_index){
			$('.head_nav').children('li').eq(last_index).addClass('current').siblings().removeClass('current');
		}else{
			//...
		}
	}


});