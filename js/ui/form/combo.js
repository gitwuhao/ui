(function(CF,$,ui){

	ui.form.combo=function(render){
		this.callSuperMethod();
	};

	ui.extend(ui.form.combo,ui.form.text,{
		_type_ : "ui.form",
		_name_ : "combo",
		statics:{
			css:{
				_c_combo : '-combo',
				_c_arrow_icon : '-arrow-icon'
			},
			getTemplate: function(config){

				ui.widget.applyCSS(config,this.css);

				if(config.arrowIcon!=false){
					config._c_text_icon=config._c_arrow_icon;
				}

				if(config.cls){
					config.cls=config._c_combo + " " +config.cls;
				}else{
					config.cls=config._c_combo;
				}
				return ui.form.text.getTemplate(config);
			}
		},
		onRenderAfter:function(config){
			CF.logger(this,arguments);
			var elem=this.$elem;
			
			this.$label=$("."+config._c_label+":first",elem);
			
			this.$combo=$("."+config._c_text_box+":first",elem);

			this.$text=$(":text:first",this.$combo);
			
			this.$text.attr("name","");
			
			this.$icon=this.$text.parent().next();

			if(config.name){
				this.$icon.html('<input type="hidden" name="'+config.name+'" />');
				this.$value=this.$icon.children(":hidden");
			}

			this._css_combo=config._c_combo;
			
			this.callSuperMethod();
		},
		onBindEvent:function(){
			var me=this;

			if(this.readonly!=true){
				this.$label.click(function(event){
					me.$text.focus();
				});
			}
		
			
			if(this.items && this.readonly==true){
				this.$text.click(function(event){
					me.on("listToggle");
				});
			}

			this.$text.focus(function(event){
				me.$elem.addClass("focus");
			});
			

			this.$text.blur(function(event){
				if(me.on("textBlur")!=false){
					me.trigger("textBlur");
				}
				me.$elem.removeClass("focus");
			});

			if(this.arrowIcon!=false){
				this.$icon.click(function(event){
					if(me.on("arrowClick")!=false){
						me.trigger("arrowClick");
					}
					me.$text.focus();
					me.on("listToggle");
				});
			}

			this.$elem.bindHover();
		},
		onListToggle : function(event){
			CF.logger(this,arguments);
			var me=this;
			if(this.items && !this.list){
				var list={
					items: this.items
				};

				var listConfig=CF.merger(list,{
					boxcls : this._css_combo+"-popu",
					icon:false,
					autoSetOffset:true,
					autoWidth:true,
					align:'lb',
					$offsetElement : this.$combo,
					onItemSelectedAfter : function(item){
						me.on("selected",item);
					}
				});
				this.list=new ComboList(listConfig);
			}
			if(this.list){
				this.list.toggle();
			}
		},
		onSelected:function(item){
			this.$text.val(item.label);
			if(this.$value){
				this.$value.val(item.value||"");
			}
		},
		onTextFocus : function(event){
			CF.logger(this,arguments);
		},
		onArrowClick: function(event){
			CF.logger(this,arguments);
		},
		remove:function(){
			CF.logger(this,arguments);
			if(this.list && this.list.remove){
				this.list.remove();
			}
			this.callSuperMethod();
		}
	});


	var ComboList=function(){
		this.callSuperMethod();
	};
	

	ui.extend(ComboList,ui.popu,{
		_type_ :"ui.form",
		_name_ :"combolist",
		statics:{
			css:{
				_c_combo_list:'-combo-list',
				_c_combo_list_item:'-combo-list-item',
				_c_combo_list_separator:'-combo-list-separator'
			},
			getTemplate:function(config){
				ui.widget.applyCSS(config,this.css);
				var items=config.items;
				var html=['<ul class="',config._c_combo_list,'">'];
				for(var i=0,len=items.length;i<len;i++){
					var item=items[i];
					if(item=='-'){
						html.push('<li class="',config._c_combo_list_separator,'"></li>');
					}else{
						html.push('<li class="',config._c_combo_list_item,' ',(item.cls||""),'">',
									item.label,
								   '</li>');
					}
				}
				html.push('</ul>');
				return html.join('');
			},
			align:'trbl'
		},
		onRenderBefore:function(config){
			CF.logger(this,arguments);
			config.html=this._class_.getTemplate(config);
		},
		onRender:function(config){
			CF.logger(this,arguments);
			this.callSuperMethod();
			var $elem=this.$elem;
			this.$list=$elem.children("."+config._c_combo_list);
			this.$listitem=this.$list.children("li");
		},
		onBindEvent:function(){
			CF.logger(this,arguments);
			this.callSuperMethod();
			var me=this;
			var items=this.items;
			this.$listitem.each(function(index,elem){
				var item=items[index];
				if(item.label){	
					var $elem=$(elem);
					$elem.bindHover();
					item.$elem=$elem;

					$elem[0]._dataIndex_=index;

					$elem.click(function(event){
						var _dataIndex_=this._dataIndex_;
						var _item_=me.items[_dataIndex_];
						me.on("itemSelected",_item_);
					});
				}
			});

		},
		onItemSelected:function(item){
			CF.logger(this,arguments);
			this.on("hide");
		},
		remove:function(){
			CF.logger(this,arguments);
			ui.popu.removeCurrentPopu(this);
			this.callSuperMethod();
		}
	});

})(CF,$,ui);