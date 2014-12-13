(function(CF,$,ui){

	ui.form.radio=function(render){
		this.callSuperMethod();
	};

	ui.extend(ui.form.radio,ui.form.field,{
		_type_ : "ui.form",
		_name_ : "radio",
		statics:{
			css:{
				_c_radio : '-radio',
				_c_radio_group : '-radio-group',
				_c_icon : '-icon',
				_c_label : '-label'
			},
			getTemplate: function(config){
				var cloneConfig={};
				CF.merger(cloneConfig,config);
				ui.widget.applyCSS(config,this.css);
				var html=[];
				var items=config.items;
				for(var i=0,len=items.length;i<len;i++){
					var item=items[i];
					item.name=config.name;
					html.push('<div class="',config._c_radio_group,' ',(item.cls||''),'"');
					if(item.width){
						html.push(' style="width:',item.width,'px;" ');
					}
					html.push('><input type="button" class="',config._c_icon,
								'" value="',item.value,'"/>');
					if(item.label){
						html.push('<span>',item.label,'</span>');
					}
					html.push('</div>');
				}
				cloneConfig.html=html.join('');
				cloneConfig.type='radio';
				return this.getFieldTemplate(cloneConfig);
			}
		},
		onRenderAfter:function(config){
			ui.logger(this);
			var elem=this.$elem;
			var children=$('.'+this._c_radio_group,elem);
			var items=this.items;
			for(var i=0,len=items.length;i<len;i++){
				var item=items[i];
				item.$elem=$(children[i]);
				item.$input=item.$elem.children("input:first");
			}
			
			if(this.isDisabled){
				this.disabled();
			}
		},
		onBindEvent:function(){
			ui.logger(this);
			var me=this;
			var items=this.items;

			for(var i=0,len=items.length;i<len;i++){
				var item=items[i];
				this.bindItemEvent(item);
				if(item.checked){
					this.on('checked',item);
				}else{
					item.checked=false;
				}
			}
		},
		bindItemEvent:function(item){
			ui.logger(this);
			
			this.bindHover(item.$elem);
			
			item.$owner=this;


			item.$input.focus({
				item : item,
				me : this,
			},function(event){
				event.data.me.on('focus',event.data.item);
			});

			/*
			item.$input.keydown({
				item : item,
				me : this,
			},function(event){
				if(event.keyCode==27 ||
					 event.keyCode==32 ||
					 event.keyCode==13 ||
					 event.keyCode==9 ||
					 event.ctrlKey  || event.altKey  || event.shiftKey){
					return;
				}
				event.preventDefault();
				event.stopPropagation();
			});
			*/

			item.$input.blur({
				item : item,
				me : this,
			},function(event){
				event.data.me.on('blur');
			});


			item.$elem.click({
				item : item,
				me : this,
			},function(event){
				var _item_=event.data.item;
				var me=event.data.me;
				if(me.isDisabled!=true){
					me.focus(_item_);
					me.on('click',_item_);
					if(me.on('checked',_item_)!=false){	
						me.setValue(me.currentItem.value);
						me.on('change',_item_);
					}
				}
			});
		},
		focus : function(item){
			ui.logger(this);
			if(item){
				this.currentItem=item;
			}
			if(this.currentItem){
				item.$input.focus();
			}
		},
		onFocusAfter:function(item){
			ui.form.field.setActive(this);
			if(this.currentItem && this.currentItem!=item){
				this.currentItem.$elem.removeClass("selected");
			}
			item.$elem.addClass("selected");
			this.currentItem=item;
			this.isFocus=true;
		},
		onBlurAfter : function(){
			if(this.currentItem){
				this.currentItem.$elem.removeClass("selected");
			}
			this.isFocus=false;
		},
		onUnChecked:function(item){
			ui.logger(this);
			item.checked=false;
			item.$elem.removeClass("checked");
			item.$input.attr("name","");
		},
		onChecked:function(item){
			ui.logger(this);
			if(this.checkedItem && this.checkedItem!=item){
				this.on('unChecked',this.checkedItem);
			}else if(this.checkedItem && this.checkedItem==item && item.checked){
				return false;
			}
			var checked=item.checked;
			item.checked=true;
			item.$elem.addClass("checked");
			item.$input.attr("name",item.name);
			this.currentItem=item;
			this.checkedItem=item;
		},
		onDisabled:function(){
			var items=this.items;
			for(var i=0,len=items.length;i<len;i++){
				items[i].$input[0].disabled=true;
			}
		},
		onEnabled:function(){
			var items=this.items;
			for(var i=0,len=items.length;i<len;i++){
				items[i].$input[0].disabled=false;
			}
		},
		getValue:function(){
			return this.checkedItem.value;
		},
		setValue:function(value){
			ui.logger(this);
			if(this.callSuperMethod()==false || (this.checkedItem && this.checkedItem.value==value)){
				return;
			}
			for(var i=0,len=this.items.length;i<len;i++){
				var item=this.items[i];
				if(item.value==value){
					this.on("checked",item);
				}else{
					this.on("unChecked",item);
				}
			}
		}
	});


})(CF,$,ui);