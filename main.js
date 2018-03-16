#! /usr/bin/env node
'use strict';

const fs = require('fs');
const chalk = require('chalk');
const tokenizer = require('./parser/tokenizer.js');
const parser = require('./parser/parser.js');
const transformer = require('./transformer/transformer.js');
const readlines = require('n-readlines')
const Expression = require('./grammar/Expression.js');
const ExpressionFactory = require('./parser/ExpressionFactory.js');
const indentChecker = require('./good_pratices/IndentChecker.js');

const args = process.argv;
const [nodeLocation, karcLocation, ...options] = args;

const entryPoint = options.length != 0
  ? options[0]
  : 'test.php';

if (fs.existsSync(entryPoint)) {
    var tokens = [];
	var lineCpt = 0;
  try {

      var liner = new readlines(entryPoint);

      var line;
      var lineCpt = 0;
      while (line = liner.next()) {
          // console.log(line);
          lineCpt++;
          var res = tokenizer(line.toString('utf-8')+" \n", lineCpt);
          tokens = tokens.concat(res);
      }

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
    console.log("Compiler Error " + name + " - Line : " + line);
  });
  //console.log(AST);
  console.log("\n--- Indent Check -------------\n");
  var indentError = indentChecker(tokens) ;
  console.log("Taux d'erreur d'indentation : " + indentError)
	//console.log("\n--- Transformation --\n");
	//var rapport = transformer(AST);
	//console.log(rapport);
  } catch (e) {
    printError(e);
  }
} else{
  printError(`Could not find the entry point \`${chalk.magenta(entryPoint)}\``)  
}

function printError(err) {
  console.log(`${chalk.red('Error')} ${err}`);
}