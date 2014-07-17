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
			//this.$link=this.$resizebox.children();
			this.children=this.$resizebox.children();
			
			$.it(config.arrowArray,function(index,item){
				this['$'+item]=$(this.children[index]);
			},this);
			delete this.children;

			this.render=document.body;
			
			this.resizeIconSize = 8;

			this.offset={};

		},
		startContentListener:function(){
			ui.logger(this);
			var events=['selectstart','mouseup','mousemove',''].join(this.__EVENTNAMESPACE__+' ');
			$.getDoc().on(events,{
				me : this,
			},function(event){
				return event.data.me.on(event.type,event);
			});
		},
		stopContentListener:function(){
			ui.logger(this);
			$.getDoc().off(this.__EVENTNAMESPACE__);
		},
		startListener:function(){
			ui.logger(this);
			var events=['keydown',''].join(this.__EVENTNAMESPACE__+' ');
			this.$bg[0].contentEditable=true;
			this.$bg.on(events,{
				me : this,
			},function(event){
				event.data.me.on('keypress',event);
				return false;
			});
		},
		stopListener:function(){
			ui.logger(this);
			this.$bg[0].contentEditable=false;
			this.$bg.off(this.__EVENTNAMESPACE__);
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
		onKeypress:function(event){
			ui.logger(this);
			var _min=1,
				_max=10,
				x=y=0,
				shiftKey=event.shiftKey,
				ctrlKey=event.ctrlKey,
				altKey=event.altKey,
				keyCode=event.keyCode;
			switch(keyCode){
				//left
				case  37 :
					if(shiftKey && altKey){
						x=this.__M_LEFT__;
					}else if(shiftKey){
						x=-_max;
					}else{
						x=-_min;
					}
					break;
				//up
				case  38 :
					if(shiftKey && altKey){
						y=this.__M_TOP__;
					}else if(shiftKey){
						y=-_max;
					}else{
						y=-_min;
					}
					break;
				//rigth
				case  39 :
					if(shiftKey && altKey){
						x=this.__M_RIGHT__;
					}else if(shiftKey){
						x=_max;
					}else{
						x=_min;
					}
					break;
				//down
				case  40 :
					if(shiftKey && altKey){
						y=this.__M_BOTTOM__;
					}else if(shiftKey){
						y=_max;
					}else{
						y=_min;
					}
					break;
				default:
					return;
			}
			this.dragmove(x,y);
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
		showResizeBox:function(config){
			ui.logger(this);
			if(this.setConfig(config)==false){
				return;
			}
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

			this.$bg.focus();

			var events=['mousedown',''].join(this.__EVENTNAMESPACE__+' ');
			this.$resizebox.on(events,{
				me : this,
			},function(event){
				var me=event.data.me;
				me.config.event=event;
				me.dragstart(me.config);
			});
		},
		hideResizeBox:function(){
			ui.logger(this);
			this.$resizebox.css({
				display : ''
			});
			this.$resizebox.off(this.__EVENTNAMESPACE__);
		},
		setConfig:function(config){
			ui.logger(this);
			if(this.config && config && this.config.target==config.target){
				return;		
			}else if(this.config){
				this.config.$target.removeClass('dragdrop-target');
				this.config=null;					
			}
			if(config==null){
				this.stopListener();
				return false;
			}
			this.config=config;
			this.config.$target=$(config.target);
			if(this.config.parentBox){
				this.startListener();
			}
			this.config.$target.addClass('dragdrop-target');
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
				x=maxWidth;
			}else if(x==this.__M_LEFT__){
				x=-maxWidth;
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
		hide:function(){
			ui.logger(this);
			if(this.config.type=='resize'){
				this.hideResizeBox();
			}
			this.setConfig(null);
		},
		dragstart : function(config){
			ui.logger(this);
			if(this.setConfig(config)==false){
				return;
			}
			if(this.config.type!='resize'){
				this.hideResizeBox();
			}
			
			this.offset.x = config.event.pageX;
			this.offset.y = config.event.pageY;

			delete config.event;

			this.startContentListener();
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

			if(this.config.type=='resize'){
				this.$resizebox.css({
					left : offset.left + point.x,
					top : offset.top + point.y
				});
			}

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
			this.stopContentListener();
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
		},
		move : function(config){
		},
		sort : function(config){
		},
		replace : function(config){
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
		dragstart:function(config){
			this.show(config);
			getInstance().dragstart(config);
		},
		show : function(config){
			config.type='resize';
			getInstance().showResizeBox(config);
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