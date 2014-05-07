(function(){
window.examples.datepicker=function(){

	
	var div=document.createElement('div');
	div.className="box";

	jQuery.getBody().append(div);

	var datepicker=new ui.datepicker({
		width : "300",
		height : "300",
		cls : "combo",
		date : "2013-01-23"
	});

	var datepicker=new ui.datepicker({
		render : div,
		autoSize:true,
		width : "",
		cls : "combo",
		date : "2014-04-23"
	});
	
	var div=document.createElement('div');
	div.className="x-ui-datepicker-icon";

	jQuery.getBody().append(div);
}

})();