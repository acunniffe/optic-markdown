@builtin "string.ne"
@builtin "number.ne"
@builtin "whitespace.ne"

main -> (annotation | annotationPair | dependencies | metadata) {%
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

annotationPair -> "<!-- " _ annotationContent _ "-->" _ "```" single_line_code "\n" raw_code "\n" "```" {%
   function(data) {
       return {
           type: 'annotationPair',
           properties: data[2],
           codeBlock: data[9],
           language: data[7]
       };
   }
%}

dependencies -> "<!-- " _ "DEPENDENCIES"  (__ packageRef):* __ "-->" {%
    function(data) {
        return {
            type: 'dependenciesAnnotation',
            dependencies: data[3].map(i=> i[1])
        };
    }
 %}

 metadata -> "<!-- " _ "metadata" __ annotationContent __ "-->" {%
     function(data) {
         return {
             type: 'metadataAnnotation',
             properties: data[4]
         };
     }
  %}

packageRef -> ([\da-z-><\+]):+ "@" [A-Za-z0-9\.\+\*-]:+ {% function(d) {
    return d[0].join("") + d[1] + d[2].join("")
  }
%}

single_line_code -> [a-z]:+ {% function(d) {
    return d[0].join("");
} %}

raw_code -> [\S\s]:+  {% function(d) {
    return d[0].join("");
} %}

annotationContent -> value (__ value {% extractValue %}):* {% extractArray %}

scope -> ("internal" | "public") {%
     function(data) {
         return {
             type: 'scopeProperty',
             value: data[0][0]
         };
     }
%}

typeProperty -> ("schema-def" | "lens-def" | "container-def" ) {%
      function(data, location) {
          return {
              type: 'typeProperty',
              value: data[0][0],
              location
          };
      }
%}

assignTo -> ("=>" | "<=>") {%

    function (data, location) {
        return data[0][0] === '<=>'
    }

%}

assignmentProperty -> (("schema" | "id" | "name" | "author" | "version" | "language") _ "=" _ (sqstring | dqstring)) {%
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

variableProperty -> (sqstring | dqstring) _ ("*" | "^") {%
   function(data, location) {
       return {
           type: 'variableProperty',
           token: data[0][0],
           in: (data[2][0] === "*" ? 'self' : 'scope'),
           location
       };
   }
%}

mapSchemaProperty -> ("mapUnique" | "map") _ "(" _ (sqstring | dqstring) _ ")" _ assignTo _ memberExpression {%

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

%}

stringFinder -> (sqstring | dqstring) (null | ".starting" | ".entire" | ".containing") (null | "[" _ int _ "]") _ assignTo _ (memberExpression) {%
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
%}

rangeFinder -> int "-" int _ assignTo _ (memberExpression) {%
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
  | scope
  | assignmentProperty
  | finderProperty
  | variableProperty
  | mapSchemaProperty
  | pullProperty
  | childrenRuleProperty



containerProperty -> (sqstring | dqstring) _ "=" _ "(" _ containerContent _ ")" {%
  function(data, location) {
      return {
          type: 'containerProperty',
          name: data[0][0],
          properties: data[6],
          subcontainer: true,
          location
      };
  }
%}

containerContent -> value (__ value {% extractValue %}):* {% extractArray %}

pullProperty -> "pull" __ (sqstring | dqstring) {%
    function(data, location) {
      return {
          type: 'pullProperty',
          schema: data[2][0],
          location
      };
    }
%}

childrenRuleProperty -> ("any" | "exact" | "same-plus" | "same-any-order" | "same-plus-any-order") {%
    function(data, location) {
      return {
          type: 'childrenRuleProperty',
          rule: data[0][0],
          location
      };
    }
%}

@{%

function extractValue(d) {
    return d[1][0]
}

function extractArray(d) {
    return d[0].concat(d[1])
}

%}