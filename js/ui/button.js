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
			ui.logger();
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

			this.isHover=true;
			this.bindHover(this.$elem);
		},
		onClick : function(event){
			ui.logger();
		}
	});


})(CF,$,ui);