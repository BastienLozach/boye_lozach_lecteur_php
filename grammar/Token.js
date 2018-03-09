const token = {
	"newline" : "\n",
	"tab" : "(\t)|( {4})",
	"var" : "$.*",
	"comment" : "(//.*)|(/\*.*\*/)",
	"string" : "\".*\"",
	"open_accol" : "{",
	"close_accol" : "}",
	"open_parent" : "(",
	"close_parent" : ")",
	"identifier" : ".+",
	"operator" : "[(\+)(\-)(\*)(\.)(\/)(\=)(\<)(\>)]+",
	"number" : "[0-9\.]+"	
};


class Token {
	constructor(type, value = null, pos = null) {
		if (!type) throw new Error("a token requires a type")

		this.type = type
		this.value = value
		this.pos = pos
	}
}

module.exports = Token;