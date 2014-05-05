(function(CF,jQuery){

	
	var examples={
		path : 'js/examples'
	};

	
	var path=examples.path+'/js';


	window.examples=examples;
	//?demo=menu
    jQuery.loadJSQueue(
		path+'/form.js',
		path+'/button.js',
		path+'/toolbar.js',
		path+'/text.js',
		path+'/combo.js',
		path+'/menu.js',
		path+'/splitbutton.js',
		path+'/calendar.js',
		path+'/datepicker.js',
		path+'/date.js',
		path+'/window.js',
		path+'/teditor.js',
		path+'/tab.js',
		function(){
			//document.clear();
			
		}
	);
function run(){
	var p=jQuery.getParam();
	var demo=p.demo;
	if(demo){
		var fn=examples[demo];
		if(fn){
			document.title="ui."+demo;
			jQuery.includePack('css',examples.path+'/css/'+demo+'.css',fn);
			//fn();
		}
	}
}

jQuery.schedule(function(){
	if(window.ui){
		if(window.ui.ready){
			 run();
			 return false;
		}
	}
});

})(CF,jQuery);