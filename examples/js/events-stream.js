// Generated automatically by nearley
// http://github.com/Hardmath123/nearley
(function () {
function id(x) {return x[0]; }


const moo = require('moo')

let lexer = moo.compile({
    space: { match: /[\s\r\n\t]+/, lineBreaks: true },
    number: /-?(?:[0-9]|[1-9][0-9]+)(?:\.[0-9]+)?(?:[eE][-+]?[0-9]+)?\b/,
    string: /"(?:\\["bfnrt\/\\]|\\u[a-fA-F0-9]{4}|[^"\\])*"/,
    '{': '{',
    '}': '}',
    ',': ',',
    ':': ':',
    null: 'null'
});




function extractPair(kv, output) {
    if(kv[0]) { output[kv[0]] = kv[1]; }
}

function extractObject(d) {
    let output = {};

    extractPair(d[2], output);

    for (let i in d[3]) {
        extractPair(d[3][i][3], output);
    }

    console.log(' --> ', JSON.stringify(output));
    return null;
}

var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "stream$ebnf$1", "symbols": []},
    {"name": "stream$ebnf$1$subexpression$1", "symbols": ["_", {"literal":","}, "_", "event"]},
    {"name": "stream$ebnf$1", "symbols": ["stream$ebnf$1", "stream$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "stream", "symbols": ["_", "event", "stream$ebnf$1", "_"], "postprocess": d => null},
    {"name": "event$ebnf$1", "symbols": []},
    {"name": "event$ebnf$1$subexpression$1", "symbols": ["_", {"literal":","}, "_", "pair"]},
    {"name": "event$ebnf$1", "symbols": ["event$ebnf$1", "event$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "event", "symbols": [{"literal":"{"}, "_", "pair", "event$ebnf$1", "_", {"literal":"}"}], "postprocess": extractObject},
    {"name": "pair", "symbols": ["key", "_", {"literal":":"}, "_", "value"], "postprocess": d => [d[0], d[4]]},
    {"name": "value", "symbols": ["number"], "postprocess": id},
    {"name": "value", "symbols": ["string"], "postprocess": id},
    {"name": "value", "symbols": [{"literal":"null"}], "postprocess": d => null},
    {"name": "number", "symbols": [(lexer.has("number") ? {type: "number"} : number)], "postprocess": d => parseInt(d[0].value, 10)},
    {"name": "string", "symbols": [(lexer.has("string") ? {type: "string"} : string)], "postprocess": d => JSON.parse(d[0].value)},
    {"name": "key", "symbols": ["string"], "postprocess": id},
    {"name": "_", "symbols": []},
    {"name": "_", "symbols": [(lexer.has("space") ? {type: "space"} : space)], "postprocess": d => null}
]
  , ParserStart: "stream"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
