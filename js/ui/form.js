(function(CF,$,ui){
	
	ui.form=function(render){
		this.callSuperMethod();
	};

	ui.extend(ui.form,ui.widget,{
		_type_ : "ui",
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
				item.on("render",config);
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
				item.on("render",config);
				return item;
			}
		},
		onRender:function(config){
			CF.logger(this,arguments);
			this.callSuperMethod();
			var elem=this.$elem[0];
			var table=elem.children[0];
			var rows=table.rows;
			var items=this.items;
			for(var i=0,len=items.length;i<len;i++){
				var item=items[i];
				items[i]=this._class_.getFormItem(item,rows[i]);
				items[i].$owner=this;
			}

			if(this.buttons){
				items=this.buttons;
				var buttonList=$("."+this._c_button_box,this.$elem).children();
				for(var i=0,len=buttonList.length;i<len;i++){
					var item=this.buttons[i];
					items[i]=this._class_.getButtonItem(item,buttonList[i]);
					items[i].$owner=this;
				}
			}
		},
		onRenderAfter:function(config){
			CF.logger(this,arguments);
			this.callSuperMethod();
		},
		onBindEvent:function(){
			CF.logger(this,arguments);
		},
		getValues:function(){
			var values={};
			var items=this.items;
			for(var i=0,len=items.length;i<len;i++){
				var item=items[i];
				var value=item.getValue();
				values[i]=value;
				values[item.name]=value;
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

	ui.form.item=function(render){
		this.callSuperMethod();
	};
	 

	ui.extend(ui.form.item,ui.widget,{
		_type_ : "ui.form",
		_name_ : "item",
		statics:{
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
			getItemTemplate:function(config){
				ui.widget.applyCSS(config,{
					_c_label : '-label',
					_c_required_icon : '-required-icon',
					_c_label_padding : '-label-padding',
					_c_item_field : '-item-field'
				});
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
		bindItemHover:function($elem){
			var me=this;
			$elem.on({
				mouseover : function (event) {
					if(me.isDisabled!=true && $.hasClass(this,"selected")==false){
						$.addClass(this,"hover");
					}
				},
				mouseout: function (event) {
					if(me.isDisabled!=true){
						$.removeClass(this,"hover");
					}
				}
			});
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
			CF.logger(this,arguments);
			if(this.isDisabled==true || this.isFocus==false){
				return false;
			}
		},
		onBlur : CF.emptyFunction,
		onBlurAfter : function(){
			CF.logger(this,arguments);
			this.$elem.removeClass("selected");
			this.isFocus=false;
		},
		focus : function(){
			CF.logger(this,arguments);
			this.on("focus");
		},
		onFocusBefore : function(){
			CF.logger(this,arguments);
			if(this.isDisabled==true || this.isFocus){
				return false;
			}
		},
		onFocus : CF.emptyFunction,
		onFocusAfter : function(){
			CF.logger(this,arguments);
			ui.form.item.setActive(this);
			this.$elem.removeClass("hover");
			this.$elem.addClass("selected");
			this.isFocus=true;
		},
		disabled : function(){
			CF.logger(this,arguments);
			this.on("disabled");
		},
		onDisabledBefore : function(){
			CF.logger(this,arguments);
			if(this.isDisabled==true){
				return false;
			}
			this.isDisabled=true;
			this.$elem.addClass("disabled");
			
			ui.form.item.removeActive(this);
			this.isFocus=false;
			
		},
		onDisabled : CF.emptyFunction,
		onDisabledAfter : CF.emptyFunction,
		enabled : function(){
			CF.logger(this,arguments);
			this.on("enabled");
		},
		onEnabledBefore:function(){
			CF.logger(this,arguments);
			if(this.isDisabled==false){
				return false;
			}
			this.isDisabled=false;
			this.$elem.removeClass("disabled");
		},
		onEnabled : CF.emptyFunction,
		onEnabledAfter : CF.emptyFunction
	});


})(CF,$,ui);