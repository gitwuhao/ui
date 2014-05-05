(function(){
window.examples.teditor=function(){

	ui.teditor=new ui.toolbar({
		render : document.body,
		cls : 'x-ui-teditor',
		labelVisible : false,
		items : [{
			cls:'selectedcol',
			title:'选择列',
			onButtonClick:function(){
				console.info("onButtonClick:"+this.title);
			}
		},{
			cls:'selectedrow',
			title:'选择行',
			onButtonClick:function(){
				console.info("onButtonClick:"+this.title);
			}
		},{
			cls:'selectedtable',
			title:'选择表格',
			onButtonClick:function(){
				console.info("onButtonClick:"+this.title);
			}
		},'|',{
			cls:'deltable',
			xtype:'splitbutton',
			title:'删除',
			menu : {
				width : 150,
				items:[{
					label:'删除行1',
					cls:'delrow',
					value : '',
					onClick : function(event){
						console.info(this.label);
					}
				},'-',{
					label:'删除列2',
					cls:'delcol',
					value:'',
					onClick : function(event){
						console.info(this.label);
					}
				}]
			},
			onButtonClick:function(){
				console.info("onButtonClick:"+this.title);
			}
		},'|',{
			cls:'addtoprow',
			title:'在上方增加行',
			onButtonClick:function(){
				console.info("onButtonClick:"+this.title);
			}
		},{
			cls:'addbottomrow',
			title:'在下方增加行',
			onButtonClick:function(){
				console.info("onButtonClick:"+this.title);
			}
		},{
			cls:'addleftcol',
			title:'在左方增加列',
			onButtonClick:function(){
				console.info("onButtonClick:"+this.title);
			}
		},{
			cls:'addrightcol',
			title:'在右方增加列',
			onButtonClick:function(){
				console.info("onButtonClick:"+this.title);
			}
		},'|',{
			cls:'merge',
			title:'合并单元格',
			onButtonClick:function(){
				console.info("onButtonClick:"+this.title);
			}
		},{
			cls:'split',
			title:'拆分单元格',
			onButtonClick:function(){
				console.info("onButtonClick:"+this.title);
			}
		},'||',{
			cls:'alignlefttop',
			xtype:'splitbutton',
			title:'对齐方式',
			onButtonClick:function(){
				console.info("onButtonClick:"+this.title);
			}
		},'|',{
			cls:'bordercolor',
			xtype:'splitbutton',
			title:'边框颜色',
			onButtonClick:function(){
				console.info("onButtonClick:"+this.title);
			}
		},{
			cls:'bgcolor',
			xtype:'splitbutton',
			title:'单元格底纹',
			onButtonClick:function(){
				console.info("onButtonClick:"+this.title);
			}
		},'|',{
			xtype:'text',
			label:'宽',
			title:'单元格高度',
			maxlength:3,
			vtype:'int',
			clear:true,
			unit:'px'
		},{
			xtype:'text',
			label:'高',
			title:'单元格高度',
			maxlength:3,
			vtype:'int',
			unit:'px'
		},'|',{
			cls:'slider',
			title:'标尺滑块',
			onButtonClick:function(){
				console.info("onButtonClick:"+this.title);
			}
		}],
		hideButton : function(cls){
			var button=this.$buttonbar.children("."+cls);

		}
	});
	

	function render(){
		return ui.teditor.$popup;
	};
	var items=ui.teditor.items;
	for(var i=0,len=items.length;i<len;i++){
		var item=items[i];
		var menu=item.menu;
		if(menu){
			menu.render=render;
		}
	}



}

})();