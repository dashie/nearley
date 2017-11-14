@{%

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

%}

@lexer lexer

stream ->
    _ event ( _ "," _ event ):* _ {% d => null %}

event ->
    "{" _ pair ( _ "," _ pair ):* _ "}" {% extractObject %}

pair -> key _ ":" _ value {% d => [d[0], d[4]] %}

value ->
      number {% id %}
    | string {% id %}
    | "null" {% d => null %}

number -> %number {% d => parseInt(d[0].value, 10) %}

string -> %string {% d => JSON.parse(d[0].value) %}

key -> string {% id %}

_ -> null | %space {% d => null %}

@{%

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
    // TODO: process data or import them into another database
    return null;
}

%}
