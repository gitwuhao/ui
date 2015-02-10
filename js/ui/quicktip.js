(function(CF,jQuery,ui){

	var QuickTip=function(){
		this.callSuperMethod();
	};
	
	var _index_=parseInt('1'+((Date.now()+'').match(/(\d{3}$)/)[0]));

	ui.extend(QuickTip,ui.widget,{
		_name_ : "QuickTip",
		statics:{
			css:{
				_c_qtip_box: '-qtip-box',
				_c_qtip_content: '-qtip-content',
				_c_qtip_arrow_box: '-qtip-arrow-box',
				_c_qtip_confirm: '-qtip-confirm'
			},
			getID : function(){
				return 'Q'+(_index_++)+'TIP';
			},
			getTemplate: function(config){
				ui.widget.applyCSS(config,this.css);
				config.id=this.getID();
				var html=['<div class="',config._c_qtip_box,' ',config._c_qtip_confirm,' ',(config.cls||''),' border-box uns" id="',config.id,'">',
							'<div class="',config._c_qtip_content,'">',config.html,'</div>',
							'<div class="',config._c_qtip_arrow_box,'">',
								'<div class="',config.px,'-icon"></div>',
							'</div>',
						   '</div>'];
				return html.join('');
			},
			index : 1,	
			timeStamp : -1,
			events : {
				length : 0,
			},
			startListener : function(){
				if(this.isStart==true){
					return;
				}
				$.getDoc().on('mousemove',{
					me : this
				},this.eventHandle);
					
				$.getDoc().on('keydown',{
					me : this
				},this.removeAll);
					
				this.isStart=true;
			},
			stopListener : function(){
				$.getDoc().off('mousemove',this.eventHandle);
				$.getDoc().off('keydown',this.removeAll);
				this.isStart=false;
			},
			removeAll : function(event){
				if(event.keyCode!=27){
					return;
				}
				var me=event.data.me,
					events=me.events;
				if(events.length==0){
					return;
				}
				for(var key in events){
					var item=events[key];
					if(item && item.scope){
						item.scope.remove();
					}
				}
				me.events={
					length: 0
				};
				me.stopListener();
				return false;
			},
			eventHandle : function(event){
				var me=event.data.me,
					timeStamp=me.timeStamp;
				//if(timeStamp && event.timeStamp - timeStamp > 50){
					me.trigger(event);
					me.timeStamp=event.timeStamp;
				//}
			},
			isListener: (function(){
				var _R_ = CF.isDebug ? true : false ;
				return function(){
					return _R_;
				};
			})(),
			trigger:function(event){
				if(this.isListener()){
					return;
				}
				var events=this.events,
					isOverScreen=false;
				
				if(event.clientY >= window.innerHeight || event.clientX >= window.innerWidth){
					isOverScreen=true;
				}
				for(var key in events){
					var item=events[key];
					if(item && item.handle && item.handle._isFunction_){
						item.handle.call(item.scope,event,item.param,isOverScreen);
					}
				}
			},
			addListener:function(ref,handle,param){
				var id=this.index++;
				ref.__QUICKTIP_ID__=id;
				this.events[id]={
					scope : ref,
					param : param,
					handle : handle
				};
				this.events.length++;
				this.startListener();
			},
			removeListener:function(ref){
				var id=ref.__QUICKTIP_ID__;
				if(!id || !this.events[id]){
					return;
				}
				delete this.events[id];
				this.events.length--;
				if(this.events.length==0){
					this.stopListener();
				}
			}
		},
		//left、top
		offset:'lt',
		//top、center
		align:'tc',
		time : 0,
		minOpacity : 70,
		//最小延时(5s)
		MIN_DELAY_TIME : 5000,
		onRenderAfter:function(config){
			ui.logger(this);
			this.$box=this.$elem;
			this.$content=this.$box.children('.'+this._c_qtip_content);
			this.$arrowbox=this.$box.children('.'+this._c_qtip_arrow_box);
			this.$arrow=this.$arrowbox.children(":first");
			
			this.width=this.$elem.outerWidth();
			this.height=this.$elem.outerHeight();
			this.setOffset();

			this.$elem.data(ui.quicktip.DATA_KEY,this);

			
			var css;
			if(this.css){
				css=this.css;
			}else{
				css={};
			}

			for(var key in css){
				this.$box.css(css);
				break;
			}
		},
		onBindEvent:function(){
			ui.logger(this);
			if(this.isConfirm){
				this.$content.click({
					$owner : this
				},function(event){
					var $owner= event.data.$owner;
					if($owner.yes){
						$owner.yes();
					}
					$owner.hide();
					ui.popu.removeMask($owner.zindex);
				});
			}
/*
			if(this.targetContent){
				$(this.targetContent).one('mousewheel',{
					me:this,
				},function(event){
					if(event.originalEvent){
						event.data.me.on('hide');
					}
				});
			}
*/
		},
		addMouseMoveListener : function(){
			ui.logger(this);
			if(this.time>1000){
				this._TIME_OUT_ID_=$.setTimeout(function(){
					this.hide();
				},this.time,this);
				return;
			}

			var offset=this.$elem.offset();
			
			QuickTip.addListener(this,function(event,param,isOverScreen){
				 if(!param.lastEvent){
					param.lastEvent=event;
					return;
				}else if(isOverScreen){
					this.hide();
					return;
				}else if(this._TIME_OUT_ID_){
					window.clearTimeout(this._TIME_OUT_ID_);
					delete this._TIME_OUT_ID_;
				}

				if(param.index < this.minOpacity || event.timeStamp < param.startTime + this.MIN_DELAY_TIME){
					this._TIME_OUT_ID_=$.setTimeout(function(){
						this.hide();
					},3000,this);
				}

				var x=event.pageX - param.lastEvent.pageX,
					y=event.pageY - param.lastEvent.pageY,
					index=0,
					offset={};

				if(event.pageX > param.left 
					&& param.left + param.width < event.pageX){
					offset.right=true;
					index++;
				}
				
				if(event.pageY > param.top 
					&& param.top + param.height < event.pageY){
					offset.bottom=true;
					index++;
				}
				
				if(event.pageX < param.left 
					&& param.left > event.pageX){
					offset.left=true;
					index++;
				}
				
				if(event.pageY < param.top && param.top > event.pageY){
					offset.top=true;
					index++;
				}
				
				if(index==0){
					param.index=90;
				}else{
					function getValue(v){
						var value=parseInt(Math.abs(v)/2);
						if(v < 0 && value >0){
							value = -value;
						}
						return value;
					};
					var _x=getValue(x),
						_y=getValue(y),
						value=0;

					if(offset.left){
						//if(_x != 0){
							value=_x;
						//}else{
						//	value=_y;
						//}
					}

					if(offset.top){
						//if(_y != 0){
							value=_y;
						//}else{
						//	value=_x;
						//}
					}
					
					if(offset.right){
						//if(_x != 0){
							value -=_x;
						//}else{
						//	value -=_y;
						//}
					
					}

					if(offset.bottom){
						//if(_y != 0){
							value -=_y;
						//}else{
						//	value -=_x;
						//}
					}
					param.index += value;
					
					if(param.opacity==param.index){
						return;
					}
				}

				param.lastEvent=event;

				if(param.index <= 0){	
					this.remove();
					return;
				}else if(param.index > 90){
					param.index=90;
				}
				param.opacity=param.index;
				this.$elem.css('opacity',param.opacity/100);

				
			},{
				index : 90 ,
				startTime : $.timestamp(),
				left : offset.left,
				top : offset.top,
				width : this.width,
				height : this.height
			});
		},
		setOffset:function(){
			ui.logger(this);
			var $target=$(this.target);
			var offset=$target.offset();

			var maxWidth=window.innerWidth;
			var maxHeight=window.innerHeight;
			
			var width=this.width;
			var height=this.height;
			
			var arrowWidth=20;
			var arrowHeight=20;

			var targetWidth=$target.outerWidth();
			var targetHeight=$target.outerHeight();
			
			
			var left=offset.left;
			var top=offset.top;

			var point={},
				arrowPoint={},
				align=this.align,
				offset=this.offset;
			this.align={};
			this.align.center=align.indexOf("c")>-1;
			this.align.left=align.indexOf("l")>-1;
			this.align.right=align.indexOf("r")>-1;
			this.align.bottom=align.indexOf("b")>-1;
			this.align.top=align.indexOf("t")>-1;
			
			this.offset={};
			this.offset.left=offset.indexOf("l")>-1;
			this.offset.top=offset.indexOf("t")>-1;
			this.offset.right=offset.indexOf("r")>-1;
			this.offset.bottom=offset.indexOf("b")>-1;

			if(this.align.left){
				point.left = left - width;
				align='right';
			}else if(this.align.right){
				point.left = left + targetWidth;
				align='left';
			}else if(this.align.bottom){
				point.top = top + targetHeight;
				align='top';
			}else{
				point.top = top - height;
				align='bottom';
			}
			
			if(this.align.left || this.align.right ){
				if(this.align.center){
					point.top = top + (targetHeight/2) - (height/2);
					if(point.top < 0 ){
						height = height + point.top - 3;
						point.top = 3;
					}
				}else{
					point.top = top;
				}
				arrowPoint.top=((height - arrowHeight)/2);
			}else{
				if(this.align.center){
					point.left = left + (targetWidth/2) - (width/2);
				}else{
					point.left = left;
				}
				arrowPoint.left=((width- arrowWidth)/2);
			}
			offset={};
			if(this.offset.right){
				offset.right=maxWidth - point.left - width;
			}else{
				offset.left=point.left;
			}
			if(this.offset.bottom){
				offset.bottom=maxHeight - point.top - height ;
			}else{
				offset.top=point.top;
			}
			this.$elem.addClass(align);
			this.$arrow.addClass(align);
			this.$arrow.css(arrowPoint);
			this.$elem.css(offset);
			
			if(this.isConfirm){

			}else if(!QuickTip.isListener()){
				this.addMouseMoveListener();
			}
			this.timestamp=$.timestamp();
		},
		onHide:function(){
			ui.logger(this);
			if($.timestamp() - this.timestamp <1000){
				return;
			}
			this.hide();
		},
		hide : function(){
			ui.logger(this);
			if(this.$elem){
				if(this.$elem.css('opacity')==''){
					this.$elem.addClass('easeout');
					$.setTimeout(this.remove,1000,this);
				}else{
					this.remove();
				}
			}
		},
		remove:function(){
			ui.logger(this);
			QuickTip.removeListener(this);
			if(this.targetContent){
				$(this.targetContent).trigger('mousewheel');
			}
			this.callSuperMethod();
		}
	});

	//CF.merger(QuickTip.prototype,ui.mask);
	
	ui.quicktip={
		/**
		*	{
		*		align : 'lc',
		*		offset : 'lt',
		*		cls : 'list-search-quicktip c1',
		*		html : html,
		*		target :  element
		*	}
		**/
		show : function(config){
			new QuickTip(config);
		},
		/**
		*	{
		*		align : 'lc',
		*		offset : 'lt',
		*		cls : 'list-search-quicktip c1',
		*		html : html,
		*		target :  element,
		*		yes : function(){
		*			
		*		},
		*		cancel: function(){
		*		
		*		}
		*	}
		**/
		confirm : function(config){
			config.isConfirm=true;
			config.onRender=function(){
				this.zindex=ui.popu.createMask({
					$owner : this,
					onClick : function(event){
						ui.popu.removeMask(this.zindex);
						if(this.$owner.no){
							this.$owner.no();
						}
						this.$owner.hide();
					}
				});
				this.callPrototypeMethod();
			};
			new QuickTip(config);
		},
		DATA_KEY : '__QUICK_TIP__',
		remove  : function(id){
			var data=$('#'+id).data(this.DATA_KEY);
			if(data){
				data.remove();
			}
		}
	};
	

})(CF,jQuery,ui);