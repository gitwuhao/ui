(function(CF,$,ui){

	ui.form.date=function(render){
		this.callSuperMethod();
	};

	ui.extend(ui.form.date,ui.form.text,{
		_type_ : "ui.form",
		_name_ : "date",
		statics:{
			css:{
				_c_date : '-date',
				_c_arrow_icon : '-arrow-icon'
			},
			getTemplate: function(config){

				ui.widget.applyCSS(config,this.css);

				config._c_text_icon=config._c_arrow_icon;				

				if(config.cls){
					config.cls=config._c_date + " " +config.cls;
				}else{
					config.cls=config._c_date;
				}
				config.readonly=true;
				return ui.form.text.getTemplate(config);
			}
		},
		onRenderAfter:function(config){
			CF.logger(this,arguments);
			var elem=this.$elem;
			
			this.$label=$("."+config._c_label+":first",elem);
			
			this.$date=$("."+config._c_text_box+":first",elem);

			this.$text=$(":text:first",this.$date);


			//_popu_trigger_
			
			this.$icon=this.$text.parent().next();

			this._css_date=config._c_date;
			
			this.callSuperMethod();
		},
		onBindEvent:function(){
			var me=this;

			if(this.readonly!=true){
				this.$label.click(function(event){
					me.$text.focus();
				});
			}
			
			this.$text.click(function(event){
				me.on("datePickerToggle");
			});

			this.$text.focus(function(event){
				me.$elem.addClass("focus");
			});

			this.$text.blur(function(event){
				me.$elem.removeClass("focus");
			});

			this.$icon.click(function(event){
				me.$text.focus();
				me.on("datePickerToggle");
			});
			
			this.$elem.bindHover();
		},
		onDatePickerToggle : function(event){
			CF.logger(this,arguments);
			var me=this;
			if(!this.datepicker){
				this.datepicker=new ui.datepicker({
					cls : "combo",
					onSelected : function(date){
						me.$text.val(date);
					},
					autoSetOffset : true,
					align : 'lb',
					$offsetElement : this.$date
				});
			}
			this.datepicker.toggle();
		},
		remove:function(){
			CF.logger(this,arguments);
			if(this.list && this.list.remove){
				this.list.remove();
			}
			this.callSuperMethod();
		}
	});



})(CF,$,ui);