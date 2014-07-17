(function(CF,jQuery,ui){

	var DragDrop=function(){
		this.callSuperMethod();
	};

	ui.extend(DragDrop,ui.widget,{
		_name_ : "DragDrop",
		statics:{
			css:{
				_c_dd_box: '-dd-resize-box'
			},
			getTemplate: function(config){
				ui.widget.applyCSS(config,this.css);
				config.arrowArray=['tl','tc','tr','lc','bg','rc','bl','bc','br'];
				var html=['<div class="',config._c_dd_box,'">'];
				$.it(config.arrowArray,function(index,item){
					this.push('<div class="',item,'"></div>');
				},html);
				/*
				<div class="tl"></div>
				<div class="tc"></div>
				<div class="tr"></div>
				<div class="lc"></div>
				<div class="bg"></div>
				<div class="rc"></div>
				<div class="bl"></div>
				<div class="bc"></div>
				<div class="br"></div>
				*/
				html.push('</div>');
				return html.join('');
			}
		},
		__EVENTNAMESPACE__ : '.DD' + $.randomChar(5),
		__M_RIGHT__ : 'R',
		__M_LEFT__ : 'L',
		__M_TOP__ : 'T',
		__M_BOTTOM__ : 'B',
		onRenderAfter:function(config){
			ui.logger(this);
			this.$resizebox=this.$elem;
			this.children=this.$resizebox.children();
			
			$.it(config.arrowArray,function(index,item){
				this['$'+item]=$(this.children[index]);
			},this);
			delete this.children;

			this.render=document.body;
			
			this.resizeIconSize = 8;

			this.offset={};

		},
		onBindEvent:function(){
			ui.logger(this);
			var events=['mousedown',''].join(this.__EVENTNAMESPACE__+' ');
			this.$bg.on(events,{
				me : this,
			},function(event){
				var me=event.data.me;
				me.config.event=event;
				me.dragstart(me.config);
			});
		},
		startListener:function(){
			ui.logger(this);
			var events=['selectstart','mouseup','mousemove',''].join(this.__EVENTNAMESPACE__+' ');
			$.getDoc().on(events,{
				me : this,
			},this.documentEventHandle);
		},
		stopListener:function(){
			ui.logger(this);
			$.getDoc().off(this.__EVENTNAMESPACE__);
		},
		documentEventHandle:function(event){
			ui.logger(this);
			return event.data.me.on(event.type,event);
		},
		onSelectstart:function(event){
			ui.logger(this);
			return false;
		},
		onMouseup:function(event){
			ui.logger(this);
			this.dragover();
		},
		onMousemove:function(event){
			ui.logger(this);
			var offset=this.offset;
			var x = event.pageX - offset.x;
			var y = event.pageY - offset.y;
			this.dragmove(x,y);
			offset.x = event.pageX;
			offset.y = event.pageY;
		},
		setResizeBox:function(){
			ui.logger(this);
			var width=this.$bg.width();
			var height=this.$bg.height();
			var l=(width-this.resizeIconSize)/2;
			var t=(height-this.resizeIconSize)/2;

			this.$tc.css("left",l);
			this.$bc.css("left",l);
			this.$lc.css("top",t);
			this.$rc.css("top",t);
		},
		showResizeBox:function(){
			ui.logger(this);
			var $target=this.config.$target;
			var width=$target.outerWidth();
			var height=$target.outerHeight();
			var offset=$target.offset();
			
			this.$resizebox.css({
				left : offset.left,
				top : offset.top,
				display : 'block'
			});

			this.$bg.css({
				width : width,
				height : width
			});

			this.setResizeBox();
		},
		hideResizeBox:function(){
			ui.logger(this);
			this.$resizebox.css({
				display : ''
			});
		},
		setConfig:function(config){
			ui.logger(this);
			if(!config.target){
				return false;
			}
			this.config=config;
			this.config.$target=$(config.target);
			return true;
		},
		show : function(config){
			ui.logger(this);
			if(this.setConfig(config)){
				this.showResizeBox();
			}
		},
		hide : function(){
			ui.logger(this);
			if(this.config){
				this.hideResizeBox();
				this.config=null;
			}
		},
		getPoint:function(x,y){
			ui.logger(this);
			var $parentBox=$(this.config.parentBox),
				$target=this.config.$target,
				maxWidth=$parentBox.width(),
				maxHeight=$parentBox.height(),
				offset=$target.point(),
				_l=offset.left,
				_t=offset.top,
				_w=$target.outerWidth(),
				_h=$target.outerHeight();

			if(x==this.__M_RIGHT__){
				x=-maxWidth;
			}else if(x==this.__M_LEFT__){
				x=maxWidth;
			}else if(y==this.__M_TOP__){
				y=-maxHeight;
			}else if(y==this.__M_BOTTOM__){
				y=maxHeight;
			}


			if( _l + x < 0 ){
				x = - _l;
			}else if( _l + _w +  x > maxWidth ){
				x = maxWidth - _l -  _w;
			}
			
			if( _t + y < 0 ){
				y = - _t;
			}else if( _t + _h + y > maxHeight ){
				y = maxHeight - _t - _h;
			}
			
			return {
				x : x,
				y : y
			};
		},
		dragstart : function(config){
			ui.logger(this);
			if(!this.setConfig(config)){
				return;
			}
			if(this.config.type=='resize'){
				this.showResizeBox();
			}else{
				this.hideResizeBox();
			}
			
			this.offset.x = config.event.pageX;
			this.offset.y = config.event.pageY;

			this.startListener();
		},
		dragmove : function(x,y){
			ui.logger(this);
			var point=null;
			var config=this.config;
			var offset=this.$resizebox.offset();

			if(!config.parentBox){
				point={
					x : x,
					y : y
				};
			}else{
				point=this.getPoint(x,y);
			}
			
			if(point.x==0 && point.y==0){
				return;
			}

			this.$resizebox.css({
				left : offset.left + point.x,
				top : offset.top + point.y
			});

			if(config.setOffset){
				config.setOffset(point);
			}else{
				offset=config.$target.point();
				config.$target.css({
					left : offset.left + point.x,
					top : offset.top + point.y
				});
			}
		},
		dragover : function(){
			ui.logger(this);
			this.stopListener();
		}
	});

	var instance;

	function getInstance(){
		if(!instance){
			instance=new DragDrop({});
		}
		return instance;
	};

	ui.dragdrop={
		resize : function(){
		},
		dragstart : function(config){
			getInstance().dragstart(config);
		}
	};

	CF.merger(ui.dragdrop.resize,{
		setRender:function(render){
			if(getInstance().render==render){
				return;
			}
			getInstance().$elem.appendTo(render);
			getInstance().render=render;
		},
		show : function(config){
			getInstance().show(config);
		},
		hide : function(){
			getInstance().hide();
		}
	});
	
	ui.dragdrop.replace={
		getInstance:function(config){
			return{
				config:config,
				show:function(){
					getInstance().show(this.config);
				},
				hide:function(){
					getInstance().hide(this.config);
				},
				drag:function(){
					getInstance().drag(this.config);
				},
				setBody : function(html){
				
				},
				remove : ui.widget.remove
			};
		},
		setRender:function(render){
			if(instance.render==render){
				return;
			}
			instance.$elem.appendTo(render);
			instance.render=render;
		}
	};
	

})(CF,jQuery,ui);