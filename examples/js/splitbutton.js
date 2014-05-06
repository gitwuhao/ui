(function(){
window.examples.splitbutton=function(){


	
	$.includePack('css',examples.path+'/css/button.css');

	var div=document.createElement('div');
	div.className="box";

 	var splitbutton=new ui.splitbutton({
		cls : "ok",
		label : "确定",
		render : div,
		menu : {
			width : 150,
			items:[{
				label:'删除行1',
				cls:'tedui-delrow',
				value : '',
				onClick : function(event){
					console.info(this.label);
				}
			},'-',{
				label:'删除列2',
				cls:'tedui-delcol',
				value:'',
				menu:{
					items:[{
						label:'删除行2-1',
						cls:'tedui-delrow',
						value : '',
						onClick : function(event){
							console.info(this.label);
						}
					},{
						label:'删除行2-2',
						cls:'tedui-delrow',
						value : '',
						onClick : function(event){
							console.info(this.label);
						},
						menu:{
							items:[{
								label:'删除行2-2-1',
								cls:'tedui-delrow',
								value : '',
								onClick : function(event){
									console.info(this.label);
								}
							},{
								label:'删除行2-2-2',
								cls:'tedui-delrow',
								value : '',
								onClick : function(event){
									console.info(this.label);
								}
							}]
						}
					}]
				},
				onClick : function(event){
					console.info(this.label);
				}
			}]
		},
		onButtonClick:function(){
			console.info("onButtonClick:"+this.label);
		},
		onArrowClick:function(){
			this.callPrototypeMethod();
			console.info("onArrowClick:"+this.label);
		}
	});


	jQuery.getBody().append(div);
}

})();