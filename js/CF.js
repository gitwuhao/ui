(function(){
	var CF = {},
		ArraySlice=Array.prototype.slice,
		ObjectConstructor={}.constructor;

	CF.emptyFunction=function(){};

	(function(){
		var isDebug=false;
		if(localStorage && localStorage["isDebug"]=="true"){
			console.clear();
			isDebug=true;
		}
		
		var filter=["ui"];//["ui"];
		var _fLen=filter.length;
		
		for(var i=0;i<_fLen;i++){
			filter[i]=filter[i].toLowerCase();
		}

		CF.logger=isDebug ? function(ref,args){
			var refName=ref._name_||ref.name;
			if(!refName){
				if(ref.nodeType==1 && _fLen!=1){
					var handleObj=args[0].handleObj;
					var eventName=handleObj.handler._name||"on"+handleObj.type;
					CF.print("node."+ref.nodeName+"#"+eventName,ref,args);
				}
				return;
			}
			var callee=args.callee;
			var s='';
			
			fnName=(callee._name || callee.name);

			if(args.length==1 && args[0] && args[0].currentTarget){
				var event=args[0];
				var currentTarget=event.currentTarget;

				var nodeName=currentTarget.nodeName;
				var id=currentTarget.id;
				var name=currentTarget.name;
				var className=currentTarget.className;
				var selector;
				if(id){
					selector="#"+id;
				}else if(className){
					selector="."+className;
				}else if(name){
					selector="@"+name;
				}else if(nodeName){
					selector=nodeName;
				}
				
				fnName=fnName+"["+event.type+",["+selector.toLowerCase()+"]]";

			}
			var refType=ref._type_||ref.type;
			s=refType+".";

			
			if(callee._ref){
				s=s+callee._ref;
			}else{
				s=s+refName;
			}
			
			s=s+"#"+ fnName;

			if(_fLen==0){
				CF.print(s,ref,args);
				return;
			}
			for(var i=0;i<_fLen;i++){
				if(s.toLowerCase().indexOf(filter[i])>-1){
					CF.print(s,ref,args);
					return;
				}
			}
		}:CF.emptyFunction;


		CF.print=isDebug ?function(s,ref,args){
			var p=[];
			$.it(args,function(i,value){
				if(value && typeof value =="string"  && value.length < 30){
					p.push(value);
				}
			});
			console.groupCollapsed(s+"("+p.join(",")+")");
			console.dir(ref);
			console.dir(args);
			console.groupEnd();
		}:CF.emptyFunction;

		CF.info=isDebug ?function(message,ref){
			console.groupCollapsed(message);
			console.dir(ref);
			console.groupEnd();
		}:CF.emptyFunction;

		
	})();

	function merger(isApply,isDeep,target,list) {
		var size=list.length;
		for(var i=0;i<size;i++){
			var copy=list[i];
			for (var key in copy) {
				var item= copy[key];
				if(isApply && target[key]){

				}else if(item && (item._isDate_ || item._isClass_ ||  item._isArray_)){
					target[key] = item;
				}else if (isDeep && typeof item == "object") {
					if(typeof target[key] != "object"){
						target[key]={};
					}
					target[key]=merger(isApply,isDeep,target[key],[item]);
				}else if(typeof item == "function"){
					if(!item._name){
						item._ref=copy.name;
						item._name=key;
					}
					target[key] = item; 
				} else {
					target[key] = item;
				}
			}
		}
		return target;
	};

	function getP(){
		var args=arguments;
		var target=args[0]||{};
		var isDeep=false;
		var i=1;
		if(target === true){
			isDeep=true;
			target=args[1]||{};
			i=2;
		}
		var list=[];
		var size=args.length;
		for(;i<size;i++){
			if(args[i]){
				list.push(args[i]);
			}
		}
		return {
			isDeep:isDeep,
			target:target,
			list:list
		};
	};

	CF.merger = function(){
		var p=getP.apply(this,arguments);
		return merger(false,p.isDeep,p.target,p.list);
	};

	CF.apply=function(){
		var p=getP.apply(this,arguments);
		merger(true,p.isDeep,p.target,p.list);
	};

	CF.setName=function(obj){
		for (var key in obj) {
			var item= obj[key];
			if(typeof item == "function" && !item._name){
				item._name=key;
			}
		}
	};

	CF.extend=function(prototype,superClass){
		var _CLASS={};
		this.merger(_CLASS,superClass, prototype);
		_CLASS._super=superClass;
		_CLASS.callSuperMethod=function(){
			var caller=arguments.callee.caller;
			var method=caller._name;
			var arg=caller.arguments;
			return this._super[method].apply(this,arg);
		};
		return _CLASS;
	};

	CF.newInstance = function(prototype,superClass) {
		if(arguments.length>1){
			prototype=this.extend(prototype,superClass);
		}
		var CLASS=prototype.constructor;
		var obj=new CLASS();
		delete prototype.constructor;
		return this.merger(obj , prototype);
	};

	CF.extendEventListener=function(_instance){
		CF.merger(_instance,{
			addEventListener:function(type,handle){
				if(!this.events){
					this.events={};
				}
				var list=this.events[type];
				if(!list){
					list=[];
					this.events[type]=list;
				}
				list.push(handle);
			},
			removeEventListener:function(type,handle){
				var list=this.events[type];
				if(list){
					for(var i=0,len=list.length;i<len;i++){
						if(list[i]==handle){
							list.splice(i, 1);
							i--;
						}
					}
				}
			},
			triggerBeforeEvent:function(){
				var args;
				if(arguments.length==1){
					type=arguments[0];
					args = arguments.callee.caller.arguments;
					args = ArraySlice.call(args,0);
				}else{
					args = ArraySlice.call(arguments,1);
				}	
				var _fnName="on"+type.toFirstUpperCase();
				var _beforeFunction=this[_fnName+"Before"];
				if(_beforeFunction && _beforeFunction.apply(this,args)==false){
					return false;
				}
				return true;
			
			},
			triggerAfter:function(type){
				var args;
				if(arguments.length==1){
					type=arguments[0];
					args = arguments.callee.caller.arguments;
					args = ArraySlice.call(args,0);
				}else{
					args = ArraySlice.call(arguments,1);
				}
				var _fnName="on"+type.toFirstUpperCase();
				var _afterFunction=this[_fnName+"After"];
				if(_afterFunction && _afterFunction.apply(this,args)==false){
					return false;
				}
				return true;
			},
			trigger:function(type){
				if(!this.events){
					return;
				}
				var args;
				if(arguments.length==1){
					type=arguments[0];
					args = arguments.callee.caller.arguments;
					args = ArraySlice.call(args,0);
				}else{
					args = ArraySlice.call(arguments,1);
				}
				var list=this.events[type];
				if(list){
					for(var i=0,len=list.length;i<len;i++){
						var fn=list[i];
						if(fn.apply(this,args)==false){
							return;
						}
					}
				}
			},
			off : function(type){
				var _fnName="on"+type.toFirstUpperCase();
				delete this[_fnName+"Before"];
				delete this[_fnName];
				delete this[_fnName+"After"];
			},
			on : function(type){
				var args;
				if(arguments.length==1){
					type=arguments[0];
					args = arguments.callee.caller.arguments;
					args = ArraySlice.call(args,0);
				}else{
					args = ArraySlice.call(arguments,1);
				}	
				var _fnName="on"+type.toFirstUpperCase();
				var _beforeFunction=this[_fnName+"Before"];
				if(_beforeFunction && _beforeFunction.apply(this,args)==false){
					return false;
				}
				var _handleFunction=this[_fnName];
				if(_handleFunction && _handleFunction.apply(this,args)==false){
					return false;
				}
				var _afterFunction=this[_fnName+"After"];
				_afterFunction && _afterFunction.apply(this,args);
				return true;
			}
		});
	};


	window.ClassFactory=CF;
	window.CF=CF;
})();