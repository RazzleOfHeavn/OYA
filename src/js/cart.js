$(function(){
	var num = $('#content li>div>div span').text();
	//数量加减
	if (num==1) {
		$('#content li >div >div .icon-lnicon35').css("color","#aaa")
	}
	$('#content li >div >div .icon-lnicon35').on("touchstart",function(){
		num = parseInt($('#content li>div>div span').text());
		num--;
		if (num == 0) {
			$('#content li >div >div .icon-lnicon35').css("color","#aaa");
			return;
		}
		$('#content li>div>div span').text(num);
	});
	$('#content li >div >div .icon-jia').on('touchstart',function(){
		num = parseInt($('#content li>div>div span').text());
		num++;
		$('#content li>div>div span').text(num);
		if (num>1) {
			$('#content li >div >div .icon-lnicon35').css("color","#000");
		}
	})
	//删除
	$('#content li >div >div .icon-shanchu').on('touchstart',function(e){
		$(e.target).closest("li").remove();
	})
})