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
				label : 'h',
				children : [{
					label : 'h1'
				},{
					label : 'h2'
				},{
					label : 'h3'
				},{
					label : 'h4',
					children : [{
						label : 'x1'
					},{
						label : 'x2'
					},{
						label : 'x3'
					},{
						label : 'x4'
					}]
				}]
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