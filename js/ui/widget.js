(function(CF,$){

	var ui=window.ui||{},
		widget,
		ObjectHasOwnProperty=Object.prototype.hasOwnProperty;

	
	var _class_map_={};
	ui.getClass=function(xtype){
		return _class_map_[xtype];
	};

	ui.getXTypeHTML=function(config){
		var _class,
			xtype=config.xtype;
		if(xtype=='text' || xtype=='date' || xtype=='checkbox' || xtype=='radio'){
			_class=ui.form[xtype];
		}else if(xtype){
			_class=ui[xtype];
		}
		return _class.getTemplate(config);
	};

	ui.getXTypeItem=function(config,elem){
		var item,_class,
			xtype=config.xtype;
		config.elem=elem;
		config.autoRender=false;
		delete config.xtype;
		if(xtype=='text' || xtype=='date' || xtype=='checkbox' || xtype=='radio'){
			_class=ui.form[xtype];
		}else if(xtype){
			_class=ui[xtype];
		}
		item=new _class(config);
		item.initRender();
		return item;
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
	
	ui.logger=function(ref){
		var caller,
			_owner_,
			arg;
		caller=arguments.callee.caller;
		arg=caller.arguments;
		_owner_=arguments.callee.caller._owner_;
		callerName=ref._owner_name_+'::'
		if(ref._owner_name_!=caller._owner_._owner_name_){
			callerName= callerName + caller._owner_._owner_name_+'.';
		}
		callerName=callerName + caller._name_;
		CF.logger(callerName,arg);
	};

	ui.getData=function(item){
		$.data(item,this._owner_name_);
	};

	ui.__delete__=CF.__delete__;

	ui.extend=function(){
		var _prototype=CF.extend.apply(this,arguments);

		_class_map_[_prototype._owner_name_]=_prototype.getClass();
		
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
			var _super_=this.getClass()._super_.prototype;
			if(!_super_){
				_super_=this.getClass()._super_;
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
				ui.setOwner(this.getClass(),config);
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

			ui.widget.applyCSS(config,this.getClass().css);
			
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
			ui.logger(this);
			
			if(this.elem){
				this.$elem=$(this.elem);
				delete this.elem;
				delete this.onRender;
				delete this.autoRender;
				return;
			}

			var div=$.createElement(this.getClass().getTemplate(config));
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
		itemsToMap:function(){
			ui.logger(this);
			this.itemsMap={};
			var items=this.items;
			for(var i=0,len=items.length;i<len;i++){
				var item=items[i];
				var key;
				if(item.cls){
					key=item.cls;
				}else if(item.name){
					key=item.name;
				}else if(item.id){
					key=item.id;
				}

				if(key){
					this.itemsMap['_'+key+'_']=item;
				}
			}
		},
		remove:function(){
			ui.logger(this);
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
					if(!item){

					}else if(item._isArray_){
						CF.removeOwnProperty.call(item);
					}else if(item.__isUI__ && !/^\$/.test(key) && item.remove){
						item.remove();
					}
				}
			}
		}
	};


	CF.extendEventListener(ui.widget);

	
	ui.widget._owner_name_=ui.widget._type_+"."+ui.widget._name_;

	ui.setOwner(ui.widget,ui.widget);

	delete ui.widget._owner_name_;


	window.ui=ui;

})(CF,$);
