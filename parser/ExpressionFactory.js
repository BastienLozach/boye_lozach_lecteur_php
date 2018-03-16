const Expression = require('../grammar/Expression.js');


class ExpressionFactory{

    constructor(tokens){
        this.tokens = tokens;
        this.expressionList = null ;
        this.errorList = null ;
        this.initExpressionList(tokens)
    }



    initExpressionList(tokens){
        this.expressionList = [];
        this.errorList = [];
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
                    this.expressionList.push(new Expression(expressionToken, Expression.EXPRESSION_TYPE()["parenthesis"], null));
                }
                else{
                    this.errorList.push(
                        {
                            "name" : "Missing Parenthesis",
                            "line" : tokens[i].pos,
                        }
                    )
                    //console.log("ERROR : Missing Parenthesis ! Line " + tokens[i].pos);
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
                    this.expressionList.push(new Expression(expressionToken, Expression.EXPRESSION_TYPE()["accolades"], null));
                }
                else{
                    this.errorList.push(
                        {
                            "name" : "Missing Accolade",
                            "line" : tokens[i].pos,
                        }
                    )
                    //console.log("ERROR : Missing Accolade ! Line " + tokens[i].pos);
                }
            }

            //crochets
            if(tokens[i].type == "open_crochet"){
                var closingToken = null;
                var intermediaryCrochets = 0;
                var j = i+1 ;
                while (j < tokens.length) {
                    if(tokens[j].type == "open_crochet"){
                        intermediaryCrochets++ ;
                    }
                    if(tokens[j].type == "close_crochet" && intermediaryCrochets != 0){
                        intermediaryCrochets--;
                    }
                    else if(tokens[j].type == "close_crochet" && intermediaryCrochets == 0){
                        closingToken = j;
                    }
                    j++ ;
                }
                if (closingToken != null){
                    var expressionToken = tokens.slice(i, closingToken + 1) ;
                    this.expressionList.push(new Expression(expressionToken, Expression.EXPRESSION_TYPE()["crochet"], null));
                }
                else{
                    this.errorList.push(
                        {
                            "name" : "Missing Crochet",
                            "line" : tokens[i].pos,
                        }
                    )
                    //console.log("ERROR : Missing Crochet ! Line " + tokens[i].pos);
                }
            }

            
            i++ ;
        }
    }

    getExpressionList(){
        return this.expressionList ;
    }

    getErrorList(){     
        return this.errorList ;
    }

}


module.exports = ExpressionFactory;