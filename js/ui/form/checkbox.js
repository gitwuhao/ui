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
					html.push('><input type="button" class="',config._c_icon,
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
					me.onChecked(item);
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

			item.$input.blur({
				item : item,
				me : this,
			},function(event){
				event.data.me.on('blur',event.data.item);
			});
 
			item.$elem.click({
				item : item,
				me : this,
			},function(event){
				var _item_=event.data.item;
				var me=event.data.me;
				if(me.isDisabled!=true){
					if(event.shiftKey){
						me.checkedAll();
					}else if(event.ctrlKey){
						me.unCheckedAll();
						me.checked(_item_);
					}else if(event.altKey){
						me.reverseChecked();
					}else{
						me.checked(_item_);
					}
					me.focus(_item_);
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
		checked : function(item){
			if(!item){
				item=this.items[0];
			}
			if(item.checked){
				this.on("unChecked",item);
			}else{
				this.on("checked",item);
			}
		},
		onUnChecked:function(item){
			ui.logger(this);
			var checked=item.checked;
			item.checked=false;
			item.$elem.removeClass("checked");
			item.$input.attr("name","");
			if(checked!=false){
				this.on('change',item);
			}
		},
		onChecked:function(item){
			ui.logger(this);
			var checked=item.checked;
			item.checked=true;
			item.$elem.addClass("checked");
			item.$input.attr("name",item.name);
			if(checked!=true){
				this.on('change',item);
			}
		},
		checkedAll : function(){
			ui.logger(this);
			var items=this.items;
			for(var i=0,len=items.length;i<len;i++){
				this.on("checked",items[i]);
			}
		},
		unCheckedAll : function(){
			ui.logger(this);
			var items=this.items;
			for(var i=0,len=items.length;i<len;i++){
				this.on("unChecked",items[i]);
			}
		},
		reverseChecked:function(){
			var items=this.items;
			for(var i=0,len=items.length;i<len;i++){
				this.checked(items[i]);
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
			this.callSuperMethod();
			values=values||[];
			for(var i=0,len=this.items.length;i<len;i++){
				var item=this.items[i];
				for(var n=0,nlen=values.length;n<nlen;n++){
					if(item.value==values[n]){
						this.on("checked",item);
					}else{
						this.on("unChecked",item);
					}
				}
			}
		}
	});


})(CF,$,ui);