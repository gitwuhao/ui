(function(){
window.examples.button=function(){

	
	var div=document.createElement('div');
	div.className="box";

	 var button=new ui.button({
		cls : "ok",
		label : "确定",
		render : div,
		onButtonClick:function(){
			console.info("onButtonClick:"+this.label);
		}
	});

	 var button=new ui.button({
		cls : "ted-ui-slider",
		icon : true,
		//render : div,
		onButtonClick:function(){
			console.info("onButtonClick:"+this.label);
		}
	});
 

	jQuery.getBody().append(div);
}

})();