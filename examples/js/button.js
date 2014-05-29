(function(){
window.examples.button=function(){

	
	var div=document.createElement('div');
	div.className="box";

	 var button=new ui.button({
		cls : "ok",
		label : "确定",
		render : div,
		onClick:function(){
			console.info("onClick:"+this.label);
		}
	});

	 var button=new ui.button({
		cls : "ted-ui-slider",
		icon : true,
		//render : div,
		onClick:function(){
			console.info("onClick:"+this.label);
		}
	});


	var button=new ui.button({
		cls : "ted-ui-slider",
		label : "增加",
		icon : true,
		//render : div,
		onClick:function(){
			console.info("onClick:"+this.label);
		}
	});
 
 	var button=new ui.button({
		cls : "ted-ui-slider",
		label : "删除",
		icon : true,
		onClick:function(){
			console.info("onClick:"+this.label);
		}
	});

	jQuery.getBody().append(div);
}

})();