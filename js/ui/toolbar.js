(function(CF,jQuery,ui){

	ui.toolbar=function(){
		this.callSuperMethod();
	};
	

	ui.extend(ui.toolbar,ui.widget,{
		_type_ : "ui",
		_name_ : "toolbar",
		statics:{
			css:{
				_c_toolbar_box: '-toolbar-box',
				_c_button_box: '-toolbar-button-box',
				_c_popup_box: '-toolbar-popup-box',
				_c_separator: '-separator',
				_c_breakline: '-breakline'
			},
			getTemplate: function(config){
				ui.widget.applyCSS(config,this.css);
				var html=['<div class="',config._c_toolbar_box,' ',(config.cls||''),' border-box">',
				'<div class="',config._c_button_box,'">'];
				var items=config.items;
				for(var i=0,len=items.length;i<len;i++){
					var item=items[i];
					if(item=='|'){
						html.push('<div class="',config._c_separator,'"></div>');
					}else if(item=='||'){
						html.push('<div class="',config._c_breakline,'"></div>');
					}else{
						var xtype=item.xtype;
						var _class;
						if(xtype=='splitbutton'){
							_class=ui.splitbutton;
						}else if(xtype=='text'){
							_class=ui.form.text;
						}else{
							_class=ui.button;
						}

						if(config.labelVisible==false && xtype!='text' && item.label){
							item.title=item.label;
							delete item.label;
						}
						html.push(_class.getTemplate(item));
					}
				}
				
				html.push('</div>',
				'<div class="',config._c_popup_box,'"></div>',
				'</div>');
				return html.join('');
			},
			getButtonItem : function(config,elem){
				var item,_class,
					xtype=config.xtype;

				config.elem=elem;
				config.autoRender=false;
				delete config.xtype;
				if(xtype=='splitbutton'){
					item=new ui.splitbutton(config);
				}else if(xtype=='text'){
					item=new ui.form.text(config);
				}else{
					item=new ui.button(config);
				}
				item.initRender();
				return item;
			}
		},
		//buttons : null,
		//popups : null,
		onRender:function(config){
			CF.logger(this,arguments);
			this.callSuperMethod();
		},
		onRenderAfter:function(config){
			CF.logger(this,arguments);
			var $toolbar=this.$elem;
			this.$buttonbar=$toolbar.children('.'+this._c_button_box);
			this.$popup=$toolbar.children('.'+this._c_popup_box);
			var children=this.$buttonbar.children();
			var items=config.items;
			this.itemsMap={};
			for(var i=0,len=items.length;i<len;i++){
				var item=items[i];
				if(typeof item!="string"){
					items[i]=this._class_.getButtonItem(item,children[i]);
					var icon=item.cls;
					if(icon){
						this.itemsMap['_'+icon+'_']=items[i];
					}
				}
			}
		},
		getItem:function(icon){
			return this.itemsMap['_'+icon+'_'];
		},
		hideIcon : function(icon){
			var item=this.getItem(icon);
			item.$elem.addClass('hide');
		},
		disabledIcon : function(icon){
			var item=this.getItem(icon);
			item.disabled();
		},
		enabledIcon : function(icon){
			var item=this.getItem(icon);
			item.enabled();
		}
	});
	


})(CF,jQuery,ui);