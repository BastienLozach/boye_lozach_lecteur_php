const EXPRESSION_TYPE = {
    "value" : 0,
    "instruction" : 1,
    "accolades" : 2,
    "comment" : 3,
    
};

class Expression {

    //Do not use outside the class
    constructor(tokens, type){
        this.tokens = tokens;
        this.type = type ;
    }

    static getExpressionList(tokens){
        list = [];
        i = 0 ;
        currentTokens = []
        while (i < tokens.length){
            
            i++
        }
        return list;
    }


}

module.exports = Expression;