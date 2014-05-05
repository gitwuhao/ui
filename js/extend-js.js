(function(jQuery){ 



	(function(){
		var doc;
		jQuery.getDoc=function(){
			if(!doc){
				doc=jQuery(document);
			}
			return doc;
		};
		
		var body;
		jQuery.getBody=function(){
			if(!body){
				body=jQuery(document.body || document.getElementsByTagName("body")[0] || document.documentElement);
			}
			return body;
		};
		
		var head;
		jQuery.getHead=function(){
			if(!head){
				head=jQuery(document.head || document.getElementsByTagName("head")[0] || document.documentElement);
			}
			return head;
		};

	})();


	var _hoverEvents={
		mouseover : function (event) {
			var el=jQuery(this);
			if(el.is(".selected")==false && el.is(".disabled")==false){
				el.addClass("hover");
			}
		},
		mouseout: function (event) {
			jQuery(this).removeClass("hover");
		}
	};

	(function(){
		jQuery.Event.prototype.stopBubble=function(){
			jQuery.getDoc().trigger(this.type);
			this.preventDefault();
			this.stopPropagation();
		};
		
	})();

	jQuery.extend(jQuery.fn, {
		//superClass:jQuery.fn,
		/**样式替换*/
		replaceClass : function(c1, c2) {
			return this.filter('.' + c1).removeClass(c1).addClass(c2).end();
		},
		html2Text: function() {
			return this.html().html2Text();
		},
		text2Html: function() {
			return this.val().text2Html();
		},
		valueTrim:function(){
			return jQuery.trim(this.val());
		},
		getMarginLeft:function(){
			return parseFloat(this.css("margin-left").replace("px"));
		},
		getMarginTop:function(){
			return parseFloat(this.css("margin-top").replace("px"));
		},
		getMarginRight :function(){
			return parseFloat(this.css("margin-right ").replace("px"));
		},
		getMarginBottom:function(){
			return parseFloat(this.css("margin-bottom").replace("px"));
		},
		getBoxInnerHeight:function(){
			return this.height() - (this.outerHeight()-this.innerHeight());
		},
		getBoxInnerWidth:function(){
			return this.width() - (this.outerWidth()-this.innerWidth());
		},
		bindHover :  function(){
			this.bind(_hoverEvents);
		},
		bindChildrenHover :  function(selector){
			selector=selector||"div";
			this.children(selector).bind(_hoverEvents);
		},
		checked:function(element){
			function unChecked(index,dom){
				if(dom.disabled==false){
					dom.checked=false;
				}
			}
			if(element){
				if(jQuery.isString(element)){
					this.each(function(index,dom){
						if(dom.value==element){
							dom.checked=true;
						}else{
							dom.checked=false;
						}
					});
				}else{
					this.each(unChecked);
					element.checked=true;
				}
			}else if(this.length==1){
				jQuery(":checkbox[name='"+this.attr("name")+"']").each(unChecked);
				this[0].checked=true;
			}
		},
		enabled : function(){
			if(this.length==1){
				this.removeClass("disable");
				this[0]._isDisable=false;
			}
		},
		disabled : function(){
			if(this.length==1){
				this.addClass("disable");
				this[0]._isDisable=true;
			}
		},
		isDisabled:function(){
			if(this.length==1){
				return this[0]._isDisable;
			}
			return false;
		},
		toList:function(){
			var list=[];
			var _cLen=this.length;
			for(var i=0;i<_cLen;i++){
				list.push(jQuery(this[i]));
			}
			return list;
		},
		point:function(){
			var el=this[0];
			var offsetParent=el.offsetParent;
			if(offsetParent && offsetParent.offsetLeft==0){
				return this.offset();
			}
			var left=el.offsetLeft;
			var top=el.offsetTop;
			return {
				left : left,
				top : top
			};
		},
		offsetElement : function(parent){
			function getParentOffset(elem,_parent){
				var offset={
					left : elem.offsetLeft,
					top : elem.offsetTop
				};
				var offsetParent=elem.offsetParent;
				if(offsetParent!=null && _parent!=offsetParent){
					var _offset=getParentOffset(offsetParent,_parent);
					offset.left+=_offset.left;
					offset.top+=_offset.top;
				}
				return {
					left : offset.left,
					top : offset.top
				};
			}
			return getParentOffset(this[0],parent);
		},
		offsetBody : function(){
			function getParentOffset(elem){
				var offset={
					left : elem.offsetLeft,
					top : elem.offsetTop
				};
				if(!/body|html/i.test(elem.nodeName) && elem.offsetParent!=null ){
					var _offset=getParentOffset(elem.offsetParent);
					offset.left+=_offset.left;
					offset.top+=_offset.top;
				}
				return {
					left : offset.left,
					top : offset.top
				};
			}
			return getParentOffset(this[0]);
		},
		poffset:function(){
			var p=this.offsetParent().offset();
			var offset=this.offset();
			if(p.left!=0){
				offset.left=p.left-offset.left;
			}
			if(p.top!=0){
				offset.top=p.top-offset.top;
			}
			return offset;
		},
		replaceNode:function(element){
			var el=this[0];

			if(el.nodeName.toLowerCase()!="td"){
				var parentNode=el.parentNode;
				var next=jQuery.getNextNode(el);
				
				var elementParentNode=element.parentNode;
				var nodeNext=jQuery.getNextNode(element);
				
				if(next){
					parentNode.insertBefore(element,next);
				}else {
					parentNode.appendChild(element);
				}
				if(nodeNext){
					elementParentNode.insertBefore(el,nodeNext);
				}else{
					elementParentNode.appendChild(el);
				}
			}else{

				var list=jQuery(el).children();
				var newList=jQuery(element).children();

				var len=list.length;
				for(var i=0;i<len;i++){
					element.appendChild(list[i]);
				}

				var len=newList.length;
				for(var i=0;i<len;i++){
					el.appendChild(newList[i]);
				}
			}
		}
	});

	(function(){

		var _core_rnotwhite_ = /\S+/g;

		jQuery.addClass=function(elem,className){
			if(!elem){
				return;
			}
			var _curClassName_=elem.className;
			if(_curClassName_){
				_curClassName_=" "+_curClassName_+" ";
				var _cArray=className.match(_core_rnotwhite_);
				for(var i=0,len=_cArray.length;i<len;i++){
					var clazz=_cArray[i];
					if(_curClassName_.indexOf(" "+clazz+" ") < 0){
						_curClassName_ += clazz + " ";
					}
				}
			}else{
				_curClassName_=className;
			}

			elem.className = jQuery.trim( _curClassName_ );
		};
		
		jQuery.removeClass=function(elem,className){
			if(!elem){
				return;
			}
			var _curClassName_=elem.className;
			if(_curClassName_){
				_curClassName_=" "+_curClassName_+" ";
				var _cArray=className.match(_core_rnotwhite_);
				for(var i=0,len=_cArray.length;i<len;i++){
					var clazz=_cArray[i];
					if(_curClassName_.indexOf(" "+clazz+" ") >= 0){
						_curClassName_ = _curClassName_.replace( " " + clazz + " ", " " );
					}
				}
				elem.className = jQuery.trim( _curClassName_ );
			}
		};

		jQuery.toggleClass=function(elem,className){
			if(!elem){
				return;
			}
			var _curClassName_=elem.className;
			if(_curClassName_){
				_curClassName_=" "+_curClassName_+" ";
				var _cArray=className.match(_core_rnotwhite_);
				for(var i=0,len=_cArray.length;i<len;i++){
					var clazz=_cArray[i];
					if(_curClassName_.indexOf(" "+clazz+" ") < 0){
						_curClassName_ += clazz + " ";
					}else{
						_curClassName_ = _curClassName_.replace( " " + clazz + " ", " " );
					}
				}
			}else{
				_curClassName_=className;
			}

			elem.className = jQuery.trim( _curClassName_ );
		};
	})();

	jQuery.getWinSize=function(){
		return {
			doc:{
				w:document.width,
				h:document.height
			},
			body:{
				w:document.body.offsetWidth,
				h:document.body.offsetHeight
			},
			win:{
				ow:window.outerWidth,
				oh:window.outerHeight,
				iw:window.innerWidth,
				ih:window.innerHeight
			}
		};
	};

	jQuery.getNextNode=function(node){
		node=node.nextSibling;
		for ( ; node; node = node.nextSibling) {
			if ( node.nodeType === 1){
				return node;
			}
		}
		return null;
	};

	jQuery.getTDList=function(table){
		var list=[];
		if(!table.nodeName){
			table=table[0];
		}
		var rows=table.rows;
		var rLen=rows.length;
		for(var i=0;i<rLen;i++){
			var cells=rows[i].cells;
			var cLen=cells.length;
			for(var n=0;n<cLen;n++){
				list.push(cells[n]);
			}	
		}
		return list;
	};

	
	
	(function(){
		
		jQuery.getDoc().keydown(function(event){
			if(event.keyCode==8 && event.target.nodeName.toLowerCase()=="body"){
				return false;
			}
		});

		var isDisabledRightButton=false;
		jQuery.disabledRightButton=function(){
			if(isDisabledRightButton){
				return;
			}
			jQuery.getDoc().on("contextmenu",function(event){
				return false;
			});
			isDisabledRightButton=true;
		};
	})();


	jQuery.unloadMsg="确认要离开此页吗？";
	jQuery.unloadAlert=function(callback){
		window.onbeforeunload = function(){
			window.beforeUnLoadState=true;
			if(callback){
				callback();
			}
			if(jQuery.unloadMsg!='' && jQuery.unloadMsg!=null ){
				return jQuery.unloadMsg;
			}else{
				return;
			}
		};		
	};



	var s=window.s || {};
	

	jQuery.includePack =s.includePack || function(type, src,callback) {
		var pack = null;
		if(!src){
			return;
		}
		var head = jQuery.getHead()[0];
		if (type == "css") {
			pack = document.createElement("link");
			pack.rel="stylesheet";
			pack.type="text/css";
			pack.href = src;
			
		} else if (type == "javascript"  || type == "js") {
			pack = document.createElement("script");
			if(pack.async){
				pack.async = "async";
			}
			pack.type="text/javascript";
			pack.src=src;
		}
		if (pack) {
			head.insertBefore(pack, head.lastChild);
			if(callback){
				pack.onload = pack.onreadystatechange = function( _, isAbort ) {
					if ( isAbort || !pack.readyState || /loaded|complete/.test( pack.readyState ) ) {
						pack.onload = pack.onreadystatechange = null;
						pack = undefined;
						if ( !isAbort && callback ) {
							callback( 200, "success" );
						}
					}
				};
			}
			return 1;
		}
		return 0;
	};
	
	jQuery.loadJSQueue=s.loadJSQueue || function(js1,js2,js3,callback){
		var list=arguments;
		var len=arguments.length-1;
		var i=0;
		function get(){
			if(i==len){
				var fn=list[len];
				if(typeof fn=="function"){
					fn();
				}else{
					jQuery.includePack("js",fn);
				}
				return;
			}
			var url=list[i++];
			if(url){
				jQuery.includePack("js",url,get);
			}
		}
		get();
	};

	(function(){
		function execute(callback){
			if(callback()==false || callback.timer>50000){
				return;
			}
			callback.timer += 1000;
			setTimeout(function(){
				execute(callback);
			},callback.timer);		
		};

		jQuery.schedule=function(callback){
			callback.timer=1000;
			execute(callback);
		};
	})();
	
	jQuery.getParam=function (){
		var search=window.location.search;
		var _param={};
		if(/^\?/.test(search)){
			search=search.replace(/^\?/,"");
			var ps=search.split("&");
			for(var i=0;i<ps.length;i++){
				var s=ps[i].split("=");
				var value;
				if(s.lenght==1){
					value="";
				}else{
					value=decodeURIComponent(s[1]);
				}
				_param[s[0]]=value;
			}
		}
		return _param;
	};

	
	jQuery.it =jQuery.iterator = function(array, callback) {
		if (!callback) {
			return;
		}
		if(array.length){
			var size = array.length;
			for ( var i = 0; i < size; i++) {
				// 如果返回false停止执行
				if (callback(i, array[i]) === false) {
					return;
				}
			}
		}else if (array.length==0){
			return;
		}else{
			for (var key in array) {
				// 如果返回false停止执行
				if (callback(key, array[key]) === false) {
					return;
				}
			}
		}
	};

	(function(){
		var div=document.createElement("div");
		
		jQuery.createElement= function(html){
			div.innerHTML=html;
			var list=[];
			var children=div.children;
			var size = children.length;
			for (var i = 0; i < size; i++) {
				var item=children[i];
				list.push(item);
			}

			if(list.length==1){
				return list[0];
			}
			return list;
		};

		jQuery.appendElement= function(html,content){
			if(!html){
				return null;
			}
			div.innerHTML=html;
			var c=content||jQuery.getBody()[0];
			if(c.jquery){
				c=c[0];
			}
			var list=[];
			var children=div.children;
			var size = children.length;
			for (var i = 0; i < size; i++) {
				var item=children[0];
				c.appendChild(item);
				list.push(item);
			}

			if(list.length==1){
				return list[0];
			}
			return list;
		};
	
	})();

	Function.prototype._isFunction_ = true;
	String.prototype._isString_ = true;
	Array.prototype._isArray_ = true;
	Date.prototype._isDate_ = true;

	jQuery.isString=function(obj){
		return (obj && obj._isString_) || false;
	};

	jQuery.isElement = function(obj) {
		return (obj && obj.nodeType != undefined && obj.nodeType != 3);
	};

	jQuery.isCss=function(className,element){
		if(className.length>0){
			var css=element.className.split(" ");
			var len=css.length||0;
			for(var i=0;i<len;i++){
				if(css[i]==className){
					return true;
				}
			}
		}
		return false;
	};
	
	jQuery.random=function(){
		return (Math.random()+"").replace( /\D/g, "" );
	};

	jQuery.timestamp=function(){
		return Date.now();
	};

	jQuery.hexToRGB=function(hex) {
		// Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
		var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
		hex = hex.replace(shorthandRegex, function(m, r, g, b) {
			return r + r + g + g + b + b;
		});
		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result ? {
			r: parseInt(result[1], 16),
			g: parseInt(result[2], 16),
			b: parseInt(result[3], 16)
		} : null;
	};

	jQuery.rgbToHex=function (r, g, b) {
		return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
	};

	String.prototype.trimRN=function(){
		return this.replace(/\r|\n/gm,"");
	};

	String.prototype.replaceAll  = function(s1,s2){   
		return this.replace(new RegExp(s1,"gm"),s2);
	};
	
	String.prototype.parseJSON  = function(){   
		return (new Function("","return "+this))();
	};
	
	String.prototype.getList  = function(){
		return this.split(",");
	};
	
	String.prototype.html2Text = function() {
			return this.replaceAll("&nbsp;"," ");
	};
	
	String.prototype.text2Html = function() {
			return this.replaceAll(" ","&nbsp;");
	};

	String.prototype.trimBreakLine = function() {
		return this.replace(/\n\s+/gm,"").replace(/\s+/gm," ");
	};

	String.prototype.encodeHTML = function() {
		return this.replaceAll("'","&#39;").trimBreakLine();
	};

	String.prototype.decodeHTML = function() {
		return this.replaceAll("&#39;","'");
	};
	
	String.prototype.toFirstUpperCase=function(){
		return this.replace(/^./g, function (match) {
			return match.toUpperCase();
		});
	};

    String.prototype.unhtml=function () {
        return this.replace(/[&<\">\'](?:(amp|lt|quot|gt|#39|nbsp);)?/g, function (a, b) {
            if (b) {
                return a;
            } else {
                return {
                    '<':'&lt;',
                    '&':'&amp;',
                    '"':'&quot;',
                    '>':'&gt;',
                    "'":'&#39;'
                }[a]
            }
        });
    };

    String.prototype.html=function () {
        return this.replace(/&((g|l|quo)t|amp|#39);/g, function (m) {
            return {
                '&lt;':'<',
                '&amp;':'&',
                '&quot;':'"',
                '&gt;':'>',
                '&#39;':"'"
            }[m]
        });
    };

	if(!String.prototype.trim){
		String.prototype.trim=function(){
			return this.replace( /^\s+/, "" ).replace(/\s+$/, "" );
		};
	}

	Date.prototype.format = function(f) {
		var format=f||'yyyy-MM-dd hh:mm:ss';
		var o = {
			"M+" : this.getMonth() + 1,
			"d+" : this.getDate(),
			"h+" : this.getHours(),
			"m+" : this.getMinutes(),
			"s+" : this.getSeconds(),
			"q+" : Math.floor((this.getMonth() + 3) / 3),
			"S" :  this.getMilliseconds()
		};
		if (/(y+)/.test(format)){
			format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		}
		for (var k in o){
			if (new RegExp("(" + k + ")").test(format)){
				format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
			}
		}
		return format;
	};


}(jQuery));

