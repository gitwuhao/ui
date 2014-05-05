(function(){
window.examples.text=function(){


	var text=new ui.form.text({
		render:document.body,
		cls : '',
		px : 'od',
		label:'标签',
		unit:""
	});

	var text=new ui.form.text({
		render:document.body,
		cls : 'user',
		label:'标签',
		unit:""
	});

	
	var text=new ui.form.text({
		render:document.body,
		cls : 'user',
		label:'标签',
		clear:true,
		unit:"px"
	});

	var text=new ui.form.text({
		render:document.body,
		cls : 'user2'
	});

	var text=new ui.form.text({
		render:document.body,
		label:'标签',
		required:true,
		cls : 'user2 error'
	});

	var text=new ui.form.text({
		render : document.body,
		cls : 'user3',
		number : true,
		unit:"em"
	});
}

})();