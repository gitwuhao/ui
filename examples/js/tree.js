(function(){
window.examples.tree=function(){
	
	
	 var tree=new ui.tree({
		items:[{
			label : '1',
			children : [{
				label : 'a',
				children : [{
					label : 'a1'
				},{
					label : 'a2'
				},{
					label : 'a3'
				},{
					label : 'a4'
				}]
			},{
				label : 'b'
			},{
				label : 'c'
			},{
				label : 'd'
			},{
				label : 'e'
			},{
				label : 'f'
			},{
				label : 'g'
			},{
				label : 'h'
			}]
		},{
			label : '2'
		},{
			label : '3'
		},{
			label : '4'
		},{
			label : '5'
		},{
			label : '6'
		},{
			label : '7'
		}]

	 });
 
}

})();