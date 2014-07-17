(function(){
window.examples.dragdrop=function(){

  

	var html=['<div class="x-ui-dd-resize-box">',
				'<div class="tl"></div>',
				'<div class="tc"></div>',
				'<div class="tr"></div>',
				'<div class="lc"></div>',
				'<div class="bg"></div>',
				'<div class="rc"></div>',
				'<div class="bl"></div>',
				'<div class="bc"></div>',
				'<div class="br"></div>',
			'</div>'];

	var div=$.createElement(html.join(''));
	
	$.getBody().append(div);

	div.style.display='block';
	
	html=['<div class="x-ui-dd-replace-box">',
				'<a class="image-link selected">',
					'<img src="http://www.oilan.com.cn/oD/images/T2o4xhXvlaXXXXXXXX_!!263817957.jpg" width="100%" />',
				'</a>',
		  '</div>'];

	div=$.createElement(html.join(''));
	$.getBody().append(div);

	div.style.display='block';	
	div.style.left='100px';
	div.style.top='100px';


	html=['<div class="box">',
			  '<div class="box1"></div>',
			  '<div class="box2"></div>',
		  '</div>'];

	$.getBody().append(html.join(''));


	$('.box,.box1,.box2').mousedown(function(event){
		if(event.target!=this){
			return;
		}
		if(this.className=='box'){
			ui.dragdrop.dragstart({
				target : this,
				event : event
			});
		}else{
			ui.dragdrop.resize.show({
				target : this
			});
			ui.dragdrop.dragstart({
				target : this,
				event : event,
				parentBox : this.parentElement,
				type : 'resize'
			});
		}
	});


	html=['<div class="list">',
			  '<div class="item">1</div>',
			  '<div class="item">2</div>',
			  '<div class="item">3</div>',
			  '<div class="item">4</div>',
			  '<div class="item">5</div>',
			  '<div class="item">6</div>',
			  '<div class="item">7</div>',
			  '<div class="item">8</div>',
			  '<div class="item">9</div>',
		  '</div>'];

	$.getBody().append(html.join(''));

	$('.item,.list').mousedown(function(event){
		if(event.target!=this){
			return;
		}
		if(this.className=='list'){
			ui.dragdrop.dragstart({
				target : this,
				event : event
			});
		}else{

		}
	});

	$.getDoc().keydown(function(event){
		if(event.keyCode==27){
			ui.dragdrop.resize.hide();
		}
	});
};

})();