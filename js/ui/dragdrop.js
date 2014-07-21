(function(CF,jQuery,ui){

	var DragDrop=function(){
		this.callSuperMethod();
	};

	ui.extend(DragDrop,ui.widget,{
		_name_ : "DragDrop",
		statics:{
			css:{
				_c_dd_resize: '-dd-resize',
				_c_dd_box: '-dd-resize-box'
			},
			getTemplate: function(config){
				ui.widget.applyCSS(config,this.css);
				//'tl','tc','tr','lc','bg','rc','bl','bc','br'
				config.arrowArray=['nw','n','ne','w','bg','e','sw','s','se'];
				var html=['<div class="',config._c_dd_box,'">'];
				$.it(config.arrowArray,function(index,item){
					this.push('<div class="',item,'"></div>');
				},html);
				html.push('</div>');
				return html.join('');
			},
			disabledUserSelect:function(){
				var style=document.body.style;
				style.webkitUserSelect='none';
			},
			enabledUserSelect:function(){
				var style=document.body.style;
				style.webkitUserSelect='';
			}
		},
		__EVENTNAMESPACE__ : '.DD' + $.randomChar(5),
		__M_RIGHT__ : 'R',
		__M_LEFT__ : 'L',
		__M_TOP__ : 'T',
		__M_BOTTOM__ : 'B',
		__MIN_SIZE__ : 50,
		onRenderAfter:function(config){
			ui.logger(this);
			this.$resizebox=this.$elem;
			this.children=this.$resizebox.children();

			$.it(config.arrowArray,function(index,item){
				var elem=this.children[index];
				this['$'+item]=$(elem);
				$.data(elem,{
					resizeType : item
				});
			},this);
			delete this.children;

			this.render=document.body;

			this.resizeIconSize = 8;

			this.offset={};

		},
		bindContentEvent:function(){
			ui.logger(this);
			var events=['mouseup','mousemove',''].join(this.__EVENTNAMESPACE__+' ');
			$.getDoc().on(events,{
				me : this,
			},function(event){
				return event.data.me.on(event.type,event);
			});
		},
		unbindContentEvent:function(){
			ui.logger(this);
			$.getDoc().off(this.__EVENTNAMESPACE__);
		},
		onSelectstart:function(event){
			ui.logger(this);
			return false;
		},
		bindKeyPress:function(){
			ui.logger(this);
			var events=['keydown',''].join(this.__EVENTNAMESPACE__+' ');
			$.getBody().on(events,{
				me : this,
			},function(event){
				event.data.me.on('keypress',event);
				return false;
			});
		},
		unbindKeyPress:function(){
			ui.logger(this);
			$.getBody().off(this.__EVENTNAMESPACE__);
		},
		resizeBoxMouseDown:function(event){
			ui.logger(this);
			var x=event.pageX,
				y=event.pageY,
				target=event.target,
				className=target.className,
				type=null;

			this.config.event=event;

			if(/bg/i.test(className)){
				this.on('dragstart',x,y);
			}else{
				var type=$.data(target,'resizeType');
				this.resizeConfig={
					$target : $(target),
					type : type
				};
				this.on('resizestart',x,y);
			}
		},
		onMousemove:function(event){
			ui.logger(this);
			var offset=this.offset,
				pageX=event.pageX,
				pageY=event.pageY,
				x = pageX - offset.x,
				y = pageY - offset.y;
			if(this.type=='drag'){
				this.on('dragmove',x,y);
			}else if(this.type=='resize'){
				var _offset=this.resizeConfig.$target.offset();
				if(_offset.left + x  - pageX != 0 ){
					x=pageX - _offset.left;
				}
				if(_offset.top + y - pageY != 0 ){
					y=pageY - _offset.top;
				}
				if(x!=y && x!=0){
					this.on('resizemove',x,y);
				}
			}
			offset.x = pageX;
			offset.y = pageY;
		},
		onMouseup:function(event){
			ui.logger(this);
			if(this.type=='drag'){
				this.on('dragover');
			}else if(this.type=='resize'){
				this.on('resizeover');
			}
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
			this.on('dragmove',x,y);
		},
		setResizeBox:function(){
			ui.logger(this);
			var width=this.$bg.width();
			var height=this.$bg.height();
			var l=(width-this.resizeIconSize)/2;
			var t=(height-this.resizeIconSize)/2;
			this.$n.css("left",l);
			this.$s.css("left",l);
			this.$w.css("top",t);
			this.$e.css("top",t);
		},
		getTargetRegion : function(){
			ui.logger(this);
			var $target=this.config.$target;
			var width=$target.outerWidth();
			var height=$target.outerHeight();
			var offset=$target.offset();
			return {
				left: offset.left,
				top : offset.top,
				width: width,
				height: height
			};
		},
		resetResizeBox : function(){
			ui.logger(this);
			var targetRegion=this.getTargetRegion();

			this.$resizebox.css({
				left : targetRegion.left,
				top : targetRegion.top,
				display : 'block'
			});

			this.$bg.css({
				width : targetRegion.width,
				height : targetRegion.height
			});
			this.setResizeBox();
		},
		showResizeBox:function(config){
			ui.logger(this);
			if(this.setConfig(config)==false){
				return;
			}
			this.resetResizeBox();

			this.$bg.focus();

			var events=['mousedown',''].join(this.__EVENTNAMESPACE__+' ');
			this.$resizebox.on(events,{
				me : this,
			},function(event){
				return event.data.me.resizeBoxMouseDown(event);
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
				this.config.$target.removeClass('x-ui-dd-target');
				this.config=null;
			}
			if(config==null){
				this.unbindKeyPress();
				return false;
			}
			this.config=config;
			this.config.$target=$(config.target);
			if(this.config.parentBox){
				this.bindKeyPress();
			}
			this.config.$target.addClass('x-ui-dd-target');
			if(!this.config.type.resize){
				this.hideResizeBox();
			}
		},
		getPoint:function(point){
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

			if(point.x==this.__M_RIGHT__){
				point.x=maxWidth;
			}else if(point.x==this.__M_LEFT__){
				point.x=-maxWidth;
			}else if(point.y==this.__M_TOP__){
				point.y=-maxHeight;
			}else if(point.y==this.__M_BOTTOM__){
				point.y=maxHeight;
			}

			if( _l + point.x < 0 ){
				point.x = - _l;
			}else if( _l + _w +  point.x > maxWidth ){
				point.x = maxWidth - _l -  _w;
			}

			if( _t + point.y < 0 ){
				point.y = - _t;
			}else if( _t + _h + point.y > maxHeight ){
				point.y = maxHeight - _t - _h;
			}
			return point;
		},
		getRegion : function(region){
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

			if( _l + region.x < 0 ){
				region.x = - _l;
				region.w=_l;
			}else if( _l + _w +  region.w +  region.x > maxWidth ){
				region.x = 0;
				region.w=maxWidth - _l -  _w ;
			}

			if(_t + region.y < 0){
				region.y= - _t;
				region.h=_t;
			}else if(_t + _h + region.h + region.y > maxHeight){
				region.y=0;
				region.h=maxHeight - _t - _h;
			}
			return region;
		},
		hide:function(){
			ui.logger(this);
			if(this.config.type.resize){
				this.hideResizeBox();
			}
			this.setConfig(null);
		},
		drag : function(config){
			ui.logger(this);
			if(this.setConfig(config)==false){
				return;
			}
			var event=config.event;
			this.on('dragstart',event.pageX,event.pageY);
			delete config.event;
		},
		dragstart : function(x,y){
			ui.logger(this);
			this.offset.x = x;
			this.offset.y = y;
			this.bindContentEvent();
			DragDrop.disabledUserSelect();
		},
		dragover : function(){
			ui.logger(this);
			this.unbindContentEvent();
			DragDrop.enabledUserSelect();
			delete this.targetRegion;
			delete this.type;
			delete this.resizeConfig
		},
		onDragstart : function(x,y){
			ui.logger(this);
			this.dragstart(x,y);
			this.type='drag';
		},
		onDragmove : function(x,y){
			ui.logger(this);
			var point={
					x : x,
					y : y
				},
				config=this.config,
				offset;

			if(config.getPoint){
				config.getPoint(point);
			}else if(config.parentBox){
				this.getPoint(point);
			}

			if(point.x==0 && point.y==0){
				return;
			}

			if(!config.getPoint){
				offset=config.$target.point();
				config.$target.css({
					left : offset.left + point.x,
					top : offset.top + point.y
				});
			}

			offset=this.$resizebox.offset();

			this.$resizebox.css({
				left : offset.left + point.x,
				top : offset.top + point.y
			});
		},
		onDragover : function(){
			ui.logger(this);
			this.dragover();
		},
		onResizestart:function(x,y){
			ui.logger(this);
			this.dragstart(x,y);
			this.type='resize';
			this.resizeConfig.className=this._c_dd_resize+'-'+this.resizeConfig.type;
			this.$bg.css('cursor',this.resizeConfig.type+'-resize');
			$.getBody().addClass(this.resizeConfig.className);
		},
		onResizemove : function(x,y){
			ui.logger(this);
			var point=null,
				config=this.config,
				offset,
				resizeType=this.resizeConfig.type,
				region={
					x:0,
					y:0,
					w:0,
					h:0
				};
			if(resizeType=="nw"){
				region.w=-x;
				region.h=-y;
				region.x=x;
				region.y=y;
			}else if(resizeType=="n"){
				region.h=-y;
				region.y=y;
			}else if(resizeType=="ne"){
				region.w=x;
				region.h=-y;
				region.y=y;
			}else if(resizeType=="w"){
				region.w=-x;
				region.x=x;
			}else if(resizeType=="e"){
				region.w=x;
			}else if(resizeType=="sw"){
				region.w=-x;
				region.h=y;
				region.x=x;
			}else if(resizeType=="s"){
				region.h=y;
			}else if(resizeType=="se"){
				region.w=x;
				region.h=y;
			}
			var $bg=this.$bg,
				width=this.$bg.width(),
				height=this.$bg.height();

			if(width + region.w < this.__MIN_SIZE__ ){
				region.w=0;
				region.x=0;
			}
			if(height + region.h  < this.__MIN_SIZE__){
				region.h=0;
				region.y=0;
			}

			if(config.getRegion){
				config.getRegion(region);
			}else if(config.parentBox){
				this.getRegion(region);
			}

			if(region.x==0 && region.y==0 && region.w==0 && region.h==0){
				return;
			}

			if(!config.getRegion){
				var $target=config.$target,
					_width=$target.width(),
					_height=$target.height();
				$target.css({
					width : _width + region.w,
					height : _height + region.h
				});

				if(region.x!=0 || region.y!=0){
					offset=$target.point();
					$target.css({
						left : offset.left + region.x,
						top : offset.top + region.y
					});
				}
			}

			this.resetResizeBox();
		},
		onResizeover : function(){
			ui.logger(this);
			this.$bg.css('cursor','');
			$.getBody().removeClass(this.resizeConfig.className);
			this.dragover();
			delete this.resizeCursor;

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
		resize : function(config){
			this.resize.drag(config);
		},
		drag : function(config){
			config.type=config.type||{};
			config.type.move=true;
			getInstance().drag(config);
		},
		sort : function(config){
			config.type=config.type||{};
			config.type.sort=true;

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
		drag:function(config){
			this.show(config);
			getInstance().drag(config);
		},
		show : function(config){
			config.type=config.type||{};
			config.type.resize=true;
			getInstance().showResizeBox(config);
		},
		hide : function(){
			getInstance().hide();
		}
	});



})(CF,jQuery,ui);