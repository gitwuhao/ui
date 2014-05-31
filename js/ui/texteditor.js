(function(CF,jQuery,ui){

	ui.texteditor={};


	CF.exportMethod(ui.texteditor,{
		_type_ : "ui",
		_name_ : "texteditor",
		_init:function(){
			var elem=$.createElement('<div class="x-ui-text-editor"><input type="text" /></div>');
			
			$.getBody().append(elem);
			
			this.$elem=$(elem);
			this.$text=this.$elem.children();

			this.$text.keydown(function(event){
				if(event.shiftKey && event.keyCode==8){
					this.value="";
				}
			});
			 
			this._init=CF.emptyFunction;
		},
		onEditor : function(config){
			this._init();
			
			this.hide();

			var $item=$(config.item);
			
			if(config.attr){
				this.$text.attr(config.attr);
				this.$text[0].type="text";
			}


			if(config.cls){
				this.$elem[0].className="x-ui-text-editor "+config.cls;
			}

			var offset=$item.offsetElement(document.body);
			
			this.$elem.css({
				left : offset.left,
				top : offset.top
			});

			this.$text.css({
				width : $item.innerWidth(),
				height : $item.innerHeight()
			});

			this.$elem.show();
			this.currentConfig=config;
		},
		//&& !/\s*type\s*/i.test(key)
		hide:function(){
			if(this.currentConfig){
				this.$elem.hide();
				this.$elem[0].className="x-ui-text-editor";
				var attr=this.currentConfig.attr;
				for(var key in attr){
					if(key){
						this.$text.removeAttr(key);
					}
				}
				this.$text[0].type="text";
				delete this.currentConfig;
			}
		}
	});
 




})(CF,jQuery,ui);