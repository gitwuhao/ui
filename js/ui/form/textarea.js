(function(CF,$,ui){
	
	ui.form.textarea=function(render){
		this.callSuperMethod();
	};

	ui.extend(ui.form.textarea,ui.form.field,{
		_type_ : "ui.form",
		_name_ : "textarea",
		statics:{
			css:{
				_c_text : '-textarea',
				_c_text_box : '-textarea-box',
				_c_textfield : '-textareafield',
				_c_invalid_icon : '-invalid-icon'
			},
			getTemplate: function(config){
				var cloneConfig={};
				
				CF.merger(cloneConfig,config);

				ui.widget.applyCSS(config,this.css);

				if(!config.type){
					cloneConfig.type='textarea';
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
							  '<td class="',config._c_textfield,'"><textarea '];
				if(config.name){
					html.push(' name="',config.name,'"');
				}
				
				if(config.cols){
					html.push(' cols="',config.cols,'"');
				}

				if(config.rows){
					html.push(' rows="',config.rows,'"');
				}

				if(config.maxlength){
					html.push(' maxlength="',config.maxlength,'" ');
				}
				if(config.placeholder){
					html.push(' placeholder="',config.placeholder,'" ');
				}
				html.push('>');
				if(config.value || config.defaultValue){
					config.value = config.value || config.defaultValue;
					html.push(config.value);
				}
				html.push('</textarea></td>');

				var text_icon;
				var text_value='&nbsp;';
				if(config.icon){
					text_icon=config.px+'-'+config.icon+'-icon';
				}
				html.push('<td class="',config._c_icon," ",(text_icon||""),'">',text_value,'</td>');
				if(config.required || config.vtype){
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
			
			this.$text=$("textarea:first",elem);
			
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