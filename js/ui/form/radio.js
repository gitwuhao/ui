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
					html.push('<div class="',config._c_radio_group,'">',
							'<input type="button" class="',config._c_icon,'" />',
							'<span>',items[i].label,'</span>',
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
				this.setData(item.$input[0],item);
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
			}
		},
		bindItemEvent:function(item){
			var me=this;
			item.$elem.bindHover();
			item.$input.focus(function(event){
				me.on('focus',me.getData(this));
			});

			item.$input.blur(function(event){
				me.on('blur',me.getData(this));
			});

			
			item.$input.keyup(function(event){
				if(event.keyCode==32 || event.keyCode==13){
					me.on('checked',me.getData(this));
				}
			});

		},
		focus : function(){
			CF.logger(this,arguments);
			this.items[0].$elem.focus();
		},
		onFocusAfter:function(item){
			item.$elem.addClass("hover");
			this.currentItem=item;
		},
		onBlurAfter : function(item){
			item.$elem.removeClass("hover");

		},
		checked:function(){
			this.items[0].$input.tirgger("checked");
		},
		onChecked:function(){
		
		
		},
		onDisabled:function(){
			this.$text[0].readOnly=true;
		},
		onEnabled:function(){
			this.$text[0].readOnly=false;
		}
	});
	

})(CF,$,ui);