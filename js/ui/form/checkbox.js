(function(CF,$,ui){

	ui.form.checkbox=function(render){
		this.callSuperMethod();
	};

	ui.extend(ui.form.checkbox,ui.form.field,{
		_type_ : "ui.form",
		_name_ : "checkbox",
		statics:{
			css:{
				_c_checkbox : '-checkbox',
				_c_checkbox_group : '-checkbox-group',
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
					html.push('<div class="',config._c_checkbox_group,' ',(item.cls||''),'"');
					if(item.width){
						html.push(' style="width:',item.width,'px;" ');
					}
					html.push('><input type="text" readonly class="',config._c_icon,
								'" value="',item.value,'"/>');
					if(item.label){
						html.push('<span>',item.label,'</span>');
					}
					html.push('</div>');
				}
				cloneConfig.html=html.join('');
				cloneConfig.type='checkbox';
				return this.getFieldTemplate(cloneConfig);
			}
		},
		onRenderAfter:function(config){
			ui.logger(this);
			var elem=this.$elem;

			var children=$('.'+this._c_checkbox_group,elem);

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
					me.on("checked",item);
				}else{
					item.checked=false;
				}
			}
			this.itemsToMap();
		},
		bindItemEvent:function(item){
			ui.logger(this);
		
			this.bindHover(this.$elem);
			
			
			item.$owner=this;

			item.$input.focus({
				item : item,
				me : this,
			},function(event){
				event.data.me.on('focus',event.data.item);
			});

			item.$input.blur({
				item : item,
				me : this,
			},function(event){
				event.data.me.on('blur',event.data.item);
			});


			item.$input.keydown({
				item : item,
				me : this,
			},function(event){
				if(event.keyCode==27 ||
					 event.keyCode==9 ||
					 event.ctrlKey  || event.altKey  || event.shiftKey){
					return;
				}else if(event.keyCode==13 || event.keyCode==32 ){
					event.data.item.$elem.click();
					return;
				}
				event.preventDefault();
				event.stopPropagation();
			});


			item.$elem.click({
				item : item,
				me : this,
			},function(event){
				var _item_=event.data.item;
				var me=event.data.me;
				if(me.isDisabled!=true){
					me.focus(_item_);
					if(event.shiftKey){
						me.checkedAll();
					}else if(event.ctrlKey && event.altKey){
						me.reverseChecked();
					}else if(event.ctrlKey){
						me.unCheckedAll(_item_);
					}else{
						me.checked(_item_);
					}
				}
			});
		},
		focus : function(item){
			ui.logger(this);
			if(item){
				item.$input.focus();
			}
		},
		onFocusAfter:function(item){
			if(!this.currentItem){
				ui.form.field.setActive(this);
			}
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
			this.currentItem=null;
		},
		onUnChecked:function(item){
			ui.logger(this);
			var checked=item.checked;
			if(!item.$input[0].name && !item.$elem.hasClass('checked')){
				return false;
			}
			item.checked=false;
			item.$elem.removeClass("checked");
			item.$input.attr("name","");
		},
		onChecked:function(item){
			ui.logger(this);
			var checked=item.checked;
			if(item.$input[0].name && item.$elem.hasClass('checked')){
				return false;
			}
			item.checked=true;
			item.$elem.addClass("checked");
			item.$input.attr("name",item.name);
		},
		checked : function(item){
			ui.logger(this);
			if(!item){
				item=this.items[0];
			}
			var result=null;
			if(item.checked){
				result=this.on("unChecked",item);
			}else{
				result=this.on("checked",item);
			}
			if(result!=false){
				this.on('change',item);
			}
		},
		checkedAll : function(){
			ui.logger(this);
			var items=this.items;
			for(var i=0,len=items.length;i<len;i++){
				var item=items[i];
				if(this.on("checked",item)!=false){
					this.on('change',item);
				}
			}
		},
		unCheckedAll : function(item){
			ui.logger(this);
			var items=this.items;
			for(var i=0,len=items.length;i<len;i++){
				var _item_=items[i];
				var result=null;
				if(item==_item_){
					result=this.on("checked",_item_);
				}else{
					result=this.on("unChecked",_item_);
				}
				if(result!=false){
					this.on('change',_item_);
				}
			}
		},
		reverseChecked:function(){
			var items=this.items;
			for(var i=0,len=items.length;i<len;i++){
				var item=items[i];
				if(this.checked(item)!=false){
					this.on('change',item);
				}
			}
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
			var values=[];
			var items=this.items,
				item;
			for(var i=0,len=items.length;i<len;i++){
				item=items[i];
				if(item.checked){
					values.push(item.value);
				}
			}
			return values;
		},
		setValue:function(values){
			ui.logger(this);
			if(this.callSuperMethod()==false){
				return;
			}
			if(!values || values.length==0){
				values=['__|__'];
			}
			for(var n=0,nlen=values.length;n<nlen;n++){
				var value=values[n];
				for(var i=0,len=this.items.length;i<len;i++){
					var item=this.items[i];
					if(item.value==value){
						this.on("checked",item);
					}else{
						this.on("unChecked",item);
					}
				}
			}
		}
	});


})(CF,$,ui);