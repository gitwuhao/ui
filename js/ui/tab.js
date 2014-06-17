(function(CF,jQuery,ui){

	ui.tab=function(){
		this.callSuperMethod();
	};


	ui.extend(ui.tab,ui.widget,{
		_type_ : "ui",
		_name_ : "tab",
		statics:{
			css:{
				_c_tab_panel: '-tab-panel',
				_c_tabbar_box: '-tabbar-box',
				_c_topbar_box: '-topbar-box',
				_c_tabview_box: '-tabview-box',
				_c_bottombar_box: '-bottombar-box'
			},
			getTemplate: function(config){
				ui.widget.applyCSS(config,this.css);
				var html=['<div class="',config._c_tab_panel,' ',(config.cls||''),' border-box">',
							'<div class="',config._c_tabbar_box,'"></div>']
				if(config.topbar){
					if(config.px){
						config.topbar.px=config.px;
					}
					html.push('<div class="',config._c_topbar_box,'">',ui.toolbar.getTemplate(config.topbar),'</div>');
				}
				html.push(   '<div class="',config._c_tabview_box,'"></div>');
				if(config.bottombar){
					if(config.px){
						config.bottombar.px=config.px;
					}
					html.push('<div class="',config._c_bottombar_box,'">',ui.toolbar.getTemplate(config.bottombar),'</div>');
				}
				html.push('</div>');
				return html.join('');
			}
		},
		onRenderAfter:function(config){
			ui.logger();
			var $tabpanel=this.$elem;
			this.$tabbarbox=$tabpanel.children('.'+this._c_tabbar_box);
			this.$tabviewbox=$tabpanel.children('.'+this._c_tabview_box);
			if(config.topbar){
				var $topbarbox=$tabpanel.children('.'+this._c_topbar_box);
				config.topbar.elem=$topbarbox.children()[0];
				config.topbar.autoRender=false;
				var item=new ui.toolbar(config.topbar);
				item.initRender();
				config.topbar=item;
			}

			if(config.bottombar){
				var $bottombarbox=$tabpanel.children('.'+this._c_bottombar_box);
				config.bottombar.elem=$bottombarbox.children()[0];
				config.bottombar.autoRender=false;
				var item=new ui.toolbar(config.bottombar);
				item.initRender();
				config.topbar=item;
			}

		},
		onBindEvent:function(){
			ui.logger();
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
			ui.logger();
			if(this.currentTab){
				this.currentTab.hide();
			}
			this.currentTab=tab;
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
			this.items[tabPanel.index]=tabPanel;
			if(tab.active && !this.currentTab){
				this.setCurrentTab(tabPanel);
			}
		},
		remove : function(tab){
			ui.logger();
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
			ui.logger();
			this.index=this._class_.getTabIndex();

			var $tabbarbox=this.$tabbarbox;
			var $tabviewbox=this.$tabviewbox;
			delete this.$tabbarbox;
			delete this.$tabviewbox;
			delete this.$render;


			var html=['<div class="',this._c_tabbar_tag,'">',this.label,'</div>'];
			var tag=jQuery.createElement(html.join(''));
			$tabbarbox.append(tag);

			this.$elem=jQuery(tag);
			this.$tag=this.$elem;


			var tabView=jQuery.createElement(['<div class="',this._c_tabview,'"></div>'].join(''));
			$tabviewbox.append(tabView);

			this.$tabview=jQuery(tabView);


			delete this._c_tabview;
			delete this._c_tabbar_tag;
			delete this.px;
			delete this.isApplyCSS;

		},
		onRenderTabView : function(){
			var html=[];
			if(this.html){
				html.push(this.html);
			}else if(this.src){
				html.push('<iframe src="',this.src,'"></iframe>');
			}
			this.$tabview.html(html.join(''));
			if(this.onLoad){
				this.onLoad();
			}
			this.onRenderTabView=function(){};
			delete this.html;
			delete this.src;
		},
		onBindEvent:function(){
			ui.logger();

			this.$tag.bindHover();

			var me=this;

			this.$tag.click(function(event){
				me.on("tagClick");
				me.tabPanel.setCurrentTab(me);
			});

		},
		hide:function(){
			ui.logger();
			this.on("hide");
		},
		show:function(){
			ui.logger();
			this.on("show");
		},
		onHide:function(){
			ui.logger();
			this.$tabview.hide();
			this.$tag.removeClass("selected");
		},
		onShow:function(){
			ui.logger();
			this.onRenderTabView();
			this.$tabview.show();
			this.$tag.addClass("selected");
		},
		remove:function(){
			ui.logger();
			this.$tag.remove();
			this.$tabview.remove();
			this.callSuperMethod();
		}
	});

})(CF,jQuery,ui);