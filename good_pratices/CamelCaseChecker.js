class CamelCaseChecker{

    constructor(tokens){
        this.camelCaseErrors = [] ;
        //trace de la version 0
        //"inutile"
        this.nbr = 0
        this.verifyCamelCase(tokens) ;
    }

    verifyCamelCase(tokens){
        tokens.forEach(token => {
            if(token.type == "var"){
                var firstLetter = token.value.charAt(1) ;
                if(firstLetter == firstLetter.toUpperCase()){
                    this.camelCaseErrors.push(
                        {
                            "name" : "camelCase miniscule incorrect",
                            "line" : token.pos,
                        }
                    )
                    this.nbr++ ;
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