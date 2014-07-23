(function() {
	window.examples.dragdrop = function() {

		var html,div;

		html = ['<div class="box">', '<div class="item1"></div>', '<div class="item2"></div>', '</div>'];

		$.getBody().append(html.join(''));

		$('.box,.item1,.item2').mousedown(function(event) {
			if (event.target != this) {
				return;
			}
			if (this.className.indexOf('box') > -1) {
				ui.dragdrop.drag({
					target : this,
					event : event
				});
			} else {
				ui.dragdrop.resize({
					target : this,
					type : {
						drag : true
					},
					event : event,
					parentBox : this.parentElement
				});
			}
		});

		html = ['<div class="list">', '<div class="item" contenteditable="true">1</div>', '<div class="item">2</div>', '<div class="item">3</div>', '<div class="item">4</div>', '<div class="item">5</div>', '<div class="item">6</div>', '<div class="item"><div><span>7</span></div></div>', '<div class="item"><div><span>8</span></div></div>', '<div class="item"><div><span>9</span></div></div>', '</div>'];

		$.getBody().append(html.join(''));

		$('.item,.list').mousedown(function(event) {
			//if(event.target!=this){
			//	return;
			//}
			if (this.className.indexOf('list') > -1) {
				ui.dragdrop.drag({
					target : this,
					event : event
				});
			} else {
				ui.dragdrop.sort({
					target : this,
					type : {
						resize : true
					},
					event : event,
					parentBox : this.parentElement
				});
				return false;
			}
		});


		html = ['<div class="imagebox"><table class="tableimage">',
			'<tbody>',
				'<tr>', 
					'<td width="25%">',
					'<a class="image-link selected">',
					'<img src="http://www.oilan.com.cn/oD/images/T2o4xhXvlaXXXXXXXX_!!263817957.jpg" width="100%"></a>',
					'</td>',
					'<td width="25%"><a class="image-link">',
					'<img src="http://www.oilan.com.cn/oD/images/T2Nvh2Xa0bXXXXXXXX_!!263817957.jpg" width="100%"></a>',
					'</td>',
					'<td width="25%"><a class="image-link">',
					'<img src="http://www.oilan.com.cn/oD/images/T2vh7DXj4XXXXXXXXX_!!263817957.jpg" width="100%"></a>',
					'</td>',
					'<td width="25%" heights="1"><a class="image-link">',
					'<img src="http://www.oilan.com.cn/oD/images/T272M1Xd0aXXXXXXXX_!!263817957.jpg" width="100%"></a>',
					'</td>',
				'</tr>',
			    '<tr>', 
					'<td width="25%">',
					'<a class="image-link selected">',
					'<img src="http://www.oilan.com.cn/oD/images/T2o4xhXvlaXXXXXXXX_!!263817957.jpg" width="100%"></a>',
					'</td>',
					'<td width="25%"><a class="image-link">',
					'<img src="http://www.oilan.com.cn/oD/images/T2Nvh2Xa0bXXXXXXXX_!!263817957.jpg" width="100%"></a>',
					'</td>',
					'<td width="25%"><a class="image-link">',
					'<img src="http://www.oilan.com.cn/oD/images/T2vh7DXj4XXXXXXXXX_!!263817957.jpg" width="100%"></a>',
					'</td>',
					'<td width="25%"><a class="image-link">',
					'<img src="http://www.oilan.com.cn/oD/images/T272M1Xd0aXXXXXXXX_!!263817957.jpg" width="100%"></a>',
					'</td>',
				'</tr>',
			'</tbody>',
			'</table>',
			'<div class="image-grid" style="overflow: hidden; margin: 0px 0px 5px 5px;"><a style="width: 344px; float: left; overflow: hidden; margin: 0px 5px 5px 0px; border: 1px solid rgb(204, 204, 204); text-decoration: none;" _href="http://item.taobao.com/item.htm?id=27018556087"><img src="http://img03.taobaocdn.com/imgextra/i3/1646439371/TB2o5XsXpXXXXcyXpXXXXXXXXXX-1646439371.jpg" style="width: 100%; vertical-align: top; height: 138px; border: 0px;"></a><a style="width: 160px; float: left; overflow: hidden; margin: 0px 0px 5px; border: 1px solid rgb(204, 204, 204); text-decoration: none;" _href="http://item.taobao.com/item.htm?id=27018556087"><img src="http://img03.taobaocdn.com/imgextra/i3/1646439371/TB2GY7yXXXXXXaQXFXXXXXXXXXX-1646439371.jpg" style="width: 100%; vertical-align: top; height: 138px; border: 0px;"></a><a style="width: 220px; float: right; overflow: hidden; margin: 0px 5px 5px 5px; border: 1px solid rgb(204, 204, 204); text-decoration: none;/* height: 140px; */clear: right;" _href="http://item.taobao.com/item.htm?id=27018556087"><img src="http://img04.taobaocdn.com/imgextra/i4/1646439371/TB2YnmhXVXXXXXqXpXXXXXXXXXX-1646439371.jpg" style="width: 100%; vertical-align: top; height: 283px; border: 0px;"></a><a style="width: 168px; float: left; overflow: hidden; margin: 0px 5px 0px 0px; border: 1px solid rgb(204, 204, 204); text-decoration: none;clear: left;" _href="http://item.taobao.com/item.htm?id=27018556087"><img src="http://img03.taobaocdn.com/imgextra/i3/1646439371/TB2ezFwXpXXXXaSXFXXXXXXXXXX-1646439371.jpg" style="width: 100%; vertical-align: top; height: 137px; border: 0px;"></a><a style="width: 169px; float: left; overflow: hidden; margin: 0px 5px 0px 0px; border: 1px solid rgb(204, 204, 204); text-decoration: none;" _href="http://item.taobao.com/item.htm?id=27018556087"><img src="http://img02.taobaocdn.com/imgextra/i2/1646439371/TB2dy0NXXXXXXcVapXXXXXXXXXX-1646439371.jpg" style="width: 100%; vertical-align: top; height: 137px; border: 0px;"></a><a style="width: 160px; float: left; overflow: hidden; margin: 0px; border: 1px solid rgb(204, 204, 204); text-decoration: none;" _href="http://item.taobao.com/item.htm?id=27018556087"><img src="http://img01.taobaocdn.com/imgextra/i1/1646439371/TB2g_ZDXXXXXXXTXFXXXXXXXXXX-1646439371.jpg" style="width: 100%; vertical-align: top; height: 138px; border: 0px;"></a></div>',
			'</div>'];

		$.getBody().append(html.join(''));


		$('.tableimage td').mousedown(function(event){
			ui.dragdrop.sort({
				target : this,
				event : event,
				parentBox : this.offsetParent
			});
		});


		$('.image-grid a').mousedown(function(event) {
			//if(event.target!=this){
			//	return;
			//}
			ui.dragdrop.sort({
				target : this,
				type : {
					resize : true
				},
				event : event,
				parentBox : this.parentElement,
				getRegion : function(region){
					var $img=this.$target.children('img');

					$img.css({
						height : $img.height() + region.h
					});

					this.$target.css({
						width : this.$target.width() + region.w
					});
				}
			});
		});

		$.getDoc().keydown(function(event) {
			if (event.keyCode == 27) {
				ui.dragdrop.resize.hide();
			}
		});
	};

})(); 