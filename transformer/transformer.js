module.exports = ast => {
	var rapport = [] ;
	var expressions = ast.body;
	//add rapport note of expressions;
	while (expressions.length > 0) {
		var current_expression = expressions.shift();
		switch(current_expression.type){
			case 'VariableDeclarationExpression':
				//check if variable name is well formed
				//check if variable is used;
				
				break;
			case 'VariableAssignationExpression':
				//check if variable is declared;
				break;
				
			case 'ConsoleUseMethodeExpression':
				//check if methode exist
				//check arguments 
				break;
		}
		rapport.push({ 'type' : current_expression.type,
					   'note' : 5});
	}
	return rapport;
}