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
			event.data.me.on(event.type,event);
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
		setConfig:function(config){
			ui.logger(this);
			if(!config.target){
				return false;
			}
			this.config=config;
			this.config.$target=$(config.target);
			return true;
		},
		initConfig:function(){
		
		
		},
		show:function(config){
			ui.logger(this);
			if(this.setConfig(config)){
				this.showResizeBox();
			}
		},
		hide:function(){
			ui.logger(this);
			if(this.config){
				this.$resizebox.css({
					display : ''
				});
				this.config=null;
			}
		},
		dragstart : function(config){
			ui.logger(this);
			if(!this.setConfig(config)){
				return;
			}
			if(this.config.type=='resize'){
				this.showResizeBox();
			}
			
			this.offset.x = config.event.pageX;
			this.offset.y = config.event.pageY;

			this.startListener();
		},
		dragmove : function(x,y){
			ui.logger(this);
			var point=null;
			if(this.config.move){
				point=this.config.move(x,y);
			}else{
				point={
					x : x,
					y : y
				};
			}

			var offset=this.$resizebox.offset();
			this.$resizebox.css({
				left : offset.left + point.x,
				top : offset.top + point.y
			});

			if(this.config.setOffset){
				this.config.setOffset(point);
			}else{
				offset=this.$resizebox.offset();
				this.config.$target.css({
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