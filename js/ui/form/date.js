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
				var readonly=config.readonly;
				config.readonly=false;
				var html=ui.form.text.getTemplate(config);
				config.readonly=readonly;
				return html;
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
				ui.popu.filterTriggerOwner(event.target);
			});

			this.$text.focus(function(event){
				if(me.on('focus') && me.readonly==true){
					setTimeout(function(){
						me.$text[0].readOnly=true;
					},0);
				}
			});

			this.$text.blur(function(event){
				if(me.on('blur') && me.readonly==true){
					this.readOnly=false;
				}
			});


			this.$icon.mousedown(function(event){
				if(me.isDisabled!=true){
					me.focus();
					me.on("arrowClick");
				}
				ui.popu.filterTriggerOwner(event.target);
			});
			
			
			if(this.readonly==true){
				this.$text.mousedown(function(event){
					if(me.isDisabled!=true ){
						if(!me.isFocus){
							this.readOnly=false;
						}else{
							this.readOnly=true;
						}
						me.togglePopu();
						ui.popu.filterTriggerOwner(event.target);
					}
				});
			}
			
			/*
			this.$text.keydown(function(event){
				if(me.isDisabled!=true){
					if(event.shiftKey && event.keyCode==8){
						me.setValue("");
					}else if(event.keyCode==9){
					}else{
						return false;
					}
				}
			});
			*/
		},
		focus:function(){
			CF.logger(this,arguments);
			if(this.on('focus')==false){
				return;
			}
			this.callSuperMethod();
		},
		onArrowClick: function(event){
			CF.logger(this,arguments);
			this.togglePopu();
		},
		togglePopu:function(){
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
		},
		onDisabled:function(){
			this.$text[0].disabled=true;
		},
		onEnabled:function(){
			this.$text[0].disabled=false;
		}
	});



})(CF,$,ui);