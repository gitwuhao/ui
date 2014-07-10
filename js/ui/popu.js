(function(CF,$,ui){

	ui.popu=function(){
		this.callSuperMethod();
	};

	ui.extend(ui.popu,ui.widget,{
		_name_ : "popu",
		statics:{
			__is_popu__ : $.randomChar(10),
			_c_popu_box : ui.cssPrefix+'-popu',
			getTemplate: function(config){
				return ['<div class="',this._c_popu_box," ",(config.boxcls||""),
							" ",(config.cls||""),' border-box">',
							(config.html||''),
						'</div>'].join('');
			},
			setOffset:function(popu){
				var $offsetElement=popu.$offsetElement,
					offsetParent=popu.offsetParent,
					align=popu.align,
					offset,
					left,
					top,
					right,
					bottom;
				
				offset=$offsetElement.offsetElement(offsetParent);
				left=offset.left;
				top=offset.top;

				right=left + $offsetElement.outerWidth(true);
	
				bottom=top + $offsetElement.outerHeight(true);

				popu.setOffset({
					left: left,
					top : top ,
					right : right ,
					bottom : bottom
				});
			},
			setCurrentPopu : function(popu){
				ui.logger(this);
				if(this.currentPopu && this.currentPopu!=popu){
					this.currentPopu.on("hide");
				}
				this.currentPopu=popu;
				this.initEventListener();
			},
			removeCurrentPopu:function(){
				ui.logger(this);
				if(this.currentPopu){
					this.currentPopu.on("hide");
				}
				this.currentPopu=null;
			},
			removePopu:function(popu){
				ui.logger(this);
				if(popu==this.currentPopu){
					this.currentPopu=null;
				}
			},
			filterTriggerOwner:function(target){
				this.triggerOwner=target;
			},
			filterBlurEvent : function(event){
				var relatedTarget=event.relatedTarget;
				var __is_popu__=this.__is_popu__;
				while(relatedTarget && relatedTarget.offsetParent){
					var data=$.data(relatedTarget);
					if(data[__is_popu__]){
						return true;
					}
					relatedTarget=relatedTarget.offsetParent;
				}
				return false;
			},
			initEventListener : function(){
				var me=this;
				$.getDoc().keydown(function(event){
					if(event.keyCode==27){
						me.removeCurrentPopu();
					}
				});
				
				$.getDoc().mousedown(function(event,owner){
					var currentPopu=me.currentPopu;
					if(!currentPopu || 
						event.target==me.triggerOwner ||
						(owner && (currentPopu==owner ||  currentPopu.$owner==owner))
					){
						me.triggerOwner=null;
						return;
					}
					me.removeCurrentPopu();
					me.triggerOwner=null;
				});

				this.initEventListener=CF.emptyFunction;
			}
		},
		onRenderBefore:function(config){
			ui.logger(this);
			config.html=this.getClass().getTemplate(config);
		},
		onRender:function(config){
			ui.logger(this);
			config.boxcls=config.px+"-"+this._name_+"-popu";
			var div=$.createElement(ui.popu.getTemplate(config));
			if(this.$render){
				this.$render.append(div);
			}
			this.$elem=$(div);

			if(this.autoWidth){
				this.width= config.$offsetElement.outerWidth();
			}

			if(this.width){
				this.$elem.css("width",this.width);
			}

			
			if(this.height){
				this.$elem.css("height",this.height);
			}

			if(this.$offsetElement){
				var offsetParent=this.offsetParent;
				if(!offsetParent){
					var render=this.$render[0];
					if(/body|html/i.test(render.nodeName)){
						offsetParent=render;
					}else{
						offsetParent=render.offsetParent;
					}
					this.offsetParent=offsetParent;
				}
				this.resetOffset();
			}


			this.$elem.data(ui.popu.__is_popu__,true);
		},
		onBindEvent:function(){
			ui.logger(this);
			var me=this;
			this.$elem.mousedown(function(event){
				if(/^input$/i.test(event.target.tagName)){
					ui.popu.filterTriggerOwner(event.target)
				}else{
					event.stopBubble(me);
				}
			});
		},
		resetOffset:function(){
			ui.logger(this);
			if(this.$offsetElement){
				ui.popu.setOffset(this);
			}
		},
		onHideBefore : function(){
			ui.logger(this);
			if(this.isHide==true){
				return false;
			}
			if($.timestamp() - this.lastShowTimestamp<500){
				return false;
			}
		},
		onHide : function(){
			ui.logger(this);
			this.isHide=true;
			this.$elem.hide();
		},
		onHideAfter : function(){
			ui.logger(this);
			ui.popu.removeCurrentPopu(this);
		},
		onShowBefore:function(){
			ui.logger(this);
			if(this.isHide==false){
				return false;
			}
		},
		onShow :function(){
			ui.logger(this);
			this.isHide=false;
			this.$elem.show();
			this.lastShowTimestamp=$.timestamp();
			if(this.autoSetOffset!=false){
				this.resetOffset();
			}
		},
		onShowAfter:function(){
			ui.logger(this);
			ui.popu.setCurrentPopu(this);
		},
		show : function(){
			ui.logger(this);
			if(this.timeOutId){
				clearTimeout(this.timeOutId);
				this.timeOutId=null;
			}
			if(this.isHide==false){
				return;
			}
			this.on("show");
		},
		hide : function(){
			ui.logger(this);
			

			if(this.timeOutId || this.isHide==true){
				return;
			}
			var me=this;

			
			//this.timeOutId=setTimeout(function(){
				me.on("hide");
			//},500);
		},
		toggle : function(){
			ui.logger(this);
			if(this.isHide==false){
				this.on("hide");
			}else{
				this.on("show");
			}
		},
		setOffset : function(offset){
			ui.logger(this);
			var left=offset.left,top=offset.top;
			
			var width=this.$elem.outerWidth(true);
			var height=this.$elem.outerHeight(true);

			if(this.align){
				//right
				if(this.align.indexOf("r")>-1){
					left=offset.right;
				}
				//bottom
				if(this.align.indexOf("b")>-1){
					top=offset.bottom;
				}

				
				if(this.align.indexOf("c")>-1){
					left=offset.left - (width/2);
				}
			}

			var winHeight=window.innerHeight;
			var winWidth=window.innerWidth;
			if(left + width >winWidth){
				var _left_= offset.right - width;
				if(_left_>0){
					left=_left_;
				}
			}
			if(top + height >winHeight){
				var _top_= offset.top - height ;
				if(_top_>0){
					top=_top_;
				}
			}
			this.$elem.css({
				left : left,
				top : top
			});
		},
		remove:function(){
			ui.logger(this);
			ui.popu.removePopu(this);
			this.callSuperMethod();
		}
	});


})(CF,$,ui);