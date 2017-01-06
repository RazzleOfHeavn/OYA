$(function(){

	$("#header .tag a").on("touchstart",function(item){
		$(item.target).addClass("active").siblings('a').removeClass('active');
		var index = parseInt($(item.target).index())+1;
		var a = index+1;
		var b = index - 1;
		if (index == 1) {
			$("#content"+index+"").removeClass("n").siblings("#content"+a+"").addClass("n");
			console.log($("#content"+index+1+""));
		} else {
			//评论与详情tab切换
			$("#content"+index+"").removeClass("n").siblings("#content"+b+"").addClass("n");
			//评论页懒加载
			var opts = {
				url:"../data/apraise.txt",
				cloneSize:6,
				baseDom:"#content2>.user"
			}
			var apraise = new lazyLoading(opts);
			var clientH = $(document).height();
			$(document).on("touchmove",function(){
				var scrollH = $(document).scrollTop();
				// console.log(scrollH);
				// console.log(clientH);
				if(scrollH >= clientH*0.2){
					apraise.createHtml(apraise.opts._page);
					clientH = $(document).height();
				}
			})
		}
	});
	
})
var lazyLoading = function(opts){
	var _default = {
		url:"",
		cloneSize:0,
		baseDom:null,
		_page:1
		
	}
	var $this = this;
	$this.opts = $.extend(_default,opts);
	var getData = function(callback){
		$.get($this.opts.url+"?_="+Math.random(),function(_response){
			$this.opts.data =  typeof _response == 'string'? JSON.parse(_response) : _response;
			
			if(callback && typeof callback == 'function'){
				callback();
			}
		})
	}
	this.createHtml = function(_page){

		var min = ($this.opts._page-1)*$this.opts.cloneSize;
		var max = $this.opts._page*$this.opts.cloneSize-1;
		if (max >= $this.opts.data.length) {
			max =  $this.opts.data.length-1;
		}
		for (var i = min; i <= max; i++) {
			var _cloneE = $($this.opts.baseDom).eq(0).clone()
			.appendTo($($this.opts.baseDom).parent());
			$(_cloneE).find(".top img").attr("src",$this.opts.data[i].img);
			$(_cloneE).find(".top i").text($this.opts.data[i].name);
			$(_cloneE).find(".top span").eq(1).text($this.opts.data[i].pdate);
			$(_cloneE).find(".bottom span").eq(1).text($this.opts.data[i].apraise);
			$(_cloneE).find(".bottom span").eq(2).text($this.opts.data[i].bdate);
		}
		if(typeof $this.opts.baseDom == 'string' && $this.opts._page==1){
			$($this.opts.baseDom).eq(0).remove();
		} 
		$this.opts._page++;
		
		
	}
	getData(function(){
		$this.createHtml($this.opts._page);
	});
}