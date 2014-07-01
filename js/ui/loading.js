(function(CF,jQuery,ui){
	ui.loading=function(config){
		this.config = config;
	};

	
	CF.defineClass(ui.loading,{
		_type_:'ui',
		_name_ : 'loading',
		ready : function(){
			ui.logger();
			if(this.config.autoCreate){
				this.create();
			}
		},
		remove : function(){
			
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
			
			$target.after(box);
			
			var $box=$(box);

			var mask=$box.children('.x-ui-loading-mask');

			var iconBox=$box.children('.x-ui-loading-icon-box');

			var height=$target.height();

			mask.css({
				'margin-top':'-' + (height + height) + 'px',
				height : height,
			});

		}
	});



})(CF,jQuery,ui);