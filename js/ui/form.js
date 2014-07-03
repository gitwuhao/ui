(function(CF,$,ui){
	
	ui.form=function(render){
		this.callSuperMethod();
	};

	ui.extend(ui.form,ui.widget,{
		_name_ : "form",
		statics:{
			css:{
				_c_form : '-form',
				_c_form_item : '-form-item',
				_c_button_box : '-button-box',
				_c_form_label : '-form-label',
				_c_form_label_padding : '-form-label-padding'
			},
			getTemplate: function(config){
				ui.widget.applyCSS(config,this.css);
				var html=['<div class="',config._c_form,' ',(config.cls||''),'">',
							'<table>'];
				var items=config.items;
				for(var i=0,len=items.length;i<len;i++){
					var item=items[i];
					var xtype=item.xtype||'text';
					var input=ui.form[xtype];
					item.form=true;
					item.cls=config._c_form_item;
					if(config.px){
						item.px=config.px;
					}
					html.push(input.getTemplate(item));
					delete item.form;
				}

				var buttons=config.buttons;
				if(buttons){
					html.push('<tr>',
								'<td class="',config._c_form_label,'">&nbsp;</td>',
								'<td class="',config._c_form_label_padding,'">&nbsp;</td>',
								'<td class="',config._c_button_box,'" >');
					for(var i=0,len=buttons.length;i<len;i++){
						var item=buttons[i];
						if(config.px){
							item.px=config.px;
						}
						html.push(ui.button.getTemplate(item));
					}
					html.push(  '</td>',	
								//'<td>&nbsp;</td>',
							  '</tr>');
				}
				html.push('</table></div>');
				return html.join("");
			},
			getFormItem : function(config,elem){
				var item,
					xtype=config.xtype;

				config.elem=elem;
				config.autoRender=false;
				delete config.xtype;
				if(!xtype ){
					xtype="text";
				}
				item=new ui.form[xtype](config);
				item.initRender();
				return item;
			},
			getButtonItem : function(config,elem){
				var item,_class,
					xtype=config.xtype;

				config.elem=elem;
				config.autoRender=false;
				delete config.xtype;
				if(xtype=='splitbutton'){
					item=new ui.splitbutton(config);
				}else{
					item=new ui.button(config);
				}
				item.initRender();
				return item;
			}
		},
		onRender:function(config){
			ui.logger();
			this.callSuperMethod();
			var elem=this.$elem[0];
			var table=elem.children[0];
			var rows=table.rows;
			var items=this.items;
			this.itemsMap={};
			for(var i=0,len=items.length;i<len;i++){
				var item=items[i];
				var item=this.getClass().getFormItem(item,rows[i]);
				item.$owner=this;
				items[i]=item;

				if(item.name){
					this.itemsMap['_'+item.name+'_']=item;
				}
			}

			if(this.buttons){
				items=this.buttons;
				var buttonList=$("."+this._c_button_box,this.$elem).children();
				for(var i=0,len=buttonList.length;i<len;i++){
					var item=this.buttons[i];
					items[i]=this.getClass().getButtonItem(item,buttonList[i]);
					items[i].$owner=this;
				}
			}
		},
		onBindEvent:function(){
			ui.logger();
		},
		getItem:function(name){
			return this.itemsMap['_'+name+'_'];
		},
		getValues:function(){
			var values=[];
			var items=this.items;
			for(var i=0,len=items.length;i<len;i++){
				var item=items[i];
				if(item.isDisabled!=true){
					var value=item.getValue();
					values.push(value);
					if(item.name){
						values[item.name]=value;
					}
				}else{
					values.push('');
				}
			}
			return values;
		},
		disabled:function(){
			var items=this.items;
			for(var i=0,len=items.length;i<len;i++){
				items[i].disabled();
			}
		},
		enabled:function(){
			var items=this.items;
			for(var i=0,len=items.length;i<len;i++){
				items[i].enabled();
			}
		}
	});

	ui.form.field=function(render){
		this.callSuperMethod();
	};
	 

	ui.extend(ui.form.field,ui.widget,{
		_type_ : "ui.form",
		_name_ : "field",
		statics:{
			css : {
				_c_text : '-text',
				_c_label : '-label',
				_c_text_box : '-text-box',
				_c_textfield : '-textfield',
				_c_icon : '-icon',
				_c_required_icon : '-required-icon',
				_c_label_padding : '-label-padding',
				_c_item_field : '-item-field'
			},
			setActive: function(item){
				if(this.active && this.active!=item){
					this.removeActive();
				}
				this.active=item;
			},
			removeActive: function(){
				if(this.active){
					this.active.on("blur");
				}
				this.active=null;
			},
			removeItem: function(item){
				if(this.active==item){
					this.active=null;
				}
			},
			getFieldTemplate:function(config){
				ui.widget.applyCSS(config,this.css);
				var html=[];
				if(!config.form){
					html.push('<div class="',config.px,'-',config.type,' ',(config.cls||''),'"');
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
					html.push('<tr class="',config.px,'-',config.type,' ',(config.cls||''),'">');
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
							  '<td  class="',config._c_item_field,'">');
				}
				
				html.push(config.html);
				
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
		setLabel:function(label){
			this.$label.text(label+"：");
		},
		setValue:function(value){
			this.value=value;
			this.trigger("setvalue",value);
			this.$text.val(this.value);
		},
		onBindEventAfter:function(){
			ui.logger();
			if(this.vtype){
				ui.form.vtypes.register(this);
			}
		},
		setData:function(elem,data){
			$.data(elem,"_"+this.name+"_data_",data);
		},	
		getData:function(elem){
			return $.data(elem,"_"+this.name+"_data_");
		},
		getValue:function(){
			return this.$text.val();
		},
		blur : CF.emptyFunction,
		onBlurBefore : function(){
			ui.logger();
			if(this.isDisabled==true || this.isFocus==false){
				return false;
			}
		},
		onBlur : CF.emptyFunction,
		onBlurAfter : function(){
			ui.logger();
			this.$elem.removeClass("selected");
			this.isFocus=false;
		},
		focus : function(){
			ui.logger();
			this.on("focus");
		},
		onFocusBefore : function(){
			ui.logger();
			if(this.isDisabled==true || this.isFocus){
				return false;
			}
		},
		onFocus : CF.emptyFunction,
		onFocusAfter : function(){
			ui.logger();
			ui.form.field.setActive(this);
			this.$elem.removeClass("hover");
			this.$elem.addClass("selected");
			this.isFocus=true;
		},
		disabled : function(){
			ui.logger();
			this.on("disabled");
		},
		onDisabledBefore : function(){
			ui.logger();
			if(this.isDisabled==true){
				return false;
			}
			this.isDisabled=true;
			this.$elem.addClass("disabled");

			ui.form.field.removeItem(this);
			this.isFocus=false;
		},
		onDisabled : CF.emptyFunction,
		onDisabledAfter : CF.emptyFunction,
		enabled : function(){
			ui.logger();
			this.on("enabled");
		},
		onEnabledBefore:function(){
			ui.logger();
			if(this.isDisabled==false){
				return false;
			}
			this.isDisabled=false;
			this.$elem.removeClass("disabled");
		},
		onEnabled : CF.emptyFunction,
		onEnabledAfter : CF.emptyFunction,
		remove:function(){
			ui.logger();
			ui.form.field.removeItem(this);
			this.callSuperMethod();
		}
	});


})(CF,$,ui);