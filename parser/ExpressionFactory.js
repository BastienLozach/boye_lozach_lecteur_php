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
        var identifierNotFunction = ["while", "for", "if"];
        while (i < tokens.length){

            //Start of PHP script
            if(i == 0 && tokens[i].type != "start_script"){
                this.errorList.push(
                    {
                        "name" : "Missing Start Script",
                        "line" : tokens[i].pos,
                    }
                )
                //console.log("ERROR : Missing Start Script ! Line " + tokens[i].pos);
            }
            
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

            if(tokens[i].type == "binair_operator" && tokens[i].value == "="){
                if(i!=0 && i<tokens.length-1){
                    var precedentToken = tokens[i-1];
                    if(precedentToken.type != "var" && tokens[i+1].type!="binair_operator"){
                        this.errorList.push(
                            {
                                "name" : "Assignement error : Not a variable",
                                "line" : tokens[i].pos,
                            }
                        )
                    }
                } else {
                    this.errorList.push(
                        {
                            "name" : "Assignement error : Missing term",
                            "line" : tokens[i].pos,
                        }
                    )
                }
            }

            //fin de ligne
            var containsAValue= ["var", "string", "number"] ;
            var nextOne= ["var", "string", "number", "identifier", "end_script"] ;
            if(containsAValue.indexOf(tokens[i].type) != -1){
                var j = 1 ;
                var stop = false ;
                while (i+j < tokens.length-1 && !stop){
                    stop = true ;
                    if (["newline", "tab"].indexOf(tokens[i + j].type) != -1){
                        j++ ;
                        stop = false ;
                    }
                    else if (nextOne.indexOf(tokens[i + j].type) != -1){
                        this.errorList.push(
                            {
                                "name" : "Missing ;",
                                "line" : tokens[i].pos,
                            }
                        ) 
                    }
                }
                if (i+j == tokens.length){
                    this.errorList.push(
                        {
                            "name" : "Missing ;",
                            "line" : tokens[i].pos,
                        }
                    )
                }
            }


            //Si c'est une fonction
            if(tokens[i].type == "identifier" && identifierNotFunction.indexOf(tokens[i].value) == -1  && tokens[i+1].type == "open_parent"){
                
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

    getErrorNbr(){
        return this.errorList.length;
    }

}


module.exports = ExpressionFactory;