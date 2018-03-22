const keywords = require('./keywords.js')
const Token = require('../grammar/Token.js')
const chalk = require('chalk')


class TokenFactory{

    constructor(){
        this.tokens = [];
        this.errorList = [] ;
    }

    tokeniseLine(line, position) {
        line = line.replace(/\/\/.*/, "//COMMENTAIRE");
        line = line.replace(/\/\*.*/, "/*COMMENTAIRE");
        line = line.replace(/.*\*\//, "/*COMMENTAIRE");
        line = line.replace(/".*"/, "\"STRING\"");
        line = line.replace(/'.*'/, "'STRING'");
        
        line = line.replace(/\t/, " \t ");
        line = line.replace("    ", " \t ");
        
        line = line.replace(/([^=])=([^=])/, "$1 = $2");
        line = line.replace(/;/, " ; ");
        line = line.replace(/\{/, " { ");
        line = line.replace(/\}/, " } ");
        line = line.replace(/\(/, " ( ");
        line = line.replace(/\)/, " ) ");
        line = line.replace(/\[/, " [ ");
        line = line.replace(/\]/, " ] ");
        line = line.replace(/,/, " , ");
        line = line.replace(/\n/, " \n ");
        line = line.replace(/\+([^\+])/, " + $1");
        line = line.replace(/\-([^\-])/, " - $1");
        line = line.replace(/\*([^\*])/, " * $1");
        line = line.replace(/([^\/])\/([^\/])/, "$1 / $2");
        line = line.replace(/\+\+/, " ++ ");
        line = line.replace(/\-\-/, " -- ");
        line = line.replace(/\*\*/, " ** ");

        line = line.replace(/!([^=])/, " !$1 ");
        line = line.replace(/<([^=?])/, " < $1");
        line = line.replace(/([^\?])>([^=])/, "$1 > $2");

        line = line.replace(/==([^=])/, " == $1");
        line = line.replace(/!=([^=])/, " != $1");
        line = line.replace(/<=([^=])/, " <= $1");
        line = line.replace(/>=([^=])/, " >= $1");

        line = line.replace(/===/, " === ");
        line = line.replace(/!==/, " !== ");
        line = line.replace(/<==/, " <== ");
        line = line.replace(/>==/, " >== ");

        var splitRegex = / +/;

        var words = line.split(splitRegex);
        for(var i in words){
            var word = words[i]
            if(word != ""){
                var token = new Token(word, position)
                this.tokens.push(token)
            }
          
        }
        
    };

    getTokens(){
      return this.tokens ;
    }

    getErrorList(){
      return this.errorList ;
    }

    getErrorNbr(){
        return this.errorList.length;
    }

}
module.exports = TokenFactory