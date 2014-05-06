(function(){
window.examples.colorpicker=function(){

	
	var div=document.createElement('div');
	div.className="box";

	jQuery.getBody().append(div);

	var colorpicker=new ui.colorpicker({
		render : div,
		onChange:function(hsb,hex,rgb,el){
			console.info("onChange:#"+hex);
		},
		onSubmit:function(hsb,hex,rgb,el){
			console.info("onSubmit:#"+hex);
		}
	});
	
	colorpicker.show();

	window.colorpicker=colorpicker;

}

})();