(function(){
window.examples.menu=function(){


	document.body.style.cssText="width: 100%;height: 600px;margin: 0px;padding: 0px;overflow: hidden;";


	
	var menu=new ui.menu({
		render : document.body,
		width : 150,
		cls:'content-menu',
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
	});

	ui.menu.addContextMenu(document.body,menu);
}

})();