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
const CamelCaseChecker = require('./good_pratices/CamelCaseChecker.js');

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

    //indentCheck
    console.log("\n--- CamelCase Check -------------\n");
    var camelCaseChecker = new CamelCaseChecker(tokens)
    var camelCaseError = camelCaseChecker.getCamelCaseErrors() ;
    camelCaseError.forEach(element => {
      var name = element["name"] ;
      var line = element["line"] ;
      console.log("CamelCase Error - " + name + " - Line : " + line);

    });
    var camelCaseError = camelCaseChecker.getNbr() ;
    console.log("nombre d'erreur de camelCase : " + camelCaseError);


      console.log("\n--- Bilan -------------\n");
    
      //Bilan
      //regles
      var baremePart = 5;
      var finalBareme = baremePart*4;
      var cost = 0.5;

      //notes
      var noteToken = baremePart - tokFactory.getErrorNbr()*cost;
      var noteCompiler = baremePart - expFactory.getErrorNbr()*cost;
      var noteIdent = baremePart - indentChecker.getNbr()*cost;
      var noteCamelCase = baremePart - camelCaseChecker.getNbr()*cost;

      var noteFinale = noteToken + noteCompiler + noteToken + noteCamelCase;

      console.log("Note Token : " + noteToken + "/" + baremePart);
      console.log("Note Compiler : " + noteCompiler + "/" + baremePart);
      console.log("Note Identation : " + noteIdent + "/" + baremePart);
      console.log("Note CamelCase : " + noteCamelCase + "/" + baremePart);
      console.log("\nNote Finale : " + noteFinale + "/" + finalBareme);


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