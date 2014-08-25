(function(CF,$){

	window.UI_LIB_PATH='js/ui/';

	$.includePack('css','css/ui.css');

    $.loadJSQueue(
		'js/ui.files.js',
		function(){

			UIList.push(function(){
				ui.ready=true;
				$.getDoc().trigger('UIReady',ui);
			});

			$.loadJSQueue.apply(this,UIList);

		});
})(CF,$);