(function(CF,jQuery,ui){

	ui.window=function(){
		this.callSuperMethod();
	};

	ui.extend(ui.window,ui.widget,{
		_type_ : "ui",
		_name_ : "window",
		statics:{
			css:{
				_c_window: '-window',
				_c_form: '-win-form',
				_c_header: '-win-header',
				_c_title: '-title',
				_c_iconbar: '-iconbar',
				_c_icon: '-icon',
				_c_body: '-win-body',
				_c_button_box: '-button-box',
				_c_button: '-button'
			},
			getTemplate: function(config){
				ui.widget.applyCSS(config,this.css);
				var html=['<div class="',config._c_window,' ',(config.cls||''),'">',
							'<div class="',config._c_header,'">',
								'<div class="',config._c_title,'">',(config.title||''),'</div>'];
				if(config.icons){
					html.push('<div class="',config._c_iconbar,'">');
					var icons=config.icons;
					for(var i=0,len=icons.length;i<len;i++){
						var icon=icons[i];
						html.push('<div class="',config._c_icon,' ',icon.type,'"></div>');
					}
					html.push('</div>');
				}
				html.push('</div>',
						  '<div class="',config._c_body,'">',(config.html||''),'</div>');

				if(config.buttons){
					html.push('<div class="',config._c_button_box,'">');
					var buttons=config.buttons;
					for(var i=0,len=buttons.length;i<len;i++){
						var button=buttons[i];
						html.push('<div class="',config._c_button,' ',(button.cls||""),'">',button.label,'</div>');
					}
					html.push('</div>');
				}
				html.push('</div>');
				return html.join('');
			},
			getMask : function(){
				if(!this.$mask){
					var mask=jQuery.createElement('<div class="x-ui-mask"></div>');
					$.getBody().append(mask);
					this.$mask=$(mask);
				}
				return this.$mask;
			}
		},
		onRenderBefore:function(config){
			CF.logger(this,arguments);
			var me=this;
			if(!config.icons){
				config.icons=[];
			}
			var icons=config.icons;
			if(config.maximizable==true){
				icons.push({
					type : 'restore',
					handle : function(event){
						me.restore();
					}
				},{
					type : 'maximize',
					handle : function(event){
						me.maximize();
					}
				});

				this.restoreIcon=icons[icons.length-2];
				
				this.maximizeIcon=icons[icons.length-1];
			}
			if(config.closable!=false){
				icons.push({
					type : 'close',
					handle : function(event){
						me.close();
					}
				});
				
				this.closeIcon=icons[icons.length-1];
			}
			this.icons=icons;
			this.$mask=ui.window.getMask();
		},
		onRenderAfter:function(config){
			CF.logger(this,arguments);
			var $elem=this.$elem;

			var $header=$elem.children('.'+this._c_header);
			this.$header=$header;
			this.$tile=$header.children('.'+this._c_title);
			
			var $iconbar=$header.children('.'+this._c_iconbar);
			var icons=this.icons;
			var iconList=$iconbar.children();
			var iconMap={};
			for(var i=0,len=iconList.length;i<len;i++){
				var icon=iconList[i];
				icon._icon_index_=i;
				icons[i].$elem=$(icon);
			}
			
			
			this.$body=$elem.children('.'+this._c_body);
			
			var css={};
			if(this.width){
				css.width=this.width;
			}
			if(this.height){
				css.height=this.height;			
			}

			for(var key in css){
				this.$body.css(css);
				break;
			}
			if(this.html){
				delete this.html;
			}

			if(this.buttons){
				var $buttonbox=$elem.children('.'+this._c_button_box);
				var buttonList=$buttonbox.children();
				for(var i=0,len=buttonList.length;i<len;i++){
					var button=buttonList[i];
					button._button_index_=i;
					this.buttons[i].$elem=$(button);
				}
			}
			this.callSuperMethod();
		},
		onBindEvent:function(){
			CF.logger(this,arguments);
			var me=this;
		
			var icons=this.icons;
			for(var i=0,len=icons.length;i<len;i++){
				var icon=icons[i];
				icon.$elem.click(function(event){
					var iconItem=me.icons[this._icon_index_];
					if(iconItem.handle){
						iconItem.handle(event);
					}
				});
				icon.$elem.bindHover();
			}
			

			if(this.buttons){
				var buttons=this.buttons;
				for(var i=0,len=buttons.length;i<len;i++){
					var button=buttons[i];
					button.$elem.click(function(event){
						var buttonItem=me.buttons[this._button_index_];
						if(buttonItem.handle){
							buttonItem.handle(event);
						}
						me.close();
					});
					button.$elem.bindHover();
				}
			}

		},
		resetOffset:function(){
			var maxWidth=window.innerWidth;
			var maxHeight=window.innerHeight;
			
			var width=this.$elem.width();
			var height=this.$elem.height();
			
			var left=parseInt((maxWidth - width) / 2);
			if(left<0){
				left=0;
			}
			var top=parseInt((maxHeight - height) / 2);
			if(top<0){
				top=0;
			}
			this.$elem.css({
				left : left,
				top : top
			});
		},
		show : function(){
			CF.logger(this,arguments);
			if(this.items && !this.form){
				this.items.render=this.$body[0];
				this.form=new ui.form(this.items);
				this.$elem.addClass(this._c_form);
			}
			this.$mask.show();
			this.$elem.show();
			this.resetOffset();
		},
		close : function(){
			CF.logger(this,arguments);
			this.on("close");
		},
		onClose:function(){
			CF.logger(this,arguments);
			//this.tirgger('onclose')
			this.$elem.hide();
			this.$mask.hide();
		},
		onCloseAfter:function(){
			CF.logger(this,arguments);
			//this.tirgger('oncloseafter')
		},
		restore : function(){
			CF.logger(this,arguments);
			
			this.$elem.offset(this._original_offset);

			this.$body.css({
				width : this._original_width,
				height: this._original_height
			});
			
			this.restoreIcon.$elem.hide();			
			this.maximizeIcon.$elem.show();
			
			$.getBody().css("overflow",this._body_overflow);
		},
		maximize : function(event){
			CF.logger(this,arguments);
			var maxWidth=window.innerWidth;
			var maxHeight=window.innerHeight;

			this._original_width=this.$body.width();
			this._original_height=this.$body.height();
			
			this._original_offset=this.$elem.offset();
			
			var widthPadding=this.$elem.outerWidth() - this._original_width;
			var heightPadding=this.$elem.outerHeight() - this._original_height;

			var marginSize=5;

			this.$body.css({
				width : maxWidth - widthPadding - (marginSize * 2),
				height: maxHeight - heightPadding - (marginSize * 2)
			});

			this.$elem.css({
				left : marginSize,
				top : marginSize
			});
			
			this.maximizeIcon.$elem.hide();
			this.restoreIcon.$elem.show();

			this._body_overflow=$.getBody().css("overflow");

			$.getBody().css("overflow","hidden");
		},
		remove:function(){
			CF.logger(this,arguments);
			this.callSuperMethod();
		}
	});
	
})(CF,jQuery,ui);