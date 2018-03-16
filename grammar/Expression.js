const EXPRESSION_TYPE = {
    "value" : 0,
    "instruction" : 1,
    "accolades" : 2,
    "comment" : 3,
    "parenthesis" : 4,
    
};

class Expression {

    //Do not use outside the class
    constructor(tokens, type, subExpressions){
        this.tokens = tokens;
        this.type = type ;
        this.subExpressions = subExpressions
    }

    static getExpressionList(tokens){
        var list = [];
        var i = 0 ;
        var currentTokens = [];
        while (i < tokens.length){
            
            //parenthesis
            if(tokens[i].type == "open_parent"){
                var closingToken = null;
                var intermediaryParenthesis = 0;
                var j = i+1 ;
                while (j < tokens.length) {
                    if(tokens[j].type == "open_parent"){
                        intermediaryParenthesis++ ;
                    }
                    if(tokens[j].type == "close_parent" && intermediaryParenthesis != 0){
                        intermediaryParenthesis--;
                    }
                    else if(tokens[j].type == "close_parent" && intermediaryParenthesis == 0){
                        closingToken = j;
                    }
                    j++ ;
                }
                if (closingToken != null){
                    var expressionToken = tokens.slice(i, closingToken + 1) ;
                    list.push(new Expression(expressionToken, EXPRESSION_TYPE["parenthesis"], null));
                }
                else{
                    console.log("ERROR : Missing Parenthesis ! Line " + tokens[i].pos);
                }
            }

            //accolades
            if(tokens[i].type == "open_accol"){
                var closingToken = null;
                var intermediaryAccolades = 0;
                var j = i+1 ;
                while (j < tokens.length) {
                    if(tokens[j].type == "open_accol"){
                        intermediaryAccolades++ ;
                    }
                    if(tokens[j].type == "close_accol" && intermediaryAccolades != 0){
                        intermediaryAccolades--;
                    }
                    else if(tokens[j].type == "close_accol" && intermediaryAccolades == 0){
                        closingToken = j;
                    }
                    j++ ;
                }
                if (closingToken != null){
                    var expressionToken = tokens.slice(i, closingToken + 1) ;
                    list.push(new Expression(expressionToken, EXPRESSION_TYPE["accolades"], null));
                }
                else{
                    console.log("ERROR : Missing Accolade ! Line " + tokens[i].pos);
                }
            }


            
            i++ ;
        }
        return list;
    }


}

module.exports = Expression;