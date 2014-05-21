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

				var text_icon;
				var text_value='&nbsp;';
				if(config.icon){
					text_icon=config.px+'-'+config.icon+'-icon';
				}else if(config.unit){
					text_icon=config._c_unit;
					text_value=config.unit;
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
			CF.logger(this,arguments);
			var elem=this.$elem;
			
			this.$label=$("."+config._c_label+":first",elem);
			
			this.$text=$(":text:first",elem);
			
			this.$icon=this.$text.parent().next();

			this._clear_icon=config._c_clear_icon;
				
		},
		onBindEvent:function(){
			CF.logger(this,arguments);
			var me=this;

			this.$label.mousedown(function(event){
				me.on('focus');
				event.stopBubble(me);
			});

			this.$text.focus(function(event){
				if(me.on('focus') && this.value.length>0 && me.readonly!=true){
					me.$icon.addClass(me._clear_icon);
					me.isClearState=true;
				}
			});

			this.$text.blur(function(event){
				if(me.on('blur') && this.value.length>0  && me.readonly!=true){
					me.$icon.removeClass(me._clear_icon);
					me.isClearState=false;
				}
			});

			this.$icon.mousedown(function(event){
				if(me.isDisabled!=true){
					if(me.isClearState){
						me.$text.val("");
						//$.removeClass(this,me._clear_icon);
						//me.isClearState=false;
					}else{
						me.on("iconMouseDown",event);
					}
					me.focus();
					event.stopBubble(me);
				}
			});
			this.bindFieldHover(this.$elem);
		},
		focus : function(){
			CF.logger(this,arguments);
			this.$text.focus();
		},
		onDisabled:function(){
			this.$text[0].disabled=true;
		},
		onEnabled:function(){
			this.$text[0].disabled=false;
		}
	});
	

})(CF,$,ui);