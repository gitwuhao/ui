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

			this.calendarConfig={
				date : config.date,
				px : config.px,
				autoRender:false,
				onRender:function(){},
				onSelected : function(date){
					me.onSelected(date);
					me.onHide();
				}
			};

			config.html=ui.calendar.getTemplate(this.calendarConfig);
		},
		onRender:function(config){
			CF.logger(this,arguments);
			this.callSuperMethod();
			this.calendar=new ui.calendar(this.calendarConfig);
			this.calendar.$elem=this.$elem.children();
			this.calendar.on("render",this.calendarConfig);
			delete this.calendarConfig;
		},
		onBindEvent:function(){
			CF.logger(this,arguments);
		},
		onSelected:function(date){
			CF.logger(this,arguments);
		}
	});

})(CF,$,ui);