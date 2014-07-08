(function(CF,$,ui){

	ui.popu=function(){
		this.callSuperMethod();
	};

	ui.extend(ui.popu,ui.widget,{
		_name_ : "popu",
		statics:{
			_c_popu_box : ui.cssPrefix+'-popu',
			getTemplate: function(config){
				return ['<div class="',this._c_popu_box," ",(config.boxcls||""),
							" ",(config.cls||""),' border-box">',
							(config.html||''),
						'</div>'].join('');
			},
			setOffset:function(config){
				var popu=config.popu,
					$offsetElement=config.$offsetElement,
					offsetParent=config.offsetParent,
					align=config.align;
				
				var offset=$offsetElement.offsetElement(offsetParent);
				var left=offset.left;
				var top=offset.top;

				if(align){
					//right
					if(align.indexOf("r")>-1){
						left=left + $offsetElement.outerWidth(true);
					}

					//bottom
					if(align.indexOf("b")>-1){
						top=top + $offsetElement.outerHeight(true);
					}
				}
				popu.setOffset(left,top);
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
			initEventListener : function(){
				var me=this;
				$.getDoc().keydown(function(event){
					if(event.keyCode==27){
						me.removeCurrentPopu();
					}
				});
				
				$.getDoc().mousedown(function(event,owner){
					var currentPopu=me.currentPopu;
					if(!currentPopu || event.target==me.triggerOwner || (owner && (currentPopu==owner ||  currentPopu.$owner==owner))){
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
				ui.popu.setOffset({
					popu : this,
					$offsetElement : this.$offsetElement,
					offsetParent : this.offsetParent,
					align : this.align
				});
			}
		},
		onHideBefore : function(){
			ui.logger(this);
			if(this.isHide==true){
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
			if(this.autoSetOffset!=false){
				this.resetOffset();
			}
			this.isHide=false;
			this.$elem.show();
			this.lastShowTimestamp=$.timestamp();
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
			
			this.timeOutId=setTimeout(function(){
				me.on("hide");
			},500);
		},
		toggle : function(){
			ui.logger(this);
			if(this.isHide==false){
				this.on("hide");
			}else{
				this.on("show");
			}
		},
		setOffset : function(left,top){
			ui.logger(this);
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