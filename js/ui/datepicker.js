(function(CF,$,ui){

	ui.datepicker=function(){
		this.callSuperMethod();
	};

	ui.extend(ui.datepicker,ui.popu,{
		_type_ : "ui",
		_name_ : "datepicker",
		statics:{
			css:{
				_c_datepicker : '-datepicker'
			}
		},
		onRenderBefore:function(config){
			CF.logger(this,arguments);
			var me=this;
			var calendarConfig={};
			
			CF.merger(calendarConfig,config,{
				autoRender:false,
				onRender:function(){},
				onSelected : function(date){
					me.onSelected(date);
					me.onHide();
				}
			});


			delete calendarConfig.isApplyCSS;
			delete calendarConfig.cls;
			delete calendarConfig._c_datepicker;

			config.html=ui.calendar.getTemplate(calendarConfig);

			this.calendarConfig=calendarConfig;
		},
		onRender:function(config){
			CF.logger(this,arguments);
			this.callSuperMethod();
			if(this.width || this.height){
				this.calendarConfig.autoSize=true;
				this.calendarConfig.$render=this.$elem;
			}else{
				this.calendarConfig.$render=this.$render;
			}
			this.calendar=new ui.calendar(this.calendarConfig);
			this.calendar.$elem=this.$elem.children();
			this.calendar.initRender();
			delete this.calendarConfig;
		},
		onBindEvent:function(){
			CF.logger(this,arguments);
			this.callSuperMethod();
		},
		onSelected:function(date){
			CF.logger(this,arguments);
		}
	});

})(CF,$,ui);