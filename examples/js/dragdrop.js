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

};

})();