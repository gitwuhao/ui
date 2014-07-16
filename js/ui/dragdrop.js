(function(CF,jQuery,ui){

	var DragDrop=function(){
		this.callSuperMethod();
	};

	ui.extend(DragDrop,ui.widget,{
		_name_ : "DragDrop",
		statics:{
			css:{
				_c_dd_box: '-dd-box'
			},
			getTemplate: function(config){
				ui.widget.applyCSS(config,this.css);
				config.arrowArray=['tl','tc','tr','lc','bg','rc','bl','bc','br'];
				var html=['<div class="',config._c_dd_box,'">'];
				$.it(config.arrowArray,function(index,item){
					this.push('<div class="',item,'"></div>');
				},html);
				/*
				<div class="tl"></div>
				<div class="tc"></div>
				<div class="tr"></div>
				<div class="lc"></div>
				<div class="bg"></div>
				<div class="rc"></div>
				<div class="bl"></div>
				<div class="bc"></div>
				<div class="br"></div>
				*/
				html.push('</div>');
				return html.join('');
			}
		},
		__EVENTNAMESPACE__ : '.DD' + $.randomChar(5),
		onRenderAfter:function(config){
			ui.logger(this);
			this.$box=this.$elem;
			this.children=this.$box.children();
			
			$.it(this.arrowArray,function(index,item){
				this['$'+item]=$(this.children[index]);
			},this);
			delete this.children;
		},
		startListener:function(){
			ui.logger(this);
			var events=['selectstart','mouseup','mousemove',''].join(this.__EVENTNAMESPACE__+' ');
			$.getDoc().on(events,{
				me : this,
			},this.documentEventHandle);
		},
		stopListener:function(){
			ui.logger(this);
			$.getDoc().off(this.__EVENTNAMESPACE__);
		}
		documentEventHandle:function(event){
			ui.logger(this);
			event.data.me.on(event.type,event);
		},
		setConfig:function(){
			ui.logger(this);
		
		},
		initConfig:function(){
		
		
		},
		drag:function(config){
			ui.logger(this);
			if(this.setConfig(config)){
			
			}
		
		},
		show:function(config){
			ui.logger(this);
			if(this.setConfig(config)){
				
			}
		},
		onShow:function(){
			ui.logger(this);
			if(!this.config){
				return;
			}

			this.config.type='resize';
		},
		hide:function(config){
			ui.logger(this);
			this.setConfig(config);
		
		}
	});

	var instance;

	function getInstance(){
		if(!instance){
			instance=new DragDrop({});
		}
		return instance;
	};

	ui.dragdrop={
		getInstance:function(config){
			return{
				config:config,
				show:function(){
					getInstance().show(this.config);
				},
				hide:function(){
					getInstance().hide(this.config);
				},
				drag:function(){
					getInstance().drag(this.config);
				},
				setBody : function(html){
				
				},
				remove : ui.widget.remove
			};
		},
		bindDrag:function(config){
		
		},
		bindReplace:function(config){
		
		},
		hide:function(){
		
		}
	};
	

})(CF,jQuery,ui);