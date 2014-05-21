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
		spin:function(item){
			item.value=item.defaultValue || 0;
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
			
			item.onIconMouseDown=function(event){
				var height=event.target.offsetHeight/2;
				if( height > event.offsetY){
					this.spinUp();
				}else{
					this.spinDown();
				}
			};

			item.$elem.bind("mousewheel",function(event){
				if(item.isDisabled!=true){
					if(event.originalEvent.wheelDelta>0){
						item.spinUp();
					}else{
						item.spinDown();
					}
					item.focus();
					event.stopBubble(item);
				}
			});

		},
		'int' : function(item){
			item.value=item.defaultValue || 0;
			item.maxValue=item.maxValue || 999;
			item.minValue=item.minValue || 0;
			
			item.$text.keydown(function(event){
				 if(event.keyCode==6 || 
					 event.keyCode==8 || 
					 event.keyCode==9 || 
					 event.keyCode==37 || 
					 event.keyCode==39 || 
					 event.ctrlKey  || event.altKey ){
					return;
				 }else if(event.keyCode==38 && item.spinUp){
					item.spinUp(); 
				 }else if(event.keyCode==40 && item.spinDown){
					 item.spinDown();
				}else if(!event.shiftKey && (event.keyCode>=48 && event.keyCode<=57)){

				//}else if(event.shiftKey || 
				//	 (event.keyCode>=65 && event.keyCode<=90) || 
				//	 (event.keyCode>=187 && event.keyCode<=222)){
					
				 }else{
					event.stopBubble(item);
				 }
				//console.info(event.keyCode);
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