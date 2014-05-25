(function(CF,jQuery,ui){
"use strict";


	ui.UndoManager={
		redo:function(){
		
		
		},
		undo:function(){
		
		
		},
		setCurrent:function(undo){
			this.current=undo;
		},
		getInstance:function(size){
			var instace=new undo(size);
			return{
				destroy : function(){
					if(instace){
						instace.clear();
						instace=null;
					}
					for(var key in this){
						delete this[key];
					}
				},
				add : function (command,callback) {
					instace.add(command,callback);
				},
				undo : function (callback) {
					instace.undo(callback);
				},
				redo : function (callback) {
					instace.redo(callback);
				},
				hasUndo : function () {
					instace.hasUndo();
				},
				hasRedo : function () {
					instace.hasRedo();
				}
			};
		}
	};

	var undo=function(size){
		if(size>0){
			this.size=size;
		}
		ui.UndoManager.setCurrent(this);
	};


	undo.prototype={
		undoCommands : null,
		index : -1,
		isExecuting : false,
		size : 20,
		add: function (command,callback) {
			if (isExecuting) {
				return this;
			}
			// if we are here after having called undo,
			// invalidate items higher on the stack
			this.undoCommands.splice(this.index + 1, this.undoCommands.length - this.index);


			if(this.undoCommands.length>=this.size){
				 this.undoCommands.splice(0,1);
			}

			this.undoCommands.push(command);

			// set the current index to the end
			this.index = this.undoCommands.length - 1;
			if (callback) {
				callback();
			}
			return this;
		},
		execute:function (action) {

			var command = this.undoCommands[this.index];
			if (!command) {
				return this;
			}
			if (!command || typeof command[action] !== "function") {
				return this;
			}
			this.isExecuting = true;

			command[action]();

			this.isExecuting = false;
			return this;
		},
		undo: function (callback) {

			this.execute("undo");

			this.index -= 1;

			if (callback) {
				callback();
			}
			return this;
		},

		redo: function (callback) {

			this.execute("redo");

			this.index += 1;

			if (callback) {
				callback();
			}
			return this;
		},
		clear: function (callback) {
			var prev_size = this.undoCommands.length;

			this.undoCommands = [];

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

	



})(CF,jQuery,ui);