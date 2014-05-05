(function(){
window.examples.combo=function(){

	var div=jQuery.createElement('<div class="user"></div>');

	jQuery.getBody().append(div);

	var combo=new ui.form.combo({
		render : div,
		label : "下拉1",
		cls : "combo",
		readonly : true,
		name : "bcms",
		items:[{
			label:'删除行1',
			value : '2'
		},{
			label:'删除列2',
			value:'1'

		},{
			label:'删除行1',
			value : '2'
		},{
			label:'删除列2',
			value:'1'

		},{
			label:'删除行1',
			value : '2'
		},{
			label:'删除列2',
			value:'1'

		},{
			label:'删除行1',
			value : '2'
		},{
			label:'删除列2',
			value:'1'

		},{
			label:'删除行1',
			value : '2'
		},{
			label:'删除列2',
			value:'1'

		},{
			label:'删除行1',
			value : '2'
		},{
			label:'删除列2',
			value:'1'

		},{
			label:'删除行1',
			value : '2'
		},{
			label:'删除列2',
			value:'1'

		},{
			label:'删除行1',
			value : '2'
		},{
			label:'删除列2',
			value:'1'

		},{
			label:'删除行1',
			value : '2'
		},{
			label:'删除列2',
			value:'1'
		}],
		onSelectedAfter:function(item){
			console.info(item.label+"onSelectedAfter");
		}
	});



	var combo=new ui.form.combo({
		render : div,
		label : "下拉2",
		arrowIcon : false,
		onTextFocus : function(){
			console.info(this.label+"onTextFocus");
		},
		onArrowClick : function(){
			console.info(this.label+"onArrowClick");
		}
	});

		
	var combo=new ui.form.combo({
		render : div,
		label : "下拉3",
		cls : "combo",
		items:[{
			label:'删除行1',
			value : '2'
		},{
			label:'删除列2',
			value:'1'

		}],
		name : "bcms",
		onSelectedAfter:function(item){
			console.info(item.label+"onSelectedAfter");
		},
		onTextFocus : function(){
			console.info(this.label+"onTextFocus");
		},
		onArrowClick : function(){
			console.info(this.label+"onArrowClick");
		}
	});

}

})();