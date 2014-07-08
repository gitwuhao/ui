(function(CF,$,ui){

	ui.datepicker=function(){
		this.callSuperMethod();
	};

	ui.extend(ui.datepicker,ui.popu,{
		_name_ : "datepicker",
		statics:{
			css:{
				_c_datepicker : '-datepicker'
			}
		},
		onRenderBefore:function(config){
			ui.logger(this);
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
			ui.logger(this);
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
			ui.logger(this);
			this.callSuperMethod();
		},
		onSelected:function(date){
			ui.logger(this);
		}
	});

})(CF,$,ui);