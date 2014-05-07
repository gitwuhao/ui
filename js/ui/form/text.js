(function(CF,$,ui){
	
	ui.form.text=function(render){
		this.callSuperMethod();
	};

	ui.extend(ui.form.text,ui.form.item,{
		_type_ : "ui.form",
		_name_ : "text",
		statics:{
			css:{
				_c_text : '-text',
				_c_label : '-label',
				_c_text_box : '-text-box',
				_c_textfield : '-textfield',
				_c_arrow_icon : '-arrow-icon',
				_c_clear_icon : '-clear-icon',
				_c_text_icon : '-text-icon',
				_c_unit : '-unit',
				_c_invalid_icon : '-invalid-icon',
				_c_required_icon : '-required-icon',
				_c_label_padding : '-label-padding'
			},
			getTemplate: function(config){
				ui.widget.applyCSS(config,this.css);
				var html=[];
				if(!config.form){
					html.push('<div class="',config._c_text,' ',(config.cls||''),'"');
					if(config.title){
						html.push(' title="',config.title,'"');
					}
					html.push('>');
					if(config.label){
						html.push(
							'<table>',
							'<tr>');
					}
				}else{
					html.push('<tr class="',config._c_text,' ',(config.cls||''),'">');
				}

				
				if(config.label){
					html.push('<td class="',config._c_label,'">',config.label,'：',
							  '</td>',
							  '<td class="',config._c_label_padding,'">');
					if(config.required){
						html.push('<span class="',config._c_required_icon,'">*</span>');
					}else{
						html.push('&nbsp;');
					}
					html.push('</td>',
							  '<td>');
				}
				
				html.push(	'<div class="',config._c_text_box,'">',
						    '<table>',
							'<tr>',
							  '<td class="',config._c_textfield,'"><input type="text" ');
				if(config.name){
					html.push(' name="',config.name,'"');
				}

				if(config.readonly){
					html.push(' readonly ');
				}
				if(config.maxlength){
					html.push(' maxlength="',config.maxlength,'" ');
				}
				if(config.vtype){
					html.push(' vtype="',config.vtype,'" ');
				}
				if(config.placeholder){
					html.push(' placeholder="',config.placeholder,'" ');
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

				html.push('<td class="',config._c_text_icon," ",(text_icon||""),'">',text_value,'</td>');
				
				if(config.required || config.vtype){
					html.push('<td class="',config._c_invalid_icon,'">&nbsp;</td>');
				}
				html.push('</tr>',
							'</table>',
							'</div>');
				
				if(config.label){
					html.push('</td>',
						  '</tr>');
				}
				if(!config.form){
					if(config.label){
						html.push('</table>');
					}
					html.push('</div>');
				}
				return html.join("");
			}
		},
		onRenderAfter:function(config){
			CF.logger(this,arguments);
			var elem=this.$elem;
			
			this.$label=$("."+config._c_label+":first",elem);
			
			this.$text=$(":text:first",elem);
			
			this.$icon=this.$text.parent().next();

			this._clear_icon=config._c_clear_icon;
			
			this.callSuperMethod();

		},
		onBindEvent:function(){
			CF.logger(this,arguments);
			var me=this;

			this.$label.mousedown(function(event){
				me.focus();
				event.stopBubble(me);
			});

			this.$text.focus(function(event){
				if(me.on('focus') && this.value.length>0 && me.readonly!=true){
					me.$icon.addClass(me._clear_icon);
				}
			});

			this.$text.blur(function(event){
				if(me.on('blur') && this.value.length>0  && me.readonly!=true){
					me.$icon.removeClass(me._clear_icon);
				}
			});

			if(this.icon){
				this.$icon.mousedown(function(event){
					if(me.focus()){
						me.on("arrowClick");
					}
					event.stopBubble(me);
				});
			}

			this.$elem.bindHover();

		},
		focus : function(){
			CF.logger(this,arguments);
			this.$text.focus();
		},
		onDisabled:function(){
			this.$text[0].readOnly=true;
		},
		onEnabled:function(){
			this.$text[0].readOnly=false;
		}
	});
	

})(CF,$,ui);