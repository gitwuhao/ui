(function(){
window.examples.calendar=function(){

	
	var div=document.createElement('div');
	div.className="box";

	jQuery.getBody().append(div);

	var calendar=new ui.calendar({
		width : "",
		cls : "combo",
		date : "2013-01-23"
	});


	setTimeout(function(){
		var calendar=new ui.calendar({
			render : div,
			autoSize:true,
			width : "",
			cls : "combo",
			date : "2014-04-23"
		});

		calendar.$header.height(30);
		calendar.resize(600,300);
	},1000);

}

})();