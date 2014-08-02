(function(CF,$,ui){

	ui.form.checkitem=function(render){
		this.callSuperMethod();
	};

	ui.extend(ui.form.checkitem,ui.form.field,{
		_type_ : "ui.form",
		_name_ : "checkitem",
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
				html.push('<div class="',config._c_checkbox_group,'"');
				html.push('><input type="text" name="',(config.name||''),'" class="',config._c_icon,
							'" value="',config.value,'"/>');
				if(config.text){
					html.push('<span>',config.text,'</span>');
				}
				html.push('</div>');
				cloneConfig.html=html.join('');
				cloneConfig.type='checkbox';
				return this.getFieldTemplate(cloneConfig);
			}
		},
		onRenderAfter:function(config){
			ui.logger(this);
			var elem=this.$elem;

			var children=$('.'+this._c_checkbox_group,elem);

			this.$item=$(children[0]);
			this.$input=this.$item.children("input:first");
			
			if(this.isDisabled){
				this.disabled();
			}

		},
		onBindEvent:function(){
			ui.logger(this);

			this.bindHover(this.$item);
			
			this.$input.focus({
				me : this,
			},function(event){
				event.data.me.on('focus');
			});

			this.$input.blur({
				me : this,
			},function(event){
				event.data.me.on('blur');
			});
 
			this.$elem.click({
				me : this,
			},function(event){
				var me=event.data.me;
				if(me.isDisabled!=true){
					me.focus();
					me.checked();
				}
			});

			if(this.value){
				this.on('checked');
			}else{
				this.value=false;
			}
		},
		focus : function(){
			ui.logger(this);
			this.$input.focus();
		},
		onChecked:function(){
			ui.logger(this);
			if(this.value==true){
				this.$item.addClass("checked");
			}else{
				this.$item.removeClass("checked");
				this.value=false;
			}
			this.$input.val(''+this.value);
		},
		checked : function(value){
			ui.logger(this);
			if(arguments.length==0){
				this.value=!this.value;
			}else{
				this.value=value;
			}
			this.on('checked');
			this.on('change',this.value);
		},
		onFocusAfter:function(item){
			this.$item.addClass("selected");
			this.isFocus=true;
		},
		onBlurAfter : function(){
			this.$item.removeClass("selected");
			this.isFocus=false;
		},
		onDisabled:function(){
			this.$input[0].disabled=true;
		},
		onEnabled:function(){
			this.$input[0].disabled=false;
		},
		getValue:function(){
			return this.value;
		},
		setValue:function(value){
			ui.logger(this);
			if(this.callSuperMethod()==false){
				return;
			}
			this.value=value;
			this.on('checked');
		}
	});


})(CF,$,ui);