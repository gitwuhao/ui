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
				_c_tab_view_box: '-tab-view-box'
			},
			getTemplate: function(config){
				ui.widget.applyCSS(config,this.css);
				return ['<div class="',config._c_tab_panel,' ',(config.cls||''),' border-box">',
							'<div class="',config._c_tabbar_box,'"></div>',
							'<div class="',config._c_tab_view_box,'"></div>',
				'</div>'].join('');
			}
		},
		onRenderAfter:function(config){
			CF.logger(this,arguments);
			var $tabpanel=this.$elem;
			this.$tabbarbox=$tabpanel.children('.'+this._c_tabbar_box);
			this.$tabviewbox=$tabpanel.children('.'+this._c_tab_view_box);			
			this.callSuperMethod();	
		},
		onBindEvent:function(){
			CF.logger(this,arguments);
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
			CF.logger(this,arguments);
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
			var tabPanel=new Tab(tab);
			this.items[tabPanel.index]=tabPanel;
		},
		remove : function(tab){
			CF.logger(this,arguments);
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
				_c_tab_view: '-tab-view'
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
			CF.logger(this,arguments);
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
			

			var tabView=jQuery.createElement(['<div class="',this._c_tab_view,'"></div>'].join(''));
			$tabviewbox.append(tabView);
			
			this.$tabview=jQuery(tabView);
			
			
			delete this._c_tab_view;
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
			CF.logger(this,arguments);

			this.$tag.bindHover();
			
			var me=this;

			this.$tag.click(function(event){
				me.on("tagClick");
				me.tabPanel.setCurrentTab(me);
			});
			
		},
		hide:function(){
			CF.logger(this,arguments);
			this.on("hide");
		},
		show:function(){
			CF.logger(this,arguments);
			this.on("show");
		},
		onHide:function(){
			CF.logger(this,arguments);
			this.$tabview.hide();
			this.$tag.removeClass("selected");
		},
		onShow:function(){
			CF.logger(this,arguments);
			this.onRenderTabView();
			this.$tabview.show();
			this.$tag.addClass("selected");
		},
		remove:function(){
			CF.logger(this,arguments);
			this.$tag.remove();
			this.$tabview.remove();
			this.callSuperMethod();
		}
	});

})(CF,jQuery,ui);