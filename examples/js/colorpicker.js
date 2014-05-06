(function(){
window.examples.colorpicker=function(){

	

	
	$.includePack('css',examples.path+'/css/button.css');

	var div=document.createElement('div');
	div.className="box";


	jQuery.getBody().append(div);


 	var button=new ui.button({
		cls : "ok",
		label : "确定",
		render : div,
		onButtonClick:function(){
			var me=this;
			if(!this.colorpicker){
				this.colorpicker=ui.colorpicker.getInstance({
					align : 'lb',
					$offsetElement : this.$elem,
					onChange:function(color){
						console.info("button onChange:"+color);
						me.color=color;
					},
					onSubmit:function(color){
						console.info("button onSubmit:"+color);
						me.color=color;
					}
				});
			}
			this.colorpicker.toggle();
		}
	});



	window.buttonColor=new ui.button({
		cls : "ted-ui-slider",
		icon : true,
		//render : div,
		onButtonClick:function(){
			var me=this;

			if(!this.colorpicker){
				this.colorpicker=ui.colorpicker.getInstance({
					layout:'full',
					align : 'lb',
					$offsetElement : this.$elem,
					onChange:function(color){
						console.info("button onChange:"+color);
						me.color=color;
					},
					onSubmit:function(color){
						console.info("button onSubmit:"+color);
						me.color=color;
					}
				});
			}
			this.colorpicker.toggle();
		}
	});



	window.comboColor=new ui.form.combo({
		render : div,
		label : "颜色",
		icon : "color",
		readonly : true,
		onClick : function(){
			var me=this;
			if(!this.colorpicker){
				this.colorpicker=ui.colorpicker.getInstance({
					align : 'lb',
					layout:'rgbhex',
					$offsetElement : this.$combo,
					onChange:function(color){
						console.info("button onChange:"+color);
						me.$text.val(color);
					},
					onSubmit:function(color){
						console.info("button onSubmit:"+color);
						me.$text.val(color);
					}
				});
			}
			this.colorpicker.toggle();
		}
	});



}

})();