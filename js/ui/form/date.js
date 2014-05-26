(function(CF,$,ui){

	ui.form.date=function(render){
		this.callSuperMethod();
	};

	ui.extend(ui.form.date,ui.form.field,{
		_type_ : "ui.form",
		_name_ : "date",
		statics:{
			css:{
				_c_date : '-date',
				_c_text_icon : '-arrow-icon'
			},
			getTemplate: function(config){
				config.type='date';
				config.icon='date';
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
			
			this.$icon=this.$text.parent().next();

			this._css_date=config._c_date;

			
			if(this.isDisabled){
				this.disabled();
			}
		},
		onBindEvent:function(){
			CF.logger(this,arguments);
			var me=this;

			this.$label.mousedown(function(event){
				me.on('focus');
				event.stopBubble(me);
			});

			this.$text.focus(function(event){
				me.on('focus');
			});

			this.$text.blur(function(event){
				me.on('blur');
			});


			this.$icon.mousedown(function(event){
				if(me.isDisabled!=true){
					me.focus();
					me.on("arrowClick");
				}
				event.stopBubble(me);
			});
			
		
			if(this.readonly==true){
				this.$text.mousedown(function(event){
					me.focus();
					event.stopBubble(me);
				});
			}
		},
		focus:function(){
			CF.logger(this,arguments);
			if(this.on('focus')==false){
				return;
			}
			this.callSuperMethod();
		},
		onFocus:function(){
			CF.logger(this,arguments);
			var me=this;
			if(!this.datepicker){
				this.datepicker=new ui.datepicker({
					cls : "combo",
					onSelected : function(date){
						me.$text.val(date);
						me.onFocusAfter();
					},
					autoSetOffset : true,
					align : 'lb',
					$offsetElement : this.$date,
					$owner : this
				});
			}
			this.datepicker.toggle();
		},
		onBlur:function(){
			CF.logger(this,arguments);
			var me=this;
			if(this.datepicker){
				this.datepicker.on("hide");
			}
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