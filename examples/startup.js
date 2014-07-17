(function(CF,jQuery){

	
	var examples={
		path : 'examples'
	};

	
	var path=examples.path+'/js';


	window.examples=examples;
	
	var array=[
		'form',
		'button',
		'toolbar',
		'text',
		'combo',
		'menu',
		'splitbutton',
		'calendar',
		'datepicker',
		'date',
		'window',
		'teditor',
		'colorpicker',
		'tab',
		'undo',
		'dragdrop'
	];
	
	var param=[];
	for(var i=0,len=array.length;i<len;i++){
		param.push(path+'/'+array[i]+'.js');
	}
	
	param.push(function(){
			
	});

    jQuery.loadJSQueue.apply(this,param);
	

	var html=['<div class="demo-list">'];
	for(var i=0,len=array.length;i<len;i++){
		html.push('<a href="?demo=',array[i],'" >',array[i],'</a>');
	}
	html.push('</div>');
	$.getBody().append(html.join(""));


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