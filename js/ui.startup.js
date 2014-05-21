(function(CF,$){

	window.path='js/ui/';

	$.includePack('css','css/ui.css');

    $.loadJSQueue(
		'js/ui.files.js',
		function(){

			UIList.push(function(){
				ui.ready=true; 			 
			});

			$.loadJSQueue.apply(this,UIList);
		});
})(CF,$);