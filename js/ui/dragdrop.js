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
				this['$'+item]=$(this.children[index]);

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
			this.config.event=event;
			var x=event.pageX,
				y=event.pageY,
				className=event.target.className,
				type=null;
			if(/bg/i.test(className)){
				this.on('dragstart',x,y);
			}else{
				if(/bc/i.test(className)){
					type='bc';
				}else if(/tc/i.test(className)){
					type='tc';
				}else if(/lc/i.test(className)){
					type='lc';
				}else if(/rc/i.test(className)){
					type='rc';
				}else if(/tl/i.test(className)){
					type='tl';
				}else if(/tr/i.test(className)){
					type='tr';
				}else if(/bl/i.test(className)){
					type='bl';
				}else if(/br/i.test(className)){
					type='br';
				}
				this.on('resizestart',x,y,type);
			}
		},
		onMousemove:function(event){
			ui.logger(this);
			/*
			var timeStamp=event.timeStamp;
			if(this.lastMoveTimestamp > timeStamp - 50){
				return;
			}
			this.lastMoveTimestamp=timeStamp;
			*/
			if(event.offsetX>0 && event.offsetY>0){
				//return;
			}
			var offset=this.offset;
			var x = event.pageX - offset.x;
			var y = event.pageY - offset.y;
			
			if(this.type=='drag'){
				this.on('dragmove',x,y);
			}else if(this.type=='resize'){
				this.on('resizemove',x,y);
			}

			offset.x = event.pageX;
			offset.y = event.pageY;

			console.info('offset:[',event.offsetX,',',event.offsetY,']');
		},
		onMouseup:function(event){
			ui.logger(this);
			if(this.config.type.move){
				this.on('dragover');
			}else if(this.config.type.resize){
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

			this.$tc.css("left",l);
			this.$bc.css("left",l);
			this.$lc.css("top",t);
			this.$rc.css("top",t);
		},
		resetResizeBox : function(){
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
				height : height
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
				region.w=0;
			}else if( _l + _w +  region.w +  region.x > maxWidth ){
				region.x = 0;
				region.w=maxWidth - _l -  _w ;
			}

			if(_t + region.y < 0){
				region.y=-_t;
				region.h=0;
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

			delete this.type;
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
		onResizestart:function(x,y,resizetype){
			ui.logger(this);
			this.dragstart(x,y);
			this.type='resize';
			this.resizetype=resizetype;
		},
		onResizemove : function(x,y){
			ui.logger(this);
			var point=null,
				config=this.config,
				offset,
				resizetype=this.resizetype,
				region={
					x:0,
					y:0,
					w:0,
					h:0
				};

			if(resizetype=="lc"){
				region.w=-x;
				region.x=x;
			}else if(resizetype=="rc"){
				region.w=x;
			}else if(resizetype=="tc"){
				region.h=-y;
				region.y=y;
			}else if(resizetype=="bc"){
				region.h=y;
			}else if(resizetype=="tl"){
				region.w=-x;
				region.h=-y;
				region.x=x;
				region.y=y;
			}else if(resizetype=="tr"){
				region.w=x;
				region.h=-y;
				region.y=y;
			}else if(resizetype=="bl"){
				region.w=-x;
				region.h=y;
				region.x=x;
			}else  if(resizetype=="br"){
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
			this.dragover();
			delete this.resizetype;
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