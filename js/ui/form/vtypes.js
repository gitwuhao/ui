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
/*		enterToTab:function(item){
			item.addEventListener('textkeydown',function(event){
				 if(event.keyCode==13){
				 }
			});
		},
*/
		enterToChange:function(item){
			item.addEventListener('textkeydown',function(event){
				 if(event.keyCode==13){
					this.$text.blur();
				 }
			});

			item.addEventListener('textblur',function(event){
				this.on('change');
			});

		},
		spin:function(item){
			item.defaultValue=item.defaultValue || 0;
			item.value=item.defaultValue;
			item.maxValue=item.maxValue || 999;
			item.minValue=item.minValue || 0;
			item.spinUp=function(){
				if(this.maxValue > this.value){
					this.value++;
					this.setValue(this.value);
				}
			};

			item.spinDown=function(){
				if(this.minValue < this.value){
					this.value--;
					this.setValue(this.value);
				}
			};
			
			item.$icon.addClass(item.px+'-spinner-icon');
			
			item.addEventListener('iconmousedown',function(event){
				var height=event.target.offsetHeight/2;
				if( height > event.offsetY){
					this.spinUp();
				}else{
					this.spinDown();
				}
			});


			/*
			*
			*addEvent()
			*
			*/
			item.addEventListener('mousewheel',function(event){
				if(event.originalEvent.wheelDelta>0){
					this.spinUp();
				}else{
					this.spinDown();
				}
				this.focus();
			});
		},
		'int' : function(item){
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
					this.spinUp(); 
				 }else if(event.keyCode==40 && this.spinDown){
					 this.spinDown();
				}else if(!event.shiftKey && (event.keyCode>=48 && event.keyCode<=57)){

				//}else if(event.shiftKey || 
				//	 (event.keyCode>=65 && event.keyCode<=90) || 
				//	 (event.keyCode>=187 && event.keyCode<=222)){
					
				 }else{
					event.stopBubble(this);
				 }
				//console.info(event.keyCode);
			});

			
			item.setValue=function(value){
				if(value){
					value=parseInt(value);
					if(isNaN(value)){
						value="";
					}
				}

				if(value==""){
					this.value=this.defaultValue;
					this.$text.val("");
				}else{
					this.value=value;
					this.$text.val(value);
				}
			};

	
		},	
		pxToPercent:function(item){
			item.$icon.css('cursor','pointer');
			item.addEventListener('iconmousedown',function(event){
				if(this.unit=="px"){
					this.unit="%";
				}else{
					this.unit="px";
				}
				this.percentValue=0;
				this.setValue("");
				this.$icon.text(this.unit);
			});


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
		
		},
		intText:'只能输入整数',
		email:function(item){
			
		
		},
		emailText:'只能输入整数',
		url:function(item){
			
		
		},
		urlText:'只能输入整数'
	};


})(CF,$,ui);