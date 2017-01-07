$(function(){
	var num1 = 0;

	var opts = {
			url:"../data/productShow.txt",
			cloneSize:10,
			baseDom:".products>ul>li"
		};
	var productList = new lazyLoading(opts);
	var clientH = $(document).height();
	var h = clientH;
	

	$("#content .category li").on("touchstart",function(item){

		$(item.currentTarget).toggleClass('c1').find("i")
		.toggleClass("icon-jiantou1").toggleClass("icon-icon2")
		.parent("li").siblings("li").removeClass("c1");
		var num = $(item.currentTarget).index()+2;
		if(num != num1){
			num1 = num;
			$("#content>div").eq(num).toggleClass("n").siblings("div")
			.not(".category").addClass("n");
			if (num == 2) {
				$('.tab_content .productType').on('touchstart',function(e){
					var num2 = $(e.target).index();
					$(e.target).addClass("b").siblings("li").removeClass("b");
					$(".tab_content .product ul").eq(num2).removeClass("n")
					.siblings("ul").addClass("n");
					
				})	
			}else if (num == 4) {

				function sortprice(a,b){
					return b.price-a.price;

				}
				productList.opts.data.sort(sortprice);
				$(".products ul li").eq(0).siblings("li").remove();
				productList.createHtml(1);	
				clientH = h;
	
			}
		}else{
			$("#content>div").eq(1).removeClass("n").siblings("div")
			.not(".category").addClass("n");
			if (num == 4) {
				function sortprice(a,b){
					return a.price-b.price;
				}
				productList.opts.data.sort(sortprice);
				$(".products ul li").eq(0).siblings("li").remove();
				productList.createHtml(1);
				clientH = h;
			};
			num1 = 0;

		}
		
		
	});
	$(document).on("touchmove",function(){
		var scrollH = $(document).scrollTop();
		console.log(scrollH);
		console.log(clientH);
		if(scrollH >= clientH*0.6){
			productList.createHtml(productList.opts._page);
			clientH = $(document).height();
		}
	})
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
			$this.opts.data =  typeof _response == 'string'?
			JSON.parse(_response) : _response;
			
			function sortPrice(a,b){
				return a.price-b.price;
			}
			$this.opts.data.sort(sortPrice);

			if(callback && typeof callback == 'function'){
				callback();
			}
		})
	}
	this.createHtml = function(_page,endPage){
		var min = (_page-1)*$this.opts.cloneSize;
		var max = _page*$this.opts.cloneSize-1;
		if (max >= $this.opts.data.length) {
			max =  $this.opts.data.length-1;
		}
		if(endPage&&_page > endPage){
			return;
		}
		for (var i = min; i <= max; i++) {
			var _cloneE = $($this.opts.baseDom).eq(0).clone()
			.appendTo($($this.opts.baseDom).parent());
			$(_cloneE).find("img").attr("src",$this.opts.data[i].img);
			$(_cloneE).find(".productTitle").text($this.opts.data[i].title);
			$(_cloneE).find(".productPrice").text('￥'+$this.opts.data[i].price);
			
		}
		if( _page==1){
			$($this.opts.baseDom).eq(0).remove();
		} 
		_page++;
		$this.opts._page++;
		
		
	}
	getData(function(){
		
		$this.createHtml($this.opts._page);
	});
}
