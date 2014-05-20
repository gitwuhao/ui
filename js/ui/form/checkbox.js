(function(CF,$,ui){
	
	ui.form.checkbox=function(render){
		this.callSuperMethod();
	};

	ui.extend(ui.form.checkbox,ui.form.item,{
		_type_ : "ui.form",
		_name_ : "checkbox",
		statics:{
			css:{
				_c_checkbox : '-checkbox',
				_c_checkbox_group : '-checkbox-group',
				_c_icon : '-icon',
				_c_label : '-label'
			},
			getTemplate: function(config){
				var cloneConfig={};
				CF.merger(cloneConfig,config);
				ui.widget.applyCSS(config,this.css);
				var html=[];
				var items=config.items;
				for(var i=0,len=items.length;i<len;i++){
					html.push('<div class="',config._c_checkbox_group,'">',
							'<input type="button" class="',config._c_icon,'" />',
							'<span>',items[i].label,'</span>',
						  '</div>');
				}
				cloneConfig.html=html.join('');
				cloneConfig.type='checkbox';
				return this.getItemTemplate(cloneConfig);
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