(function(CF,jQuery,ui){

	ui.toolbar=function(){
		this.callSuperMethod();
	};
	

	ui.extend(ui.toolbar,ui.widget,{
		_name_ : "toolbar",
		statics:{
			css:{
				_c_toolbar_box: '-toolbar-box',
				_c_button_box: '-toolbar-button-box',
				_c_popup_box: '-toolbar-popup-box',
				_c_separator: '-separator',
				_c_breakline: '-breakline',
				_c_text: '-item-text'
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
					}else if(item._isString_){
						html.push('<div class="',config._c_text,'">',item,'</div>');
					}else{
						if(!item.xtype){
							item.xtype='button';
						}
						var xtype=item.xtype;

						if(config.labelVisible==false && xtype!='text' && item.label){
							item.title=item.label;
							delete item.label;
						}

						if(config.px){
							item.px=config.px;
						}
						html.push(ui.getXTypeHTML(item));
					}
				}
				
				html.push('</div>',
				'<div class="',config._c_popup_box,'"></div>',
				'</div>');
				return html.join('');
			}
		},
		//buttons : null,
		//popups : null,
		onRender:function(config){
			ui.logger();
			this.callSuperMethod();
		},
		onRenderAfter:function(config){
			ui.logger();
			var $toolbar=this.$elem;
			this.$buttonbar=$toolbar.children('.'+this._c_button_box);
			this.$popup=$toolbar.children('.'+this._c_popup_box);
			var children=this.$buttonbar.children();
			var items=config.items;
			this.itemsMap={};
			for(var i=0,len=items.length;i<len;i++){
				var item=items[i];
				if(typeof item!="string"){
					items[i]=ui.getXTypeItem(item,children[i]);
					items[i].$owner=this;
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
		},
		disabled:function(){
			for(var key in this.itemsMap){
				var item=this.itemsMap[key];
				if(item.__isUI__){
					item.disabled();
				}
			}
		},
		enabled:function(){
			for(var key in this.itemsMap){
				var item=this.itemsMap[key];
				if(item.__isUI__){
					item.enabled();
				}
			}
		}
	});
	


})(CF,jQuery,ui);