$(function(){
	$("#content .category li").on("touchstart",function(item){
		console.log($(item)[0].target);
		
		$($(item)[0].target).css("color","#f00").find("i").removeClass("icon-jiantou1")
		.addClass("icon-icon2").parent("li").siblings("li").css("color","#000").find("i")
		.addClass("icon-jiantou1").removeClass("icon-icon2");
	})
})
