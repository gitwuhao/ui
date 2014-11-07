(function(CF,$,ui){
	
	ui.button=function(render){
		this.callSuperMethod();
	};

	ui.extend(ui.button,ui.widget,{
		_name_ : "button",
		statics:{
			css:{
				_c_button :  '-button',
				_c_icon :   '-icon',
				_c_icon_button :   '-icon-button',
				_c_label :  '-label'
			},
			getTemplate: function(config){
				ui.widget.applyCSS(config,this.css);
				var html=['<div class="',config._c_button,' ',(config.cls||'')],
					label=config.label;

				if(config.icon==true || !label){
					config.icon=true;
					html.push(' ',config._c_icon_button,'');
				}
				html.push('" ');

				if(config.title){
					html.push(' title="',config.title,'"');
				}
				html.push('>');
				if(config.icon==true){
					html.push('<div class="',config._c_icon,'"></div>');
				}else if(label){
					html.push('<div class="',config._c_label,'">',label);
					if(config.icon){
						html.push('<div class="',config._c_icon,' ',config.icon,'"></div>');
					}
					html.push('</div>');
				}
				html.push('</div>');
				return html.join("");
			}
		},
		onRenderAfter:function(){
			ui.logger(this);
			var $elem=this.$elem;
			this.$button=$elem;
			
			if(this.isDisabled){
				this.disabled();
			}
		},
		onBindEvent:function(){
			var me=this;
			this.$button.click(function(event){
				if(me.isDisabled!=true){
					me.on("click");
				}
			});
		
			this.bindHover(this.$elem);
			
		},
		onClick : function(event){
			ui.logger(this);
		}
	});


})(CF,$,ui);