@builtin "string.ne"
@builtin "number.ne"
@builtin "whitespace.ne"

main -> (annotation | annotationPair) {%
    function (data) {
        return data[0][0]
    }
%}

annotation -> "<!-- " _ annotationContent _ "-->" {%
     function(data) {
         return {
             type: 'annotation',
             properties: data[2]
         };
     }
%}

annotationPair -> "<!-- " _ annotationContent _ "-->" _ "```" raw_code "\n" raw_code "\n" "```" {%
   function(data) {
       return {
           type: 'annotationPair',
           properties: data[2],
           codeBlock: data[9]
       };
   }
%}

raw_code -> .:+  {% function(d) { return d[0].join(""); } %}

annotationContent -> value (__ value {% extractValue %}):* {% extractArray %}

typeProperty -> ("schema-def" | "lens-def" | "container") {%
      function(data, location) {
          return {
              type: 'typeProperty',
              value: data[0][0],
              location
          };
      }
   %}

assignmentProperty -> (("schema" | "id") _ "=" _ (sqstring | dqstring)) {%
       function(data, location) {
           return {
               type: 'assignmentProperty',
               key: data[0][0][0],
               value: data[0][4][0],
               location
           };
       }
    %}

finderProperty -> (stringFinder | rangeFinder) {%
    function(data) {
        return data[0][0]
    }
%}

stringFinder -> (sqstring | dqstring) (null | ".starting" | ".entire" | ".containing") (null | "[" _ int _ "]") _ "->" _ (memberExpression) {%
      function(data, location) {
          const rule = (data[1][0]) ? data[1][0].substring(1) : 'entire'
          const occurrence = (data[2][2]) ? data[2][2] : 0

          return {
              type: 'finderProperty',
              finderType: 'stringFinder',
              string: data[0][0],
              rule: rule,
              occurrence: occurrence,
              propertyPath: data[6][0],
              location
          };
      }
   %}

rangeFinder -> int "-" int _ "->" _ (memberExpression) {%
      function(data, location) {
          return {
              type: 'finderProperty',
              finderType: 'rangeFinder',
              start: data[0],
              end: data[2],
              location
          };
      }
   %}

memberExpression -> keyName (_ "." _ keyName):* {%
    function (data) {
        const otherKeys = data[1].map(i=> {
            return i[3]
        })
        return {
            type: 'memberExpression',
            keys: [data[0]].concat(otherKeys)
        }
    }
%}

keyName -> ([a-zA-Z_]):+ {% function(d) { return d[0].join(""); } %}


value ->
    typeProperty
  | assignmentProperty
  | finderProperty


@{%

function extractValue(d) {
    return d[1][0]
}

function extractArray(d) {
    return d[0].concat(d[1])
}

%}