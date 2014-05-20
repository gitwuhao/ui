(function(CF,$,ui){

	ui.form.radio=function(render){
		this.callSuperMethod();
	};

	ui.extend(ui.form.radio,ui.form.item,{
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
					html.push('<div class="',config._c_radio_group,'">',
							'<input type="button" class="',config._c_icon,
								'" value="',item.value,'"/>',
							'<span>',item.label,'</span>',
						  '</div>');
				}
				cloneConfig.html=html.join('');
				cloneConfig.type='radio';
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
				}
			}
		},
		bindItemEvent:function(item){
			var me=this;


			this.setData(item.$input[0],item);
			this.setData(item.$elem[0],item);

			//item.$elem.bindHover();
			
			this.bindItemHover(item.$elem);

			item.$input.focus(function(event){
				me.on('focus',me.getData(this));
			});

			item.$input.blur(function(event){
				me.on('blur');
			});

			item.$input.keyup(function(event){
				if(event.keyCode==32 || event.keyCode==13){
					me.on('checked',me.getData(this));
				}
			});

			item.$input.on("checked",function(event){
				me.on('checked',me.getData(this));
			});

			item.$input.on("unchecked",function(event){
				me.on('unChecked',me.getData(this));
			});

			item.$elem.click(function(event){
				var _item_=me.getData(this);
				if(me.on('focus',_item_)!=false){
					me.on('checked',_item_);
				}
			});


		},
		focus : function(){
			CF.logger(this,arguments);
		},
		onFocusAfter:function(item){
			ui.form.item.setActive(this);
			if(this.checkedItem && this.checkedItem!=item){
				this.checkedItem.$elem.removeClass("selected");
			}
			item.$elem.addClass("selected");
		},
		onBlurAfter : function(){
			if(this.checkedItem){
				this.checkedItem.$elem.removeClass("selected");
			}
		},
		checked:function(item){
			if(item){
				this.onChecked(item);
			}else{
				this.onChecked(this.items[0]);
			}
		},
		onUnChecked:function(item){
			item.checked=false;
			item.$elem.removeClass("checked");
			item.$input.attr("name","");
		},
		onChecked:function(item){
			if(this.checkedItem && this.checkedItem!=item){
				this.onUnChecked(this.checkedItem);
			}else if(this.checkedItem && this.checkedItem==item){
				return;
			}
			item.checked=true;
			item.$elem.addClass("checked");
			item.$input.attr("name",item.name);
			this.checkedItem=item;
		}
	});


})(CF,$,ui);