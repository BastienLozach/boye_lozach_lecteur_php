class IndentCheck{

    constructor(tokens){
        this.indentErrors = [] ;
        //trace de la version 0
        //"inutile"
        this.nbr = 0
        this.verifyIndent(tokens) ;
    }

    verifyIndent(tokens){
        var indentLevel = 0 ;
        var i = 0 ;
        var plusOneList = ["open_accol", "open_crochet", "open_parent"] ;
        var minusOneList = ["close_accol", "close_crochet", "close_parent"] ;
        while ( i < tokens.length ){
            
            //set indentLevel
            if (plusOneList.indexOf(tokens[i].type) != -1){
                indentLevel++ ;
                
                
            }
            if (minusOneList.indexOf(tokens[i].type) != -1){
                indentLevel-- ;
                
            }

            //verify level
            if(tokens[i].type == "newline"){
                for (var j = i+1; j < tokens.length && j < (i + indentLevel +1); j++){
                    
                    if(tokens[j].type != "tab"){
                        
                        if (!(j != (i + indentLevel -1) && minusOneList.indexOf(tokens[j].type) != -1)){
                            this.nbr++ ;
                            this.indentErrors.push(
                                {
                                    "name" : "tabulation incorrecte",
                                    "line" : tokens[i].pos +1,
                                }
                            )
                            //console.log("tabulation incorrecte - Ligne : " + tokens[j].pos);
                        }
                        
                    }
                }
            }
            i++ ;
        }
        
    }

    getIndentErrors(){
        return this.indentErrors ;
    }

    getNbr(){     
        return this.nbr ;
    }

}
module.exports = IndentCheck;