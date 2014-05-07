(function(CF,$,ui){

	ui.popu=function(){
		this.callSuperMethod();
	};

	ui.extend(ui.popu,ui.widget,{
		_type_ : "ui",
		_name_ : "popu",
		statics:{
			_c_popu_box : ui.cssPrefix+'-popu',
			getTemplate: function(config){
				return ['<div class="',this._c_popu_box," ",(config.boxcls||""),
							" ",(config.cls||""),'">',
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
				CF.logger(this.prototype,arguments);
				if(this.currentPopu && this.currentPopu!=popu){
					this.currentPopu.on("hide");
				}
				this.currentPopu=popu;
				this.initEventListener();
			},
			removeCurrentPopu:function(){
				CF.logger(this.prototype,arguments);
				if(this.currentPopu){
					this.currentPopu.on("hide");
				}
				this.currentPopu=null;
			},
			initEventListener : function(){
				var me=this;
				$.getDoc().keydown(function(event){
					CF.logger(me.prototype,arguments);
					if(event.keyCode==27){
						me.removeCurrentPopu();
					}
				});
				
				$.getDoc().mousedown(function(event,owner){
					CF.logger(me.prototype,arguments);
					var currentPopu=me.currentPopu;
					if(!currentPopu || (owner && currentPopu.$owner==owner)){
						return;
					}

					me.removeCurrentPopu();
					
					/*

					
					var targetCSS=target.className;

					if(targetCSS.indexOf(popuCSS)>-1){
						return;
					}

					var popuCSS=me._c_popu_box;
					var offsetParent=target.offsetParent;


					while(offsetParent){
						var parentCss=offsetParent.className;
						if( parentCss.indexOf(popuCSS)>-1){
							return;
						}else if(/body|html/gi.test(offsetParent.nodeName)){
							break;
						}
						offsetParent=offsetParent.offsetParent;
					}



					if(currentPopu && currentPopu.lastShowTimestamp){
						if($.timestamp()-currentPopu.lastShowTimestamp>200){
							me.removeCurrentPopu();
						}
					}

					*/
				});

				this.initEventListener=CF.emptyFunction;
			}
		},
		onRenderBefore:function(config){
			CF.logger(this,arguments);
			config.html=this._class_.getTemplate(config);
		},
		onRender:function(config){
			CF.logger(this,arguments);
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
			CF.logger(this,arguments);
			this.$elem.mousedown(function(event){
				event.stopBubble();
			});
		},
		resetOffset:function(){
			CF.logger(this,arguments);
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
			CF.logger(this,arguments);
			if(this.isHide==true){
				return false;
			}
		},
		onHide : function(){
			CF.logger(this,arguments);
			this.isHide=true;
			this.$elem.hide();
		},
		onHideAfter : function(){
			CF.logger(this,arguments);
			ui.popu.removeCurrentPopu(this);
		},
		onShowBefore:function(){
			CF.logger(this,arguments);
			if(this.isHide==false){
				return false;
			}
		},
		onShow :function(){
			CF.logger(this,arguments);
			if(this.autoSetOffset!=false){
				this.resetOffset();
			}
			this.isHide=false;
			this.$elem.show();
			this.lastShowTimestamp=$.timestamp();
		},
		onShowAfter:function(){
			CF.logger(this,arguments);
			ui.popu.setCurrentPopu(this);
		},
		show : function(){
			CF.logger(this,arguments);
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
			CF.logger(this,arguments);
			if(this.timeOutId || this.isHide==true){
				return;
			}
			var me=this;
			this.timeOutId=setTimeout(function(){
				me.on("hide");
			},500);
		},
		toggle : function(){
			CF.logger(this,arguments);
			if(this.isHide==false){
				this.on("hide");
			}else{
				this.on("show");
			}
		},
		setOffset : function(left,top){
			CF.logger(this,arguments);
			this.$elem.css({
				left : left,
				top : top
			});
		}
	});


})(CF,$,ui);