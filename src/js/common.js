$(function(){
//轮播图
TouchSlide({ 
	slideCell:"#focus",
	titCell:".hd ul", //开启自动分页 autoPage:true ，此时设置 titCell 为导航元素包裹层
	mainCell:".bd ul", 
	effect:"left", 
	autoPlay:true,//自动播放
	autoPage:true, //自动分页
	switchLoad:"_src" //切换加载，真实图片路径为"_src" 
});

//分类按钮

	$("#header .fenlei").on("touchstart",function(event){
		event.stopImmediatePropagation();
		$("#header .fenleiBox").removeClass("n");
		$("#header .fenleiBox").on("touchstart",function(event){
			event.stopImmediatePropagation();
		})
	});
	$(document).on("touchstart",function(){
		$("#header .fenleiBox").addClass("n");
	})
})
