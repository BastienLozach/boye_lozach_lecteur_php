const token = {
	//commentaire et chaines
	"comment" : /^(\/\/.*)|(\/\*.*\*\/)/,
	"string" : /^(\".*\")|(\'.*\')/,
	
	//whitespace
	"newline" : /^\n/,
	"tab" : /^(\t)|( {4})/,

	//semi-colon
	"semi-colon" : /^;/,

	//parentheses et accolades
	"open_accol" : /^{/,
	"close_accol" : /^}/,
	"open_parent" : /^(/,
	"close_parent" : /^)/,
	
	//operateurs
	"binair_operator" : /^[(\+)(\-)(\*)(\.)(\/)(\=)(\<)(\>)(\!)]+/,
	"unair_operator" : /^[\!]+/,
	
	//variables et valeurs
	"var" : /^\$.+/,
	"number" : /^[0-9\.]+/,

	//identifier (fonctions, noms de classes...)
	"identifier" : /^[a-zA-Z]+/,

	//tout le reste
	"error" : /./
};


class Token {
	constructor(type, value = null, pos = null) {
		if (!type) throw new Error("a token requires a type")

		this.type = type
		this.value = value
		this.pos = pos
	}

	constructor(word, pos = null){
		this.pos = pos,
		this.value = word
		this.type = "";
		keys = Object.keys(token);
		size = keys.length
		i = 0 ;
		while (i < size && this.type == "" ){
			if( word.match(token[keys[i]]) != null ){
				this.type = keys[i]
			}
			i++
		}
		
	}

	static get token(){
		return token;
	}
}

module.exports = Token;