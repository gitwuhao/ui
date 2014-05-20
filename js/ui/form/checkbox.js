(function(CF,$,ui){

	ui.form.checkbox=function(render){
		this.callSuperMethod();
	};

	ui.extend(ui.form.checkbox,ui.form.item,{
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
					html.push('<div class="',config._c_checkbox_group,'">',
							'<input type="button" class="',config._c_icon,
								'" value="',item.value,'"/>',
							'<span>',item.label,'</span>',
						  '</div>');
				}
				cloneConfig.html=html.join('');
				cloneConfig.type='checkbox';
				return this.getItemTemplate(cloneConfig);
			}
		},
		onRenderAfter:function(config){
			CF.logger(this,arguments);
			var elem=this.$elem;

			this.$label=$("."+config._c_label+":first",elem);

			var children=elem.children("td:last").children();

			var items=this.items;
			for(var i=0,len=items.length;i<len;i++){
				var item=items[i];
				item.$elem=$(children[i]);
				item.$input=item.$elem.children("input:first");
			}
			this.callSuperMethod();
		},
		onBindEvent:function(){
			CF.logger(this,arguments);
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
			var me=this;

			this.setData(item.$input[0],item);
			this.setData(item.$elem[0],item);

			this.bindItemHover(item.$elem);
			
			item.$owner=this;

			item.$input.focus(function(event){
				var _item_=me.getData(this);
				me.on('focus',_item_);
				//me.currentItem=_item_;
			});

			item.$input.blur(function(event){
				me.on('blur');
			});
 
			item.$elem.click(function(event){
				console.info("click",event);
				if(me.isDisabled!=true){
					var _item_=me.getData(this);
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
			CF.logger(this,arguments);
			if(item){
				item.$input.focus();
			}
		},
		onFocusAfter:function(item){
			if(!this.currentItem){
				ui.form.item.setActive(this);
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
		checked:function(item){
			if(!item){
				item=this.items[0];
			}
			if(item.checked){
				this.onUnChecked(item);
			}else{
				this.onChecked(item);
			}
		},
		onUnChecked:function(item){
			item.checked=false;
			item.$elem.removeClass("checked");
			item.$input.attr("name","");
		},
		onChecked:function(item){
			item.checked=true;
			item.$elem.addClass("checked");
			item.$input.attr("name",item.name);
		},
		checkedAll : function(){
			var items=this.items;
			for(var i=0,len=items.length;i<len;i++){
				this.onChecked(items[i]);
			}
		},
		unCheckedAll : function(){
			var items=this.items;
			for(var i=0,len=items.length;i<len;i++){
				this.onUnChecked(items[i]);
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
		}
	});


})(CF,$,ui);