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
const IndentChecker = require('./good_pratices/IndentChecker.js');

const args = process.argv;
const [nodeLocation, karcLocation, ...options] = args;

const entryPoint = options.length != 0
  ? options[0]
  : 'test.php';

if (fs.existsSync(entryPoint)) {
  
	var lineCpt = 0;
  try {


    //token
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


    //Compile
    console.log("\n--- Compiler Error -------------\n");
    var expFactory = new ExpressionFactory(tokens) ;
    var AST = expFactory.getExpressionList() ;
    var ErrorList = expFactory.getErrorList() ;
    ErrorList.forEach(element => {
      var name = element["name"] ;
      var line = element["line"] ;
      console.log("Compiler Error - " + name + " - Line : " + line);
    });
    

    //indentCheck
    console.log("\n--- Indent Check -------------\n");
    var indentChecker = new IndentChecker(tokens)
    var indentError = indentChecker.getIndentErrors() ;
    indentError.forEach(element => {
      var name = element["name"] ;
      var line = element["line"] ;
      console.log("Indent Error - " + name + " - Line : " + line);

    });
    var indentError = indentChecker.getNbr() ;
    console.log("nombre d'erreur d'indentation : " + indentError);


      console.log("\n--- Bilan -------------\n");
    
      //Bilan

      var noteToken = 5 - tokFactory.getErrorNbr()*0.5;
      var noteCompiler = 5 - expFactory.getErrorNbr()*0.5;
      var noteIdent = 5 - indentChecker.getNbr()*0.5;

      var baremePart = 5;
      var finalBareme = baremePart*3;

      var noteFinale = noteToken + noteCompiler + noteToken;

      console.log("Note Token : " + noteToken + "/" + baremePart);
      console.log("Note Compiler : " + noteCompiler + "/" + baremePart);
      console.log("Note Identation : " + noteIdent + "/" + baremePart);
      console.log("Note Finale : " + noteFinale + "/" + finalBareme);


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