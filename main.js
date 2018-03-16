#! /usr/bin/env node
'use strict';

const fs = require('fs');
const chalk = require('chalk');
const parser = require('./parser/parser.js');
const transformer = require('./transformer/transformer.js');
const readlines = require('n-readlines')
const Expression = require('./grammar/Expression.js');
const ExpressionFactory = require('./parser/ExpressionFactory.js');
const TokenFactory = require('./parser/TokenFactory.js');
const IndentChecker = require('./good_pratices/IndentChecker.js');

const args = process.argv;
const [nodeLocation, karcLocation, ...options] = args;

const entryPoint = options.length != 0
  ? options[0]
  : 'test.php';

if (fs.existsSync(entryPoint)) {
  
	var lineCpt = 0;
  try {

    console.log("\n--- Tokens Error----------\n");
      var tokFactory = new TokenFactory() ;
      var liner = new readlines(entryPoint);

      var line;
      var lineCpt = 0;
      while (line = liner.next()) {
          // console.log(line);
          lineCpt++;
          tokFactory.tokeniseLine(line.toString('utf-8')+" \n", lineCpt);
          
      }
      var tokens = tokFactory.getTokens() ;
      var errorList = tokFactory.getErrorList() ;
      errorList.forEach(element => {
        var name = element["name"] ;
        var line = element["line"] ;
        console.log("Token Error - " + name + " - Line : " + line);
      });
    //console.log("\n--- Tokens ----------\n");
    //console.log(tokens);
    //console.log("\n--- AST -------------\n");
    //var AST = parser(tokens);

    console.log("\n--- Compiler Error -------------\n");
    var expFactory = new ExpressionFactory(tokens) ;
    var AST = expFactory.getExpressionList() ;
    var ErrorList = expFactory.getErrorList() ;
    ErrorList.forEach(element => {
      var name = element["name"] ;
      var line = element["line"] ;
      console.log("Compiler Error - " + name + " - Line : " + line);
    });
    //console.log(AST);
    console.log("\n--- Indent Check -------------\n");
    var indentChecker = new IndentChecker(tokens)
    var indentError = indentChecker.getIndentErrors() ;
    indentError.forEach(element => {
      var name = element["name"] ;
      var line = element["line"] ;
      console.log("Indent Error - " + name + " - Line : " + line);
    });

    console.log("\n--- Bilan -------------\n");
    var indentError = indentChecker.getNbr() ;
    console.log("nombre d'erreur d'indentation : " + indentError)
    //console.log("\n--- Transformation --\n");
    //var rapport = transformer(AST);
    //console.log(rapport);

    console.log("\n--- End -------------\n")
  } catch (e) {
    printError(e);
  }
} else{
  printError(`Could not find the entry point \`${chalk.magenta(entryPoint)}\``)  
}

function printError(err) {
  console.log(`${chalk.red('Error')} ${err}`);
}