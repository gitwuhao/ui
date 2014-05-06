(function(CF,$,ui){
	
	ui.button=function(render){
		this.callSuperMethod();
	};

	ui.extend(ui.button,ui.widget,{
		_type_ : "ui",
		_name_ : "button",
		statics:{
			css:{
				_c_button :  '-button',
				_c_icon :   '-icon',
				_c_label :  '-label'
			},
			getTemplate: function(config){
				ui.widget.applyCSS(config,this.css);
				var html=['<div class="',config._c_button,' ',(config.cls||''),'" '];
				if(config.title){
					html.push(' title="',config.title,'"');
				}	
				html.push('>');
				var label=config.label;
				if(config.icon==true || !label){
					html.push('<div class="',config._c_icon,'"></div>');
				}
				if(label){
					html.push('<div class="',config._c_label,'">',label,'</div>');
				}
				html.push('</div>');
				return html.join("");
			}
		},
		onRenderAfter:function(){
			CF.logger(this,arguments);
			var $elem=this.$elem;
			this.$button=$elem;
			this.callSuperMethod();
		},
		onBindEvent:function(){
			var me=this;
			this.$button.click(function(event){
				if(!me.isDisabled && me.on("buttonClick")!=false){
					me.trigger("buttonclick");
				}
			});
			this.$elem.bindHover();
		},
		onButtonClick : function(event){
			CF.logger(this,arguments);
		}
	});

	
})(CF,$,ui);