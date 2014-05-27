(function(CF,$,ui){
"use strict";
//.replace(/\s?sale-grid5\s?/gi," ")
	
	var htmlfilter={};
 

	htmlfilter.filter=function(allRule,elem){
		if(!elem){
			return;
		}

		for(var key in allRule){
			var keys=key.trim().replace(/\s+/g," ").split(" ");
			var len=keys.length;
			if(len>1){
				var tagRule=allRule[key];
				for(var i=0;i<len;i++){
					var _key=keys[i];
					var _rule=allRule[_key];
					if(typeof tagRule == "function"){
						tagRule={
							handle:tagRule
						};
					}
					if(typeof _rule == "function"){
						_rule={
							handle:_rule
						};
					}
					allRule[_key]=$.extend({},tagRule,_rule);
				}
				delete allRule[key];
			}
		}
		filterChildren(allRule,elem);
	};

	function filterChildren(allRule,elem){
		var childNodes=elem.childNodes;
		for(var len=childNodes.length-1;len>=0;len--){
			filterElement(allRule,childNodes[len]);
		}
	}

	function filterElement(allRule,elem){
		if(!elem){
			return;
		}
		if(elem.firstChild){
			filterChildren(allRule,elem);
		}
		var nodeName=elem.nodeName.toLowerCase();

		var removes=allRule['@remove'];
		if(removes){
			for(var n=0,_len=removes.length;n<_len;n++){
				var _name=removes[n];
				var reg = new RegExp(_name, 'gi');
				if(reg.test(nodeName)){
					$(elem).remove();
					return;
				}
			}
		}

		var tagRule=allRule[nodeName];
		var publicRule=allRule['*'];
		var _tagRule=tagRule;

		if(publicRule){
			if(tagRule){
				_tagRule=$.extend({},publicRule,tagRule);
			}else{
				_tagRule=publicRule;
			}
		}

		if(_tagRule && filterTag(_tagRule,elem)==false){
			return;
		}
		
		if(elem.nodeType==1){
			if(!tagRule){
				var other=allRule['^'];
				if(other && filterTag(other,elem)==false){
					return;
				}
			}
			if(elem.innerHTML==""){
				$(elem).remove();
			}
		}
	};

	htmlfilter.HtmlConverterPlainText= function(isBreakLine){
		isBreakLine = isBreakLine == false ? isBreakLine : true;

		var nodeName=this.nodeName.toLowerCase();
		if(nodeName=="br"){
			return;
		}
		var $target=$(this);
		if(this.innerHTML==""){
			$target.remove();
			return;
		}
		if(isBreakLine){
			var previous=this.previousSibling;
			if(nodeName=="div" && previous && (previous.nodeType==1 || previous.nodeType==3)){
				$target.before("<br/>");
			}
		}
		var childNodes=this.childNodes;
		var elem=$target;
		for(var len=childNodes.length-1;len>=0;len--){
			var node=$(childNodes[len]);
			elem.before(node);
			elem=node;
		}
		if(isBreakLine){
			var next=this.nextSibling;
			if(next && (next.nodeType==1 || next.nodeType==3)){
				$target.after("<br/>");
			}
		}
		$target.remove();
	};

	htmlfilter.UnitConverter=function(name){
		var value=$.style(this,name);
		if(/px/i.test(value)){
			return;
		}
		if(/pt/i.test(value)){
			value=parseFloat(value.replace("pt",""));
			value=value * 1/72 * 96;
		}else if(/em/i.test(value)){
			value=parseFloat(value.replace("em",""));
			value=value * 16;
		}
		value=parseInt(value) + "px";
		$.style(this,name,value);
		return value;
	};


	htmlfilter.tagReplace=function(name){
		return function(){
			var elem=document.createElement(name);
			var $target=$(this);
			$target.before(elem);
			$target.appendTo(elem);
			var childNodes=this.childNodes;
			var node=this;
			for(var len=childNodes.length-1;len>=0;len--){
				var _node=childNodes[len];
				$(node).before(_node);
				node=_node;
			}
			$target.remove();
		};
	};

	htmlfilter.ColorConverter=function(name){
		var value=$.style(this,name);
		if(/#/.test(value)){
			return;
		}
		if(/rgb/i.test(value)){
			var rgbs=value.match(/\d+/g);
			var r=parseInt(rgbs[0]);
			var g=parseInt(rgbs[1]);
			var b=parseInt(rgbs[2]);
			value="#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
		}else if(/hsla/i.test(value)){
			
		}else{
			return;
		}
		this.style[name]=value;
		return value;
	};

	function filterTag(tagRule,elem){
		if(!tagRule){
			return;
		}
		if(typeof tagRule == "function"){
			return tagRule.call(elem);
		}

		var nodeType=elem.nodeType;

		if(nodeType==1){
			
			var styleRule=tagRule.style;
			var classRule=tagRule.class;
			var removes=tagRule["@remove"];
			var keeps=tagRule["@keep"];

			if(styleRule && filterStyle(styleRule,elem)==false){
				return;
			}else if(classRule && filterClass(classRule,elem)==false){
				return;
			}else if(removes){
				removeAttr(elem,elem.attributes,removes,function(_elem,attrName){
					$.removeAttr(_elem,attrName);
				});
			}else if(keeps){
				keepAttr(elem,elem.attributes,keeps,function(_elem,attrName){
					$.removeAttr(_elem,attrName);
				});
			}
		

			var attrHandleList={};
			var isEmpty=true;
			for(var attrName in tagRule){
				if(typeof tagRule[attrName] == "function"){
					attrHandleList[attrName]=tagRule[attrName];
					isEmpty=false;
				}
			}

			if(isEmpty==false){
				handleAttr(elem,attrHandleList,elem.attributes);
			}

		}

		if(typeof tagRule.handle == "function"){
			return tagRule.handle.call(elem);
		}
	};

 	function handleAttr(elem,handleList,attrs){
		for (var handleName in handleList){
			for(var len=attrs.length-1;len>=0;len--){
				var attr=attrs[len];
				var attrName=attr.nodeName||attr;
				var reg = new RegExp(handleName, 'gi');
				if(reg.test(attrName)){
					handleList[handleName].call(elem,attrName,attr);
				}
			}
		}
	};

	//$.removeAttr(document.body,"class");

	function filterStyle(rule,elem){
		if(elem.style.length>0){
			var attrHandleList={};
			var isEmpty=true;
			for(var attrName in rule){
				if(typeof rule[attrName] == "function"){
					attrHandleList[attrName]=rule[attrName];
					isEmpty=false;
				}
			}
			if(isEmpty==false){
				handleAttr(elem,attrHandleList,elem.style);
			}
			var result=filterAttr(rule,elem,elem.style,function(_elem,attrName){
				$.style(_elem,attrName,"");
			});
			var cssText=elem.style.cssText;
			if(cssText==""){
				$.removeAttr(elem,"style");
			}else{
				$.attr(elem,"style",elem.style.cssText);
			}

			return result;
		}
	};

	
	function filterClass(rule,elem){
		if(elem.className.length>0){
			var result=filterAttr(rule,elem,elem.classList,function(_elem,attrName){
				_elem.classList.remove(attrName);
			});
			if(elem.className==""){
				$.removeAttr(elem,"class");
			}
			return result;
		}
	};


	function filterAttr(rule,elem,array,handle){
		var removes=rule["@remove"];
		var keeps=rule["@keep"];
		if(removes){
			removeAttr(elem,array,removes,handle);
		}else if(keeps){
			keepAttr(elem,array,keeps,handle);
		}
	
		var _handle=rule.handle;
		if(_handle && typeof _handle == "function"){
			return _handle.call(elem);
		}
	};


	function removeAttr(elem,attrs,removes,handle,invalid){
		for(var len=attrs.length-1;len>=0;len--){
			var attr=attrs[len];
			var attrName=attr.nodeName || attr;
			for(var n=0,_len=removes.length;n<_len;n++){
				var reg = new RegExp(removes[n], 'gi');
				if(reg.test(attrName)){
					if(handle.call(elem,elem,attrName)==false && invalid){
						return false;
					}
					break;
				}
			}
		}
	};

	function keepAttr(elem,attrs,keeps,handle,invalid){
		for(var len=attrs.length-1;len>=0;len--){
			var attr=attrs[len];
			var attrName=attr.nodeName || attr;
			var isRemove=true;
			for(var n=0,_len=keeps.length;n<_len;n++){
				var reg = new RegExp(keeps[n], 'gi');
				if(reg.test(attrName)){
					isRemove=false;
					break;
				}
			}
			if(isRemove){
				if(handle.call(elem,elem,attrName)==false  && invalid){
					return false;
				}
			}
		}
	};




	var ruleFilter={
		"*":{
			style:{
				display : function(name,attr){
					if(this.style[name]=="none"){
						$(this).remove();
					}
				},
				"padding": htmlfilter.UnitConverter,
				"@remove":["font","position","margin","line-height","border","background"]
			},
			class:{
				"@remove" : ["hide","mso"]
			},
			"@keep" : ["name","class","style","src"]
		},
		a:{
			href : function(name,attr){
				if(this.href.indexOf("taobao.com")==-1){
					this.href="";
				}
			}
		},
		span:{
			handle : function(){
				if(this.innerHTML==""){
					$(this).remove();
				}
			}
		},
		div:{
			style:{
				"text-indent" : htmlfilter.UnitConverter,
				"@remove":["text-align","font-family"]
			}
		},
		p : htmlfilter.HtmlConverterPlainText,
		"@remove" : ["input","button","iframe","style","script","#comment",":"]
	};
	

	var reg2={
			"^" : {
				handle : function(){
					htmlfilter.HtmlConverterPlainText.call(this,false);
				}
			},
			"*" : {
				style : {
					display:function(){
						if(this.style[name]=="none"){
							$(this).remove();
						}
					}
				},
				"@keep":[]
			},
			"table th tr td ":{
				"@keep":[]
			},
			"table" : {
				handle : function(){
					this.style.cssText="border: 1px solid #111;border-collapse: collapse;";
					this.border="1";
					return false;
				},
				"@keep":[]
			},
			"a span" : function(){
				htmlfilter.HtmlConverterPlainText.call(this,false);
			},
			"br" : function(){
				return false;
			},
			"li p div h1 h2 h3 h4 h5 h6" : htmlfilter.HtmlConverterPlainText,
			"b":htmlfilter.tagReplace("strong"),
			"@remove" : ["img","input","button","iframe","style","script","#comment",":"]
		};

	ui.htmlfilter=htmlfilter;

})(CF,$,ui);