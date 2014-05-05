(function(){
window.examples.teditor=function(){

	var teditor=new ui.toolbar({
		render : document.body,
		labelVisible : false,
		items : [{
			cls:'tedui-selectedcol',
			title:'选择列',
			onButtonClick:function(){
				console.info("onButtonClick:"+this.title);
			}
		},{
			cls:'tedui-selectedrow',
			title:'选择行',
			onButtonClick:function(){
				console.info("onButtonClick:"+this.title);
			}
		},{
			cls:'tedui-selectedtable',
			title:'选择表格',
			onButtonClick:function(){
				console.info("onButtonClick:"+this.title);
			}
		},'|',{
			cls:'tedui-deltable',
			xtype:'splitbutton',
			title:'删除',
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
					onClick : function(event){
						console.info(this.label);
					}
				}]
			}
		},'|',{
			cls:'tedui-addtoprow',
			title:'在上方增加行',
			onButtonClick:function(){
				console.info("onButtonClick:"+this.title);
			}
		},{
			cls:'tedui-addbottomrow',
			title:'在下方增加行',
			onButtonClick:function(){
				console.info("onButtonClick:"+this.title);
			}
		},{
			cls:'tedui-addleftcol',
			title:'在左方增加列',
			onButtonClick:function(){
				console.info("onButtonClick:"+this.title);
			}
		},{
			cls:'tedui-addrightcol',
			title:'在右方增加列',
			onButtonClick:function(){
				console.info("onButtonClick:"+this.title);
			}
		},'|',{
			cls:'tedui-merge',
			title:'合并单元格',
			onButtonClick:function(){
				console.info("onButtonClick:"+this.title);
			}
		},{
			cls:'tedui-split',
			title:'拆分单元格',
			onButtonClick:function(){
				console.info("onButtonClick:"+this.title);
			}
		},'||',{
			cls:'tedui-alignlefttop',
			xtype:'splitbutton',
			title:'对齐方式',
			onButtonClick:function(){
				console.info("onButtonClick:"+this.title);
			}
		},'|',{
			cls:'tedui-bordercolor',
			xtype:'splitbutton',
			title:'边框颜色',
			onButtonClick:function(){
				console.info("onButtonClick:"+this.title);
			}
		},{
			cls:'tedui-bgcolor',
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
			cls:'tedui-slider',
			title:'标尺滑块',
			onButtonClick:function(){
				console.info("onButtonClick:"+this.title);
			}
		}]
	});
	


}

})();