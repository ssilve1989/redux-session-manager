module.exports = {
	"parser"       : "babel-eslint",
	"env"          : {
		"browser": true,
		"es6"    : true
	},
	"extends"      : "eslint:recommended",
	"parserOptions": {
		"sourceType": "module"
	},
	"rules"        : {
		"no-console"     : [
			"error",
			{ allow: [ "warn", "error" ] }
		],
		"indent"         : [
			"error",
			"tab"
		],
		"linebreak-style": [
			"error",
			"unix"
		],
		"quotes"         : [
			"error",
			"single"
		],
		"semi"           : [
			"warn",
			"never"
		]
	}
};