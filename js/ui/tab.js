(function(CF,$,ui){

	ui.tab=function(){
		this.callSuperMethod();
	};

	ui.extend(ui.tab,ui.widget,{
		_name_ : "tab",
		statics:{
			css:{
				_c_tab_panel: '-tab-panel',
				_c_tabbar_box: '-tabbar-box',
				_c_topbar_box: '-topbar-box',
				_c_floatbar_box: '-floatbar-box',
				_c_tabview_box: '-tabview-box',
				_c_bottombar_box: '-bottombar-box'
			},
			getTemplate: function(config){
				ui.widget.applyCSS(config,this.css);
				var html=['<div class="',config._c_tab_panel,' ',(config.cls||''),' border-box">'];
				if(config.floatbar){
					//ui.button
					var floatbar=config.floatbar;
					html.push('<div class="',config._c_floatbar_box,'">');
					for(var i=0,len=floatbar.length;i<len;i++){
						var item=floatbar[i];
						if(item.html){
							html.push(item.html);
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
							if(config.px){
								item.px=config.px;
							}
							html.push(_class.getTemplate(item));
						}
					}
					html.push('</div>');
				}

				html.push('<div class="',config._c_tabbar_box,' uns"></div>');

				if(config.topbar){
					if(config.px==ui.cssPrefix){
						config.topbar.px='x-ui-tab';
					}else{
						config.topbar.px=config.px;
					}
					html.push('<div class="',config._c_topbar_box,'">',ui.toolbar.getTemplate(config.topbar),'</div>');
				}
				html.push(   '<div class="',config._c_tabview_box,'"></div>');
				if(config.bottombar){
					if(config.px==ui.cssPrefix){
						config.bottombar.px='x-ui-tab';
					}else{
						config.bottombar.px=config.px;
					}
					html.push('<div class="',config._c_bottombar_box,'">',ui.toolbar.getTemplate(config.bottombar),'</div>');
				}
				html.push('</div>');
				return html.join('');
			}
		},
		onRenderAfter:function(config){
			ui.logger(this);
			var $tabpanel=this.$elem;
			this.$tabbarbox=$tabpanel.children('.'+this._c_tabbar_box);
			this.$tabviewbox=$tabpanel.children('.'+this._c_tabview_box);
			if(this.floatbar){
				this.$floatbar=$tabpanel.children('.'+this._c_floatbar_box);
				var children=this.$floatbar.children();
				for(var i=0,len=children.length;i<len;i++){
					var item=this.floatbar[i];
					if(!item.html){
						item=ui.getXTypeItem(this.floatbar[i],children[i]);
						if(item.cls){
							this.floatbar[item.cls]=item;
						}else if(item.name){
							this.floatbar[item.name]=item;
						}

						if(item.icon){
							this.floatbar[item.icon]=item;
						}
						this.floatbar[i]=item;
					}
					item.$owner=this;
				}
			}
			if(this.topbar){
				var $topbarbox=$tabpanel.children('.'+this._c_topbar_box);
				this.topbar.elem=$topbarbox.children()[0];
				this.topbar.autoRender=false;
				this.topbar=new ui.toolbar(this.topbar);
				this.topbar.initRender();
				this.topbar.$owner=this;
			}

			if(this.bottombar){
				var $bottombarbox=$tabpanel.children('.'+this._c_bottombar_box);
				this.bottombar.elem=$bottombarbox.children()[0];
				this.bottombar.autoRender=false;
				this.bottombar=new ui.toolbar(this.bottombar);
				this.bottombar.initRender();
				this.bottombar.$owner=this;
			}

		},
		onBindEvent:function(){
			ui.logger(this);
			var tagList=this.$tabbarbox.children();
			var tabViewList=this.$tabviewbox.children();
			var items=this.items;
			this.items={};
			for(var i=0,len=items.length;i<len;i++){
				var item=items[i];
				this.add(item);
			}
		},
		setCurrentTab : function(tab){
			ui.logger(this);
			if(this.currentTab==tab){
				return;
			}
			if(this.currentTab){
				this.currentTab.isActive=false;
				this.currentTab.hide();
			}
			this.currentTab=tab;
			this.currentTab.isActive=true;
			this.currentTab.show();
		},
		add : function(tab){
			tab.$tabbarbox=this.$tabbarbox;
			tab.$tabviewbox=this.$tabviewbox;
			tab.tabPanel=this;

			if(this.px){
				tab.px=this.px;
			}
			var tabPanel=new Tab(tab);

			tabPanel.$owner=this;

			this.items[tabPanel.index]=tabPanel;

			if(tabPanel.name){
				this.items['_'+tabPanel.name+'_']=tabPanel;
			}else if(tabPanel.cls){
				this.items['_'+tabPanel.cls+'_']=tabPanel;
			}

			if(tab.active && !this.currentTab){
				this.setCurrentTab(tabPanel);
			}
		},
		getTab:function(key){
			if(!key){
				return this.currentTab;
			}
			return this.items['_'+key+'_'];
		},
		getItem:function(icon){
			var item;
			if(this.topbar){
				item=this.topbar.getItem(icon);
			}
			if(!item && this.bottombar){
				item=this.bottombar.getItem(icon);
			}
			if(!item && this.floatbar){
				item=this.floatbar[icon]
			}
			if(!item && this.items){
				item=this.getTab(icon);
			}
			return item;
		},
		disabled:function(icon){
			var item=this.getItem(icon);
			if(item){
				item.disabled();
			}
		},
		enabled:function(icon){
			var item=this.getItem(icon);
			if(item){
				item.enabled();
			}
		},
		hide:function(icon){
			var item=this.getItem(icon);
			if(item){
				item.$elem.hide();
			}
		},
		show:function(icon){
			var item=this.getItem(icon);
			if(item){
				item.$elem.show();
			}
		},
		remove : function(tab){
			ui.logger(this);
			var items=this.items;
			if(tab){
				delete items[tab.index];
				if(this.currentTab==tab){
					this.currentTab=null;
					for(var key in items){
						this.setCurrentTab(items[key]);
						break;
					}
				}
				tab.remove();
				return;
			}
			if(items){
				for(var i=0,len=items.length;i<len;i++){
					this.remove(items[i]);
				}
			}

			if(this.topbar  && this.topbar.remove){
				this.topbar.remove();
			}
			if(this.bottombar && this.bottombar.remove){
				this.bottombar.remove();
			}
			this.callSuperMethod();
		}
	});



	var Tab=function(){
		this.callSuperMethod();
	};


	ui.extend(Tab,ui.widget,{
		_type_ :"ui.tab",
		_name_ :"Tab",
		statics:{
			css:{
				_c_tabbar_tag: '-tabbar-tag',
				_c_tabview: '-tabview'
			},
			getTabIndex : (function(){
				var tabIndex=0;
				return function(){
					tabIndex++;
					return "tab-"+tabIndex;
				}
			})()
		},
		onRender : function(config){
			ui.logger(this);
			this.index=this.getClass().getTabIndex();

			var $tabbarbox=this.$tabbarbox;
			var $tabviewbox=this.$tabviewbox;
			delete this.$tabbarbox;
			delete this.$tabviewbox;
			delete this.$render;


			var html=['<div class="',this._c_tabbar_tag,'">',this.label,'</div>'];
			var tag=$.createElement(html.join(''));
			$tabbarbox.append(tag);

			this.$elem=$(tag);
			this.$tag=this.$elem;


			var tabView=$.createElement(['<div class="',this._c_tabview,' ',(this.cls||''),'"></div>'].join(''));
			$tabviewbox.append(tabView);

			this.$tabview=$(tabView);


			delete this._c_tabview;
			delete this._c_tabbar_tag;
			delete this.px;
			delete this.isApplyCSS;

		},
		onRenderTabView : function(){
			if(this.html){
				this.$tabview.html(this.html);
			}else if(this.src){
				this.$tabview.html('<iframe src="',this.src,'"></iframe>');
			}else if(this.form){
				var form=this.form;
				form.render=this.$tabview[0];
				this.form=new ui.form(form);
			}
			if(this.onLoad){
				this.onLoad();
			}
			this.onRenderTabView=function(){};
			delete this.html;
			delete this.src;
		},
		onBindEvent:function(){
			ui.logger(this);

			this.$tag.bindHover();

			var me=this;

			this.$tag.click(function(event){
				me.on("tagClick");
				me.tabPanel.setCurrentTab(me);
			});

		},
		hide:function(){
			ui.logger(this);
			this.on("hide");
		},
		show:function(){
			ui.logger(this);
			this.on("show");
		},
		onHide:function(){
			ui.logger(this);
			this.$tabview.hide();
			this.$tag.removeClass("selected");
		},
		onShow:function(){
			ui.logger(this);
			this.onRenderTabView();
			this.$tabview.show();
			this.$tag.addClass("selected");
		},
		remove:function(){
			ui.logger(this);
			this.$tag.remove();
			this.$tabview.remove();
			this.callSuperMethod();
		}
	});

})(CF,$,ui);