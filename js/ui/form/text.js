(function(CF,$,ui){

	ui.form.text=function(render){
		this.callSuperMethod();
	};

	ui.extend(ui.form.text,ui.form.field,{
		_type_ : "ui.form",
		_name_ : "text",
		statics:{
			css:{
				_c_text : '-text',
				_c_clear_icon : '-clear-icon',
				_c_icon : '-icon',
				_c_unit : '-unit',
				_c_invalid_icon : '-invalid-icon'
			},
			getTemplate: function(config){
				var cloneConfig={};

				CF.merger(cloneConfig,config);

				ui.widget.applyCSS(config,this.css);

				if(!config.type){
					cloneConfig.type='text';
					config._c_text='';
				}

				if(config.cls){
					cloneConfig.cls=config._c_text + " " +config.cls;
				}else{
					cloneConfig.cls=config._c_text;
				}

				var html=[	'<div class="',config._c_text_box,'">',
						    '<table>',
							'<tr>',
							  '<td class="',config._c_textfield,'"><input type="text" '];
				if(config.name){
					html.push(' name="',config.name,'"');
				}

				if(config.readonly){
					html.push(' readonly ');
				}
				if(config.maxlength){
					html.push(' maxlength="',config.maxlength,'" ');
				}
				if(config.placeholder){
					html.push(' placeholder="',config.placeholder,'" ');
				}
				if(config.value || config.defaultValue){
					config.value = config.value || config.defaultValue;
					html.push(' value="',config.value,'" ');
				}
				html.push(' /></td>');

				var text_icon=null;
				var text_value='&nbsp;';
				if(config.icon){
					text_icon=config.px+'-'+config.icon+'-icon';
				}else if(config.unit){
					text_icon=config._c_unit;
					text_value=config.unit;
				}
				if(text_icon!=null){
					html.push('<td class="',config._c_icon," ",(text_icon||""),'">',text_value,'</td>');
				}
				if(config.isValid){
					html.push('<td class="',config._c_invalid_icon,'">&nbsp;</td>');
				}
				html.push('</tr>',
							'</table>',
							'</div>');

				cloneConfig.html=html.join('');
				return this.getFieldTemplate(cloneConfig);
			}
		},
		onRenderAfter:function(config){
			ui.logger(this);
			var elem=this.$elem;

			this.$label=$("."+config._c_label+":first",elem);

			this.$text=$(":text:first",elem);

			this.$icon=this.$text.parent().next();

			this._clear_icon=config._c_clear_icon;

			if(this.isDisabled){
				this.disabled();
			}
		},
		onBindEvent:function(){
			ui.logger(this);
			var me=this;

			this.$label.mousedown(function(event){
				if(me.isDisabled!=true){
					me.$text.focus();
					event.stopBubble(me);
				}
			});

			this.$text.focus(function(event){
				if(me.on('focus',event,this)){
					me.trigger("textfocus",event);
				}
			});

			this.$text.mousedown(function(event){
				if(me.isDisabled!=true){
					if(me.readonly!=true && event.shiftKey){
						$.setTimeout(function(){
							this.select();
						},100,this);
					}
					me.on('mousedown',event,this);
				}
			});

			this.$text.blur(function(event){
				if(me.on('blur',event,this)){
					me.trigger("textblur",event);
				}
			});


			this.$icon.mousedown(function(event){
				if(me.isDisabled!=true){
					me.trigger("iconmousedown",event);
					me.focus();
					event.stopBubble(me);
				}
			});

			if(this.readonly!=true){
				this.$text.keydown(function(event){
					if(me.isDisabled!=true){
						if(event.shiftKey && event.keyCode==8){
							this.value='';
						}else{
							me.trigger("textkeydown",event);
						}
					}
				});
			}

			this.bindHover(this.$elem);

		},
		focus : function(){
			ui.logger(this);
			this.$text.focus();
		},
		onDisabled:function(){
			this.$text[0].disabled=true;
		},
		onEnabled:function(){
			this.$text[0].disabled=false;
		},
		onBlur:function(){
			ui.logger(this);
			var value=this.value;
			this.setValue(this.$text.val());
			if(value!=this.value){
				this.on('change',this.value);
			}
		},
		setValue:function(value){
			ui.logger(this);
			if(this.callSuperMethod()==false){
				return;
			}
			this.$text.val(this.value);
		}
	});


})(CF,$,ui);