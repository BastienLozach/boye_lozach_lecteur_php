const keywords = require('./keywords.js')
const Token = require('../grammar/Token.js')
const chalk = require('chalk')

module.exports = input => {
  const tokens = []
  let current = 0
  let slice = input.substring(0)

  // used only in case of error
  let cursor_y = 1
  let cursor_x = 1

  const addToken = (type, value) => {
    tokens.push(new Token(type, value, current))
  }

  const keywords_keys = Object.keys(keywords)
  const checkKeywords = slice => {
    for (let i = 0; i < keywords_keys.length; i++) {
      const currentKeyword = keywords[keywords_keys[i]]

      if (!isToken(currentKeyword.r, slice)) {
        addToken(keywords_keys[i], currentKeyword.s)
        current += currentKeyword.s.length
        return true
      }
    }

    return false
  }

  while (current < input.length) {
    const char = input.charAt(current)
    slice = input.substring(current)

    cursor_x++
    let sub_current = 0
    let sub_char = char

    switch (char) {
      case '\n':
        addToken('line-break', '\n')
        cursor_y += 1
        cursor_x = 1
        current++
        break
		
	  case '"':
		sub_current = 1
        sub_char = slice.charAt(sub_current)
		var isString= false;
        while (sub_current < slice.length) {
          sub_char = slice.charAt(sub_current)
		  if (sub_char === '"') {
			sub_current++
			addToken('object-string', slice.substring(0, sub_current))
			current += sub_current;
			isString= true;
            break;
          }
          sub_current++
        }
		if(!isString){
			throw `if you start a string ${cursor_y}:${cursor_x} ${char} you have to end it.`
		}
        break
		
      case '=':
        addToken('equal', '=')
        current++
        break

      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
      case '0':
        sub_current = 0
        sub_char = slice.charAt(sub_current)

        // set to true when a '.' is encountered
        let isFloat = false

        while (sub_current < slice.length) {
          sub_char = slice.charAt(sub_current)

          if (sub_char === '.') {
            isFloat = true
          }

          if (!isDigit(sub_char) && sub_char !== '.') {
            addToken(isFloat ? 'number-float' : 'number', slice.substring(0, sub_current))
            current += sub_current
            break
          }

          sub_current++
        }
        break

      case ' ':
      case '\r':
        current++
        break
	  case ';':
		addToken('instruction-end', ';');
        current++
        break
	  case '.':
		addToken('point', '.');
        current++
        break
	  case ',':
		addToken('virgule', ',');
        current++
        break
	  case '(':
		addToken('parenthesis-start', '(');
        current++
        break
	  case ')':
		addToken('parenthesis-end', ')');
        current++
        break
      default:
        const isKeyWord = checkKeywords(slice)
        if (isKeyWord) {
          // ...
        } else if (char.match(/[aA-zZ]/)) {
          // look for any identifier
          sub_current = 0
          sub_char = slice.charAt(sub_current)

          while (sub_current <= slice.length) {
            sub_char = slice.charAt(sub_current)

            if (sub_char.match(/([aA-zZ]|[0-9])/) === null) {
              addToken('identifier', slice.substring(0, sub_current))
              current += sub_current - 1
              break
            }

            sub_current++
          }

          current++
        } else {
          throw `unrecognized character at ${cursor_y}:${cursor_x} ${char}`
        }

        break
    }
  }

  return tokens
}

const ALPHA = /([A-Z]|[a-z])/
function isAlpa(char) {
  return char.match(ALPHA)
}

const DIGIT = /([0-9])/
function isDigit(char) {
  return char.match(DIGIT)
}

function isToken(tokenRegex, slice) {
  const match = slice.match(tokenRegex)

  return match === null ? -1 : match.index
}