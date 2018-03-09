const keywords = require('./keywords.js')
const Token = require('../grammar/Token.js')
const chalk = require('chalk')


function tokenizer(line, position) {

    line = line.replace("    ", "\t");
    line = line.replace(/=[^=]/, " = ");
    line = line.replace(/;/, " ; ");
    line = line.replace(/\{/, " { ");
    line = line.replace(/\}/, " } ");
    line = line.replace(/\(/, " ( ");
    line = line.replace(/\)/, " ) ");
    line = line.replace(/\[/, " [ ");
    line = line.replace(/\]/, " ] ");
    line = line.replace(/,/, " , ");
    line = line.replace(/\n/, " \n");
    line = line.replace(/\+[^\+]/, " + ");
    line = line.replace(/\-[^\-]/, " - ");
    line = line.replace(/\*[^\*]/, " * ");
    line = line.replace(/\/[^\/]/, " / ");
    line = line.replace(/\+\+/, " ++ ");
    line = line.replace(/\-\-/, " -- ");
    line = line.replace(/\*\*/, " ** ");

    line = line.replace(/![^=]/, " ! ");
    line = line.replace(/<[^=]/, " < ");
    line = line.replace(/>[^=]/, " > ");

    line = line.replace(/==[^=]/, " == ");
    line = line.replace(/!=[^=]/, " != ");
    line = line.replace(/<=[^=]/, " <= ");
    line = line.replace(/>=[^=]/, " >= ");

    line = line.replace(/===/, " === ");
    line = line.replace(/!==/, " !== ");
    line = line.replace(/<==/, " <== ");
    line = line.replace(/>==/, " >== ");

    line = line.replace(/ +/, " ");

    //console.log(line);

    var result = [];

    var words = line.split(" ");
    for(var word in words){
      result.push(new Token(words[word], position))
    }
    // console.log(result)
    return result;

};

module.exports = tokenizer