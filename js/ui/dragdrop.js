(function(CF, jQuery, ui) {

	var DragDrop = function() {
		this.callSuperMethod();
	};


	ui.extend(DragDrop, ui.widget, {
		_name_ : "DragDrop",
		statics : {
			css : {
				_c_dd_resize : '-dd-resize',
				_c_dd_sort : '-dd-sort',
				_c_dd_sort_drag : '-dd-sort-drag',
				_c_dd_drag : '-dd-drag',
				_c_dd_sort_box : '-dd-sort-box',
				_c_dd_resize_box : '-dd-resize-box'
			},
			getTemplate : function(config) {
				ui.widget.applyCSS(config, this.css);
				// 'tl','tc','tr','lc','bg','rc','bl','bc','br'
				config.arrowArray = ['nw', 'n', 'ne', 'w', 'bg', 'e', 'sw', 's', 'se'];
				var html = ['<div class="', config._c_dd_resize_box, '">'];
				$.it(config.arrowArray, function(index, item) {
					this.push('<div class="', item, '"></div>');
				}, html);
				html.push('</div>');
				return html.join('');
			},
			getOffsetParentPoint : function(element,parent){
				var point={
						left : element.offsetLeft - element.clientLeft,
						top : element.offsetTop - element.clientTop
					};
				parent = parent || document.body;

				if(element.offsetParent==parent){
					return point;
				}
				while(true){
					if(element == parent){
						break;
					}
					element=element.parentElement;
					point.left = point.left - element.offsetLeft - element.clientLeft - (element.offsetWidth - element.clientWidth);
					point.top = point.top - element.offsetTop - element.clientTop - (element.offsetHeight - element.clientHeight);
				}
				return point;
			},
			getOffsetParentPoint2 : function(element,parent){
				return {
					left : element.offsetLeft - element.clientLeft,
					top : element.offsetTop - element.clientTop
				};
			}
		},
		__EVENTNAMESPACE__ : '.DD' + $.randomChar(5),
		__M_RIGHT__ : 'R',
		__M_LEFT__ : 'L',
		__M_TOP__ : 'T',
		__M_BOTTOM__ : 'B',
		__MIN_SIZE__ : 50,
		onRenderAfter : function(config) {
			ui.logger(this);
			this.$resizebox = this.$elem;
			this.children = this.$resizebox.children();

			$.it(config.arrowArray, function(index, item) {
				var elem = this.children[index];
				this['$' + item] = $(elem);
				$.data(elem, {
					resizeType : item
				});
			}, this);
			delete this.children;

			this.render = document.body;
			this.resizeIconSize = 8;
			this.offset = {};
		},
		initSortbox : function() {
			ui.logger(this);
			var div = $.createElement(['<div class="', this._c_dd_sort_box, '"></div>'].join(''));
			$.getBody().append(div);
			this.$sortbox = $(div);
			this.initSortbox = CF.emptyFunction;
		},
		bindContentEvent : function() {
			ui.logger(this);
			var events = ['mouseup', 'mousemove', ''].join(this.__EVENTNAMESPACE__ + ' ');
			$.getDoc().on(events, {
				me : this
			}, function(event) {
				return event.data.me.on(event.type, event);
			});
		},
		unbindContentEvent : function() {
			ui.logger(this);
			$.getDoc().off(this.__EVENTNAMESPACE__);

			$.getBody().one('mousedown' + this.__EVENTNAMESPACE__, {
				me : this
			}, function(event) {
				if(event.data.me.config && event.data.me.config.event.target!=event.target){
					event.data.me.hideResizeBox();
				}
			});
		},
		onSelectstart : function(event) {
			ui.logger(this);
			return false;
		},
		bindKeyPress : function() {
			ui.logger(this);
			var events = ['keydown', ''].join(this.__EVENTNAMESPACE__ + ' ');
			$.getBody().on(events, {
				me : this
			}, function(event) {
				return event.data.me.on('keypress', event);
			});
		},
		unbindKeyPress : function() {
			ui.logger(this);
			$.getBody().off(this.__EVENTNAMESPACE__);
		},
		onMousemove : function(event) {
			ui.logger(this);

			var offset = this.offset,
				pageX,
				pageY,
				x,
				y,
				config = this.config;

			pageX = event.pageX;
			pageY = event.pageY;
			x = pageX - offset.x;
			y = pageY - offset.y;

			if(x == 0 && y == 0){
				return;
			}
			
			this.event = event;

			offset.x = pageX;
			offset.y = pageY;

			if (this.type == 'drag') {
				this.on('dragmove', x, y);
			} else if (this.type == 'resize') {			
					var _offset = config.$cursortarget.offset();
					if (_offset.left + x - pageX != 0) {
						x = pageX - _offset.left;
					}
					if (_offset.top + y - pageY != 0) {
						y = pageY - _offset.top;
					}
					if (x != y && x != 0) {
						this.on('resizemove', x, y);
					}
			} else if (this.type == 'sort') {
				if (this.on('sortmove', x, y) == false) {
					return;
				}
			}
			return false;
		},
		onMouseup : function(event) {
			ui.logger(this);
			if (this.type == 'drag') {
				this.on('dragover');
			} else if (this.type == 'resize') {
				this.on('resizeover');
			} else if (this.type == 'sort') {
				this.on('sortover');
			}
		},
		onKeypress : function(event) {
			ui.logger(this);
			var _min = 1, _max = 10, x = y = 0,
				shiftKey = event.shiftKey,
				ctrlKey = event.ctrlKey,
				altKey = event.altKey,
				keyCode = event.keyCode;
			switch (keyCode) {
				// left
				case 37 :
					if (shiftKey && altKey) {
						x = this.__M_LEFT__;
					} else if (shiftKey) {
						x = -_max;
					} else {
						x = -_min;
					}
					break;
				// up
				case 38 :
					if (shiftKey && altKey) {
						y = this.__M_TOP__;
					} else if (shiftKey) {
						y = -_max;
					} else {
						y = -_min;
					}
					break;
				// rigth
				case 39 :
					if (shiftKey && altKey) {
						x = this.__M_RIGHT__;
					} else if (shiftKey) {
						x = _max;
					} else {
						x = _min;
					}
					break;
				// down
				case 40 :
					if (shiftKey && altKey) {
						y = this.__M_BOTTOM__;
					} else if (shiftKey) {
						y = _max;
					} else {
						y = _min;
					}
					break;
				default :
					return;
			}
			this.on('dragmove', x, y);
			return false;
		},
		cleanConfig:function(){
			ui.logger(this);
			if(this.config && this.config.deActive){
				this.config.deActive();
			}
			this.dragover();
			this.config = null;
			this.unbindKeyPress();
		},
		setConfig : function(config) {
			ui.logger(this);
			if (this.config && config && this.config.target == config.target) {
				return;
			}
			this.cleanConfig();

			this.config = config;
			config.$target = $(config.target);
			if (config.type.drag) {
				this.bindKeyPress();
			}
			if (!config.type.resize) {
				this.hideResizeBox();
			}

			margin=config.margin;
			if(margin>0){
				margin={
					top : margin,
					right : margin,
					bottom : margin,
					left : margin	
				};
			}else{
				margin=margin || {};
				margin={
					top : margin.top||0,
					right : margin.right||0,
					bottom : margin.bottom||0,
					left : margin.left||0
				};
			}
			config.margin=margin;
		},
		getPoint : function(point) {
			ui.logger(this);
			var config=this.config,
				$parentBox = $(config.parentBox),
				$target = config.$target,
				maxWidth = $parentBox.width(),
				maxHeight = $parentBox.height(),
				offset = DragDrop.getOffsetParentPoint(config.target,config.parentBox),
				_l = offset.left,
				_t = offset.top,
				_w = $target.outerWidth(),
				_h = $target.outerHeight(),
				margin=config.margin;

			if (point.x == this.__M_RIGHT__) {
				point.x = maxWidth;
			} else if (point.x == this.__M_LEFT__) {
				point.x = -maxWidth;
			} else if (point.y == this.__M_TOP__) {
				point.y = -maxHeight;
			} else if (point.y == this.__M_BOTTOM__) {
				point.y = maxHeight;
			}

			if (_l + point.x - margin.left < 0) {
				point.x = -_l + margin.left;
			} else if (_l + _w + point.x + margin.right  > maxWidth) {
				point.x = maxWidth - _l - _w - margin.right;
			}

			if (_t + point.y -  margin.top< 0) {
				point.y = -_t + margin.top;
			} else if (_t + _h + point.y + margin.bottom  > maxHeight) {
				point.y = maxHeight - _t - _h - margin.bottom;
			}
			return point;
		},
		drag : function(config) {
			ui.logger(this);
			if (this.setConfig(config) == false) {
				return;
			}
			this.event = config.event;
			this.on('dragstart', this.event.pageX, this.event.pageY);
		},
		dragstart : function(x, y) {
			ui.logger(this);
			this.offset.x = x;
			this.offset.y = y;
			this.bindContentEvent();
			this.addBodyClass();
		},
		dragover : function() {
			ui.logger(this);
			this.unbindContentEvent();
			delete this.targetRegion;
			delete this.type;
			delete this.event;
			delete this.__SORT_TIMEOUT_ID__;
			this.removeBodyClass();
		},
		onDragstart : function(x, y) {
			ui.logger(this);
			this.type = 'drag';
			this.dragstart(x, y);
		},
		onDragmove : function(x, y) {
			ui.logger(this);
			var point = {
				x : x,
				y : y
			}, config = this.config, offset;

			if (config.parentBox) {
				this.getPoint(point);
			}

			if (point.x == 0 && point.y == 0) {
				return;
			}

			if (config.setPoint) {
				config.setPoint(point);
			}else{
				offset = DragDrop.getOffsetParentPoint(config.target,config.parentBox);
				config.$target.css({
					left : offset.left + point.x,
					top : offset.top + point.y
				});
			}

			if(this.render==document.body){
				offset = this.$resizebox.offset();
			}else{
				offset = DragDrop.getOffsetParentPoint(this.$resizebox[0],this.render.offsetParent);
			}
			
			if(config.type.resize){
				this.$resizebox.css({
					left : offset.left + point.x,
					top : offset.top + point.y
				});
			}
		},
		onDragover : function() {
			ui.logger(this);
			this.dragover();
		},
		bindSortContent : function() {
			ui.logger(this);
			var events = ['mousemove', ''].join(this.__EVENTNAMESPACE__ + ' ');
			this.config.$parentBox.on(events, {
				me : this
			}, function(event) {
				return event.data.me.on('sortBoxMousemove', event);
			});
		},
		unbindSortContent : function() {
			ui.logger(this);
			this.config.$parentBox.off(this.__EVENTNAMESPACE__);
		},
		onSortBoxMousemove : function(event) {
			ui.logger(this);
			var $target=$(event.target),
				config = this.config,
				srcTarget = config.target,
				elemet;

			if(config.onSortBoxMove){
				elemet=config.onSortBoxMove(event);
			}else{
				elemet=$target.isParent(config.parentBox);
			}

			if(!elemet){
				return;
			}

			if(event.timeStamp - this.lastSortTime < 50){
				return;
			}

			config.event=event;
			delete this.replaceElemet;
			if(event.ctrlKey){
				this.on('replace',elemet);
			}else if(elemet!=srcTarget){
				if(config.onSort){
					config.onSort(elemet);
				}else if(elemet.parentElement==srcTarget.parentElement){
					this.on('sort',elemet);
				}
			}
			
			this.lastSortTime=event.timeStamp;
		},
		onReplace:function(elemet){
			ui.logger(this);
			this.replaceElemet=elemet;
		},
		onSort:function(elemet){
			ui.logger(this);
			var config = this.config,
				$elemet,
				srcTarget,
				prev,
				type;

			if(config.onSortBefore && config.onSortBefore(elemet)==false){
				return false;
			}
			
			$elemet=$(elemet);
			srcTarget = config.target;
			prev = $elemet.prev();

			if (prev.length == 1 && prev[0] == srcTarget) {
				type='after';
				prev=prev[0];
			} else {
				type='before';
			}
			
			if(prev!=srcTarget){
				$elemet[type](srcTarget);
			}
			if(config.onSortAfter){
				config.onSortAfter(elemet,type);
			}
		},
		sort : function(config) {
			ui.logger(this);
			if (this.setConfig(config) == false) {
				return;
			}
			this.initSortbox();
			this.event = config.event;

			if (config.type.resize) {
				this.__SORT_TIMEOUT_ID__=$.setTimeout(function(){
					this.showResize(config);
					delete this.__SORT_TIMEOUT_ID__;
				},100,this);
			}
			this.config.$parentBox = $(config.parentBox);
			this.config.isTable=/^(table|tbody|tr)$/i.test(config.parentBox);
			this.on('sortstart', this.event.pageX, this.event.pageY);

			this.$sortbox.attr('class',this._c_dd_sort_box);
			if(config.cls){
				this.$sortbox.addClass(config.cls);
			}

		},
		sortstart : function() {
			ui.logger(this);
			if (this.isResetsortbox) {
				return;
			}
			var region = this.getTargetRegion();
			this.$sortbox.css({
				width : region.width,
				height : region.height
			});
			this.isResetsortbox = true;
			this.$sortbox.show();
			this.bindSortContent();

			if(this.config.sortstart){
				this.config.sortstart();
			}
			delete this.config.startOffset;
		},
		onSortstart : function(x, y) {
			ui.logger(this);
			this.type = 'sort';
			this.dragstart(x, y);

			this.config.sortStartOffset={
				left : x,
				top : y,
			};
		},
		onSortmove : function(x, y) {
			ui.logger(this);
			
			var event = this.event;

			if(this.__SORT_TIMEOUT_ID__){
				clearTimeout(this.__SORT_TIMEOUT_ID__);
				delete this.__SORT_TIMEOUT_ID__;
//			}else if (!this.isResetsortbox) {
			}

			var startOffset=this.config.sortStartOffset;
			if(startOffset && (Math.abs(startOffset.left - event.pageX)>5 || Math.abs(startOffset.top - event.pageY)>5 )){
			}else{
				return false;
			}

			this.$resizebox.hide();

			if(this.config.isLockBody){
				var $parentBox=$.getBody(),
					$target = this.$sortbox,
					maxWidth = $parentBox.width(),
					maxHeight = $parentBox.height(),
					offset = $target.offset(),
					_l = event.pageX + 10,
					_t = event.pageY + 22,
					_w = $target.outerWidth(),
					_h = $target.outerHeight();

				if (_l < 0) {
					x = -_l;
				} else if (_l + _w  > maxWidth) {
					_l = maxWidth  - _w - 10;
					x = 0;
				}

				if (_t  < 0) {
					y = -_t;
				} else if (_t + _h > maxHeight) {
					y = maxHeight - _t - _h;
				}

				this.$sortbox.css({
					left : _l + x,
					top : _t + y
				});
			}else{
				this.$sortbox.css({
					left : event.pageX + 10,
					top : event.pageY + 22
				});
			}

			$.getBody().addClass(this._c_dd_sort_drag);
			this.sortstart();
		},
		onSortover : function() {
			ui.logger(this);
			this.$sortbox.hide();
			this.dragover();
			$.getBody().removeClass(this._c_dd_sort_drag);
			delete this.isResetsortbox;
			this.unbindSortContent();

			var config=this.config;

			if(this.replaceElemet){
				if(config.onReplace){
					config.onReplace(this.replaceElemet);
				}else{
					$(this.replaceElemet).replaceNode(config.target);
				}
				delete this.replaceElemet;
			}

			if(config.onSortOver){
				config.onSortOver();
			}
		},
		resizeBoxMouseDown : function(event) {
			ui.logger(this);
			var x = event.pageX,
				y = event.pageY,
				target = event.target,
				className = target.className,
				type = this.config.type,
				isBG = /bg/i.test(className);

			this.event = event;

			if (type.drag && isBG) {
				this.on('dragstart', x, y);
			} else if (type.sort && isBG) {
				this.on('sortstart', x, y);
			} else if (type.resize && !isBG) {
				if(window.getComputedStyle(target).cursor!='default'){
					this.config.$cursortarget = $(target);
					this.config.resizetype = $.data(target, 'resizeType');
					this.on('resizestart', x, y);
				}
			}

			event.stopBubble(this);
		},
		setResizeCursorOffset : function() {
			ui.logger(this);
			var width = this.$bg.width();
			var height = this.$bg.height();
			var l = (width - this.resizeIconSize) / 2;
			var t = (height - this.resizeIconSize) / 2;
			this.$n.css("left", l);
			this.$s.css("left", l);
			this.$w.css("top", t);
			this.$e.css("top", t);
		},
		getTargetRegion : function() {
			ui.logger(this);
			if(!this.config){
				return;
			}
			var $target = this.config.$target,
				width = $target.outerWidth(),
				height = $target.outerHeight(),
				offset=null;
			if(!this.config.type.resize || this.render==document.body){
				offset = $target.offset();
			}else if(this.render!=document.body){
				offset = DragDrop.getOffsetParentPoint($target[0],this.render.offsetParent);
			}

			return {
				left : offset.left,
				top : offset.top,
				width : width,
				height : height
			};
		},
		setResizeBoxOffset : function() {
			ui.logger(this);

			this.$resizebox.show();

			var targetRegion = this.getTargetRegion();

			this.$resizebox.css({
				left : targetRegion.left,
				top : targetRegion.top
			});

			this.$bg.css({
				width : targetRegion.width,
				height : targetRegion.height
			});
			
			this.setResizeCursorOffset();
		},
		showResize : function(config) {
			ui.logger(this);
			if (this.setConfig(config) == false) {
				return;
			}

			if(config.render && config.render != this.render) {
				this.$elem.appendTo(config.render);
				this.render = config.render;
			}

			this.setResizeBoxOffset();

			var events = ['mousedown', ''].join(this.__EVENTNAMESPACE__ + ' ');
			this.$resizebox.on(events, {
				me : this
			}, function(event) {
				return event.data.me.resizeBoxMouseDown(event);
			});

			this.$resizebox.attr('class',this._c_dd_resize_box);

			if(config.isFloatAlign){
				var style=window.getComputedStyle(config.target);
				this.$resizebox.addClass('float-'+style.float);
			}else if(config.isAutoWidth){
				this.$resizebox.addClass('auto-width');
			}

		},
		hideResizeBox : function() {
			ui.logger(this);
			this.$resizebox.css({
				display : ''
			});
			this.$resizebox.off(this.__EVENTNAMESPACE__);
		},
		getRegion : function(region) {
			ui.logger(this);
			var config=this.config,
				$parentBox = $(config.parentBox),
				$target = config.$target,
				maxWidth = $parentBox.width(),
				maxHeight = $parentBox.height(),
				offset = DragDrop.getOffsetParentPoint($target[0],config.parentBox),
				_l = offset.left,
				_t = offset.top,
				_w = $target.outerWidth(),
				_h = $target.outerHeight(),
				margin=config.margin;


			if (_l + region.x - margin.left < 0) {
				region.x = -_l + margin.left;
				region.w = Math.abs(region.x);
			} else if (_l + _w + region.w + region.x + margin.right > maxWidth) {
				region.x = 0;
				region.w = maxWidth - _l - _w - margin.right;
			}

			if (_t + region.y - margin.top < 0) {
				region.y = -_t + margin.top;
				region.h = Math.abs(region.y);
			} else if (_t + _h + region.h + region.y + margin.bottom  > maxHeight) {
				region.y = 0;
				region.h = maxHeight - _t - _h - margin.bottom;
			}
			return region;
		},
		hide : function() {
			ui.logger(this);
			this.hideResizeBox();
			this.cleanConfig();
		},
		getBodyClass : function() {
			this.bodyClass = [];
			if (this.type == 'resize') {
				this.bodyClass.push(this._c_dd_resize,'-',this.config.resizetype,' ',this._c_dd_resize);
			} else if (this.type == 'sort') {
				this.bodyClass.push(this._c_dd_sort);
			} else if (this.type == 'drag') {
				this.bodyClass.push(this._c_dd_drag);
			}
			this.bodyClass.push('-', 'body');
			this.bodyClass = this.bodyClass.join('');
			return this.bodyClass;
		},
		addBodyClass : function() {
			$.getBody().addClass(this.getBodyClass());
			var config=this.config;
			config.$target.addClass('x-ui-dd-target');
			if(config.dragstart){
				config.dragstart();
			}
		},
		removeBodyClass : function() {
			$.getBody().removeClass(this.bodyClass);
			this.bodyClass = null;
			var config=this.config;
			if(config && config.$target){
				config.$target.removeClass('x-ui-dd-target');
				if(config.dragover){
					config.dragover();
				}
			}
		},
		onResizestart : function(x, y) {
			ui.logger(this);
			this.type = 'resize';
			this.dragstart(x, y);
			this.$bg.css('cursor', this.config.resizetype + '-resize');
		},
		onResizemove : function(x, y) {
			ui.logger(this);

			var config = this.config,
				resizeType = this.config.resizetype,
				region = {
					x : 0,
					y : 0,
					w : 0,
					h : 0
				},
				shiftKey = this.event.shiftKey;

			if(config.onResizemove){
				var w=config.$target.width();
				var h=config.$target.height();
				if (w + x < this.__MIN_SIZE__) {
					x=this.__MIN_SIZE__ - w ;
				}
				if (h + y < this.__MIN_SIZE__) {
					y=this.__MIN_SIZE__ - h;
				}
				config.onResizemove(x,y,w,h);
				this.setResizeBoxOffset();
				return;
			}

			if (resizeType == "nw") {
				region.w = -x;
				region.h = -y;
				region.x = x;
				region.y = y;
			} else if (resizeType == "n") {
				region.h = -y;
				region.y = y;
			} else if (resizeType == "ne") {
				region.w = x;
				region.h = -y;
				region.y = y;
			} else if (resizeType == "w") {
				region.w = -x;
				region.x = x;
			} else if (resizeType == "e") {
				region.w = x;
			} else if (resizeType == "sw") {
				region.w = -x;
				region.h = y;
				region.x = x;
			} else if (resizeType == "s") {
				region.h = y;
			} else if (resizeType == "se") {
				region.w = x;
				region.h = y;
			}

			this.setRegion(region);

			this.setResizeBoxOffset();
		},
		setRegion : function(region){
			var config = this.config;

			var $bg = this.$bg,
				width = this.$bg.width(),
				height = this.$bg.height();

			if (width + region.w < this.__MIN_SIZE__) {
				region.w = this.__MIN_SIZE__ - width;
				if(region.x > 0){
					region.x = -region.w;
				}else{
					region.x = 0;
				}
			}
			if (height + region.h < this.__MIN_SIZE__) {
				region.h = this.__MIN_SIZE__ - height;
				if(region.y > 0){
					region.y = -region.h;
				}else{
					region.y = 0;
				}
			}

			if (region.x == 0 && region.y == 0 && region.w == 0 && region.h == 0) {
				return;
			}

			if (config.parentBox) {
				this.getRegion(region);
			}
			if (region.x == 0 && region.y == 0 && region.w == 0 && region.h == 0) {
				return;
			}

			if (config.setRegion) {
				config.setRegion(region);
			}else{
				var $target = config.$target,
					_width = $target.width(),
					_height = $target.height(),
					offset = DragDrop.getOffsetParentPoint($target[0],config.parentBox);
				$target.css({
					width : _width + region.w,
					height : _height + region.h,
					left : offset.left + region.x,
					top : offset.top + region.y
				});
			}
		},
		onResizeover : function() {
			ui.logger(this);
			this.$bg.css('cursor', '');
			this.dragover();
			delete this.resizeCursor;
		},
		setSizing : function( w , h ){
			ui.logger(this);
			if(!this.config){
				return;
			}
			this.setRegion({
				x : 0,
				y : 0,
				w : w,
				h : h
			});
		},
		setOffset : function( x , y ){
			ui.logger(this);
			if(!this.config){
				return;
			}
			this.onDragmove( x , y );
		}
	});

	var instance;

	function getInstance() {
		if (!instance) {
			instance = new DragDrop({});
		}
		return instance;
	};

	ui.dragdrop = {
		resize : function(config) {
			this.resize.drag(config);
		},
		drag : function(config) {
			config.type = config.type || {};
			config.type.move = true;
			getInstance().drag(config);
		},
		sort : function(config) {
			config.type = config.type || {};
			config.type.sort = true;
			getInstance().sort(config);
		},
		hide : function() {
			getInstance().hide();
		},
		setSizing : function( w , h ){
			getInstance().setSizing(w,h);
		},
		setOffset : function( x , y ){
			getInstance().setOffset(x,y);
		},
		getTargetRegion : function(){
			return getInstance().getTargetRegion();
		}
	};

	CF.merger(ui.dragdrop.resize, {
		drag : function(config) {
			this.show(config);
			getInstance().drag(config);
		},
		show : function(config) {
			config.type = config.type || {};
			config.type.resize = true;
			getInstance().showResize(config);
		},
		hide : ui.dragdrop.hide
	});

})(CF, jQuery, ui);
