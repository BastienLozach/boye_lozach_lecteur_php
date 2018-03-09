const keywords = require('./keywords.js')
const Token = require('../grammar/Token.js')
const chalk = require('chalk')


function tokenizer(line, position) {


    line = line.replace(/\/\/.*/, "//COMMENTAIRE");
    line = line.replace(/\/\*.*/, "/*COMMENTAIRE");
    line = line.replace(/.*\*\//, "/*COMMENTAIRE");
    line = line.replace(/".*"/, "\"STRING\"");
    line = line.replace(/'.*'/, "'STRING'");

    line = line.replace("    ", "\t");
    line = line.replace(/=([^=])/, " = $1");
    line = line.replace(/;/, " ; ");
    line = line.replace(/\{/, " { ");
    line = line.replace(/\}/, " } ");
    line = line.replace(/\(/, " ( ");
    line = line.replace(/\)/, " ) ");
    line = line.replace(/\[/, " [ ");
    line = line.replace(/\]/, " ] ");
    line = line.replace(/,/, " , ");
    line = line.replace(/\n/, " \n");
    line = line.replace(/\+([^\+])/, " + $1");
    line = line.replace(/\-([^\-])/, " - $1");
    line = line.replace(/\*([^\*])/, " * $1");
    line = line.replace(/\/([^\/])/, " / $1");
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


    console.log(line);

    var result = [];

    var splitRegex = / +/;

    var words = line.split(splitRegex);
    for(var word in words){
      result.push(new Token(words[word], position))
    }
    // console.log(result)
    return result;

};

module.exports = tokenizer