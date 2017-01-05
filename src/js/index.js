// var myScroll;
// function loaded () {
// 	myScroll = new IScroll('#wrapper', { 
// 			scrollX: true, freeScroll: true
// 		 });
// }
// document.addEventListener('touchmove', function (e) { 
// 	e.preventDefault(); 
// }, false);
$(function(){
var opts = {
	url:"data/productlist.txt",
	baseDom:"#productList>ul>li",
	cloneSize:4
};
var lazy = new lazyLoading(opts);
var clientH = $(document).height();
$(document).on("touchmove",function(){
	var scrollH = $(document).scrollTop();
// console.log(scrollH);
// console.log(clientH);
	if(scrollH >= clientH*0.8){
		lazy.createHtml(lazy.opts._page);
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
			$(_cloneE).find("img").attr("src",$this.opts.data[i].src);
			$(_cloneE).find("em").text($this.opts.data[i].name);
			$(_cloneE).find("i").text($this.opts.data[i].price);
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
