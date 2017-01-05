
	$("#header .tag a").on("touchstart",function(item){
		$(item.target).addClass("active").siblings('a').removeClass('active');
	})
