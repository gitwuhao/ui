(function(){
window.examples.date=function(){

	var div=jQuery.createElement('<div class="user"></div>');

	jQuery.getBody().append(div);

	var date=new ui.form.date({
		render : div,
		label : "日期",
		cls : "date",
		readonly : true,
		name : "bcms"
	});

}

})();