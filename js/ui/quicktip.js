(function(CF,jQuery,ui){

	var QuickTip=function(){
		this.callSuperMethod();
	};

	ui.extend(QuickTip,ui.widget,{
		_name_ : "QuickTip",
		statics:{
			css:{
				_c_qtip_box: '-qtip-box',
				_c_qtip_arrow_box: '-qtip-arrow-box',
				_c_qtip_body: '-qtip-body'
			},
			OK: [0],
			YES: [1],
			NO: [2],
			CANCEL: [3],
			YESNO: [1,2],
			OKCANCEL: [0,3],
			YESNOCANCEL: [1,2,3],
			INFO: "info",
			QUESTION: "question",
			WARNING: "warning",
			ERROR: "error",
			buttonText: {
				ok: '确认',
				yes: '是',
				no: '否',
				cancel: '取消'
			}
		},
		onRenderBefore:function(config){
			ui.logger(this);
			var html=['<div class="',config._c_message_box,'">',
					  '<div class="',config._c_icon,' ',MessageBox.INFO,'"></div>',
					  '<div class="',config._c_message_text,'"></div>',
					'</div>',
					'<div class="',config._c_progress_box,'"></div>'];
			var me=this;
			config.title='提示信息';
			config.html=html.join("");
			var buttons=[
				'ok', 'yes', 'no', 'cancel'
			];
			for(var i=0,len=buttons.length;i<len;i++){
				var type=buttons[i];
				buttons[i]={
					label: MessageBox.buttonText[type],
					type: type,
					handle : function(){
						me.handle(this.type);
					}
				};
			}
			config.buttons=buttons;
			this.buttons=buttons;
			this.callSuperMethod();

			this.closeIcon.handle=function(event){
				me.handle('cancel');
				me.close();
			};
		},
		onRenderAfter:function(){
			ui.logger(this);
			this.callSuperMethod();
			
			var $elem=this.$elem;
			this.$elem.addClass(this._c_message);

			var $body=this.$body;
			
			this.$messagebox=$body.children("."+this._c_message_box+':first');
			this.$progressbox=$body.children("."+this._c_progress_box+':first');

			this.$icon=this.$messagebox.children("."+this._c_icon+':first');
			this.$msgtext=this.$messagebox.children("."+this._c_message_text+':first');

		},
		reconfig:function(config){
			ui.logger(this);
			
			this.setConfig(config);
			
			this.$elem[0].className=this._c_window + ' ' + this._c_message + '  border-box';

			var buttonValue = config.button || MessageBox.OKCANCEL;
			
			this.$tile.text(config.title);
			
			this.$icon[0].className=this._c_icon + ' ' + config.icon;
			
			this.$msgtext.text(config.msg);
			
			var buttons=this.buttons;
			for(var i=0,len=buttons.length;i<len;i++){
				var button=buttons[i];
				button.$elem.css("display","none");
			}
	
			for(var i=0,len=buttonValue.length;i<len;i++){
				var button=this.buttons[buttonValue[i]];
				var $elem=button.$elem;
				$elem.css("display","");
				var buttonText=config.buttonText;
				if(buttonText && buttonText[i]){
					$elem.text(buttonText[i]);
				}
			}
		},
		show:function(config){
			ui.logger(this);
			this.reconfig(config);
			this.$mask.show();
			this.$elem.show();
			this.resetOffset();
		},
		confirm:function(){
			
		},
		alert:function(){
		
		
		},
		progress:function(config){
			ui.logger(this);
			config.type="progress";
			this.setConfig(config);
			this.$elem[0].className=this._c_window+" "+this._c_progress;
			this.$progressbox.html(config.html);
			this.getSuper().show.call(this,config);
		},
		getQuickTip:function(){
			ui.logger(this);
			if(this.$quickTip){
				return;
			}
			var html=['<div class="',this._c_qtip_box,'">',
				'<div class="',this._c_qtip_arrow_box,'">',
					'<div class="',this._c_icon,' top"></div>',
					'<div class="',this._c_icon,' right"></div>',
					'<div class="',this._c_icon,' bottom"></div>',
					'<div class="',this._c_icon,' left"></div>',
				'</div>',
				'<div class="',this._c_qtip_body,'">',
				'</div>',
			'</div>'];
			
			var quickTip=jQuery.createElement(html.join(''));
			this.$body.append(quickTip);
			this.$quickTip=$(quickTip);
			
			this.$quickTipArrowBox=this.$quickTip.children('.'+this._c_qtip_arrow_box+':first');
			this.$quickTipArrowTop=this.$quickTipArrowBox.children('.top:first');
			this.$quickTipArrowRight=this.$quickTipArrowTop.next();
			this.$quickTipArrowBottom=this.$quickTipArrowRight.next();
			this.$quickTipArrowLeft=this.$quickTipArrowBottom.next();

			this.$quickTipBody=this.$quickTipArrowBox.next();

			var me=this;
			this.$quickTipBody.click(function(event){
				me.handle();
				me.close();
			});
		},
		setQuickTipOffset:function(target){
			ui.logger(this);
			var $target=$(target);
			var offset=$target.offsetElement(document.body);
			var left=offset.left;
			var top=offset.top;

			var maxWidth=window.innerWidth;
			var maxHeight=window.innerHeight;
			
			var width=this.$elem.width();
			var height=this.$elem.height();

			var targetWidth=$target.outerWidth();
			var targetHeight=$target.outerHeight();

			var align,qLeft,qTop,$arrow,arrowLeft;
			
			if(top + height + targetHeight > maxHeight){
				qTop = top - height;
				align='bottom';
			}else{
				qTop= top + targetHeight;
				align='top';
			}
			
			if(align=='bottom'){
				this.$quickTipArrowTop.css("display","none");
				$arrow=this.$quickTipArrowBottom;
			}else{
				this.$quickTipArrowBottom.css("display","none");
				$arrow=this.$quickTipArrowTop;
			}

			if(left + width>maxWidth){
				qLeft = maxWidth - width;
			}else if(left  - 10 - width < 0){
				qLeft = 0;
			}else{
				qLeft = left;
			}


			if(width>targetWidth){
				arrowLeft=(width-30)/2;
			}else{
				arrowLeft=(targetWidth/2);
			}
			
			$arrow.css({
				left : arrowLeft,
				display : "block"
			});

			if(qLeft + arrowLeft > left + targetWidth){
				qLeft=left - arrowLeft;
			}

			this.$elem.css({
				left : qLeft,
				top : qTop
			});

		},
		delConfirm:function(config){
			ui.logger(this);
			
			config.type="quickTip";
			this.setConfig(config);
			this.$elem[0].className=this._c_window+" "+this._c_qtip;
			this.getQuickTip();
			
			this.$quickTipBody.html(config.html);
			
			var me=this;
			this.$mask.one('click',function(event){
				me.close();
			});
			this.setQuickTipOffset(config.target);
			this.$mask.show();
			this.$elem.show();
		},
		handle:function(type){
			ui.logger(this);
			if(this.config.handle){
				this.config.handle(type);
			}
		},
		setConfig:function(config){
			ui.logger(this);
			this.config=config;
		}
	});

	var instance;

	function getInstance(){
		if(!instance){
			instance=new MessageBox();
		}
		return instance;
	};

	ui.messagebox={};
	

	CF.merger(ui.messagebox,MessageBox.statics,{
		show:function(config){
			getInstance().show(config);
		},
		confirm:function(config){
			getInstance().confirm(config);
		},
		alert:function(config){
			getInstance().alert(config);
		},
		wait:function(config){
		
		},
		progress:function(config){
			getInstance().progress(config);
		},
		hide:function(){
			getInstance().close();
		},
		delConfirm:function(config){
			getInstance().delConfirm(config);
		},
		quickTip : function(context){
			
		}
	});

	delete ui.messagebox.css;



})(CF,jQuery,ui);