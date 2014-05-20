(function(){
window.examples.form=function(){

	$.includePack('css',examples.path+'/css/text.css');

	var form=new ui.form({
		render:document.body,
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
			xtype:'radio',
			name : "sex",
			items:[{
				label:'男',
				value : '1',
				checked : true
			},{
				label:'女',
				value:'2',
				checked : true
			}]
		},{
			label:'兴趣',
			xtype:'checkbox',
			name : "like",
			items:[{
				label:'足球',
				value : '1',
				checked : true
			},{
				label:'羽毛球',
				value:'2',
				checked : true
			},{
				label:'游泳',
				value:'3',
				checked : true
			},{
				label:'跑步',
				value:'4'
			},{
				label:'下棋',
				value:'5'
			},{
				label:'看书',
				value:'6'
			}]
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
			onClick:function(){
				console.info(this.$owner.getValues());
			}
		},{
			label:'取消',
			cls:'cancel',
			onClick:function(){
				this.$owner.enabled();
			}
		}]
	});

window.radio=form.items[4];


	form.disabled();

	window.form=form;
}

})();