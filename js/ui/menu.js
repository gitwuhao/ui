(function(CF,$,ui){

	ui.menu=function(){
		this.callSuperMethod();
	};

	ui.extend(ui.menu,ui.popu,{
		_type_ :"ui",
		_name_ :"menu",
		statics:{
			css:{
				_c_menu:'-menu',
				_c_menu_item:'-menu-item',
				_c_icon:'-icon',
				_c_arrow_icon:'-arrow-icon',
				_c_label:'-label',
				_c_separator:'-menu-separator'
			},
			getTemplate:function(config){
				ui.widget.applyCSS(config,this.css);
				var items=config.items;
				var html=['<ul class="',config._c_menu,'">'];
				for(var i=0,len=items.length;i<len;i++){
					var item=items[i];
					if(item==ui.menu.separator){
						html.push('<li class="',config._c_separator,'"></li>');
					}else{
						html.push('<li class="',config._c_menu_item,' ',(item.cls||""),'"');
						if(item.title){
							html.push(' title="',item.title,'"');
						}
						html.push('>');
						if(config.icon || !item.label){
							html.push('<span class="',config._c_icon,'"></span>');
						}
						if(item.label){
							html.push('<label class="',config._c_label,'">',item.label,'</label>');
						}
						if(item.menu){
							html.push('<span class="',config._c_arrow_icon,'"></span>');
						}
						html.push('</li>');
					}
				}
				html.push('</ul>');
				return html.join('');
			},
			separator:'-',
			align:'trbl',
			addContextMenu:function(context,menu){
				$.disabledRightButton();
				$(context).on("contextmenu",function(event){
					var left=event.pageX;
					var top=event.pageY;

					var maxW=window.innerWidth;
					var maxH=window.innerHeight;
					
					var menuElem=menu.$elem;
					var w=menuElem.outerWidth();
					var h=menuElem.outerHeight();

					if(left+w>maxW){
						left=maxW-w;
					}
					if(top+h>maxH){
						top=top-h;
					}
					menu.setOffset(left,top);
					menu.show();
					return false;
				});
			}
		},
		onRenderAfter:function(config){
			CF.logger(this,arguments);
			var $elem=this.$elem;
			this.$menu=$elem.children("."+config._c_menu);
			this.$menuitem=this.$menu.children("li");
		},
		onBindEvent:function(){
			CF.logger(this,arguments);
			
			this.callSuperMethod();

			var me=this;
			var items=this.items;

			this.$menuitem.each(function(index,elem){
				var item=items[index];
				if(item!=ui.menu.separator){	
					var $elem=$(elem);
					$elem.bindHover();
					item.$elem=$elem;
					
					item.$owner=me;

					item.name=item.cls; 
					
					if(item.name){
						items['_'+item.name+'_']=item;
					}

					me.setMenuItemData(item);
					
					if(item.menu){
						setTimeout(function(){
							me.bindSubMenuTrigger(item);
						},100);	
					}
					//if(item.onClick || !item.menu){
					$elem.click(function(event){
						var itemData=me.getMenuItemData(this);
						if(itemData.onClick){
							itemData.onClick(event);
						}
						me.on("itemClick");
					});
					//}
				}
			});
			
			this.$elem.hover(function(event){				
				if(me.parentMenu){
					me.onSubMenuMouseOver(event);
				}else{
					me.onMenuMouseOver(event);
				}
				return false;
			},function(event){
				return false;
			});
		},
		getItem:function(name){
			return this.items['_'+name+'_'];
		},
		onSubMenuMouseOver:function(event){
			CF.logger(this,arguments);
			this.triggerSubMenuHide();
			this.parentMenu.show();
			this.show();
		},
		onMenuMouseOver:function(event){
			CF.logger(this,arguments);
			this.triggerSubMenuHide();
			this.show();
		},
		onSubMenuShow:function(menu){
			CF.logger(this,arguments);
			this.triggerSubMenuHide();
			this.subMenu=menu;
			menu.resetOffset();
			menu.show();
		},
		onShowAfter:function(){
			CF.logger(this,arguments);
			if(!this.parentMenu){
				this.callSuperMethod();
			}
		},
		onHide:function(){
			CF.logger(this,arguments);
			this.triggerSubMenuHide();
			this.callSuperMethod();
		},
		bindSubMenuTrigger:function(item){
			CF.logger(this,arguments);
			var me=this;
			item.$elem.hover(function(event){
				var itemData=me.getMenuItemData(this);
				var menu=itemData.menu;
				if(!menu.toggle){
					menu=me.renderSubMenu(itemData);
				}
				me.onSubMenuShow(menu);
				return false;
			},function(event){
				var itemData=me.getMenuItemData(this);
				if(itemData.menu.hide){
					itemData.menu.hide();
				}
				return false;
			});
		},		
		setOffset : function(left,top){
			CF.logger(this,arguments);
			if(left==0 && top==0){
				this.hide();
				//console.info("offset:["+left+","+top+"]");
				//因鼠标在menuitem上快速移动，导致hide timeout状态不同步
				//当前菜单显示，上级菜单隐藏的bug
			}else{
				this.$elem.css({
					left : left,
					top : top
				});
			}
		},
		renderSubMenu:function(item){
			var menu=item.menu;
			if(!menu.render){
				menu.render=this.$render;
			}
			CF.merger(menu,{
				parentMenu:this,
				align:'tr',
				$offsetElement : item.$elem
			});
			if(this.width){
				menu.width=this.width;
			}
			item.menu=menu=new ui.menu(menu);
			return menu;
		},
		onItemClick:function(){
			CF.logger(this,arguments);
			this.triggerParentMenuHide();
			this.on("hide");
		},
		triggerParentMenuHide:function(){
			CF.logger(this,arguments);
			if(this.parentMenu){
				this.parentMenu.on("hide");
				this.parentMenu.triggerParentMenuHide();
			}
		},
		triggerSubMenuHide:function(){
			CF.logger(this,arguments);
			if(this.subMenu){
				this.subMenu.on("hide");
				this.subMenu.triggerSubMenuHide();
			}
		},
		setMenuItemData:function(item){
			CF.logger(this,arguments);
			item.$elem.data("_menu_item_data_",item);
		},
		getMenuItemData:function(elem){
			CF.logger(this,arguments);
			var data=$.data(elem,"_menu_item_data_");
			if(data){
				return data;
			}
			data={};
			$.data(elem,"_menu_item_data_",data);
			return data;
		}

	});

	
})(CF,$,ui);