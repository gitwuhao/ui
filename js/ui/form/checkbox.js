(function(CF,$,ui){
	
	ui.form.text=function(render){
		this.callSuperMethod();
	};

	ui.extend(ui.form.text,ui.form.item,{
		_type_ : "ui.form",
		_name_ : "text",
		statics:{
			css:{
				_c_text : '-text',
				_c_label : '-label',
			},
			getTemplate: function(config){
				ui.widget.applyCSS(config,this.css);
				var html=[];
				
				return html.join("");
			}
		},
		onRenderAfter:function(config){
			CF.logger(this,arguments);
			var elem=this.$elem;
			
			this.$label=$("."+config._c_label+":first",elem);
			
			this.$text=$(":text:first",elem);
			
			this.$icon=this.$text.parent().next();

			this._clear_icon=config._c_clear_icon;
			
			this.callSuperMethod();

		},
		onBindEvent:function(){
			CF.logger(this,arguments);
			var me=this;

			this.$elem.bindHover();

		},
		focus : function(){
			CF.logger(this,arguments);
			this.$text.focus();
		},
		onDisabled:function(){
			this.$text[0].readOnly=true;
		},
		onEnabled:function(){
			this.$text[0].readOnly=false;
		}
	});
	

})(CF,$,ui);