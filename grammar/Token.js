const token = {
	//commentaire et chaines
	"comment" : /^(\/\/.*)|(\/\*.*\*\/)/,
	"string" : /^(\".*\")|(\'.*\')/,
	
	//whitespace
	"newline" : /^\n/,
	"tab" : /^(\t)|( {4})/,

	//semi-colon
	"semi-colon" : /^;/,
    "comma" : /^,/,

	//parentheses et accolades
	"open_accol" : /^{/,
	"close_accol" : /^}/,
	"open_parent" : /^\(/,
	"close_parent" : /^\)/,
    "open_crochet" : /^\[/,
    "close_crochet" : /^\]/,

    //operateurs
    "unair_operator" : /^[\!]+/,
	"binair_operator" : /^[(\+)(\-)(\*)(\.)(\/)(\=)(\<)(\>)(\!)]{1,3}/,

	//variables et valeurs
	"var" : /^\$.+/,
	"number" : /^[0-9\.]+/,

	//identifier (fonctions, noms de classes...)
	"identifier" : /^[a-zA-Z]+/,

	//tout le reste
	"error" : /./
};


class Token {
	// constructor(type, value = null, pos = null) {
	// 	if (!type) throw new Error("a token requires a type")
    //
	// 	this.type = type
	// 	this.value = value
	// 	this.pos = pos
	// }

	constructor(word, pos = null){
		this.pos = pos,
		this.value = word
		this.type = "";
		var keys = Object.keys(token);
		var size = keys.length
		var i = 0 ;
		while (i < size && this.type == "" ){
			if( word.match(token[keys[i]]) != null ){
				this.type = keys[i]
			}
			i++
		}
		//console.log(word);
	}

	static get token(){
		return token;
	}
}

module.exports = Token;