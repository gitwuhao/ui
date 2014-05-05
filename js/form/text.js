(function(CF,$,ui){
	
	ui.form.text=function(render){
		this.callSuperMethod();
	};

	ui.extend(ui.form.text,ui.widget,{
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
					html.push('>',
						'<table>',
						'<tr>');
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
					html.push('</td>');
				}
				
				html.push('<td>',
							'<div class="',config._c_text_box,'">',
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
							'</div>',
						  '</td>',
						  '</tr>');

				if(!config.form){
					html.push('</table>',
						'</div>');
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

			this.$label.click(function(event){
				me.$text.focus();
			});

			this.$icon.mousedown(function(event){
				var $target=me.$icon;
				if($target.is("."+me._c_clear_icon)>-1){
					me.$text.val("");
					$target.removeClass(me._clear_icon);
				}
				setTimeout(function(){
					me.$text.focus();
				},0);
			});

			this.$text.focus(function(event){
				if(this.value.length>0){
					me.$icon.addClass(me._clear_icon);
				}
			});

			this.$text.blur(function(event){
				if(this.value.length>0){
					me.$icon.removeClass(me._clear_icon);
				}
			});

			this.$elem.bindHover();

		}
	});

	
})(CF,$,ui);