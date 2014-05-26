(function(){
window.examples.undo=function(){

 
	var undo=ui.UndoManager.getInstance(20);

	var index=0;
	
	undo.add({
		title:'事件'+(index++),
		undo:function(){
			console.info(this.title+" undo.");
		},
		redo:function(){
			console.info(this.title+" redo.");
		}
	});



	for(var i=0;i<20;i++){
		undo.add({
			title:'事件'+(index++),
			undo:function(){
				console.info(this.title+" undo.");
			},
			redo:function(){
				console.info(this.title+" redo.");
			},
			remove:function(){
				console.info("remove command"+this.title+" redo.");
			}
		});
	}



	


}

})();