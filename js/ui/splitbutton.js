(function(CF,jQuery,ui){

	ui.splitbutton=function(){
		this.callSuperMethod();
	};
	
	ui.extend(ui.splitbutton,ui.button,{
		_type_ : "ui",
		_name_ : "splitbutton",
		statics:{
			css:{
				_c_split_button: '-split-button',
				_c_arrow_button: '-arrow-button',
				_c_arrow_icon: '-arrow-icon'
			},
			getTemplate: function(config){
				
				var buttonConfig={};
				
				CF.merger(buttonConfig,config);

				ui.widget.applyCSS(config,this.css);

				var html=['<div class="',config._c_split_button,' ',(config.cls||''),'">'];

				delete buttonConfig.cls;
				html.push(ui.button.getTemplate(buttonConfig));

				html.push('<div class="',config._c_arrow_button,'">',
							'<div class="',config._c_arrow_icon,'"></div>',
						'</div>',
					'</div>');

				return html.join('');
			}
		},
		//menu : null,
		onRender:function(config){
			CF.logger(this,arguments);
			this.callSuperMethod();
		},
		onRenderAfter:function(config){
			CF.logger(this,arguments);
			var $splitbutton=this.$elem;
			
			this.$splitbutton=$splitbutton;

			this.$elem=$splitbutton.children("."+config._c_button+":first");
			
			this.$arrowbutton=$splitbutton.children("."+config._c_arrow_button+":first");

			this.callSuperMethod();

			this.$elem=this.$splitbutton;

		},
		onBindEvent:function(){
			CF.logger(this,arguments);
			var me=this;
			
			this.$button.click(function(event){
				if(me.isDisabled!=true){
					me.on("click");
				}
			});

			this.$splitbutton.bindHover();

			this.$arrowbutton.click(function(event){
				if(me.isDisabled!=true){
					me.on("arrowClick");
				}
			});

			this.isHover=true;
			this.bindHover(this.$splitbutton);
			this.bindHover(this.$arrowbutton);
		},
		onClick : function(event){
			CF.logger(this,arguments);
		},
		onArrowClick:function(event){
			CF.logger(this,arguments);
			if(this.menu){
				this.initMenu();
				this.menu.toggle();
			}
		},
		initMenu:function(){
			CF.logger(this,arguments);
			if(this.menu && !this.menu.toggle){
				var menuConfig=CF.merger(this.menu,{
					autoSetOffset:true,
					align:'lb',
					$offsetElement : this.$elem,
					$owner : this
				});
				this.menu=new ui.menu(menuConfig);			
			}
		},
		remove:function(){
			if(this.menu && this.menu.remove){
				this.menu.remove();
			}
			this.callSuperMethod();
		}
	});

})(CF,jQuery,ui);