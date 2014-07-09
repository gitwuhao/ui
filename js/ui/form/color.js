(function(CF,$,ui){

	ui.form.color=function(render){
		this.callSuperMethod();
	};

	ui.extend(ui.form.color,ui.form.field,{
		_type_ : "ui.form",
		_name_ : "color",
		statics:{
			css:{
				_c_color : '-color'
			},
			getTemplate: function(config){
				config.type='color';
				config.readonly=false;
				var html=ui.form.text.getTemplate(config);
				config.readonly=true;
				return html;
			}
		},
		onRenderAfter:function(config){
			ui.logger(this);
			var elem=this.$elem;
			
			this.$label=$("."+config._c_label+":first",elem);
			
			this.$date=$("."+config._c_text_box+":first",elem);

			this.$text=$(":text:first",this.$date);
			
			this.$icon=this.$text.parent().next();

			if(this.isDisabled){
				this.disabled();
			}
		},
		onBindEvent:function(){
			ui.logger(this);
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
				if(me.isDisabled!=true  && !ui.popu.filterBlurEvent(event) && me.on('blur')){
					if(me.readonly==true){
						this.readOnly=false;
					}
				}
			});


			this.$text.on("paste",function(event){
				var color=$.getHexColor($.getClipboardTextData(event));
				if(color){
					me.setValue(color);
					ui.colorpicker.setColor(color);
				}
			});
 
			this.$text.mousedown(function(event){
				if(me.isDisabled!=true){
					if(!me.isFocus){
						this.readOnly=false;
					}else{
						this.readOnly=true;
					}
					me.togglePopu();
					ui.popu.filterTriggerOwner(event.target);
				}
			}); 

		},
		focus:function(){
			ui.logger(this);
			if(this.on('focus')==false){
				return;
			}
			this.callSuperMethod();
		},
		togglePopu:function(){
			ui.logger(this);
			if(!this.colorpicker){
				var me=this;
				this.colorpicker=ui.colorpicker.getInstance({
					align : this.align || 'lb',
					$owner : this,
					color : this.value,
					$offsetElement : this.$text,
					onChange:function(color){
						me.setColor(color);
					},
					onSubmit:function(color){
						me.setValue(color);
					}
				});
			}
			this.colorpicker.toggle();
		},
		onSelected:function(date){
			ui.logger(this);
			var value=this.value;
			this.setValue(date);
			if(value!=this.value){
				this.on('change',this.value);
			}
		},
		onBlur:function(){
			ui.logger(this);
			if(this.colorpicker){
				this.colorpicker.hide();
			}
		},
		remove:function(){
			ui.logger(this);
			if(this.colorpicker && this.colorpicker.remove){
				this.colorpicker.remove();
			}
			this.callSuperMethod();
		},
		onDisabled:function(){
			this.$text[0].disabled=true;
		},
		onEnabled:function(){
			this.$text[0].disabled=false;
		},
		setColor:function(color){
			this.$text.css('background-color',color);
		},
		setValue:function(value){
			ui.logger(this);
			if(this.callSuperMethod()==false){
				return;
			}
			this.setColor(value);
			this.$text.val(this.value);
		}
	});

})(CF,$,ui);