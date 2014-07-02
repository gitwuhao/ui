(function(CF,jQuery,ui){
	ui.loading=function(config){
		this.config = config;
		this.ready();
	};

	
	CF.defineClass(ui.loading,{
		_type_:'ui',
		_name_ : 'loading',
		ready : function(){
			ui.logger();
			if(this.config.autoCreate!=false){
				this.create();
			}
		},
		remove : function(){
			ui.logger();
			var timeStamp=$.timestamp();
			var time=1000 - (timeStamp - this.startTimeStamp);
			var me=this;
			if(time > 0 ){
				setTimeout(function(){
					me.removeHandle();
				},time);
			}else{
				this.removeHandle();
			}
		},
		_remove_:function(){
			ui.logger();
			(function($box,$target,inst){
				$box.fadeOut(500,function(){
					setTimeout(function(){
						var parent=$target.parent();
						if(parent){
							parent.css({
								height : '',
								overflow : ''
							});
						}
						$target.show();
						$box.remove();
						CF.removeOwnProperty.call(inst);
					},100);
				});
			})(this.$box,this.$target,this);
		},
		removeHandle:function(){
			ui.logger();
			var $box=this.$box;
			var $target=this.$target;
			var parent=$target.parent();
			if(parent){
				parent.css({
					height : '',
					overflow : ''
				});
			}
			$target.show();
			$box.remove();
			CF.removeOwnProperty.call(this);
		},
		create :function(){
			ui.logger();
			var target=this.config.target;
			var $target=$(target);
			var html=['<div class="x-ui-loading-box">',
						'<div class="x-ui-loading-mask"></div>',
						'<div class="x-ui-loading-icon-box">',
							'<div class="x-ui-ball-1"></div>',
							'<div class="x-ui-ball-2"></div>',
							'<div class="x-ui-ball-3"></div>',
							'<div class="x-ui-ball-4"></div>',
							'<div class="x-ui-ball-5"></div>',
							'<div class="x-ui-ball-6"></div>',
							'<div class="x-ui-ball-7"></div>',
							'<div class="x-ui-ball-8"></div>',
						'</div>',
					'</div>'].join('');
			
			var box=$.createElement(html);
			
			
			var parent=$target.parent();
			if(parent){
				parent.css({
					height : parent[0].offsetHeight,
					overflow : 'hidden'
				});
			}

			$target.after(box);
			
			var $box=$(box);

			var $mask=$box.children('.x-ui-loading-mask');

			var $iconBox=$box.children('.x-ui-loading-icon-box');

			var height=$target.outerHeight(true);
			
			var width=$target.outerWidth(true);
			
			var _icon_height=$iconBox.height();
			
			var _icon_width=$iconBox.width();

			$box.css({
				top : '-' + height + 'px',
				height : height,
				width : width
			});
			
			$iconBox.css({
				top : '-' + ((height / 2 )+_icon_height)  + 'px',
				left : (width - _icon_width) / 2
			});
			
			this.$box=$box;
			this.$target=$target;

			this.startTimeStamp=$.timestamp();
		}
	});



})(CF,jQuery,ui);