(function(CF,jQuery,ui){

	var QuickTip=function(){
		this.callSuperMethod();
		this.setOffset();
	};

	ui.extend(QuickTip,ui.widget,{
		_name_ : "QuickTip",
		statics:{
			css:{
				_c_qtip_box: '-qtip-box',
				_c_qtip_content: '-qtip-content',
				_c_qtip_arrow_box: '-qtip-arrow-box'
			},
			getTemplate: function(config){
				ui.widget.applyCSS(config,this.css);
				var html=['<div class="',config._c_qtip_box,' ',(config.cls||''),' border-box uns">',
							'<div class="',config._c_qtip_content,'">',config.html,'</div>',
							'<div class="',config._c_qtip_arrow_box,'">',
								'<div class="',config.px,'-icon"></div>',
							'</div>',
						   '</div>'];
				return html.join('');
			}
		},
		time : 5000,
		onRenderAfter:function(config){
			ui.logger(this);
			this.$box=this.$elem;
			this.$content=this.$box.children('.'+this._c_qtip_content);
			this.$arrowbox=this.$box.children('.'+this._c_qtip_arrow_box);
			this.$arrow=this.$arrowbox.children(":first");
		},
		onBindEvent:function(){
			ui.logger(this);
			if(!this.handle){
				$.setTimeout(function(){
					this.on('hide');
				},this.time,this);
			}else{
				this.$box.click({
					me : this
				},function(event){
					event.data.me.on('click');	
				});
			}
		},
		setOffset:function(){
			ui.logger(this);
			var $target=$(this.target);
			var offset=$target.offsetElement(document.body);
			var left=offset.left;
			var top=offset.top;

			var maxWidth=window.innerWidth;
			var maxHeight=window.innerHeight;
			
			var width=this.$elem.outerWidth();
			var height=this.$elem.outerHeight();

			var targetWidth=$target.outerWidth();
			var targetHeight=$target.outerHeight();

			var align,qLeft,qTop,$arrow,arrowLeft;
			
			if(top - height > 0){
				qTop = top - height;
				this.$arrow.addClass('bottom');
			}else{
				qTop= top + targetHeight;
				this.$arrow.addClass('top');
			}
 

			if(left + width>maxWidth){
				qLeft = maxWidth - width;
			}else if(left  - 10 - width < 0){
				qLeft = 0;
			}else{
				qLeft = left;
			}


			if(width>targetWidth){
				arrowLeft=(width - this.$arrow.width())/2;
			}else{
				arrowLeft=(targetWidth/2);
			}
			
			this.$arrow.css({
				left : arrowLeft
			});

			if(qLeft + arrowLeft > left + targetWidth){
				qLeft=left - arrowLeft;
			}

			this.$elem.css({
				left : qLeft,
				top : qTop
			});
		},
		onClick : function(){
			ui.logger(this);
			if(this.handle){
				this.handle();
			}
		},
		onHide:function(){
			ui.logger(this);
			
			//this.remove();
		},
		remove:function(){
			ui.logger(this);
			this.callSuperMethod();
		}
	});

	CF.merger(QuickTip.prototype,ui.mask);

	ui.quicktip={
		show : function(config){
			new QuickTip(config);
		}
	};
	
})(CF,jQuery,ui);