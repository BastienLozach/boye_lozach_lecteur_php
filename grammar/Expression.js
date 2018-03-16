const EXPRESSION_TYPE = {
    "value" : 0,
    "instruction" : 1,
    "accolades" : 2,
    "comment" : 3,
    "parenthesis" : 4,
    "crochets" : 5,
    
};



class Expression {

    constructor(tokens, type, subExpressions){
        this.tokens = tokens;
        this.type = type ;
        this.subExpressions = subExpressions
    }

    static EXPRESSION_TYPE(){
        return EXPRESSION_TYPE ;
    }

}

module.exports = Expression;