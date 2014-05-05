(function(CF,$){

	var path='js/';

	$.includePack('css','css/ui.css');

    $.loadJSQueue(
		path+'ui/widget.js',
		path+'ui/popu.js',
		path+'ui/calendar.js',
		path+'ui/datepicker.js',
		path+'ui/form.js',
		path+'ui/form/text.js',
		path+'ui/form/combo.js',
		path+'ui/form/date.js',
		path+'ui/button.js',
		path+'ui/menu.js',
		path+'ui/splitbutton.js',
		path+'ui/toolbar.js',
		path+'ui/tab.js',
		path+'ui/window.js',
		path+'ui/messagebox.js',
		function(){
			ui.ready=true;

		});
})(CF,$);