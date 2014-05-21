(function(){
window.examples.window=function(){

	var win=new ui.window({
		cls:'user',
		icons:[{
			type : 'help',
			handle : function(event){
				console.info(this.type);
			}
		}],
        maximizable: true,
		closable:true,
		title:'请选择'
	});

	var button=jQuery.createElement('<input type="button" value="窗口" />');

	jQuery.getBody().append(button);


	button.onclick=function(event){
		win.show();
	};


	
	var win2=new ui.window({
		cls:'user',
		closable:true,
		title:'请选择'
	});


	var button2=jQuery.createElement('<input type="button" value="可闭关窗口" />');

	jQuery.getBody().append(button2);


	
	button2.onclick=function(event){
		win2.show();
	};


	


	var button3=jQuery.createElement('<input type="button" value="状态处理" />');

	jQuery.getBody().append(button3);


	
	button3.onclick=function(event){
		ui.messagebox.progress({
			width : 300,
			height : 50,
			html : '<div style="padding: 15px;text-align: center;width: 300px;">数据正在保存请稍等...</div>'
		});

		setTimeout(function(){
			ui.messagebox.hide();
		},5000);
	};





	var win4=new ui.window({
		width : 500,
		item : {
			xtype:'form',
			cls : 'form',
			items : [{
				cls : 'user',
				label:'标签',
				name: 'sdf',
				icon : 'popu'
			},{
				cls : 'user',
				label:'标签',
				clear:true,
				unit:"px"
			},{	
				label:'标签',
				required:true,
				cls : 'user2 error'
			},{
				xtype : 'date',
				readonly : true,
				required:true,
				label:'日期'
			},{
				label:'性别',
				xtype:'combo',
				readonly : true,
				name : "bcms",
				items:[{
					label:'男',
					value : '1'
				},{
					label:'女',
					value:'1'
				}]
			}],
			buttons:[{
				label:'确定',
				cls:'confirm',
				onClick : function(event){
					console.info(this.label);

				}
			},{
				label:'取消',
				cls:'cancel',
				onClick :  function(event){
					win4.close();
				}
			}]
		}
	});


	var button4=jQuery.createElement('<input type="button" value="表单1" />');

	jQuery.getBody().append(button4);


	
	button4.onclick=function(event){
		win4.show();
	};


	var win5=new ui.window({
		width : 300,
		closable:true,
		title:'填写表单',
		item:{
			xtype:'form',
			cls : 'form',
			items : [{
				cls : 'user',
				label:'标签',
				name: 'sdf',
				icon : 'popu'
			},{
				cls : 'user',
				label:'标签',
				clear:true,
				unit:"px"
			},{	
				label:'标签',
				required:true,
				cls : 'user2 error'
			},{
				xtype : 'date',
				readonly : true,
				required:true,
				label:'日期'
			},{
				label:'性别',
				xtype:'combo',
				readonly : true,
				name : "bcms",
				items:[{
					label:'男',
					value : '1'
				},{
					label:'女',
					value:'1'
				}]
			}]
		},
		buttons:[{
			label:'确定',
			cls:'yes',
			handle : function(event){
				console.info(this.label);
			}
		},{
			label:'取消',
			cls:'cancel',
			handle :  function(event){
				console.info(this.label);
			}
		}]
	});


	var button5=jQuery.createElement('<input type="button" value="表单2" />');

	jQuery.getBody().append(button5);

	button5.onclick=function(event){
		win5.show();
	};



	
	var button6=jQuery.createElement('<input type="button" value="询问" />');

	jQuery.getBody().append(button6);


	
	button6.onclick=function(event){
		ui.messagebox.show({
			title : "提示信息",
			icon : ui.messagebox.QUESTION,
			msg : '确定要删除？',
			button : ui.messagebox.OKCANCEL,
			buttonText : [
				"确认删除!","取消"	
			],
			handle : function(type){
				console.info(type);
			}
		});
	};



	var button7=jQuery.createElement('<input type="button" value="提示框" />');

	jQuery.getBody().append(button7);


	
	button7.onclick=function(event){
		ui.messagebox.show({
			title : "提示信息",
			icon : ui.messagebox.INFO,
			msg : 'hello world!',
			button : ui.messagebox.OK,
			buttonText : [
				"确定"	
			],
			handle : function(type){
				console.info(type);
			}
		});
	};


 

	var button8=jQuery.createElement('<input type="button" value="确认删除按钮" />');

	jQuery.getBody().append(button8);

	
	button8.onclick=function(event){

		ui.messagebox.delConfirm({
			target : button8,
			html : '<div class="x-ui-del-confirm-label">确认删除模块</div>',
			handle : function(){
				console.info('yes');
			}
		});
	};




	
	var button9=jQuery.createElement('<input type="button" value="确认删除按钮9" style="position: absolute;left: 10px;bottom: 10px;padding: 10px 20px;z-index: 99999999;" />');

	jQuery.getBody().append(button9);

	
	button9.onclick=function(event){

		ui.messagebox.delConfirm({
			target : button9,
			html : '<div class="x-ui-del-confirm-label">确认删除模块</div>',
			handle : function(){
				console.info('yes');
			}
		});
	};


	
	var button10=jQuery.createElement('<input type="button" value="确认删除按钮10" style="position: absolute;right: 10px;top: 100px;padding: 10px 20px;z-index: 99999999;" />');

	jQuery.getBody().append(button10);

	
	button10.onclick=function(event){

		ui.messagebox.delConfirm({
			target : button10,
			html : '<div class="x-ui-del-confirm-label">确认删除模块</div>',
			handle : function(){
				console.info('yes');
			}
		});
	};



	$(".icon-list .icon").click(function(event){
			ui.messagebox.delConfirm({
				target : this,
				html : '<div class="x-ui-del-confirm-label">确认删除模块</div>',
				handle : function(){
					console.info('yes');
				}
			});
	});




	jQuery.getBody().append(['<style>',
							'body{',
								'background: linear-gradient(#7BB9D8 0%, #5AA2C7 50%, #3583AA 100%);',
								'height:800px;',
								'overflow: hidden;',
							'}',
							'.black-theme{',
								'background: linear-gradient(#666 0%, #535353 50%, #464646 100%);',
							'}</style>'].join(''));
	jQuery.getBody().addClass('black-theme');
};


})();


function initWindow(){

	var win=['<div class="x-ui-window">',
				'<div class="x-ui-win-header">',
					'<div class="x-ui-title">请选择</div>',
					'<div class="x-ui-iconbar">',
						'<div class="x-ui-icon restore"></div>',
						'<div class="x-ui-icon maximize"></div>',
						'<div class="x-ui-icon close"></div>',
					'</div>',
				'</div>',
				'<div class="x-ui-win-body">',
				'</div>',
				'<div class="x-ui-dialog-body">',
					'<div class="x-ui-dialog-content">',
						'<div class="x-ui-icon warning"></div>',
						'<div class="x-ui-message-text">确认要删除联系人？</div>',
					'</div>',
					'<div class="x-ui-dialog-buttonbar">',
							'<div class="x-ui-button">确认</div>',
							'<div class="x-ui-button">取消</div>',
					'</div>',
				'</div>',
			'</div>'];
	var xWin=jQuery.createElement(win.join(''));
	
	var mask=jQuery.createElement('<div class="x-ui-mask"></div>');

	jQuery.getBody().append(mask);

	jQuery.getBody().append(xWin);
	
	var $xWin=$(xWin);
	
	var winHeader=$xWin.children(".x-ui-win-header");

	var winBody=$(".x-ui-win-body",xWin);
	
	var dialogBody=$(".x-ui-dialog-body",xWin);
	
	dialogBody.children(".x-ui-dialog-buttonbar").bindChildrenHover();
	
	winHeader.children(".x-ui-iconbar").bindChildrenHover();

	var param=$.getParam();
	
	if(param.type=="alert"){
		$xWin.addClass("x-ui-dialog");
	}else{
		winBody.html('<div><br>芬兰共和国（芬兰语：Suomen Tasavalta）。简称芬兰，国名的含义为湖沼之国。<br>国旗<br><br>芬兰国旗名为“蓝色十字”旗（芬兰语：Siniristilippu），1818年5月正式定为国家市民旗帜。”呈长方形，长与宽之比为18∶11。旗地为白色。稍偏左侧的十字形蓝色宽条将旗面分为四个白色长方形。芬兰以“千湖之国”著称，西南临波罗的海，旗上的蓝色象征湖泊，河流和海洋；另一说象征蓝天。蓝色和白色国旗也象征着与芬兰19世纪曾经是沙皇俄国的大公国。芬兰国旗反映了和瑞典和斯堪的纳维亚国家的关系。芬兰有三分之一的领土在北极圈内，气候寒冷，旗上的白色象征白雪覆盖着的国土。<br><br>另一种国旗为特殊旗，即在市民旗帜的蓝色十字加上国徽（红底黄狮），该旗帜为总统和军队用旗。芬兰国旗是由埃罗·斯奈尔曼（Eero Snellman）和布鲁诺·图乌卡能（Bruno Tuukkanen）设计的，今天使用的国徽和总统旗上的自由十字是欧罗夫·埃里克森（Olof Eriksson）设计的。<br>国徽<br><br>芬兰国徽在瑞典国王古斯塔夫一世时被采用。在芬兰作为大公国时代也采<br>芬兰国徽[1]<br>用了此徽，一直沿用至今。为红色盾徽。盾面上为一只头戴王冠的金色狮子，前爪握着一把剑，后爪踩着一把弯刀。九 朵白色的玫瑰花点缀在狮子周围。国徽上的狮子来源于富尔孔家族，它同样也出现在瑞典国徽上。剑和弯刀与卡累利阿国徽相类似。踩在狮子脚下的俄罗斯弯刀则反映了当时的政治形势。彼时，瑞典与俄罗斯正处于长期战争中。九朵玫瑰据推测是代表了芬兰历史上的九个省，但玫瑰的数量几经变化。<br>首都<br><br>赫尔辛基（Helsinki），人口58.9万 (2011年底)[2]。夏季平均气温16℃，冬季平均气温－5℃。赫尔辛基素称“波罗的海明珠”，是一座 花园般现代化都市，街道宽阔，商业繁荣，现代建筑和 中世纪建筑具浓郁的民族特色，市内众多的各种类型的博物馆吸引着各地游人。<br>人口<br><br>543.0万人（2013年3月）。芬兰族占90.9%b，瑞典族占5.4%，还有少量萨米人（曾称为拉<br>芬兰<br>普人）。77.7%的居民信奉基督教路德宗，1.2%信奉东正教。其余包括了少部分基督教新教其他教派的教徒、罗马天主教徒、穆斯林和犹太教徒。芬兰有两种官方语言：93%的人口所使用的芬兰语和6%人口的母语瑞典语。少数人口包括了萨米人、俄罗斯人、犹太人等。冬季战争后大约有12%的人口需要被安置。战争赔款、失业问题以及对芬兰保持独立前景的不确定曾导致了大批的移民在1970年代离开芬兰。而到了1990年代“华约”解散，东欧巨变及苏联解体后，芬兰又开始接收大批难民与移民。<br>节日<br><br>独立纪念日：12月6日（1917年）<br><br>仲夏节：2004年6月25日，芬兰各地按照民间传统习俗举行仲夏节庆祝活动。人们身穿民族服装进行各种传统民间手工艺表演，并点燃熊熊篝火，载歌载舞欢度仲夏之夜。<br><br>大学生戴帽节：赫尔辛基的大学生从四面八方聚集到南码头广场，为广场中央圆形<br>铃兰[1]<br>喷池中的哈维斯·阿曼达少女青铜塑像举行戴帽仪式。同时，在场的大学生戴上象征大学生的白帽子，畅饮已经准备好的香槟酒，祝贺他们自己的节日。<br><br>圣诞节：芬兰是圣诞老人的故乡，尽管距离圣诞节还有一个月的时间，圣诞老人已早早来到首都赫尔辛基，参加传统的圣诞节开灯仪式。当地人化装成小雪花、森林动物、白雪公主等，牵着来自北部地区的驯鹿，兴高采烈地参加游行庆祝活动。<br><br>赫尔辛基桑巴狂欢节：2009年6月13日，赫尔辛基举行第19届桑巴狂欢节。当日，来自芬兰全国各地的桑巴舞爱好者和桑巴舞学校的师生在赫尔辛基市中心举行狂欢节大游行。<br><br>采摘节：到野外采摘野浆果和野蘑菇，是领略芬兰清纯大自然的途径之一。在其他国家，你可能需要缴费，并且有地区限制，但在芬兰国家法规Everymanss Rights的保障下，可以随意采摘。<br><br>在芬兰，有67%的人会以此作</div>');
	}







	




}