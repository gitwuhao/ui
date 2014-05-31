(function(CF,jQuery,ui){

	ui.delicon={};


	CF.exportMethod(ui.delicon,{
		_type_ : "ui",
		_name_ : "delicon",
		_init:function(){
			var delIcon=$.createElement('<div class="x-ui-del-icon"><div class="x-ui-icon"></div></div>');
			$.getBody().append(delIcon);
			this._init=CF.emptyFunction;
			this.$delIcon=$(delIcon);
			
			var me=this;

			this.$delIcon.click(function(event){
				me.click();
			});

			
			this.$delIcon.hover(
			  function (event) {
				if(me.$item){
					me._showIcon(me.$item[0]);
				}
			  },
			  function (event) {
				if(me.$item){
					me._hideIcon(me.$item[0]);
				}
			  }
			);

			$.getDoc().keyup(function(event){
				if(event.keyCode==46){
					me.click();
				}
			});
		},
		bindItem : function(item){
			this._init();
			var me=this;

			if(!item.__is__del__icon__){
				$(item).hover(
				  function (event) {
					me._showIcon(this);
				  },
				  function (event) {
					me._hideIcon(this);
				  }
				);
				item.__is__del__icon__=1;
			}
		},
		_showIcon:function(item){
			
			this.isHide=false;

			if(this.timeOutId){
				clearTimeout(this.timeOutId);
				this.timeOutId=null;
			}
			if(this.$item && this.$item[0]==item){
				this.$delIcon.show();
				return;
			}
			this.$item=$(item);

			var offset=this.$item.offsetElement(document.body);

			this.$delIcon.css({
				left : offset.left,
				top : offset.top
			});

			this.$delIcon.show();
		},
		_hideIcon:function(item){
			this.isHide=true;
			var me=this;
			this.timeOutId=setTimeout(function(){
				me.$delIcon.hide();
				me.$item=null;
				me.timeOutId=null;
				me.isHide=false;
			},500);
		},
		click:function(){
			if(this.$item && this.isHide!=true){
				this.$item.trigger("delete");
			}
		}
	});
 




})(CF,jQuery,ui);