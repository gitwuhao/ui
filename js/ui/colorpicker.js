(function(CF,$,ui){

	ui.colorpicker=function(){
		this.callSuperMethod();
	};

	ui.extend(ui.colorpicker,ui.popu,{
		_type_ : "ui",
		_name_ : "colorpicker",
		statics:{
			css:{
				_c_colorpicker : '-colorpicker'
			}
		},
		onRenderBefore:function(config){
			CF.logger(this,arguments);
		},
		onRenderAfter : function(config){
			CF.logger(this,arguments);
			var me=this;
			this.$elem.colpick({
				flat:true,
				layout:'hex',
				submit: 1,
				submitText: '确认',
				onChange: function (hsb,hex,rgb,el) {
					me.on('change');
				},
				onSubmit: function (hsb,hex,rgb,el) {
					me.on('submit');
					me.on('hide');
				}
			});
			this.on("bindEvent",null);
		},
		onBindEvent:function(){
			CF.logger(this,arguments);
		},
		onChange:function(hsb,hex,rgb,el){
			CF.logger(this,arguments);
		},
		onSubmit:function(hsb,hex,rgb,el){
			CF.logger(this,arguments);
		}
	});

})(CF,$,ui);