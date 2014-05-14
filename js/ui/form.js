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
					html.push('<tr class="',config._c_form_item,'">',
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
			}

			
			if(this.buttons){
				var buttonList=$("."+this._c_button_box,this.$elem).children();
				for(var i=0,len=buttonList.length;i<len;i++){
					var item=this.buttons[i];
					items[i]=this._class_.getButtonItem(item,buttonList[i]);
				}
			}
		},
		onRenderAfter:function(config){
			CF.logger(this,arguments);
			this.callSuperMethod();
		},
		onBindEvent:function(){
			CF.logger(this,arguments);
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
			}
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
			if(this.selectable!=false){
				this.$elem.removeClass("selected");
				this.isFocus=false;
			}
		},
		focus : CF.emptyFunction,
		onFocusBefore : function(){
			CF.logger(this,arguments);
			if(this.isDisabled==true || this.isFocus){
				return false;
			}
		},
		onFocus : CF.emptyFunction,
		onFocusAfter : function(){
			CF.logger(this,arguments);
			if(this.selectable!=false){
				ui.form.item.setActive(this);
				this.$elem.removeClass("hover");
				this.$elem.addClass("selected");
				this.isFocus=true;
			}
		},
		disabled : CF.emptyFunction,
		onDisabledBefore : function(){
			CF.logger(this,arguments);
			if(this.isDisabled==true){
				return false;
			}
			this.isDisabled=true;
			this.$elem.addClass("disabled");
			
			if(this.selectable!=false){
				ui.form.item.removeActive(this);
				this.isFocus=false;
			}
		},
		onDisabled : CF.emptyFunction,
		onDisabledAfter : CF.emptyFunction,
		enabled : CF.emptyFunction,
		onDisabledBefore:function(){
			CF.logger(this,arguments);
			if(this.isDisabled==false){
				return false;
			}
			this.isDisabled=false;
			this.$elem.removeClass("disabled");
		},
		onDisabled : CF.emptyFunction,
		onDisabledAfter : CF.emptyFunction
	});


})(CF,$,ui);