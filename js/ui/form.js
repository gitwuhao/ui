(function(CF,$,ui){
	
	ui.form=function(render){
		this.callSuperMethod();
	};

	ui.extend(ui.form,ui.widget,{
		_name_ : "form",
		statics:{
			css:{
				_c_form_box : '-form-box',
				_c_form : '-form',
				_c_form_item : '-form-item',
				_c_button_box : '-button-box',
				_c_form_label : '-form-label',
				_c_form_label_padding : '-form-label-padding',
				_c_form_table : '-form-table',
				_c_form_item_box : '-form-item-box'
			},
			getTemplate: function(config){
				ui.widget.applyCSS(config,this.css);
				var html=['<div class="',config._c_form_box,' ',(config.cls||''),'">',
							'<form  class="',config._c_form,'"'];
				if(config.autocomplete){	
					html.push(' autocomplete="',config.autocomplete,'"');
				}
				if(config.method){	
					html.push(' method="',config.method,'"');
				}
				if(config.action){	
					html.push(' action="',config.action,'"');
				}
				if(config.id){	
					html.push(' id="',config.id,'"');
				}
				if(config.name){	
					html.push(' name="',config.name,'"');
				}

				html.push('>');
				if(config.isTableLayout!=false){
					html.push('<table class="',config._c_form_table,'">');
				}else{
					html.push('<div class="',config._c_form_item_box,'">');
				}
				var items=config.items;
				for(var i=0,len=items.length;i<len;i++){
					var item=items[i];
					if(config.isTableLayout!=false){
						item.form=config;
					}
					if(item.cls){
						item.cls=item.cls + ' ' + config._c_form_item;
					}else{
						item.cls=config._c_form_item;
					}
					if(config.px){
						item.px=config.px;
					}
					if(item.html){
						item.type='htmlitem';
						html.push(ui.form.field.getFieldTemplate(item));
						delete item.type;
					}else{
						var xtype=item.xtype||'text';
						var input=ui.form[xtype];
						html.push(input.getTemplate(item));
					}
					delete item.form;
				}

				var buttons=config.buttons;
				if(buttons){
					if(config.isTableLayout!=false){
						html.push('<tr>',
									'<td class="',config._c_form_label,'">&nbsp;</td>');
						if(!config.notLabelPadding){
							html.push(
									'<td class="',config._c_form_label_padding,'">&nbsp;</td>');
						}
						html.push(
									'<td class="',config._c_button_box,'" >');
					}else{
						html.push('<div class="',config._c_button_box,'" >');
					}
					for(var i=0,len=buttons.length;i<len;i++){
						var item=buttons[i];
						if(config.px){
							item.px=config.px;
						}
						html.push(ui.button.getTemplate(item));
					}
					if(config.isTableLayout!=false){
						html.push(  '</td>',	
									//'<td>&nbsp;</td>',
								  '</tr>');
					}else{
						html.push('</div>');
					}
				}
				if(config.isTableLayout!=false){
					html.push('</table>');
				}else{
					html.push('</div>');
				}
				html.push('<form></div>');
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
			ui.logger(this);
			this.callSuperMethod();
			var elem=this.$elem[0];
			this.from=elem.children[0];
			var rows;
			if(config.isTableLayout!=false){
				var table=this.from.children[0];
				rows=table.rows;
			}else{
				rows=this.from.children[0].children;
			}
			var items=this.items;
			for(var i=0,len=items.length;i<len;i++){
				var item=items[i];
				if(!item.html){
					item=this.getClass().getFormItem(item,rows[i]);
					this.items[i]=item;
				}
			}
			this.itemsToMap();

			if(this.buttons){
				items=this.buttons;
				var buttonList=$("."+this._c_button_box,this.$elem).children();
				for(var i=0,len=buttonList.length;i<len;i++){
					var item=this.buttons[i];
					item=this.getClass().getButtonItem(item,buttonList[i]);
					item.$owner=this;
					this.buttons[i]=item;
					if(item.name){
						this.itemsMap['_'+item.name+'_']=item;
					}
				}
			}
		},
		onBindEvent:function(){
			ui.logger(this);
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
		},
		reset:function(){
			
		},
		getParamArray : function(isRemoveEmpty){
			var array=$(this.from).serializeArray();
			if(isRemoveEmpty){
				for(var i=array.length-1;i>=0;i--){
					var item=array[i];
					if(!item.value){
						array.splice(i,1);
					}
				}
			}
			return array;
		},
		getParam : function(isRemoveEmpty){
			var array=this.getParamArray(isRemoveEmpty);
			if(!array || array.length==0){
				return;
			}
			var map=[];
			$.it(array,function(key,item){
				map.push(item.name+'='+encodeURIComponent(item.value));
			});
			return map.join('&');
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
			removeActiveItem: function(item){
				if(this.active==item){
					this.active=null;
				}
			},
			getFieldTemplate:function(config){
				ui.widget.applyCSS(config,this.css);
				var html=[];
				if(!config.form){
					html.push('<div class="',config.px,'-',config.type,' ',config._c_item_field,' ',(config.cls||''),'" style="');

					if(config.width){
						html.push('width:',config.width,';');
					}
					
					html.push('"');

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
					html.push('<td class="',config._c_label,'">');
					if($.trim(config.label)){
						html.push(config.label,'：');
					}else{
						html.push('&nbsp;');
					}
					html.push('</td>');
					if(config.form && !config.form.notLabelPadding){
						html.push(		
							  '<td class="',config._c_label_padding,'">');
						if(config.required){
							html.push('<span class="',config._c_required_icon,'">*</span>');
						}else{
							html.push('&nbsp;');
						}
						html.push(
							   '</td>');
					}
					html.push('<td  class="',config._c_item_field,'">');
				}else if(config.form && !config.label){
					html.push('<td colspan="3" class="',config._c_item_field,'">');
				}
				
				html.push(config.html);
				
				if(config.label || (config.form && !config.label)){
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
		onBindEventAfter:function(){
			ui.logger(this);
			if(this.vtype){
				ui.form.vtypes.register(this);
			}
		},
		setValue:function(value){
			ui.logger(this);
			if(value==undefined){
				return false;
			}
			this.oldValue=this.value;
			this.value=value;
			this.trigger("setvalue",this.value,this.oldValue);
		},
		getValue:function(){
			ui.logger(this);
			return this.value||'';
		},
		blur : CF.emptyFunction,
		onBlurBefore : function(){
			ui.logger(this);
			if(this.isDisabled==true || this.isFocus==false){
				return false;
			}
		},
		onBlur : CF.emptyFunction,
		onBlurAfter : function(){
			ui.logger(this);
			this.$elem.removeClass("selected");
			this.isFocus=false;
		},
		focus : function(){
			ui.logger(this);
			this.on("focus");
		},
		onFocusBefore : function(){
			ui.logger(this);
			if(this.isDisabled==true || this.isFocus){
				return false;
			}
		},
		onFocus : CF.emptyFunction,
		onFocusAfter : function(){
			ui.logger(this);
			if(this.activeable!=false){
				ui.form.field.setActive(this);
				this.$elem.removeClass("hover");
				this.$elem.addClass("selected");
			}
			this.isFocus=true;
		},
		disabled : function(){
			ui.logger(this);
			this.on("disabled");
		},
		onDisabledBefore : function(){
			ui.logger(this);
			if(this.isDisabled==true){
				return false;
			}
			this.isDisabled=true;
			this.$elem.addClass("disabled");
			this.$elem.removeClass("selected");
			ui.form.field.removeActiveItem(this);
			this.isFocus=false;
		},
		onDisabled : CF.emptyFunction,
		onDisabledAfter : CF.emptyFunction,
		enabled : function(){
			ui.logger(this);
			this.on("enabled");
		},
		onEnabledBefore:function(){
			ui.logger(this);
			if(this.isDisabled==false){
				return false;
			}
			this.isDisabled=false;
			this.$elem.removeClass("disabled");
		},
		onEnabled : CF.emptyFunction,
		onEnabledAfter : CF.emptyFunction,
		remove:function(){
			ui.logger(this);
			ui.form.field.removeActiveItem(this);
			this.callSuperMethod();
		},
		onChange :function(){
			ui.logger(this);
		}
	});


})(CF,$,ui);