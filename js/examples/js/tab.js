(function(){
window.examples.tab=function(){

	var tab=new ui.tab({
		render : document.body,
		items : [{
			cls:'tedui-selectedcol',
			label:'选择列1',
			onTagClick:function(){
				console.info("onTagClick:"+this.label);
			},
			onLoad:function(){
				this.$tabview.html("sdflskdjf");
				console.info("onLoad:"+this.label);
			}
		},{
			cls:'tedui-selectedrow',
			label:'选择行2',
			html : '迈克尔·舒马赫（德语：Michael Schumacher，1969年1月3日－），生于许尔特，德国一级方程式赛车车手。舒马赫是现代最伟大的F1车手之一，在他头16年的职业生涯中，几乎刷新了每一项纪录。总共赢得7次总冠军，亦曾是唯一赢得总冠军的德国车手（这一纪录已被德国车手塞巴斯蒂安·维特尔于2010年改写）。<br><br>舒马赫本已于2006赛季结束后退役，但由于马萨在2009赛季匈牙利站中受伤，法拉利车队宣布从2009赛季欧洲站开始，舒马赫将复出，但之后舒马赫又宣布，由于颈伤，决定取消在匈牙利站复出的计划。2010年初，舒马赫正式宣布复出，加盟前身为布朗车队的梅塞德斯车队。2012年10月，舒马赫宣布将在此赛季结束后再次退役。<br><br>2014年3月8日，F1车王舒马赫仍无好转，今后可能维持植物人状态。4月25日消息，F1赛车手舒马赫从昏迷中醒来，认出了妻子。[1-2]',
			onLoad:function(){
				
			},
			onTagClick:function(){
				console.info("onTagClick:"+this.label);

			}
		},{
			cls:'tedui-selectedrow',
			label:'选择行2',
			src:'http://www.oilan.com.cn/oD/js/ui/examples.html?demo=teditor',
			onTagClick:function(){
				console.info("onTagClick:"+this.label);
				//this.remove();
				setTimeout(function(){
					tab.remove();
				},1000);
			}
		}]
	});


	setTimeout(function(){
		tab.add({
			label:'tab2',
			onTagClick:function(){
				console.info("onTagClick:"+this.label);
				var me=this;
				setTimeout(function(){
					tab.remove(me);
				},1000);
			},
			onLoad:function(){
				this.$tabview.html("tab2");
				console.info("onLoad:"+this.label);
			}
		});
	},1000);
}

})();