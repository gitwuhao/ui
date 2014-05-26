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

					html.push('<div class="',config._c_radio_group,'"');
					if(item.width){
						html.push(' style="width:',item.width,'px;" ');
					}
					html.push('><input type="button" class="',config._c_icon,
								'" value="',item.value,'"/>',
							'<span>',item.label,'</span>',
						  '</div>');
				}
				cloneConfig.html=html.join('');
				cloneConfig.type='radio';
				return this.getFieldTemplate(cloneConfig);
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

			
			if(this.isDisabled){
				this.disabled();
			}

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

			this.bindFieldHover(item.$elem);
			

			item.$owner=this;

			item.$input.focus(function(event){
				me.on('focus',me.getData(this));
			});

			item.$input.blur(function(event){
				me.on('blur');
			});

			item.$elem.click(function(event){
				if(me.isDisabled!=true){
					var _item_=me.getData(this);
					me.focus(_item_);
					me.on('checked',_item_);
				}
			});
		},
		focus : function(item){
			CF.logger(this,arguments);
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
		checked:function(item){
			if(item){
				this.on("checked",item);
			}else{
				this.on("checked",this.items[0]);
			}
		},
		onUnChecked:function(item){
			item.checked=false;
			item.$elem.removeClass("checked");
			item.$input.attr("name","");
		},
		onChecked:function(item){
			if(this.checkedItem && this.checkedItem!=item){
				this.on('unChecked',this.checkedItem);
			}else if(this.checkedItem && this.checkedItem==item && item.checked){
				return;
			}
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
		}
	});


})(CF,$,ui);