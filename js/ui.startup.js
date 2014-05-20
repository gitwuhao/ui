(function(CF,$){

	var path='js/ui/';

	$.includePack('css','css/ui.css');

    $.loadJSQueue(
		path+'widget.js',
		path+'popu.js',
		path+'calendar.js',
		path+'datepicker.js',
		path+'form.js',
		path+'form/text.js',
		path+'form/combo.js',
		path+'form/date.js',
		path+'form/radio.js',
		path+'form/checkbox.js',
		path+'button.js',
		path+'menu.js',
		path+'splitbutton.js',
		path+'toolbar.js',
		path+'tab.js',
		path+'window.js',
		path+'messagebox.js',
		path+'colorpicker.js',
		function(){
			ui.ready=true;

		});
})(CF,$);