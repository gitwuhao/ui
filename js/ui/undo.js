(function(CF,jQuery,ui){
"use strict";

	var __CURRENT_UNDO__,
		__IS_STOP__=false;

	ui.UndoManager={
		redo : function(callback){
			if(__CURRENT_UNDO__){
				return __CURRENT_UNDO__.redo(callback);
			}
		},
		undo : function(callback){
			if(__CURRENT_UNDO__){
				return __CURRENT_UNDO__.undo(callback);
			}
		},
		setCurrent : function(instace){
			__CURRENT_UNDO__=instace;
		},
		getCurrent : function(){
			if(__IS_STOP__==false){
				return __CURRENT_UNDO__;
			}
		},
		start : function(undo){
			__IS_STOP__=false;
		},
		stop : function(){
			__IS_STOP__=true;
		},
		getInstance:function(size){
			var instace=new Undo(size);

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

			CF.extendEventListener(currentUndo);

			this.setCurrent(currentUndo);

			return currentUndo;
		}
	};

	var Undo=function(size){
		if(size>0){
			this.size=size;
		}
		this.undoCommands=[];
	};


	Undo.prototype={
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
			
			command.index=this.index;

			if (callback) {
				callback();
			}

			if(!command.remove){
				command.remove=CF.removeOwnProperty;
			}
			
			this.scope.trigger('add',command);
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
			if(array.length==0){
				return;
			}
			
			this.scope.trigger('remove',array);

			for(var i=0,len=array.length;i<len;i++){
				var command=array[i];
				if(command.remove){
					command.remove();
				}
			}
		},
		_execute:function (command,action) {

			if (!command || 
				typeof command[action] !== "function" || 
				this.scope.trigger('execute',this.index,command,action)==false) {
				return false;
			}
			this.isExecuting = true;
		
			var before=action+'Before';
			if(command[before]){
				command[before]();
			}
			command[action]();
			var after=action+'After';
			if(command[after]){
				command[after]();
			}
			this.isExecuting = false;

			return true;
		},
		undo: function (callback) {
			var result=false;
			this.scope.trigger('undobefore',null);

			var command = this.undoCommands[this.index];
			if (command) {
				if(this._execute(command,"undo")){
					this.index -= 1;
					result=true;
					this.scope.trigger('undo',command);
				}
				
				if (callback) {
					callback();
				}
			}
			
			this.scope.trigger('undoafter',command);
			return result;
		},

		redo: function (callback) {
			var result=false;
			this.scope.trigger('redobefore',null);

            var command = this.undoCommands[this.index + 1];
			if (command) {
			
				if(this._execute(command,"redo")){
					this.index += 1;
					result=true;
					this.scope.trigger('redo',command);
				}

				if (callback) {
					callback();
				}

			}

			this.scope.trigger('redoafter',command);
			return result;
		},
		execute:function(index,callback){
			if(index > this.index){
				while(index > this.index && this.redo()){}
			}else if(index < this.index){
				while(index < this.index && this.undo()){}
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
			
			this.scope.trigger('clear',null);
		},
		hasUndo: function () {
			return this.index !== -1;
		},
		hasRedo: function () {
			return this.index < (this.undoCommands.length - 1);
		},
		getCommands: function () {
			return this.undoCommands;
		},
		getPrevCommand : function(){
			return this.undoCommands[this.index - 1];
		},
		getNextCommand : function(){
			return this.undoCommands[this.index + 1];
		},
		getLastCommand : function(){
			return this.undoCommands[this.undoCommands.length-1];
		},
		getCommand : function(){
			return this.undoCommands[this.index];
		},
		setCommandIndex : function(command){
			if(command.index){
				var cmd=this.undoCommands[command.index];
				if(cmd==command){
					this.index=command.index;
					return true;
				}	
			}
			return false;
		}
	};



	$.getDoc().keydown(function(event){
		var currentUndo=ui.UndoManager.getCurrent();
		if(event.ctrlKey && currentUndo){
			var cmd='';
			/*ps ctrl+alt+z*/
			if(event.keyCode==90 && event.altKey){
				cmd='redo';
			/*ps ctrl+shift+z*/
			}else if(event.keyCode==90 && event.shiftKey){
				cmd='undo';
			/*ctrl+z*/
			}else if(event.keyCode==90){
				cmd='undo';
			/*ctrl+y*/
			}else if(event.keyCode==89){
				cmd='redo';
			}else{
				return;
			}
			if($.isEditable(event.target)){
				setTimeout(function(){
					event.target.blur();
				},0);
			}
			
			setTimeout(function(){
				if(cmd=='undo'){
					ui.UndoManager.undo();
				}else if(cmd=='redo'){
					ui.UndoManager.redo();
				}
			},100);
			return false;
		}
	});

})(CF,jQuery,ui);


/*



	$.getDoc().keydown(function(event){
		if(event.ctrlKey){
			var target=event.target;
			var tagName=target.tagName;
			\/*过滤文本框、编辑框的 ctrl+z  ctrl+y *\/
			if(	/^textarea$/i.test(tagName) ||  (/^input$/i.test(tagName) && /^text$/i.test(target.type)) || target.isContentEditable  ){
			\/*ctrl+z*\/
			}else if(event.keyCode==90){
				ui.UndoManager.undo();
			\/*ctrl+y*\/
			}else if(event.keyCode==89){
				ui.UndoManager.redo();
			}
		}
	});

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