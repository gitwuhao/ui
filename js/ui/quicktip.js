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
		//left、top
		offset:'lt',
		//top、center
		align:'tc',
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
					this.on('hide');
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

			var maxWidth=window.innerWidth;
			var maxHeight=window.innerHeight;
			
			var width=this.$elem.outerWidth();
			var height=this.$elem.outerHeight();
			
			var arrowWidth=20;
			var arrowHeight=20;

			var targetWidth=$target.outerWidth();
			var targetHeight=$target.outerHeight();
			
			
			var left=offset.left;
			var top=offset.top;

			var point={},
				arrowPoint={},
				align=this.align,
				offset=this.offset;
			this.align={};
			this.align.center=align.indexOf("c")>-1;
			this.align.left=align.indexOf("l")>-1;
			this.align.right=align.indexOf("r")>-1;
			this.align.bottom=align.indexOf("b")>-1;
			this.align.top=align.indexOf("t")>-1;
			
			this.offset={};
			this.offset.left=offset.indexOf("l")>-1;
			this.offset.top=offset.indexOf("t")>-1;
			this.offset.right=offset.indexOf("r")>-1;
			this.offset.bottom=offset.indexOf("b")>-1;

			if(this.align.left){
				point.left = left - width;
				align='right';
			}else if(this.align.right){
				point.left = left + targetWidth;
				align='left';
			}else if(this.align.bottom){
				point.top = top + targetHeight;
				align='top';
			}else{
				point.top = top - height;
				align='bottom';
			}
			
			if(this.align.left || this.align.right ){
				if(this.align.center){
					point.top = top + (targetHeight/2) - (height/2);
				}else{
					point.top = top;
				}
				arrowPoint.top=((height - arrowHeight)/2);
			}else{
				if(this.align.center){
					point.left = left + (targetWidth/2) - (width/2);
				}else{
					point.left = left;
				}
				arrowPoint.left=((width- arrowWidth)/2);
			}

		
			offset={};
			if(this.offset.right){
				offset.right=maxWidth - point.left - width;
			}else{
				offset.left=point.left;
			}

			if(this.offset.bottom){
				offset.bottom=maxHeight - point.top - height ;
			}else{
				offset.top=point.top;
			
			}
			this.$elem.addClass(align);
			this.$arrow.addClass(align);
			this.$arrow.css(arrowPoint);
			this.$elem.css(offset);
		},
		onClick : function(){
			ui.logger(this);
			if(this.handle){
				this.handle();
			}
		},
		onHide:function(){
			ui.logger(this);
			if(this.$elem){
				this.$elem.addClass('easeout');
				$.setTimeout(this.remove,1000,this);
			}
		},
		remove:function(){
			ui.logger(this);
			if(this.targetContent){
				$(this.targetContent).trigger('mousewheel');
			}
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