(function(CF,$){

	var ui=window.ui||{},
		widget,
		ObjectHasOwnProperty=Object.prototype.hasOwnProperty;

	
	var _class_map_={};
	ui.getClass=function(xtype){
		return _class_map_[xtype];
	};
	ui.setOwner=function(_class,prototype){
		CF.setOwner(_class,prototype);
	};

	ui.setOwnerName=function(prototype){
		CF.setOwner(prototype);
	};

	ui.setData=function(item,data){
		$.data(item,this._owner_name_,data);
	
	};
	ui.logger=function(){
		var caller,
			arg;
		caller=arguments.callee.caller;
		arg=caller.arguments;
		CF.logger(caller,arg);
	};

	ui.getData=function(item){
		$.data(item,this._owner_name_);
	};

	ui.__delete__=CF.__delete__;

	ui.extend=function(){
		var _prototype=CF.extend.apply(this,arguments);
		
		_class_map_[_prototype._owner_name_]=_prototype._class_;
		
		return _prototype;
	};

	ui.cssPrefix = "x-ui";

	ui.renderContainer

	ui.widget={
		__isUI__:true,
		_type_ : "ui",
		_name_ : "widget",
		__isClass__:true,
		applyCSS:function(config,css){
			if(config.isApplyCSS==true || !css){
				return;
			}
			if(!config.px){
				config.px=ui.cssPrefix;
			}
			for(var key in css){
				config[key]=config.px + css[key];
			}
			config.isApplyCSS=true;
		},
		clearCSS : function(config,css){
			if(!css){
				return;
			}
			for(var key in css){
				delete config[key];
			}
			delete config.px;
			delete config.isApplyCSS;
		},
		getSuper:function(){
			var _super_=this._class_._super_.prototype;
			if(!_super_){
				_super_=this._class_._super_;
			}
			return _super_;
		},
		constructor : function(config){
			if(config){
				if(config.nodeType){
					config={
						render :this.render
					};
				}
				ui.setOwner(this._class_,config);
			}else{
				config={};
			}

			var render=config.render;
			if(render){
				if(render.jquery){
					this.$render=render;
				}else if(typeof render=='function'){
					this.$render=config.render.call(this);
				}else{
					this.$render=$(render);
				}
			}
			
			delete config.render;

			ui.widget.applyCSS(config,this._class_.css);
			
			CF.merger(this,config);

			
			this.config=config;

			if(config.autoRender!=false){
				if(!this.$render){
					this.$render=$.getBody();
				}
				this.initRender();
			}

			//config._class_name_;
		},
		initRender:function(){
			this.on("render",this.config);
			this.on("bindEvent");
			this.on("ready");
			delete this.config;
			delete this.initRender;

			this.isRender=true;
		},
		onRender : function(config){
			ui.logger();
			
			if(this.elem){
				this.$elem=$(this.elem);
				delete this.elem;
				delete this.onRender;
				delete this.autoRender;
				return;
			}

			var div=$.createElement(this._class_.getTemplate(config));
			if(this.$render){
				this.$render.append(div);
			}
			this.$elem=$(div);
		},
		onBindEvent:function(){
		
		},
		disabled:function(){
			this.$elem.addClass("disabled");
			this.$elem.removeClass("selected hover");
			this.isDisabled=true;
		},
		enabled:function(){
			this.$elem.removeClass("disabled");
			this.isDisabled=false;
		},
		bindHover:function($elem){
			if(this.isHover!=true){
				return;
			}
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
		remove:function(){
			ui.logger();
			var item=this.item;
			if(item && item.remove){
				item.remove();
			}
			var items=this.items;
			if(items){
				for(var i=0,len=items.length;i<len;i++){
					var item=items[i];
					if(item.remove){
						item.remove();
					}
					
					for(var key in item){
						if(ObjectHasOwnProperty.call(item,key)){
							var _item_=item[key];
							item[key]=null;
							delete item[key];
						}
					}
				}
			}
			var $elem=this.$elem;
			if($elem){
				$elem.remove();
			}
			for(var key in this){
				if(ObjectHasOwnProperty.call(this,key)){
					var item=this[key];
					this[key]=null;
					delete this[key];
					
					if(item && item.__isUI__ && !/^\$/.test(key) && item.remove){
						item.remove();
					}
				}
			}
		}
	};

	ui.widget._owner_name_=ui.widget._type_+"."+ui.widget._name_;

	ui.setOwner(ui.widget,ui.widget);

	delete ui.widget._owner_name_;

	CF.extendEventListener(ui.widget);

	window.ui=ui;

})(CF,$);
