(function(CF,jQuery,ui){
"use strict";

	var currentUndo;

	ui.UndoManager={
		redo : function(callback){
			if(currentUndo){
				currentUndo.redo(callback);
			}
		},
		undo : function(callback){
			if(currentUndo){
				currentUndo.undo(callback);
			}
		},
		setCurrent : function(undo){
			currentUndo=undo;
		},
		getCurrent : function(){
			return currentUndo;
		},
		getInstance:function(size){
			var instace=new undo(size);

			var currentUndo={
				destroy : function(){
					if(instace){
						instace.clear();
						instace=null;
					}
					for(var key in this){
						delete this[key];
					}
				}
			};

			CF.exportMethod(currentUndo,instace);

			this.setCurrent(currentUndo);

			return currentUndo;
		}
	};

	var undo=function(size){
		if(size>0){
			this.size=size;
		}
		this.undoCommands=[];
	};


	undo.prototype={
		undoCommands : null,
		index : -1,
		isExecuting : false,
		size : 20,
		add: function (command,callback) {
			if (this.isExecuting) {
				return false;
			}

			this._removeCommand(this.index + 1, this.undoCommands.length - this.index);

			if(this.undoCommands.length>=this.size){
				this._removeCommand(0);
			}

			this.undoCommands.push(command);

			this.index = this.undoCommands.length - 1;
			if (callback) {
				callback();
			}
			return true;
		},
		_removeCommand:function(index,size){
			var array;

			if(index>=0){
				array=this.undoCommands.splice(index,size||1);

			}else{
				array=this.undoCommands;
				this.undoCommands=[];
			}

			for(var i=0,len=array.length;i<len;i++){
				var command=array[i];
				if(command.remove){
					command.remove();
				}
			}
		},
		_execute:function (command,action) {

			if (!command || typeof command[action] !== "function") {
				return false;
			}
			this.isExecuting = true;

			command[action]();

			this.isExecuting = false;

			return true;
		},
		undo: function (callback) {			
			var command = this.undoCommands[this.index];
			if (!command) {
				return false;
			}
			
			var result=false;
			if(this._execute(command,"undo")){
				this.index -= 1;
				result=true;
			}

			if (callback) {
				callback();
			}
			return result;
		},

		redo: function (callback) {
            var command = this.undoCommands[this.index + 1];
			if (!command) {
				return false;
			}

			var result=false;
			if(this._execute(command,"redo")){
				this.index += 1;
				result=true;
			}

			if (callback) {
				callback();
			}
			return result;
		},
		execute:function(index,callback){
			if(index >= this.index){
				while(index >= this.index && this.redo()){}
			}else if(index <= this.index){
				while(index <= this.index && this.undo()){}
			}

			if(callback){
				callback();
			}
		},
		clear: function (callback) {
			var prev_size = this.undoCommands.length;
			
			this._removeCommand();

			this.index = -1;

			if (callback && (prev_size > 0)) {
				callback();
			}
		},
		hasUndo: function () {
			return this.index !== -1;
		},
		hasRedo: function () {
			return this.index < (this.undoCommands.length - 1);
		},
		getCommands: function () {
			return this.undoCommands;
		}
	};


	$.getDoc().keydown(function(event){
		if(event.ctrlKey){
			var target=event.target;
			var tagName=target.tagName;
			/*过滤文本框、编辑框的 ctrl+z  ctrl+y */
			if(	/^textarea$/i.test(tagName) ||  (/^input$/i.test(tagName) && /^text$/i.test(target.type)) || target.isContentEditable  ){
			/*ctrl+z*/
			}else if(event.keyCode==90){
				ui.UndoManager.undo();
			/*ctrl+y*/
			}else if(event.keyCode==89){
				ui.UndoManager.redo();
			}
		}
	});

})(CF,jQuery,ui);


/*




	$.getDoc().keydown(function(event){
		if(event.ctrlKey){
			var cmd='';
			*ctrl+z*
			if(event.keyCode==90){
				cmd='undo';
			*ctrl+y*
			}else if(event.keyCode==89){
				cmd='redo';
			}

			if(cmd){
				var target=event.target;
				var tagName=target.tagName;

				*过滤文本框、编辑框的 ctrl+z  ctrl+y *
				if(	/^textarea$/i.test(tagName) || 
					(/^input$/i.test(tagName) && /^text$/i.test(target.type)) ||
					target.isContentEditable  ){
					if(document.execCommand(cmd)){
						return false;
					}
					return;
				}
				ui.UndoManager[cmd]();
			}
		}

	});

var undo=ui.UndoManager.getInstance(20);
for(var i=0;i<20;i++){
undo.add({
	title:'修改表格宽度'+i,
	undo:function(){
		console.info(this.title+" undo.");
	},
	redo:function(){
		console.info(this.title+" redo.");
	},
	remove:function(){
		console.info("remove command"+this.title);
	}
});
}
*/