(function(CF,$,ui){

	ui.tree=function(config){
		this.callSuperMethod();
	};

	ui.extend(ui.tree,ui.widget,{
		_name_ : "tree",
		statics:{
			css:{
				_c_tree_box :  '-tree-box',
				_c_tree_list :  '-tree-list'
			},
			getTemplate: function(config){
				ui.widget.applyCSS(config,this.css);
				var node,
					items=config.items,
					html=['<div class="',config._c_tree_box,' ',(config.cls||''),'">',
							'<table class="',config._c_tree_list,'">'];
				for(var i=0,len=items.length;i<len;i++){
					node=items[i];
					node.level=0;
					node.xtype='ui.tree.node';
					html.push(ui.getXTypeHTML(node));
				}
				html.push(
							'</table>',
						  '</div>');
				return html.join("");
			}
		},
		onRenderAfter:function(config){
			ui.logger(this);
			var $elem=this.$elem,
				children,
				items=this.items;

			this._c_tree_node=items[0]._c_tree_node;

			children=$('.'+this._c_tree_node,$elem);

			for(var i=0,len=items.length;i<len;i++){
				var item=items[i];
				item.$owner=this;
				item=ui.getXTypeItem(item,children[i]);
				items[i]=item;
			}


		},
		onBindEvent:function(){
			ui.logger(this);

		},
		onClick : function(event){
			ui.logger(this);
		},
		expandAll : function(){
			ui.logger(this);
			
		},
		collapseAll : function(){
			ui.logger(this);
		
		}
	});

	ui.tree.node=function(config){
		this.callSuperMethod();
	};



	ui.extend(ui.tree.node,ui.widget,{
		_name_ : 'tree.node',
		statics:{
			css:{
				_c_tree_node :  '-tree-node',
				_c_tree_node_col :   '-tree-node-col',
				_c_tree_arrow :  '-tree-arrow',
				_c_tree_parent :  '-tree-parent',
				_c_tree_leaf :  '-tree-leaf',
				_c_tree_node_label :  '-tree-node-label',
				_c_icon :   '-icon'
			},
			getTemplate: function(config){
				ui.widget.applyCSS(config,this.css);
				var cls,
					html=['<tr class="',config._c_tree_node,' ',(config.cls||''),'">',
							'<td class="',config._c_tree_node_col,'">'
						  ];

				//config.type = config.children ? 'parent' : 'leaf';

				for(var i=0,len=config.level;i<len;i++){
					html.push('<div class="',config._c_icon,'"></div>');
				}

				if(config.children){
					cls=config._c_tree_parent;
					html.push( '<div class="',config._c_tree_arrow,' ',config._c_icon,'"></div>');
				}else{
					cls=config._c_tree_leaf;
					html.push('<div class="',config._c_icon,'"></div>');
				}

				html.push(		'<div class="',cls,' ',config._c_icon,'"></div>',
								'<div class="',config._c_tree_node_label,'">',config.label,'</div>',
							'</td>',
						'</tr>');
				return html.join("");
			}
		},
		onRenderAfter:function(){
			ui.logger(this);
			var $elem=this.$elem;
			this.$node=$elem.children('.'+this._c_tree_node_col);
			if(this.children){
				this.$arrow=this.$node.children('.'+this._c_tree_arrow);
				this.$icon=this.$node.children('.'+this._c_tree_parent);
			}else{
				this.$icon=this.$node.children('.'+this._c_tree_leaf);
			}
			this.$label=this.$node.children('.'+this._c_tree_node_label);

			if(this.expand==true){
				delete this.expand;
				this.expand();
			}
		},
		onBindEvent:function(){
			ui.logger(this);

			if(this.$arrow){
				this.$arrow.click({
					me : this
				},function(event){
					event.data.me.on('arrowClick',event,this);
					event.stopBubble();
				});
			}

			this.$node.click({
				me : this
			},function(event){
				event.data.me.on('nodeClick',event,this);
			});

			
			this.$node.dblclick({
				me : this
			},function(event){
				var me=event.data.me;
				if(me.isExpand){
					me.collapse();
				}else{
					me.expand();
				}
			});
		},
		onArrowClick : function(event,target){
			ui.logger(this);
			if(this.isExpand){
				this.collapse();
			}else{
				this.expand();
			}
		},
		onNodeClick : function(event,target){
			ui.logger(this);
		},
		loadChildren : function(){
			ui.logger(this);
			if(this.children.url){
				this.isExpand=true;
				return;
			}
			var html,
				item,
				prev,
				$elem,
				children=this.children;
			if(children[0]._owner_name_==this._owner_name_){

			}else{
				prev=this;

				for(var i=0,len=children.length;i<len;i++){
					item=children[i];
					item.level=this.level+1;
					item.$owner=this.$owner;
					item.xtype='ui.tree.node';
					$elem=prev.$elem;
					$elem.after(this.getClass().getTemplate(item));
					item=ui.getXTypeItem(item,$elem[0].nextElementSibling);
					item.parent=this;
					item.prev=prev;
					prev=item;
					children[i]=item;
				}
				
				children[0].prev=null;

				for(var i=0,len=children.length;i<len;i++){
					item=children[i];
					item.next=children[i+1];
				}
				this.isExpand=true;
			}
			this.loadChildren=CF.emptyFunction;
		},
		expand : function(){
			ui.logger(this);
			this.loadChildren();
			this.$elem.addClass('expand');
			if(this.isExpand==true){
				return;
			}
			var children=this.children;
			for(var i=0,len=children.length;i<len;i++){
				children[i].$elem.show();
			}
			this.isExpand=true;
		},
		collapse : function(){
			ui.logger(this);
			this.hideNode();
			this.isExpand=false;
			this.$elem.removeClass('expand');
		},
		hideNode : function(){
			ui.logger(this);
			var children=this.children;
			if(!children){
				return;
			}
			for(var i=0,len=children.length;i<len;i++){
				var node=children[i];
				if(node.hideNode){
					node.hideNode();
					node.$elem.hide();
					node.$elem.removeClass('expand');
				}
			}
		}
	});


})(CF,$,ui);