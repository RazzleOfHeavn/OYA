//懒加载
// var lazyLoading = function(opts){
// 	var _default = {
// 		url:"",
// 	}
// 	var $this = this;
// 	var $this.opts = $extend(_default,opts);
// 	var getData = function(){
// 		$.get($this.opts.url+"?_="+Math.random(),function(_response){
// 			$this.opts.data = typeof _response == 'string'?JSON.parse(_response):_response;
// 		})
// 	}
// 	var createHtml = function(){
		
// 	}
// }


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
