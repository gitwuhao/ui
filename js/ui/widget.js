(function(CF,$){

	var ui=window.ui||{},
		widget,
		ObjectConstructor={}.constructor;

	function callSuperMethod(){
		var caller=arguments.callee.caller;
		var method=caller._name;
		var arg=caller.arguments;
		var _super_=caller._owner_._super_;
		var _result;
		var _super_prototype_=_super_.prototype;

		if(_super_prototype_){
			_result=_super_prototype_[method].apply(this,arg);
		}else{
			_result=_super_[method].apply(this,arg);
		}

		return _result;
		
	};
	
	function callPrototypeMethod(){
		var caller=arguments.callee.caller;
		var method=caller._name;
		var arg=caller.arguments;
		var _prototype_=this._class_.prototype;
		return _prototype_[method].apply(this,arg);
	}

	ui.setOwner=function(_class,prototype){
		for(var key in prototype){
			var _fn=prototype[key];
			if(typeof _fn == "function" && !_fn._owner_){
				_fn._owner_=_class;
				_fn._owner_name_=_class._owner_name_;
			}
		}
	}

	ui.__delete__="__delete_prototype__";

	ui.extend=function(_class,superClass,prototype){
		var _prototype=_class.prototype,
			_constructor=_prototype.constructor,
			_superClass,_superStatics,_statics;
		if(_constructor!=ObjectConstructor){
			_constructor._name="constructor";
		}
		
		
		for(var key in prototype){
			var pt=prototype[key];
			if(ui.__delete__==pt){
				delete prototype[key];
			}
		}

		if(typeof superClass =="object"){
			_superClass=superClass;
		}else{
			_superClass=superClass.prototype;
		}

		if(superClass.statics){
			_superStatics=superClass.statics;
		}

		if(prototype.statics){
			_statics=prototype.statics;
			_class.statics=_statics;
			delete prototype.statics;
		}
		
		_class._super_=superClass;
		//_class._prototype_=prototype;
		_class._owner_name_=prototype._type_+"."+prototype._name_;

		prototype.constructor=_class;

		ui.setOwner(_class,prototype);

		CF.merger(true,_prototype,_superClass, prototype);
		_prototype._class_=_class;
		_prototype.callSuperMethod=callSuperMethod;
		_prototype.callPrototypeMethod=callPrototypeMethod;


		if(_superStatics || _statics){
			CF.merger(true,_class,_superStatics,_statics);
			CF.merger(true,_class.statics,_superStatics,_statics);
		}
		return _prototype;
	};


	ui.cssPrefix = "x-ui";

	ui.renderContainer

	ui.widget={
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
			
			this._super_=this._class_._super_.prototype;

			if(!this._super_){
				this._super_=this._class_._super_;
			}

			if(config.autoRender!=false){
				if(!this.$render){
					this.$render=$.getBody();
				}
				this.on("render",config);
			}

			//config._class_name_;
		},
		onRender : function(config){
			CF.logger(this,arguments);
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
		onRenderAfter : function(config){
			CF.logger(this,arguments);
			//ui.widget.clearCSS(this,this._class_.css);
			this.on("bindEvent",null);
		},
		onBindEvent:function(){
		
		},
		remove:function(){
			var $elem=this.$elem;
			if($elem){
				$elem.remove();
			}
			for(var key in this){
				this[key]=null;
				delete this[key];
			}
		},
		disabled:function(){
			this.$elem.addClass("disabled");
			this.isDisabled=true;
		},
		enabled:function(){
			this.$elem.removeClass("disabled");
			this.isDisabled=false;
		}
	};

	ui.widget._owner_name_=ui.widget._type_+"."+ui.widget._name_;

	ui.setOwner(ui.widget,ui.widget);

	delete ui.widget._owner_name_;

	CF.extendEventListener(ui.widget);

	window.ui=ui;

})(CF,$);
