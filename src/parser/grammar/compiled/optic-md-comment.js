// Generated automatically by nearley
// http://github.com/Hardmath123/nearley
(function () {
function id(x) {return x[0]; }


function extractValue(d) {
    return d[1][0]
}

function extractArray(d) {
    return d[0].concat(d[1])
}

var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "dqstring$ebnf$1", "symbols": []},
    {"name": "dqstring$ebnf$1", "symbols": ["dqstring$ebnf$1", "dstrchar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "dqstring", "symbols": [{"literal":"\""}, "dqstring$ebnf$1", {"literal":"\""}], "postprocess": function(d) {return d[1].join(""); }},
    {"name": "sqstring$ebnf$1", "symbols": []},
    {"name": "sqstring$ebnf$1", "symbols": ["sqstring$ebnf$1", "sstrchar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "sqstring", "symbols": [{"literal":"'"}, "sqstring$ebnf$1", {"literal":"'"}], "postprocess": function(d) {return d[1].join(""); }},
    {"name": "btstring$ebnf$1", "symbols": []},
    {"name": "btstring$ebnf$1", "symbols": ["btstring$ebnf$1", /[^`]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "btstring", "symbols": [{"literal":"`"}, "btstring$ebnf$1", {"literal":"`"}], "postprocess": function(d) {return d[1].join(""); }},
    {"name": "dstrchar", "symbols": [/[^\\"\n]/], "postprocess": id},
    {"name": "dstrchar", "symbols": [{"literal":"\\"}, "strescape"], "postprocess": 
        function(d) {
            return JSON.parse("\""+d.join("")+"\"");
        }
        },
    {"name": "sstrchar", "symbols": [/[^\\'\n]/], "postprocess": id},
    {"name": "sstrchar", "symbols": [{"literal":"\\"}, "strescape"], "postprocess": function(d) { return JSON.parse("\""+d.join("")+"\""); }},
    {"name": "sstrchar$string$1", "symbols": [{"literal":"\\"}, {"literal":"'"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "sstrchar", "symbols": ["sstrchar$string$1"], "postprocess": function(d) {return "'"; }},
    {"name": "strescape", "symbols": [/["\\\/bfnrt]/], "postprocess": id},
    {"name": "strescape", "symbols": [{"literal":"u"}, /[a-fA-F0-9]/, /[a-fA-F0-9]/, /[a-fA-F0-9]/, /[a-fA-F0-9]/], "postprocess": 
        function(d) {
            return d.join("");
        }
        },
    {"name": "unsigned_int$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "unsigned_int$ebnf$1", "symbols": ["unsigned_int$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "unsigned_int", "symbols": ["unsigned_int$ebnf$1"], "postprocess": 
        function(d) {
            return parseInt(d[0].join(""));
        }
        },
    {"name": "int$ebnf$1$subexpression$1", "symbols": [{"literal":"-"}]},
    {"name": "int$ebnf$1$subexpression$1", "symbols": [{"literal":"+"}]},
    {"name": "int$ebnf$1", "symbols": ["int$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "int$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "int$ebnf$2", "symbols": [/[0-9]/]},
    {"name": "int$ebnf$2", "symbols": ["int$ebnf$2", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "int", "symbols": ["int$ebnf$1", "int$ebnf$2"], "postprocess": 
        function(d) {
            if (d[0]) {
                return parseInt(d[0][0]+d[1].join(""));
            } else {
                return parseInt(d[1].join(""));
            }
        }
        },
    {"name": "unsigned_decimal$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "unsigned_decimal$ebnf$1", "symbols": ["unsigned_decimal$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "unsigned_decimal$ebnf$2$subexpression$1$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "unsigned_decimal$ebnf$2$subexpression$1$ebnf$1", "symbols": ["unsigned_decimal$ebnf$2$subexpression$1$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "unsigned_decimal$ebnf$2$subexpression$1", "symbols": [{"literal":"."}, "unsigned_decimal$ebnf$2$subexpression$1$ebnf$1"]},
    {"name": "unsigned_decimal$ebnf$2", "symbols": ["unsigned_decimal$ebnf$2$subexpression$1"], "postprocess": id},
    {"name": "unsigned_decimal$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "unsigned_decimal", "symbols": ["unsigned_decimal$ebnf$1", "unsigned_decimal$ebnf$2"], "postprocess": 
        function(d) {
            return parseFloat(
                d[0].join("") +
                (d[1] ? "."+d[1][1].join("") : "")
            );
        }
        },
    {"name": "decimal$ebnf$1", "symbols": [{"literal":"-"}], "postprocess": id},
    {"name": "decimal$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "decimal$ebnf$2", "symbols": [/[0-9]/]},
    {"name": "decimal$ebnf$2", "symbols": ["decimal$ebnf$2", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "decimal$ebnf$3$subexpression$1$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "decimal$ebnf$3$subexpression$1$ebnf$1", "symbols": ["decimal$ebnf$3$subexpression$1$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "decimal$ebnf$3$subexpression$1", "symbols": [{"literal":"."}, "decimal$ebnf$3$subexpression$1$ebnf$1"]},
    {"name": "decimal$ebnf$3", "symbols": ["decimal$ebnf$3$subexpression$1"], "postprocess": id},
    {"name": "decimal$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "decimal", "symbols": ["decimal$ebnf$1", "decimal$ebnf$2", "decimal$ebnf$3"], "postprocess": 
        function(d) {
            return parseFloat(
                (d[0] || "") +
                d[1].join("") +
                (d[2] ? "."+d[2][1].join("") : "")
            );
        }
        },
    {"name": "percentage", "symbols": ["decimal", {"literal":"%"}], "postprocess": 
        function(d) {
            return d[0]/100;
        }
        },
    {"name": "jsonfloat$ebnf$1", "symbols": [{"literal":"-"}], "postprocess": id},
    {"name": "jsonfloat$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "jsonfloat$ebnf$2", "symbols": [/[0-9]/]},
    {"name": "jsonfloat$ebnf$2", "symbols": ["jsonfloat$ebnf$2", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "jsonfloat$ebnf$3$subexpression$1$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "jsonfloat$ebnf$3$subexpression$1$ebnf$1", "symbols": ["jsonfloat$ebnf$3$subexpression$1$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "jsonfloat$ebnf$3$subexpression$1", "symbols": [{"literal":"."}, "jsonfloat$ebnf$3$subexpression$1$ebnf$1"]},
    {"name": "jsonfloat$ebnf$3", "symbols": ["jsonfloat$ebnf$3$subexpression$1"], "postprocess": id},
    {"name": "jsonfloat$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "jsonfloat$ebnf$4$subexpression$1$ebnf$1", "symbols": [/[+-]/], "postprocess": id},
    {"name": "jsonfloat$ebnf$4$subexpression$1$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "jsonfloat$ebnf$4$subexpression$1$ebnf$2", "symbols": [/[0-9]/]},
    {"name": "jsonfloat$ebnf$4$subexpression$1$ebnf$2", "symbols": ["jsonfloat$ebnf$4$subexpression$1$ebnf$2", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "jsonfloat$ebnf$4$subexpression$1", "symbols": [/[eE]/, "jsonfloat$ebnf$4$subexpression$1$ebnf$1", "jsonfloat$ebnf$4$subexpression$1$ebnf$2"]},
    {"name": "jsonfloat$ebnf$4", "symbols": ["jsonfloat$ebnf$4$subexpression$1"], "postprocess": id},
    {"name": "jsonfloat$ebnf$4", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "jsonfloat", "symbols": ["jsonfloat$ebnf$1", "jsonfloat$ebnf$2", "jsonfloat$ebnf$3", "jsonfloat$ebnf$4"], "postprocess": 
        function(d) {
            return parseFloat(
                (d[0] || "") +
                d[1].join("") +
                (d[2] ? "."+d[2][1].join("") : "") +
                (d[3] ? "e" + (d[3][1] || "+") + d[3][2].join("") : "")
            );
        }
        },
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", "wschar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess": function(d) {return null;}},
    {"name": "__$ebnf$1", "symbols": ["wschar"]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", "wschar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__", "symbols": ["__$ebnf$1"], "postprocess": function(d) {return null;}},
    {"name": "wschar", "symbols": [/[ \t\n\v\f]/], "postprocess": id},
    {"name": "main$subexpression$1", "symbols": ["annotation"]},
    {"name": "main$subexpression$1", "symbols": ["annotationPair"]},
    {"name": "main$subexpression$1", "symbols": ["dependencies"]},
    {"name": "main$subexpression$1", "symbols": ["metadata"]},
    {"name": "main", "symbols": ["main$subexpression$1"], "postprocess": 
        function (data) {
            return data[0][0]
        }
        },
    {"name": "annotation$string$1", "symbols": [{"literal":"<"}, {"literal":"!"}, {"literal":"-"}, {"literal":"-"}, {"literal":" "}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "annotation$string$2", "symbols": [{"literal":"-"}, {"literal":"-"}, {"literal":">"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "annotation", "symbols": ["annotation$string$1", "_", "annotationContent", "_", "annotation$string$2"], "postprocess": 
        function(data) {
            return {
                type: 'annotation',
                properties: data[2]
            };
        }
        },
    {"name": "annotationPair$string$1", "symbols": [{"literal":"<"}, {"literal":"!"}, {"literal":"-"}, {"literal":"-"}, {"literal":" "}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "annotationPair$string$2", "symbols": [{"literal":"-"}, {"literal":"-"}, {"literal":">"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "annotationPair$string$3", "symbols": [{"literal":"`"}, {"literal":"`"}, {"literal":"`"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "annotationPair$string$4", "symbols": [{"literal":"`"}, {"literal":"`"}, {"literal":"`"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "annotationPair", "symbols": ["annotationPair$string$1", "_", "annotationContent", "_", "annotationPair$string$2", "_", "annotationPair$string$3", "single_line_code", {"literal":"\n"}, "raw_code", {"literal":"\n"}, "annotationPair$string$4"], "postprocess": 
        function(data) {
            return {
                type: 'annotationPair',
                properties: data[2],
                codeBlock: data[9],
                language: data[7]
            };
        }
        },
    {"name": "dependencies$string$1", "symbols": [{"literal":"<"}, {"literal":"!"}, {"literal":"-"}, {"literal":"-"}, {"literal":" "}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "dependencies$string$2", "symbols": [{"literal":"D"}, {"literal":"E"}, {"literal":"P"}, {"literal":"E"}, {"literal":"N"}, {"literal":"D"}, {"literal":"E"}, {"literal":"N"}, {"literal":"C"}, {"literal":"I"}, {"literal":"E"}, {"literal":"S"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "dependencies$ebnf$1", "symbols": []},
    {"name": "dependencies$ebnf$1$subexpression$1", "symbols": ["__", "packageRef"]},
    {"name": "dependencies$ebnf$1", "symbols": ["dependencies$ebnf$1", "dependencies$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "dependencies$string$3", "symbols": [{"literal":"-"}, {"literal":"-"}, {"literal":">"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "dependencies", "symbols": ["dependencies$string$1", "_", "dependencies$string$2", "dependencies$ebnf$1", "__", "dependencies$string$3"], "postprocess": 
        function(data) {
            return {
                type: 'dependenciesAnnotation',
                dependencies: data[3].map(i=> i[1])
            };
        }
         },
    {"name": "metadata$string$1", "symbols": [{"literal":"<"}, {"literal":"!"}, {"literal":"-"}, {"literal":"-"}, {"literal":" "}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "metadata$string$2", "symbols": [{"literal":"m"}, {"literal":"e"}, {"literal":"t"}, {"literal":"a"}, {"literal":"d"}, {"literal":"a"}, {"literal":"t"}, {"literal":"a"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "metadata$string$3", "symbols": [{"literal":"-"}, {"literal":"-"}, {"literal":">"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "metadata", "symbols": ["metadata$string$1", "_", "metadata$string$2", "__", "annotationContent", "__", "metadata$string$3"], "postprocess": 
        function(data) {
            return {
                type: 'metadataAnnotation',
                properties: data[4]
            };
        }
          },
    {"name": "packageRef$ebnf$1$subexpression$1", "symbols": [/[\da-z-><\+:]/]},
    {"name": "packageRef$ebnf$1", "symbols": ["packageRef$ebnf$1$subexpression$1"]},
    {"name": "packageRef$ebnf$1$subexpression$2", "symbols": [/[\da-z-><\+:]/]},
    {"name": "packageRef$ebnf$1", "symbols": ["packageRef$ebnf$1", "packageRef$ebnf$1$subexpression$2"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "packageRef$ebnf$2", "symbols": [/[A-Za-z0-9\.\+\*-]/]},
    {"name": "packageRef$ebnf$2", "symbols": ["packageRef$ebnf$2", /[A-Za-z0-9\.\+\*-]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "packageRef", "symbols": ["packageRef$ebnf$1", {"literal":"@"}, "packageRef$ebnf$2"], "postprocess":  function(d) {
          return d[0].join("") + d[1] + d[2].join("")
        }
        },
    {"name": "single_line_code$ebnf$1", "symbols": [/[a-z]/]},
    {"name": "single_line_code$ebnf$1", "symbols": ["single_line_code$ebnf$1", /[a-z]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "single_line_code", "symbols": ["single_line_code$ebnf$1"], "postprocess":  function(d) {
            return d[0].join("");
        } },
    {"name": "raw_code$ebnf$1", "symbols": [/[\S\s]/]},
    {"name": "raw_code$ebnf$1", "symbols": ["raw_code$ebnf$1", /[\S\s]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "raw_code", "symbols": ["raw_code$ebnf$1"], "postprocess":  function(d) {
            return d[0].join("");
        } },
    {"name": "annotationContent$ebnf$1", "symbols": []},
    {"name": "annotationContent$ebnf$1$subexpression$1", "symbols": ["__", "value"], "postprocess": extractValue},
    {"name": "annotationContent$ebnf$1", "symbols": ["annotationContent$ebnf$1", "annotationContent$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "annotationContent", "symbols": ["value", "annotationContent$ebnf$1"], "postprocess": extractArray},
    {"name": "scope$subexpression$1$string$1", "symbols": [{"literal":"i"}, {"literal":"n"}, {"literal":"t"}, {"literal":"e"}, {"literal":"r"}, {"literal":"n"}, {"literal":"a"}, {"literal":"l"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "scope$subexpression$1", "symbols": ["scope$subexpression$1$string$1"]},
    {"name": "scope$subexpression$1$string$2", "symbols": [{"literal":"p"}, {"literal":"u"}, {"literal":"b"}, {"literal":"l"}, {"literal":"i"}, {"literal":"c"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "scope$subexpression$1", "symbols": ["scope$subexpression$1$string$2"]},
    {"name": "scope", "symbols": ["scope$subexpression$1"], "postprocess": 
        function(data) {
            return {
                type: 'scopeProperty',
                value: data[0][0]
            };
        }
        },
    {"name": "typeProperty$subexpression$1$string$1", "symbols": [{"literal":"s"}, {"literal":"c"}, {"literal":"h"}, {"literal":"e"}, {"literal":"m"}, {"literal":"a"}, {"literal":"-"}, {"literal":"d"}, {"literal":"e"}, {"literal":"f"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "typeProperty$subexpression$1", "symbols": ["typeProperty$subexpression$1$string$1"]},
    {"name": "typeProperty$subexpression$1$string$2", "symbols": [{"literal":"l"}, {"literal":"e"}, {"literal":"n"}, {"literal":"s"}, {"literal":"-"}, {"literal":"d"}, {"literal":"e"}, {"literal":"f"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "typeProperty$subexpression$1", "symbols": ["typeProperty$subexpression$1$string$2"]},
    {"name": "typeProperty$subexpression$1$string$3", "symbols": [{"literal":"c"}, {"literal":"o"}, {"literal":"n"}, {"literal":"t"}, {"literal":"a"}, {"literal":"i"}, {"literal":"n"}, {"literal":"e"}, {"literal":"r"}, {"literal":"-"}, {"literal":"d"}, {"literal":"e"}, {"literal":"f"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "typeProperty$subexpression$1", "symbols": ["typeProperty$subexpression$1$string$3"]},
    {"name": "typeProperty$subexpression$1$string$4", "symbols": [{"literal":"t"}, {"literal":"r"}, {"literal":"a"}, {"literal":"n"}, {"literal":"s"}, {"literal":"f"}, {"literal":"o"}, {"literal":"r"}, {"literal":"m"}, {"literal":"a"}, {"literal":"t"}, {"literal":"i"}, {"literal":"o"}, {"literal":"n"}, {"literal":"-"}, {"literal":"d"}, {"literal":"e"}, {"literal":"f"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "typeProperty$subexpression$1", "symbols": ["typeProperty$subexpression$1$string$4"]},
    {"name": "typeProperty", "symbols": ["typeProperty$subexpression$1"], "postprocess": 
        function(data, location) {
            return {
                type: 'typeProperty',
                value: data[0][0],
                location
            };
        }
        },
    {"name": "assignTo$subexpression$1$string$1", "symbols": [{"literal":"="}, {"literal":">"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "assignTo$subexpression$1", "symbols": ["assignTo$subexpression$1$string$1"]},
    {"name": "assignTo$subexpression$1$string$2", "symbols": [{"literal":"<"}, {"literal":"="}, {"literal":">"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "assignTo$subexpression$1", "symbols": ["assignTo$subexpression$1$string$2"]},
    {"name": "assignTo", "symbols": ["assignTo$subexpression$1"], "postprocess": 
        
        function (data, location) {
            return data[0][0] === '<=>'
        }
        
        },
    {"name": "assignmentProperty$subexpression$1$subexpression$1$string$1", "symbols": [{"literal":"s"}, {"literal":"c"}, {"literal":"h"}, {"literal":"e"}, {"literal":"m"}, {"literal":"a"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "assignmentProperty$subexpression$1$subexpression$1", "symbols": ["assignmentProperty$subexpression$1$subexpression$1$string$1"]},
    {"name": "assignmentProperty$subexpression$1$subexpression$1$string$2", "symbols": [{"literal":"i"}, {"literal":"d"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "assignmentProperty$subexpression$1$subexpression$1", "symbols": ["assignmentProperty$subexpression$1$subexpression$1$string$2"]},
    {"name": "assignmentProperty$subexpression$1$subexpression$1$string$3", "symbols": [{"literal":"n"}, {"literal":"a"}, {"literal":"m"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "assignmentProperty$subexpression$1$subexpression$1", "symbols": ["assignmentProperty$subexpression$1$subexpression$1$string$3"]},
    {"name": "assignmentProperty$subexpression$1$subexpression$1$string$4", "symbols": [{"literal":"a"}, {"literal":"u"}, {"literal":"t"}, {"literal":"h"}, {"literal":"o"}, {"literal":"r"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "assignmentProperty$subexpression$1$subexpression$1", "symbols": ["assignmentProperty$subexpression$1$subexpression$1$string$4"]},
    {"name": "assignmentProperty$subexpression$1$subexpression$1$string$5", "symbols": [{"literal":"v"}, {"literal":"e"}, {"literal":"r"}, {"literal":"s"}, {"literal":"i"}, {"literal":"o"}, {"literal":"n"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "assignmentProperty$subexpression$1$subexpression$1", "symbols": ["assignmentProperty$subexpression$1$subexpression$1$string$5"]},
    {"name": "assignmentProperty$subexpression$1$subexpression$1$string$6", "symbols": [{"literal":"l"}, {"literal":"a"}, {"literal":"n"}, {"literal":"g"}, {"literal":"u"}, {"literal":"a"}, {"literal":"g"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "assignmentProperty$subexpression$1$subexpression$1", "symbols": ["assignmentProperty$subexpression$1$subexpression$1$string$6"]},
    {"name": "assignmentProperty$subexpression$1$subexpression$1$string$7", "symbols": [{"literal":"i"}, {"literal":"n"}, {"literal":"p"}, {"literal":"u"}, {"literal":"t"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "assignmentProperty$subexpression$1$subexpression$1", "symbols": ["assignmentProperty$subexpression$1$subexpression$1$string$7"]},
    {"name": "assignmentProperty$subexpression$1$subexpression$1$string$8", "symbols": [{"literal":"o"}, {"literal":"u"}, {"literal":"t"}, {"literal":"p"}, {"literal":"u"}, {"literal":"t"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "assignmentProperty$subexpression$1$subexpression$1", "symbols": ["assignmentProperty$subexpression$1$subexpression$1$string$8"]},
    {"name": "assignmentProperty$subexpression$1$subexpression$2", "symbols": ["sqstring"]},
    {"name": "assignmentProperty$subexpression$1$subexpression$2", "symbols": ["dqstring"]},
    {"name": "assignmentProperty$subexpression$1", "symbols": ["assignmentProperty$subexpression$1$subexpression$1", "_", {"literal":"="}, "_", "assignmentProperty$subexpression$1$subexpression$2"]},
    {"name": "assignmentProperty", "symbols": ["assignmentProperty$subexpression$1"], "postprocess": 
        function(data, location) {
            return {
                type: 'assignmentProperty',
                key: data[0][0][0],
                value: data[0][4][0],
                location
            };
        }
        },
    {"name": "finderProperty$subexpression$1", "symbols": ["stringFinder"]},
    {"name": "finderProperty$subexpression$1", "symbols": ["rangeFinder"]},
    {"name": "finderProperty", "symbols": ["finderProperty$subexpression$1"], "postprocess": 
        function(data) {
            return data[0][0]
        }
        },
    {"name": "variableProperty$subexpression$1", "symbols": ["sqstring"]},
    {"name": "variableProperty$subexpression$1", "symbols": ["dqstring"]},
    {"name": "variableProperty$subexpression$2", "symbols": [{"literal":"*"}]},
    {"name": "variableProperty$subexpression$2", "symbols": [{"literal":"^"}]},
    {"name": "variableProperty", "symbols": ["variableProperty$subexpression$1", "_", "variableProperty$subexpression$2"], "postprocess": 
        function(data, location) {
            return {
                type: 'variableProperty',
                token: data[0][0],
                in: (data[2][0] === "*" ? 'self' : 'scope'),
                location
            };
        }
        },
    {"name": "mapSchemaProperty$subexpression$1$string$1", "symbols": [{"literal":"m"}, {"literal":"a"}, {"literal":"p"}, {"literal":"U"}, {"literal":"n"}, {"literal":"i"}, {"literal":"q"}, {"literal":"u"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "mapSchemaProperty$subexpression$1", "symbols": ["mapSchemaProperty$subexpression$1$string$1"]},
    {"name": "mapSchemaProperty$subexpression$1$string$2", "symbols": [{"literal":"m"}, {"literal":"a"}, {"literal":"p"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "mapSchemaProperty$subexpression$1", "symbols": ["mapSchemaProperty$subexpression$1$string$2"]},
    {"name": "mapSchemaProperty$subexpression$2", "symbols": ["sqstring"]},
    {"name": "mapSchemaProperty$subexpression$2", "symbols": ["dqstring"]},
    {"name": "mapSchemaProperty", "symbols": ["mapSchemaProperty$subexpression$1", "_", {"literal":"("}, "_", "mapSchemaProperty$subexpression$2", "_", {"literal":")"}, "_", "assignTo", "_", "memberExpression"], "postprocess": 
        
        function(data, location) {
        
            const unique = data[0][0] === 'mapUnique'
            const schema = data[4][0]
        
            return {
                type: 'mapSchemaProperty',
                unique,
                schema,
                location,
                editable: data[8],
                propertyPath: data[10]
            };
        }
        
        },
    {"name": "stringFinder$subexpression$1", "symbols": ["sqstring"]},
    {"name": "stringFinder$subexpression$1", "symbols": ["dqstring"]},
    {"name": "stringFinder$subexpression$2", "symbols": []},
    {"name": "stringFinder$subexpression$2$string$1", "symbols": [{"literal":"."}, {"literal":"s"}, {"literal":"t"}, {"literal":"a"}, {"literal":"r"}, {"literal":"t"}, {"literal":"i"}, {"literal":"n"}, {"literal":"g"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "stringFinder$subexpression$2", "symbols": ["stringFinder$subexpression$2$string$1"]},
    {"name": "stringFinder$subexpression$2$string$2", "symbols": [{"literal":"."}, {"literal":"e"}, {"literal":"n"}, {"literal":"t"}, {"literal":"i"}, {"literal":"r"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "stringFinder$subexpression$2", "symbols": ["stringFinder$subexpression$2$string$2"]},
    {"name": "stringFinder$subexpression$2$string$3", "symbols": [{"literal":"."}, {"literal":"c"}, {"literal":"o"}, {"literal":"n"}, {"literal":"t"}, {"literal":"a"}, {"literal":"i"}, {"literal":"n"}, {"literal":"i"}, {"literal":"n"}, {"literal":"g"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "stringFinder$subexpression$2", "symbols": ["stringFinder$subexpression$2$string$3"]},
    {"name": "stringFinder$subexpression$3", "symbols": []},
    {"name": "stringFinder$subexpression$3", "symbols": [{"literal":"["}, "_", "int", "_", {"literal":"]"}]},
    {"name": "stringFinder$subexpression$4", "symbols": ["propertyAssignment"]},
    {"name": "stringFinder", "symbols": ["stringFinder$subexpression$1", "stringFinder$subexpression$2", "stringFinder$subexpression$3", "_", "assignTo", "_", "stringFinder$subexpression$4"], "postprocess": 
        function(data, location) {
            const rule = (data[1][0]) ? data[1][0].substring(1) : 'entire'
            const occurrence = (data[2][2]) ? data[2][2] : 0
        
            return {
                type: 'finderProperty',
                finderType: 'stringFinder',
                string: data[0][0],
                rule: rule,
                occurrence: occurrence,
                editable: data[4],
                propertyPath: data[6][0],
                location
            };
        }
        },
    {"name": "rangeFinder$subexpression$1", "symbols": ["propertyAssignment"]},
    {"name": "rangeFinder", "symbols": ["int", {"literal":"-"}, "int", "_", "assignTo", "_", "rangeFinder$subexpression$1"], "postprocess": 
        function(data, location) {
            return {
                type: 'finderProperty',
                finderType: 'rangeFinder',
                editable: data[4],
                propertyPath: data[6][0],
                start: data[0],
                end: data[2],
                location
            };
        }
           },
    {"name": "propertyAssignment$subexpression$1", "symbols": ["memberExpression"]},
    {"name": "propertyAssignment$subexpression$1", "symbols": ["rootExpansion"]},
    {"name": "propertyAssignment", "symbols": ["propertyAssignment$subexpression$1"], "postprocess": 
        
        function (data) {
            return data[0][0]
        }
        
        },
    {"name": "rootExpansion$string$1", "symbols": [{"literal":"{"}, {"literal":"."}, {"literal":"."}, {"literal":"."}, {"literal":"}"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "rootExpansion", "symbols": ["rootExpansion$string$1"], "postprocess": 
        function (data) {
            return {
                type: 'rootExpansion',
            }
        }
        },
    {"name": "memberExpression$ebnf$1", "symbols": []},
    {"name": "memberExpression$ebnf$1$subexpression$1", "symbols": ["_", {"literal":"."}, "_", "keyName"]},
    {"name": "memberExpression$ebnf$1", "symbols": ["memberExpression$ebnf$1", "memberExpression$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "memberExpression", "symbols": ["keyName", "memberExpression$ebnf$1"], "postprocess": 
        function (data) {
            const otherKeys = data[1].map(i=> {
                return i[3]
            })
            return {
                type: 'memberExpression',
                keys: [data[0]].concat(otherKeys)
            }
        }
        },
    {"name": "keyName$ebnf$1$subexpression$1", "symbols": [/[a-zA-Z_]/]},
    {"name": "keyName$ebnf$1", "symbols": ["keyName$ebnf$1$subexpression$1"]},
    {"name": "keyName$ebnf$1$subexpression$2", "symbols": [/[a-zA-Z_]/]},
    {"name": "keyName$ebnf$1", "symbols": ["keyName$ebnf$1", "keyName$ebnf$1$subexpression$2"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "keyName", "symbols": ["keyName$ebnf$1"], "postprocess": function(d) { return d[0].join(""); }},
    {"name": "value", "symbols": ["typeProperty"]},
    {"name": "value", "symbols": ["scope"]},
    {"name": "value", "symbols": ["assignmentProperty"]},
    {"name": "value", "symbols": ["finderProperty"]},
    {"name": "value", "symbols": ["variableProperty"]},
    {"name": "value", "symbols": ["mapSchemaProperty"]},
    {"name": "value", "symbols": ["pullProperty"]},
    {"name": "value", "symbols": ["childrenRuleProperty"]},
    {"name": "value", "symbols": ["containerProperty"]},
    {"name": "containerProperty$subexpression$1", "symbols": ["sqstring"]},
    {"name": "containerProperty$subexpression$1", "symbols": ["dqstring"]},
    {"name": "containerProperty", "symbols": ["containerProperty$subexpression$1", "_", {"literal":"="}, "_", {"literal":"("}, "_", "containerContent", "_", {"literal":")"}], "postprocess": 
        function(data, location) {
            return {
                type: 'containerProperty',
                name: data[0][0],
                properties: data[6],
                subcontainer: true,
                location
            };
        }
        },
    {"name": "containerContent$ebnf$1", "symbols": []},
    {"name": "containerContent$ebnf$1$subexpression$1", "symbols": ["__", "value"], "postprocess": extractValue},
    {"name": "containerContent$ebnf$1", "symbols": ["containerContent$ebnf$1", "containerContent$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "containerContent", "symbols": ["value", "containerContent$ebnf$1"], "postprocess": extractArray},
    {"name": "pullProperty$string$1", "symbols": [{"literal":"p"}, {"literal":"u"}, {"literal":"l"}, {"literal":"l"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "pullProperty$subexpression$1", "symbols": ["sqstring"]},
    {"name": "pullProperty$subexpression$1", "symbols": ["dqstring"]},
    {"name": "pullProperty", "symbols": ["pullProperty$string$1", "__", "pullProperty$subexpression$1"], "postprocess": 
        function(data, location) {
          return {
              type: 'pullProperty',
              schema: data[2][0],
              location
          };
        }
        },
    {"name": "childrenRuleProperty$subexpression$1$string$1", "symbols": [{"literal":"a"}, {"literal":"n"}, {"literal":"y"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "childrenRuleProperty$subexpression$1", "symbols": ["childrenRuleProperty$subexpression$1$string$1"]},
    {"name": "childrenRuleProperty$subexpression$1$string$2", "symbols": [{"literal":"e"}, {"literal":"x"}, {"literal":"a"}, {"literal":"c"}, {"literal":"t"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "childrenRuleProperty$subexpression$1", "symbols": ["childrenRuleProperty$subexpression$1$string$2"]},
    {"name": "childrenRuleProperty$subexpression$1$string$3", "symbols": [{"literal":"s"}, {"literal":"a"}, {"literal":"m"}, {"literal":"e"}, {"literal":"-"}, {"literal":"p"}, {"literal":"l"}, {"literal":"u"}, {"literal":"s"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "childrenRuleProperty$subexpression$1", "symbols": ["childrenRuleProperty$subexpression$1$string$3"]},
    {"name": "childrenRuleProperty$subexpression$1$string$4", "symbols": [{"literal":"s"}, {"literal":"a"}, {"literal":"m"}, {"literal":"e"}, {"literal":"-"}, {"literal":"a"}, {"literal":"n"}, {"literal":"y"}, {"literal":"-"}, {"literal":"o"}, {"literal":"r"}, {"literal":"d"}, {"literal":"e"}, {"literal":"r"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "childrenRuleProperty$subexpression$1", "symbols": ["childrenRuleProperty$subexpression$1$string$4"]},
    {"name": "childrenRuleProperty$subexpression$1$string$5", "symbols": [{"literal":"s"}, {"literal":"a"}, {"literal":"m"}, {"literal":"e"}, {"literal":"-"}, {"literal":"p"}, {"literal":"l"}, {"literal":"u"}, {"literal":"s"}, {"literal":"-"}, {"literal":"a"}, {"literal":"n"}, {"literal":"y"}, {"literal":"-"}, {"literal":"o"}, {"literal":"r"}, {"literal":"d"}, {"literal":"e"}, {"literal":"r"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "childrenRuleProperty$subexpression$1", "symbols": ["childrenRuleProperty$subexpression$1$string$5"]},
    {"name": "childrenRuleProperty", "symbols": ["childrenRuleProperty$subexpression$1"], "postprocess": 
        function(data, location) {
          return {
              type: 'childrenRuleProperty',
              rule: data[0][0],
              location
          };
        }
        }
]
  , ParserStart: "main"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
