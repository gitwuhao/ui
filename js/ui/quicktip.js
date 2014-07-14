(function(CF,jQuery,ui){

	var QuickTip=function(){
		this.callSuperMethod();
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
			this.setOffset();
		},
		onBindEvent:function(){
			ui.logger(this);
			if(!this.handle){
				$.setTimeout(function(){
					//this.on('hide');
				},this.time,this);


			}else{
				this.$box.click({
					me : this
				},function(event){
					event.data.me.on('click');	
				});
			}

			if(this.targetContent){
				$(this.targetContent).one('mousewheel',{
					me:this,
				},function(event){
					event.data.me.on('hide');
				});
			}
		},
		setOffset:function(){
			ui.logger(this);
			var $target=$(this.target);
			var offset=$target.offset();
			var left=offset.left;
			var top=offset.top;

			var maxWidth=window.innerWidth;
			var maxHeight=window.innerHeight;
			
			var width=this.$elem.outerWidth();
			var height=this.$elem.outerHeight();
			
			var arrowWidth=20;
			var arrowHeight=20;

			var targetWidth=$target.outerWidth();
			var targetHeight=$target.outerHeight();

			var left=offset.left + (targetWidth/2),
				top=0;
			var point={};

			if(left + (width/2) < maxWidth){
				arrowLeft=(width - arrowWidth) /2;
				point.center=left - arrowLeft;
			}else if(offset.left + width > maxWidth){
				arrowLeft=width / 2;
				point.right=maxWidth - targetWidth;
			}else{
				arrowLeft=width / 2;
				point.right=offset.left + targetWidth;
			}

			
			if(offset.top - height>0){
				point.top=offset.top - height;
				this.$arrow.addClass('bottom');
			}else{
				point.top=offset.top + height;
				this.$arrow.addClass('top');
			}
		

			this.$arrow.css({
				left : arrowLeft
			});

			this.$elem.css({
				left : point.center||point.right,
				top : point.top
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
			this.$elem.addClass('easeout');
			$.setTimeout(this.remove,1000,this);
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