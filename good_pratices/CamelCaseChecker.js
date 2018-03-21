class CamelCaseChecker{

    constructor(tokens){
        this.camelCaseErrors = [] ;
        //trace de la version 0
        //"inutile"
        this.nbr = 0
        this.verifyIndent(tokens) ;
    }

    verifyCamelCase(tokens){
        tokens.forEach(token => {
            if(token.type = "var"){
                firstLetter = token.value.charAt(1) ;
                if(firstLetter == character.toUpperCase()){
                    this.camelCaseErrors.push(
                        {
                            "name" : "camelCase miniscule incorrect",
                            "line" : tokens[i].pos,
                        }
                    )
                }

            }
        });        
    }

    getCamelCaseErrors(){
        return this.camelCaseErrors ;
    }

    getNbr(){     
        return this.nbr ;
    }

}
module.exports = CamelCaseChecker;