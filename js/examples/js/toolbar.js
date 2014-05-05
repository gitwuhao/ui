(function(){
window.examples.toolbar=function(){

	var toolbar=new ui.toolbar({
		render : document.body,
		items : [{
					cls:"tedui-selectedcol"
				},{
					xtype:"splitbutton",
					cls : "tedui-selectedcol",
					menu : {
						cls : 'user',
						render : function(){
							var render=toolbar.$popup;
							this.offsetParent=render[0].offsetParent;
							return render;
						},
						items:[{
							label:'删除行1',
							cls:'tedui-delrow',
							value : '',
							menu:{
								items:[{
									label:'删除行2',
									cls:'tedui-delrow',
									value : '',
									onClick : function(event){
										console.info(this.label);
									}
								},{
									label:'删除行',
									cls:'tedui-delrow',
									value : '',
									onClick : function(event){
										console.info(this.label);
									},
									menu:{
										items:[{
											label:'删除行3',
											cls:'tedui-delrow',
											value : '',
											onClick : function(event){
												console.info(this.label);
											}
										},{
											label:'删除行',
											cls:'tedui-delrow',
											value : '',
											onClick : function(event){
												console.info(this.label);
											}
										}]
									}
								},{
									label:'删除行',
									cls:'tedui-delrow',
									value : '',
									menu:{
										items:[{
											label:'删除行3',
											cls:'tedui-delrow',
											value : '',
											onClick : function(event){
												console.info(this.label);
											}
										},{
											label:'删除行',
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
								console.info("menu item on click");
							}
						},'-',{
							label:'删除列',
							cls:'tedui-delcol',
							value:'',
							onClick : function(event){
								console.info("menu item on click");
							}
						},{
							label:'删除行',
							cls:'tedui-delrow',
							value : '',
							menu:{
								items:[{
									label:'删除行3',
									cls:'tedui-delrow',
									value : '',
									onClick : function(event){
										console.info(this.label);
									}
								},{
									label:'删除行',
									cls:'tedui-delrow',
									value : '',
									onClick : function(event){
										console.info(this.label);
									}
								}]
							}
						}]
					},
					onButtonClick : function(event){
						CF.logger(this,arguments);
						splitbutton2.remove();
					}
				},{
					xtype:"splitbutton",
					cls : "tedui-selectedcol",
					menu : {
						render : document.body,
						items:[{
							label:'删除行2',
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
									label:'删除行',
									cls:'tedui-delrow',
									value : '',
									onClick : function(event){
										console.info(this.label);
									}
								},{
									label:'删除行',
									cls:'tedui-delrow',
									value : '',
									onClick : function(event){
										console.info(this.label);
									},
									menu:{
										items:[{
											label:'删除行',
											cls:'tedui-delrow',
											value : '',
											onClick : function(event){
												console.info(this.label);
											}
										},{
											label:'删除行',
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
								console.info("menu item on click");
							}
						}]
				},
				onArrowButtonClickAfter : function(event){
					CF.logger(this,arguments);
					
				}
			}]
	});
	


 
}

})();