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
					html.push(ui.tree.node.getTemplate(node));
				}
				html.push(
							'</table>',
						  '</div>');
				return html.join("");
			}
		},
		onRenderAfter:function(){
			ui.logger(this);
			var $elem=this.$elem;

		},
		onBindEvent:function(){
			ui.logger(this);

		},
		onClick : function(event){
			ui.logger(this);
		}
	});

	ui.tree.node=function(config){
		this.callSuperMethod();
	};


	
	ui.extend(ui.tree.node,ui.widget,{
		_name_ : "treeNode",
		statics:{
			css:{
				_c_button :  '-tree',
				_c_icon :   '-icon',
				_c_icon_button :   '-icon-button',
				_c_label :  '-label'
			},
			getTemplate: function(config){
				ui.widget.applyCSS(config,this.css);
				var html=['<tr class="x-ui-tree-node">',
							'<td class="x-ui-tree-node-item">'
						  ];

				
								'<div class="collapse x-ui-icon"></div>',

				config.type = config.children ? 'folder' : 'file';
				

				html.push(		'<div class="',config.type,' x-ui-icon"></div>',
								'<div class="x-ui-tree-node-label">',config.label,'</div>',
							'</td>',
						'</tr>');
				return html.join("");
			}
		},
		onRenderAfter:function(){
			ui.logger(this);
		},
		onBindEvent:function(){
			ui.logger(this);

		},
		onClick : function(event){
			ui.logger(this);
		}
	});


})(CF,$,ui);