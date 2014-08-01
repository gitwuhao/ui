(function(CF,$,ui){

	ui.form.vtypes={
		_type_ : "ui.form",
		_name_ : "vtypes",
		register:function(item){
			var vtype,
				vtypes=item.vtype;
			if(vtypes._isString_){
				vtypes=[vtypes];
			}

			for(var i=0,len=vtypes.length;i<len;i++){
				vtype=vtypes[i];
				if(this[vtype]){
					this[vtype](item);
				}
			}
		},
		__IS_MOUSE_WHEEL__:'__IS_MOUSE_WHEEL__',
		bindMouseWheel : function($text,handle,arg){
			$text.data(ui.form.vtypes.__IS_MOUSE_WHEEL__,{
				handle: handle,
				arg : arg
			});
			if(this.isBindMouseWheelEventListener){
				return;
			}
			$.getBody().on("mousewheel",function(event){
				var target=document.activeElement,
					_data_=$.data(target,ui.form.vtypes.__IS_MOUSE_WHEEL__);
				if(_data_ && _data_.handle){
					return _data_.handle(event,_data_.arg);
				}
			});
		},
/*		enterToTab:function(item){
			item.addEventListener('textkeydown',function(event){
				 if(event.keyCode==13){
				 }
			});
		},
*/
		enterToChange : function(item){
			item.addEventListener('textkeydown',function(event){
				 if(event.keyCode==13){
					this.$text.blur();
				 }
			});

			/*
			item.addEventListener('textblur',function(event){
				this.on('change');
			});
			*/

		},
		spin : function(item){
			item.defaultValue=item.defaultValue || 0;
			item.value=item.defaultValue;
			item.maxValue=item.maxValue || 999;
			item.minValue=item.minValue || 0;
			item.iValue=item.iValue || 1;
			item.shiftIValue=item.shiftIValue || 10;


			item.spinUp=function(event){
				var v=this.iValue;
				if(event.shiftKey){
					v=this.shiftIValue;
				}else if(event.altKey){

				}
				this.value=$.toNumber(this.value);
				var value=this.value;
				if(this.maxValue <= this.value + v){
					v=this.maxValue - this.value;
				}
				value+=v;
				if(value!=this.value){
					if(this.on('spinUp',v,value)!=false){
						this.setValue(value);
					}
				}
			};

			item.spinDown=function(event){
				var v=this.iValue;
				if(event.shiftKey){
					v=this.shiftIValue;
				}else if(event.altKey){

				}

				this.value=$.toNumber(this.value);
				var value=this.value;
				if(this.minValue >= this.value - v){
					v=this.value - this.minValue;
				}
				value-=v;
				if(value!=this.value){
					if(this.on('spinDown',-v,value)!=false){
						this.setValue(value);
					}
				}
			};

			if(!item.unit){

				item.$icon.addClass(item.px+'-spinner-icon');

				item.addEventListener('iconmousedown',function(event){
					var height=event.target.offsetHeight/2;
					if( height > event.offsetY){
						this.spinUp(event);
					}else{
						this.spinDown(event);
					}
				});

			}

			item.addEventListener('spinwheel',function(event){
				if(event.originalEvent.wheelDelta>0){
					this.spinUp(event);
				}else{
					this.spinDown(event);
				}
			});

			this.bindMouseWheel(item.$text,function(event,arg){
				if(arg.me.isDisabled==true){
					return false;
				}
				arg.me.trigger("spinwheel",event);
			},{
				me :item
			});

			this.int(item);
		},
		'int' : function(item){
			if(item.isIntVType){
				return;
			}
			item.defaultValue=item.defaultValue || 0;
			item.value=item.defaultValue;
			item.maxValue=item.maxValue || 999;
			item.minValue=item.minValue || 0;

			item.addEventListener('textkeydown',function(event){
				 if(event.keyCode==6 ||
					 event.keyCode==8 ||
					 event.keyCode==9 ||
					 event.keyCode==37 ||
					 event.keyCode==39 ||
					 event.ctrlKey  || event.altKey ){
					return;
				 }else if(event.keyCode==38 && this.spinUp){
					this.spinUp(event);
				 }else if(event.keyCode==40 && this.spinDown){
					this.spinDown(event);
				}else if(!event.shiftKey &&
					((event.keyCode>=96 && event.keyCode<=105) ||
					(event.keyCode>=48 && event.keyCode<=57))){
					return;
				}
				//}else if(event.shiftKey ||
				//	 (event.keyCode>=65 && event.keyCode<=90) ||
				//	 (event.keyCode>=187 && event.keyCode<=222)){
				//}else{
				//	event.stopBubble(this);
				//}
				//console.info(event.keyCode);

				event.preventDefault();
				event.stopPropagation();

			});


			item.addEventListener('setvalue',function(value){
				if(isNaN(value)){
					value="";
				}else{
					value=parseInt(value);
				}
				this.value=value;
			});

			item.isIntVType=true;

		},
		pxToPercent:function(item){
			item.$icon.addClass('px-to-percent');
			item.addEventListener('iconmousedown',function(event){
				if(this.unit=="px"){
					this.setUnit("%");
				}else{
					this.setUnit("px");
				}
			});

			item.setUnit=function(unit){
				if(unit=="px"){
					this.unit="px";
				}else{
					this.unit="%";
				}
				this.percentValue=0;
				this.setValue("");
				this.$icon.text(this.unit);
			};

			item.addEventListener('mousewheel',function(event){
				if(this.unit=="%"){
					var wheelDelta=event.originalEvent.wheelDelta;
					if(wheelDelta>0 && this.percentValue<100){
						this.percentValue++;
					}else if(wheelDelta<0 && this.percentValue > 0){
						this.percentValue--;
					}else{
						return;
					}
					this.setValue(this.percentValue);
				}
			});

			item.addEventListener('setvalue',function(value){
				if(this.unit=="%" && value>100){
					this.value=100;
				}
			});
		},
		matchUnit : function(value){
			var rs=value.match(/(\d+)(%|px)/i);
			if(rs==null){
				rs=[value,value,'px'];
			}
			return rs;
		},
		'clear':function(item){
			item._clear_icon=item.px+'-clear-icon';

			item.addEventListener('textfocus',function(event){
				if(event.target.value.length>0){
					this.$icon.addClass(this._clear_icon);
					this.isClearState=true;
				}
			});

			item.addEventListener('textblur',function(event){
				if(this.isClearState){
					this.$icon.removeClass(this._clear_icon);
					this.isClearState=false;
				}
			});


			item.addEventListener('iconmousedown',function(event){
				if(this.isClearState){
					this.setValue("");
				}
			});


			item.addEventListener('setvalue',function(value){
				if(value==""){
					this.$icon.removeClass(this._clear_icon);
					this.isClearState=false;
				}
				this.value=value;
			});

		}
	};


})(CF,$,ui);